import React from 'react';
import {Switch, Route} from 'react-router-dom';
import App from './App';
import Login from './Login/Login';
import UserDashboard from './User/UserDashboard';

export default (
    <Switch>
        <Route path='/login' component={Login} />
        <Route path='/userdashboard' component={UserDashboard} />
        <Route path='/' component={App} exact/>
    </Switch>
)