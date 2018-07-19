import React, { Component } from 'react';
import './Home.css';
import Listings from '../Listings/Listings';
import { Link } from 'react-router-dom';
// import { MapContainer } from '../MapContainer/MapContainer';
import { connect } from 'react-redux';
import {searchListings} from '../../ducks/reducer';


class Home extends Component {
  
  // searchHandler = (e) => {
  //   this.setState({
  //     search: e.target.val
  //   })
  // }
  clearState = () => {
    this.setState({
      search: ''
    })
  }

  render() {
    return (
      <div className="Home">
        <div className="container">
          <h1>Stay like a local.</h1>
          <div className="search_bar">
            <input type="text" onChange={e => this.props.searchListings(e.target.value)}/>
            <Link to='/searchresults'><button>Search</button></Link>
          </div>
        </div>
        <div className="home_display_listings">
          <Listings />
        </div>
        {/* <div className="map_container">
          <MapContainer />
        </div> */}
      </div>
    );
  }
}


export default connect(null, {searchListings})(Home);
