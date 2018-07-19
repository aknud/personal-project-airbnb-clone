import React, { Component } from 'react';
import './Home.css';
import Listings from '../Listings/Listings';
import { MapContainer } from '../MapContainer/MapContainer';
import { connect } from 'react-redux';
import {searchListings} from './../../ducks/reducer';


class Home extends Component {
  
  // searchHandler = (e) => {
  //   this.setState({
  //     search: e.target.val
  //   })
  // }
  // clearState = () => {
  //   this.setState({
  //     search: ''
  //   })
  // }

  render() {
    let {listings, search} = this.props;
    let results = listings.filter(listing => listing.state === search || listing.city === search)
    console.log(2222, results)
    return (
      <div className="Home">
        <div className="container">
          <h1>Stay like a local.</h1>
          <div className="search_bar">
            <input type="text" onChange={e => this.props.searchListings(e.target.value)}/>
            <button onClick={() => this.clearState()}>Search</button>
          </div>
        </div>
        <div className="display_listings">
          <Listings />
        </div>
        <div className="map_container">
          <MapContainer />
        </div>
      </div>
    );
  }
}
const mapStateToProps = (state) => {
  return {
    listings: state.listings,
    search: state.search
  }
}

export default connect(mapStateToProps, {searchListings})(Home);
