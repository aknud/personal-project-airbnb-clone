import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import { updateListing } from './../../ducks/reducer';


class NewListing extends Component {
    constructor() {
        super()
        this.state = {
            title: '',
            address: '',
            city: '',
            state: '',
            zip: '',
            img: '',
            rent: ''
        }
    }

    handleSubmit = (e) => {
        e.preventDefault()
        const { title, address, city, state, zip, img, rent } = this.state;
        let payload = { title, address, city, state, zip, img, rent }
        axios.post('/api/new-property', payload).then(res => {
            this.props.updateListing(res.data)
            this.props.history.push(`/hostdashboard`)
        })
        .catch( err => console.log(err))
    }

    handleChange = (e) => {
        this.setState({
            [e.target.name]: e.target.value,

        })
    }

    render() {
        return (
            <div>
                <h4>CREATE A NEW LISTING</h4>
                <div style={{ paddingTop: '500px' }} >
                    <form onSubmit={this.handleSubmit}>
                        <input type="text" value={this.state.title} onChange={this.handleChange}
                            placeholder="title" name="title" />
                        <input type="text" value={this.state.address} onChange={this.handleChange} placeholder="address" name="address" />
                        <input type="text" value={this.state.city} onChange={this.handleChange}
                            placeholder="city" name="city" />
                        <input type="text" value={this.state.state} onChange={this.handleChange}
                            placeholder="state" name="state" />
                        <input type="text" value={this.state.zip} onChange={this.handleChange}
                            placeholder="zip" name="zip" />
                        <input type="text" value={this.state.img} onChange={this.handleChange}
                            placeholder="img" name="img" />
                        <input type="text" value={this.state.rent} onChange={this.handleChange}
                            placeholder="rent" name="rent" />

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

export default connect(mapStateToProps, { updateListing })(NewListing);