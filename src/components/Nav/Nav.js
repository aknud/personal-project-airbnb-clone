import React from 'react';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { connect } from 'react-redux';
import { getUserData } from './../../ducks/reducer';
import './Nav.css';

export class Nav extends React.Component {
	
	componentDidMount() {
		axios.get('/api/user-data').then((res) => {
			this.props.getUserData(res.data);
		});
	}
	logout = () => {
		axios.get(`/api/logout`).then((response) => {
			if (response.data) {
				this.props.history.push(`/login`);
			}
		});
	};
	render() {
		let { user } = this.props;
		let home;
		let main;
		let login;
		let basicUser;
		let hostUser;
		let path = this.props.location.pathname;
		switch (path) {
			case '/':
				home = (
					<div className="nav_main">
						<Link to="/" className="logo_link">
							<i className="fas fa-globe-americas" />
						</Link>
						<div className="nav_links" id="signup">
							<Link to="/login">Sign up</Link>
						</div>
						<div className="nav_links" id="login">
							<Link to="/login">Log in</Link>
						</div>
					</div>
				);
				break;
			case '/login':
				login = (
					<div className="nav_main">
						<Link to="/" className="logo_link">
							<i className="fas fa-globe-americas" />
						</Link>
					</div>
				);

				break;
			case '/userdashboard':
				basicUser = (
					<div className="nav_main">
						<Link to="/" className="nav_logo_link">
							<i className="fas fa-globe-americas" />
						</Link>
						<div className="nav_links" id="nav_user_host">
							<Link to="/hostdashboard">
								Host
							</Link>
						</div>
						<div className="nav_links" id="nav_user_logout" onClick={this.logout}>
							Log out
						</div>
						<div className="nav_user_pic">
							{user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
						</div>
					</div>
				);
				break;
			case '/hostdashboard':
				hostUser = (
					<div className="nav_main">
						<Link to="/" className="nav_logo_link">
							<i className="fas fa-globe-americas" />
						</Link>
						<div id="nav_newListing" className="nav_links">
							<Link to="/newlisting">New Listing</Link>
						</div>
						<div id="nav_userdash" className="nav_links">
							<Link to="/userdashboard">Trips</Link>
						</div>
						<div id="nav_host_logout" className="nav_links" onClick={this.logout}>
							Log out
						</div>
						<div className="nav_user_pic">
							{user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
						</div>
					</div>
				);
				break;

			default:
				main = (
					<div className="nav_main">
						<Link to="/" className="nav_logo_link">
							<i className="fas fa-globe-americas" />
						</Link>
						<div className="nav_links" id="nav_user_host">
							<Link to="/hostdashboard">
								Host
							</Link>
						</div>
						<div className="nav_links" id="nav_user_logout" onClick={this.logout}>
							Log out
						</div>
						<div className="nav_user_pic">
							{user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
						</div>
					</div>
				);
				break;
		}
		return (
			<nav>
				{home}
				{login}
				{basicUser}
				{hostUser}
				{main}
			</nav>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { getUserData })(Nav);
