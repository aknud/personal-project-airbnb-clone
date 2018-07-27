import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import { getHostData, savedListings, getPhotos, getListings } from './../../ducks/reducer';
import './SelectedListing.css';

export class SelectedListing extends React.Component {
	// TODO:
	// FIXME:
	// NOTE:
	constructor() {
		console.log('this',this)
		super();
		this.state = {
			photos: []
		};
	}
	componentDidMount(){
		if(this.props.pics.length === 0){
			axios.get(`/api/all-photos`).then((res) => {
				this.props.getPhotos(res.data)
			});
		}
		if (this.props.listings.length === 0) {
			axios.get('/api/properties').then((res) => {
				this.props.getListings(res.data);
			});
		}
	}
	// loginUser(id) {
	// 	axios.get('/api/checkloginstatus').then(() => {
	// 		this.props.getHostData(id);
	// 		this.props.history.push(`/contacthost/${id}`);
	// 	});
	// }

	getListingPhotos = (id) => {
		axios.get(`/api/photos-by-id/${id}`).then((res) => {
			this.setState({
				photos: res.data
			});
		});
	};
	saveListing = (id) => {
		axios.post(`/api/saved-listing/${id}`).then((res) => {
			this.props.savedListings(res.data)
		});
	};

	render() {
		console.log('photos belonging to this listing:', this.state.photos);
		console.log('listings from state', this.props.listings)
		const { listings, user } = this.props;
		let selectedListing = listings
			.filter((listing) => listing.property_id === +this.props.match.params.id)
			.map((property) => {
				console.log('property going to reducer', property);
				console.log('user data', user);
				return (
					<div key={property.property_id + Math.random()} className="selectedListing_container">
						<img src={property.img} alt={property.title} />
						<h4>{property.title}</h4>
						<h4>{property.city}</h4>
						<h4>{property.state}</h4>
						<h4>${property.rent} per night</h4>
						<button onClick={() => this.getListingPhotos(property.property_id)}>View Photos</button>
						<Link to='/'><button>Back to Listings</button></Link>
						{this.props.user.user_id && (
							<button >Contact Host</button>
						)}
						{this.props.user.user_id && (
							<Link to="/userdashboard">
								<button onClick={() => this.saveListing(property.property_id)}>Add to My List</button>
							</Link>
						)}
					</div>
				);
			});
		let pictures = this.state.photos.map((photo) => {
			return (
				<div style={{ width: '200px', height: '200px' }} className="SL_photo" key={photo.photo_id}>
					<img src={photo.url} alt="" />
				</div>
			);
		});
		console.log(999, pictures)
		return (
			<div className="selectedListing_main">
				{selectedListing}
				{pictures}
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
