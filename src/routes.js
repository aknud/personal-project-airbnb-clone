import React from 'react';
import {Switch, Route} from 'react-router-dom';
import Login from './components/Login/Login';
import UserDashboard from './components/User/UserDashboard';
import NewListing from './components/NewListings/NewListing';
import HostDashboard from './components/Host/HostDashboard';
import Home from './components/Home.js/Home';
import EditListing from './components/EditListing/EditListing';
import Admin from './components/Admin/Admin';
import SearchResults from './components/SearchResults/SearchResults';
import SelectedListing from './components/SelectedListing/SelectedListing';
import ContactHost from './components/ContactHost/ContactHost';

export default (
    <Switch>
        <Route path='/login' component={Login} />
        <Route path='/searchresults' component={SearchResults}/>
        <Route path='/userdashboard' component={UserDashboard} />
        <Route path='/selectedlisting/:id' component={SelectedListing} />
        <Route path='/contacthost/:id' component={ContactHost} />
        <Route path='/hostdashboard/editlisting/:id' component={EditListing} />
        <Route path='/hostdashboard' component={HostDashboard} />
        <Route path='/newlisting' component={NewListing} />
        <Route path='/admin' component={Admin} />
        <Route path='/' component={Home}/>
    </Switch>
)