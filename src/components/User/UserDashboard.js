import React, { Component } from 'react';
import axios from 'axios';
import { getUserData } from '../../ducks/reducer';
import { connect } from 'react-redux';
import Listings from './../Listings/Listings';
import Nav from './../Nav/Nav';
import './UserDashboard.css';

class UserDashboard extends Component {
	// constructor(){
	// 	super()
	// 	this.state = {
	// 		savedListings: []
	// 	}
	// }

	componentDidMount() {
		axios.get('/api/user-data').then((res) => {
			this.props.getUserData(res.data);
		});
	}

	// saveListings = (id) => {
	// 	let saved = this.props.listings.filter(listing => listing.property_id === id)
	// 	this.setState({
	// 		savedListings: saved
	// 	})
	// }

	render() {
		let { user, saved } = this.props;
		console.log('listing saved on reducer', saved);
		let mylist = saved.map((listing) => {
			return (
				<div key={listing.property_id} style={{width: "200px", height: "200px", border: "1px solid black"}}>
					<img src={listing.img} alt={listing.title} />
					<h4>{listing.title}</h4>
				</div>
			);
		});
		return (
			<div>
				<Nav {...this.props} />
				<div className="user_profile">
					<h4>Hello, {user.first_name ? user.first_name : null}</h4>

					<h3>Upcoming trips</h3>
					<div className="user_saved_listings">{mylist}</div>
				</div>
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
export default connect(mapStateToProps, { getUserData })(UserDashboard);
