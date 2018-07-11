import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewListing extends Component {
    render() {
        return (
            <div>
                <h1>CREATE A NEW LISTING</h1>
            </div>
        )
    }
}
const mapStateToProps = (state) => {
    return {
        user: state.user
    }
}

export default connect(mapStateToProps, {})(NewListing);