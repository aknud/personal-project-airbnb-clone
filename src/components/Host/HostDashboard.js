import React, { Component } from 'react';
import axios from 'axios';
import { getUserData } from './../../ducks/reducer';
import {Link} from 'react-router-dom';
import { connect } from 'react-redux';

class HostDashboard extends Component {
    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
        })
    }

    render() {
        let {user} = this.props;
        return (
            <div>
                <h1>Host Dashboard</h1> <h4>Hello, {user.first_name ? user.first_name : null}</h4>
                {user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
                <h2>Your Listings</h2>
                <Link to='/hostdashboard/newlisting'><button>Add New Listing</button></Link>
                <a href="http://localhost:3005/api/logout">
                    <button>Logout</button></a>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {getUserData})(HostDashboard);