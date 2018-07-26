import React from 'react';
import './Login.css';
import Nav from './../Nav/Nav';
import { connect } from 'react-redux';


 export class Login extends React.Component {


	login = () => {
		let { REACT_APP_DOMAIN, REACT_APP_CLIENT_ID } = process.env;
		let redirectUri = encodeURIComponent(`${window.origin}/auth/callback`);

		window.location = `https://${REACT_APP_DOMAIN}/authorize?client_id=${REACT_APP_CLIENT_ID}&scope=openid%20profile%20email&redirect_uri=${redirectUri}&response_type=code`;
	}
    render(){
        return (
		<div className="login_main">
			<Nav {...this.props} />
			<h1>Login Page</h1>
			<button className="login" onClick={this.login}>
				Login
			</button>
			<button className="login" onClick={this.login}>
				Sign Up
			</button>
		</div>
	);
    }
	
}
export default connect(null, {})(Login)