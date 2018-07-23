import React from 'react';
import './Login.css';


export default function Login(props){

    function login (){
        let {REACT_APP_DOMAIN, REACT_APP_CLIENT_ID} = process.env;
        let redirectUri = encodeURIComponent(`http://localhost:3018/auth/callback`);

        window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
    }


 return (
     <div className="login_main">
         <h1>Login Page</h1>
         <button className="login" onClick={login}>Login</button>
         <button className="login" onClick={login}>Sign Up</button>
     </div>
 )   
}