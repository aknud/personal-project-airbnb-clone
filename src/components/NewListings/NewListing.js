import React, { Component } from 'react';
import { connect } from 'react-redux';

class NewListing extends Component {
    constructor() {
        super()
        this.state = {
            input: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()

    }

    handleChange = (e) => {
        this.setState({
            input: e.target.value
        })
    }

    render() {
        return (
            <div>
                <h4>CREATE A NEW LISTING</h4>
                <div style={{paddingTop: '500px'}} >
                    <form onSubmit={ this.handleSubmit }>
                    <input type="text" value={this.state.input} onChange={ this.handleChange }/>
                    
                    <button type='submit'>Submit</button>

                    </form>
                </div>
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