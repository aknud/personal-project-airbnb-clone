import React, { Component } from 'react';
import axios from 'axios';
import { getUserData } from './../../ducks/reducer';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';
// import Listings  from './../Listings/Listings';
import {getUserListings} from './../../ducks/reducer';

class HostDashboard extends Component {
    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
        })
        axios.get('api/properties').then(res => {
            this.props.getUserListings(res.data)
        })
        
    }
    logout(){
        axios.get(`/api/logout`)
    }
    

    render() {
        let {user, listings} = this.props;
        console.log(6666, this.props.listings);
        let userListings = listings.filter(listing => {
            return (listing.user_id === 1);
        }).map(property => {
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
                <h1>Host Dashboard</h1> <h4>Hello, {user.first_name ? user.first_name : null}</h4>
                {user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
                <h2>Your Listings</h2>
                <div>{userListings}</div>
                <Link to='/hostdashboard/newlisting'><button>Add New Listing</button></Link>
                    <button onClick={this.logout}>Logout</button>
                    
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user,
        listings: state.listings
    }
}

export default connect(mapStateToProps, {getUserData, getUserListings})(HostDashboard);