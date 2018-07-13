import React from 'react';
import axios from 'axios';
import { connect } from 'react-redux';
import { getListings } from './../../ducks/reducer';
import { MapContainer } from '../MapContainer/MapContainer';

 export class Listings extends React.Component {

    componentDidMount = () => {
        axios.get(`/api/properties`).then(response =>
            this.props.getListings(response.data)
        ).catch(error => console.log('Oi! Somethings gone wrong!', error))
    }

    render() {
        console.log(77777, this.props.listings)
        let properties = this.props.listings.map(property => {
            return (
                <div key={property.property_id} >
                    <img src={property.img} alt="" />
                    <h4>{property.city}</h4>
                    <h4>{property.state}</h4>
                    <h4>{property.rent}</h4>
                </div>
            )
        })
        return (
            <div>
                <h1>Listings</h1>
                <div>{properties}</div>
                <div className="map_container">
                <MapContainer />
                </div>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        listings: state.listings
    }
}

export default connect(mapStateToProps, { getListings })(Listings);