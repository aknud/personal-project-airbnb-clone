require('dotenv').config()

const imposter = {
    user_id: 1,
    first_name:	'Amy',
    last_name: 'Knudson',
    address: null,	
    city: null,
    state: null,
    zip: null,
    phone: null,	
    email: 'amylknudson@gmail.com',
    auth_id: 'google-oauth2|109190719688386935705'	,
    user_pic: 'https://lh5.googleusercontent.com/--dLIyMePrVQ/AAAAAAAAAAI/AAAAAAAAAAA/r1hDhm0h4ys/photo.jpg'
}

const imposter2 = {
    user_id: 2,
    first_name:	'Amy',
    last_name: 'Knudson',
    address: null,	
    city: null,
    state: null,
    zip: null,
    phone: null,	
    email: 'amylknudson@hotmail.com',
    auth_id: 'facebook|10216629239983013'	,
    user_pic: 'https://platform-lookaside.fbsbx.com/platform/profilepic/?asid=10216629239983013&height=50&width=50&ext=1531518493&hash=AeSTgGr6sDj9FvvX'
}	


module.exports = {
    bypassAuthInDevelopment: (req, res, next) => {
        if(!req.session.user && process.env.MODE === 'development') {
            req.session.user = imposter
        }
        next()
    }
}