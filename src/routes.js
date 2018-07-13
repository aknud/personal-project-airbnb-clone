import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import UserDashboard from './components/User/UserDashboard';
import NewListing from './components/NewListing';
import HostDashboard from './components/Host/HostDashboard';
import Home from './components/Home.js/Home';

export default (
    <Switch>
        <Route path='/login' component={Login} />
        <Route path='/userdashboard' component={UserDashboard} />
        <Route path='/newlisting' component={NewListing} />
        <Route path='/hostdashboard' component={HostDashboard} />
        <Route path='/hostdashboard/newlisting' component={NewListing} />
        <Route path='/' component={Home}/>
    </Switch>
)