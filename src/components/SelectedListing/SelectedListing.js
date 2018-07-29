import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHostData, savedListings, getPhotos, getListings } from './../../ducks/reducer';
import './SelectedListing.css';

export class SelectedListing extends React.Component {
	// TODO:
	// FIXME:photos are not rendering
	// NOTE: remember dlog
	componentDidMount() {
		if (this.props.pics.length === 0) {
			axios.get(`/api/all-photos`).then((res) => {
				this.props.getPhotos(res.data);
			});
		}
		if (this.props.listings.length === 0) {
			axios.get('/api/properties').then((res) => {
				this.props.getListings(res.data);
			});
		}
	}

	saveListing = (property_id, host_id) => {
		axios.post(`/api/save-listing/${property_id}`, { host_id }).then((res) => {
			this.props.savedListings(res.data);
		});
	};

	render() {
		const { listings, user, pics } = this.props;
		const id = this.props.match.params.id;
		let selectedListing = listings
			.filter((listing) => listing.property_id === +id)
			.map((property) => {
				return (
					<div key={property.property_id + Math.random()} className="selectedListing_container">
						<img src={property.img} alt={property.title} />
						<h4>{property.title}</h4>
						<h4>{property.city}</h4>
						<h4>{property.state}</h4>
						<h4>${property.rent} per night</h4>
						<Link to="/">
							<button>Back to Listings</button>
						</Link>
						{user.user_id && <button>Contact Host</button>}
						{user.user_id && (
							<Link to="/userdashboard">
								<button onClick={() => this.saveListing(property.property_id, property.user_id)}>
									Add to My List
								</button>
							</Link>
						)}
					</div>
				);
			});
			let listingPhotos = pics.filter(photo => photo.property_id === +id).map(photo => {
				return (
				<div key={photo.photo_id} className="SL_photo">
				 <img src={photo.url} alt=""/>
				</div>
				)
			})
		return (
			<div className="selectedListing_main">
				{selectedListing}
				<h3>Photos</h3>
				<div className="photo_div">
				{listingPhotos}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		listings: state.listings,
		pics: state.photos,
		user: state.user
	};
};

export default connect(mapStateToProps, { getHostData, savedListings, getPhotos, getListings })(SelectedListing);
