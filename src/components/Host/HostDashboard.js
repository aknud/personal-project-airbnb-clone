import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
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
				console.log(33333, this.props.listings);
			});
		}
	}

	logout = () => {
		axios.get(`/api/logout`).then((response) => {
			if (response.data) {
				this.props.history.push(`/login`);
			}
		});
	};

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
					<div className="host_listing" key={property.property_id}>
						<h3>{property.title}</h3>
						<img className="prop_img" src={property.img} alt="property" />
						<h5>{property.city}</h5>
						<h5>{property.state}</h5>
						<h5>{property.rent}</h5>
						<button onClick={() => this.deleteListing(property.property_id)}>delete</button>
						<Link to={`/hostdashboard/editlisting/${property.property_id}`}>
							<button>edit</button>
						</Link>
					</div>
				);
			});
		return (
			<div className="host_main">
				<div className="host_profile">
					<h1>Host Dashboard</h1> <h4>Hello, {user.first_name ? user.first_name : null}</h4>
					{user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
					<Link to="/newlisting">
						<button>Add New Listing</button>
					</Link>
					<Link to="/userdashboard">
						<button>Back to my trips</button>
					</Link>
					<button onClick={this.logout}>Logout</button>
				</div>
				<div className="host_listings_render">
					<h2>Your Listings</h2>
					<div>{userListings}</div>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		listings: state.hostListings
	};
};

export default connect(mapStateToProps, { getUserData, getHostListings, updateListing })(HostDashboard);
