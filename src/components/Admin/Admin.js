import React, { Component } from 'react';
import { connect } from 'react-redux';
import { getAllUserData } from './../../ducks/reducer';
import axios from 'axios';
import './Admin.css'

class Admin extends Component {
    
    componentDidMount(){
        axios.get('/api/all-user-data').then(res => {
            this.props.getAllUserData(res.data)
            console.log(88888, res.data);
            console.log(5555, this.props.userData);
        })
    }

        render() {
            let {userData: user} = this.props;
            let userInfo = user.map(user => {
                return (
                    <div className="admin_user" key={user.property_id}>
                        <h4>{user.first_name} {user.last_name}</h4>
                        <img src={user.user_pic} alt="user" />
                        <h4>User ID: {user.user_id}</h4>
                        <h4>{user.email}</h4>
                        <h4>Listing Title: {user.title}</h4>
                        <img src={user.img} alt="listing" />
                        <h4>Listing Address: {user.address} {user.city}, {user.state} {user.zip}</h4>
                        <h4>Listing ID: {user.property_id}</h4>
                    </div>
                )
            })
            return (
                <div className="admin_main">
                    <h1>All Users</h1>
                    <div className="admin_user_container" >
                        {userInfo}
                    </div>
                </div>
            )
        }
    }
const mapStateToProps = (state) => {
    return {
        userData: state.allUserData
    }
}

export default connect(mapStateToProps, {getAllUserData})(Admin);