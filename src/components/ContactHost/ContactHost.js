import React, { Component } from 'react';
import { connect } from 'react-redux';


class ContactHost extends Component {
    
    render(){
        console.log(666, this.props.id)
        const {id} = this.props;
        let hostInfo = id.filter(id => id[0] === +this.props.match.params.id).map(host => {
            return (
                <div className="contactHost_info" key={host.user_id}>
                <img src={host.img} alt="host"/>
                <h4>{host.first_name} {host.last_name}</h4>
                <h4>{host.email}</h4>
                </div>
            )
        })
        return (
            <div className="contact_host_main">
                <h1>Host Info</h1>
                {hostInfo}
                {/* <h4>{user.first_name } {user.last_name}</h4>
                <img src={user.user_pic} alt="host"/>
                <h4>{user.email}</h4> */}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        id: state.host_id
    }
}

export default connect(mapStateToProps, {})(ContactHost)