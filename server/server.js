require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const massive = require('massive');
const axios = require('axios');
const ctrl = require('./controller');
const app = express();

app.use(bodyParser.json());

let {
    SERVER_PORT,
    CONNECTION_STRING,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    SESSION_SECRET
} = process.env;

app.use(session({
    secret: SESSION_SECRET,
    resave: false,
    saveUninitialized: true
}))

massive(CONNECTION_STRING).then(db => {
    app.set('db', db);
    console.log('Database reporting for duty');
}); 

app.get('/auth/callback', async (req, res) => {
    //code from auth0 on req.query.code 
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `http://${req.headers.host}/auth/callback`
    };

    //post request to exchange the code for token
    let responseWithToken = await axios.post(`https://${REACT_APP_DOMAIN}/oauth/token`, payload);

    //use token to get user data of whom just logged in
    let userData = await axios.get(`https://${REACT_APP_DOMAIN}/userinfo?access_token=${responseWithToken.data.access_token}`);

    const db = req.app.get('db');
    let { sub, given_name, family_name, picture, email } = userData.data;
    console.log(userData.data);
    //gets the unique google id 
    let userExists = await db.find_user([sub]);
    if (userExists[0]) {
        req.session.user = userExists[0];
        res.redirect('http://localhost:3000/userdashboard');
    } else {
        db.create_user([sub, given_name, family_name, picture, email]).then(createdUser => {
            req.session.user = createdUser[0];
            res.redirect('http://localhost:3000/userdashboard');
        });
    }

});



app.get('/api/user-data', (req, res) => {
    if(req.session.user){
        res.status(200).send(req.session.user)
    } else {
        res.status(401).send('Access Denied')
    }
});

app.get('/api/logout', (req, res) => {
    req.session.destroy()
    res.json(true);
})

app.get('/api/properties', ctrl.getAllListings)
app.get('/api/my-properties', ctrl.getHostListings)


app.listen(SERVER_PORT, () => console.log(`Listening in on ${SERVER_PORT}`));