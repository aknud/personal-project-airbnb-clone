require('dotenv').config();
const express = require('express');
const session = require('express-session');
const bodyParser = require('body-parser');
const mid = require('./middleware')
const massive = require('massive');
const axios = require('axios');
const ctrl = require('./controller');
const aws = require('aws-sdk');
const path = require('path'); // Usually moved to the start of file

const app = express();

app.use(express.static(__dirname+'/../build'));

app.use(bodyParser.json());

const {
    SERVER_PORT,
    CONNECTION_STRING,
    REACT_APP_DOMAIN,
    REACT_APP_CLIENT_ID,
    CLIENT_SECRET,
    SESSION_SECRET,
    S3_BUCKET,
    AWS_REGION,
    FRONTEND_DOMAIN,
    PROTOCAL
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


app.use(mid.bypassAuthInDevelopment)


////////// AMAZON S3 ///////////
//NOTE: Look into making bucket public

aws.config.region = AWS_REGION;  //NOTE: Changed this to go into the .env file.

app.get('/api/sign-s3', (req, res) => {

    const s3 = new aws.S3();

    const fileName = req.query['file-name'];
    const fileType = req.query['file-type'];
    const s3Params = {
      Bucket: S3_BUCKET,
      Key: fileName,
      Expires: 60,
      ContentType: fileType,
      ACL: 'public-read'
    };

    s3.getSignedUrl('putObject', s3Params, (err, data) => {
      if(err){
        console.log(err);
        return res.end();
      }
      const returnData = {
        signedRequest: data,
        url: `https://${S3_BUCKET}.s3.amazonaws.com/${fileName}`
      };
      res.write(JSON.stringify(returnData));
      res.end();
    });
  });




/////////////////// AUTH0 /////////////////////
app.get('/auth/callback', async (req, res) => {
    //code from auth0 on req.query.code
    let payload = {
        client_id: REACT_APP_CLIENT_ID,
        client_secret: CLIENT_SECRET,
        code: req.query.code,
        grant_type: 'authorization_code',
        redirect_uri: `${PROTOCAL}://${req.headers.host}/auth/callback`
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
        const userId = userExists[0].user_id
        db.update_user_photo([picture, userId]).then( user => {
            req.session.user = user[0];
            res.redirect(`${FRONTEND_DOMAIN}/userdashboard`);
        })
    } else {
        db.create_user([sub, given_name, family_name, picture, email]).then(createdUser => {
            req.session.user = createdUser[0];
            res.redirect(`${FRONTEND_DOMAIN}/userdashboard`);
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
app.get('/api/all-user-data', ctrl.getAllUserData)
app.get('/api/my-properties', ctrl.getHostListings)
app.get('/api/photos-by-id/:id', ctrl.getPhotosById)
app.get('/api/all-photos', ctrl.getPhotos)
app.get('/api/get-saved-listings', ctrl.getSavedListings)
app.post('/api/new-property', ctrl.create)
app.post('/api/save-listing/:id', ctrl.saveListing)
app.post('/api/addphoto/:id', ctrl.addPhoto)
app.put(`/api/update-property/:id`, ctrl.update)
app.delete(`/api/delete-property/:id`, ctrl.delete)
app.delete(`/api/delete-photo/:id`, ctrl.deletePhoto)



app.get('*', (req, res)=>{
    res.sendFile(path.join(__dirname, '../build/index.html'));
});

app.listen(SERVER_PORT, () => console.log(`Listening in on ${SERVER_PORT}`));
