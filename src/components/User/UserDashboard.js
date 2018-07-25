import React, { Component } from 'react';
import axios from 'axios';
import { getUserData } from '../../ducks/reducer';
import { connect } from 'react-redux';
import Nav from './../Nav/Nav';
import './UserDashboard.css';

class UserDashboard extends Component {
	
	componentDidMount() {
		axios.get('/api/user-data').then((res) => {
			this.props.getUserData(res.data);
		});
	}
	// logout = () => {
	// 	axios.get(`/api/logout`).then((response) => {
	// 		if (response.data) {
	// 			this.props.history.push(`/login`);
	// 		}
	// 	});
	// }

	render() {
		let { user } = this.props;
		return (
			<div>
				<Nav {...this.props} />
				<div className="user_profile">
					<h4>Hello, {user.first_name ? user.first_name : null}</h4>
					
					{/* <button onClick={this.logout}>Logout</button> */}
					<h3>Upcoming trips</h3>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};
export default connect(mapStateToProps, { getUserData })(UserDashboard);
