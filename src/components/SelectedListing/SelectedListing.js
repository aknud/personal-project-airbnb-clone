import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getHostData } from './../../ducks/reducer';
import './SelectedListing.css';

export class SelectedListing extends React.Component {
	constructor() {
		super();
		this.state = {
			photos: []
		};
	}

	loginUser(id) {
		axios.get('/api/checkloginstatus').then(() => {
			console.log(777, id);
			this.props.getHostData(id);
			this.props.history.push(`/contacthost/${id}`);
		});
	}

	getPhotos = (id) => {
		axios.get(`/api/all-photos/${id}`).then((res) => {
			this.setState({
				photos: res.data
			});
		});
	};

	render() {
		console.log(44444, this.state.photos);
		const { listings } = this.props;
		let selectedListing = listings
			.filter((listing) => listing.property_id === +this.props.match.params.id)
			.map((property) => {
				return (
					<div key={property.property_id} className="selectedListing_container">
						<img src={property.img} alt={property.title} />
						<h4>{property.title}</h4>
						<h4>{property.city}</h4>
						<h4>{property.state}</h4>
						<h4>${property.rent} per night</h4>
						<button onClick={() => this.getPhotos(property.property_id)}>View Photos</button>
						<button onClick={() => this.loginUser(property.user_id)}>Contact Host</button>
					</div>
				);
            });
        let pictures = this.state.photos.map(photo => {
            return (
                <div className="photo">
                <img src={photo.url} alt=""/>
                </div>
            )
        })
		return <div className="selectedListing_main">{selectedListing}{pictures}</div>;
	}
}
const mapStateToProps = (state) => {
	return {
		listings: state.listings
	};
};

export default connect(mapStateToProps, { getHostData })(SelectedListing);
