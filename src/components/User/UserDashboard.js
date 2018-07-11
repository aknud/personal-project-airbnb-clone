import React, { Component } from 'react';
import axios from 'axios';
import { getUserData } from './../../ducks/reducer';
import { connect } from 'react-redux';
import {Link} from 'react-router-dom';

class UserDashboard extends Component {
    componentDidMount() {
        axios.get('/api/user-data').then(res => {
            this.props.getUserData(res.data)
        })
    }

    render() {
        let { user } = this.props
        return (
            <div>
                <h4>Hello, {user.first_name ? user.first_name : null}</h4>
                {user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
                <Link to='/hostdashboard' ><button>Host</button></Link>
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
export default connect(mapStateToProps, { getUserData })(UserDashboard);