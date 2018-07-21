import React from 'react';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

export class SearchResults extends React.Component {
    render(){
        let { listings, search } = this.props;
		let lowerCaseSearch = search.toLowerCase();
		let results = listings.filter((listing) => listing.state.toLowerCase() === lowerCaseSearch || listing.city.toLowerCase() === lowerCaseSearch).map((property) => {
			return (
				<div key={property.property_id} className="property_container">
					<img style={{ height: '200px', width: '200px' }} src={property.img} alt="property" />
					<h4>{property.title}</h4>
					<h4>{property.city}</h4>
					<h4>{property.state}</h4>
					<h4>{property.rent}</h4>
					<Link to={`/selectedlisting/${property.property_id}`}><button>View Listing</button></Link>
				</div>
            );
        });
        return (
            <div className="searchResults_main">
                <h1>Search Results</h1>
                <div className="searchResults_listing_container">{results}</div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
	return {
		listings: state.listings,
		search: state.search
	};
};

export default connect(mapStateToProps, {})(SearchResults);
