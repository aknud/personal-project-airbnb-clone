import React, { Component } from 'react';
import Nav from './components/Nav/Nav';
import './App.css';
import routes from './routes';

class App extends Component {

  render() {
    // let authenticatedRoutes;
    // if(this.props.isLoggedin){
    //   authenticatedRoutes =  AuthenticatedRoutes
    // }
    return (
      <div className="App">
        <Nav />
        {/* {authenticatedRoutes} */}
        {routes}

        
      </div>
    );
  }
}

export default App;
