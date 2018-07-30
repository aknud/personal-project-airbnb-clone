import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import Nav from './../Nav/Nav';
import axios from 'axios';
import { getUserData, getHostListings, updateListing } from '../../ducks/reducer';
import './HostDashboard.css';

class HostDashboard extends Component {
	componentDidMount() {
		if (!this.props.user.user_id) {
			axios.get('/api/user-data').then((res) => {
				this.props.getUserData(res.data);
			});
		}
		if (this.props.listings.length === 0) {
			axios.get('/api/my-properties').then((res) => {
				this.props.getHostListings(res.data);
			});
		}
	}

	deleteListing = (id) => {
		axios.delete(`/api/delete-property/${id}`).then((res) => {
			this.props.updateListing(res.data);
		});
	};

	render() {
		let { user, listings } = this.props;
		let userListings = listings
		.filter((listing) => {
			return listing.user_id;
		})
		.map((property) => {
			return (
					<div className="host_listing" key={property.property_id + ' ' + Math.random()}>
						<h3>{property.title}</h3>
						<img className="prop_img" src={property.img} alt={property.title} />
						<h5>{property.address}</h5>
						<h5>{property.city}</h5>
						<h5>{property.state}</h5>
						<h5>${property.rent} per night</h5>
						<button onClick={() => this.deleteListing(property.property_id)}>delete</button>
						<Link to={`/hostdashboard/editlisting/${property.property_id}`}>
							<button>edit</button>
						</Link>
					</div>
				);
			});
		return (
			<div className="host_main">
			<Nav {...this.props}/>
				<div className="host_profile">
					<h2>Host Dashboard</h2> <h3>Hello, {user.first_name ? user.first_name : null}</h3>
				</div>
				<div className="host_listings_main">
					<h3>Your Listings</h3>
					<div className="host_listings_container">{userListings}</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		listings: state.host_listings,
	};
};

export default connect(mapStateToProps, { getUserData, getHostListings, updateListing })(HostDashboard);
