import React from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { getListings } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import './Listings.css';

export class Listings extends React.Component {
	componentDidMount = () => {
		axios
			.get(`/api/properties`)
			.then((response) => this.props.getListings(response.data))
			.catch((error) => console.log('Oi! Somethings gone wrong!', error));
	};

	render() {
		let { listings } = this.props;

		let properties = listings.map((property) => {
			return (
				<div key={property.property_id + ' ' + Math.random()} className="listing_property_container">
					<img src={property.img} alt="property" />
					<div className="listing_info">
						<h4>{property.title}</h4>
						<h4>{property.city}</h4>
						<h4>{property.state}</h4>
						<h4>${property.rent} per night</h4>
						<Link to={`/selectedlisting/${property.property_id}`}>
							View Listing
						</Link>
					</div>
				</div>
			);
		});
		return (
			<div className="listings_main">
				<h1>Browse Listings</h1>
				<div className="listing_container">{properties}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		listings: state.listings
	};
};

export default connect(mapStateToProps, { getListings })(Listings);
