import React, { Component } from 'react';
import './Home.css';


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
      </div>
    );
  }
}

export default Home;
