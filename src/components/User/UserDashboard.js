import React, { Component } from 'react';
import axios from 'axios';
import { getUserData, savedListings } from '../../ducks/reducer';
import { connect } from 'react-redux';
import Listings from './../Listings/Listings';
import Nav from './../Nav/Nav';
import './UserDashboard.css';

class UserDashboard extends Component {

	componentDidMount() {
		axios.get('/api/user-data').then((res) => {
			this.props.getUserData(res.data);
			console.log(5555, this.props.saved)
		});
		axios.get('/api/get-saved-listings').then(listings => {
			this.props.savedListings(listings.data)
		})
	}
	render() {
		let { user, saved } = this.props;

		let mylist = saved.filter(listings => {
			return listings.user_id === user.user_id
		}).map((listing) => {
			return (
				<div key={listing.property_id} className="user_saved_listings">
					<img src={listing.img} alt={listing.title} />
					<h4>{listing.title}</h4>
				</div>
			);
		});
		return (
			<div className="userDashboard">
				<Nav {...this.props} />
				<div className="user_profile">
					<h3>Hello, {user.first_name ? user.first_name : null}</h3>

					<h3>Upcoming trips</h3>
					<div className="saved_listings">{mylist}</div>
				</div>
				<hr/>
				<div>
					<Listings />
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		listings: state.listings,
		saved: state.saved_listings
	};
};
export default connect(mapStateToProps, { getUserData, savedListings })(UserDashboard);
