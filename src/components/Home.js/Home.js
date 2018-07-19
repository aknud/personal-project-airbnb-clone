import React, { Component } from 'react';
import './Home.css';
import Listings from '../Listings/Listings';
import { MapContainer } from '../MapContainer/MapContainer';


class Home extends Component {
  constructor() {
    super();

    this.state = {
      search: ''
    }
  }

  searchHandler = (val) => {
    this.setState({
      search: val
    })
  }
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
            <input type="text" onChange={e => this.searchHandler(e.target.value)}
              value={this.state.search} />
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

export default Home;
