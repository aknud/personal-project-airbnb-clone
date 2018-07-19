import React from 'react';
import { connect } from 'react-redux';
import './SelectedListing.css';

export class SelectedListing extends React.Component {

    render(){
        console.log(this.props)
        const {listings} = this.props;
        console.log(this.props.listings)
        let selectedListing = listings.filter(listing => listing.property_id === +this.props.match.params.id).map((property) => {
			return (
				<div key={property.property_id} className="selectedListing_container">
					<img src={property.img} alt={property.title} />
					<h4>{property.title}</h4>
					<h4>{property.city}</h4>
					<h4>{property.state}</h4>
					<h4>${property.rent} per night</h4>
				</div>
                 );
                });
        return (
            <div className="selectedListing_main">
                {selectedListing}
                
            </div>
        )
    }
}
const mapStateToProps = (state) => {
	return {
		listings: state.listings
	};
};

export default connect(mapStateToProps, {})(SelectedListing);