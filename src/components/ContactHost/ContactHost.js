import React, { Component } from 'react';
import { connect } from 'react-redux';


class ContactHost extends Component {
    render(){
        let {hostData} = this.props;
        const id = this.props.match.params.id;
        let hostInfo = hostData.filter(item => item.property_id === +id).map(host => {
            return (
                <div key={host.property_id + ' ' + Math.random()}>
                    <h2>{host.first_name} {host.last_name}</h2>
                    <h3>{host.email}</h3>
                    <img src={host.user_pic} alt=""/>
                </div>
            )
        })
        return (
            <div className="contact_host_main">
                <h1>Host Info</h1>
                <hr/>
                {hostInfo}
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        hostData: state.all_user_data
    }
}

export default connect(mapStateToProps, {})(ContactHost)