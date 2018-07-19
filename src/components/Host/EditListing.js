import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import { getUserData, getHostListings, updateListing } from '../../ducks/reducer';

class EditListing extends Component {
	constructor(props) {
		super(props);
		let list = this.props.listings.filter((property) => {
			return property.property_id === +this.props.match.params.id;
		});
		this.state = {
			title: list[0] ? list[0].title : '',
			address: list[0] ? list[0].address : '',
			city: list[0] ? list[0].city : '',
			state: list[0] ? list[0].state : '',
			zip: list[0] ? list[0].zip : '',
			img: list[0] ? list[0].img : '',
			rent: list[0] ? list[0].rent : ''
		};
	}

	componentDidMount() {
		if (!this.props.user.user_id) {
			axios.get('/api/user-data').then((res) => {
				this.props.getUserData(res.data);
			});
		}
		if (this.props.listings.length === 0) {
			axios.get('/api/my-properties').then((res) => {
				this.props.getHostListings(res.data);
				let list = this.props.listings.filter((property) => {
					return property.property_id === +this.props.match.params.id;
				});
				const { title, address, city, state, zip, img, rent } = list[0];
				this.setState({
					title,
					address,
					city,
					state,
					zip,
					img,
					rent
				});
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { address, city, state, zip, img, rent, title } = this.state;
		const property_id = this.props.match.params.id;
		let payload = { address, city, state, zip, img, rent, title };
		axios
			.put(`/api/update-property/${property_id}`, payload)
			.then((res) => {
				this.props.updateListing(res.data);
				this.props.history.push(`/hostdashboard`);
			})
			.catch((err) => console.log(err));
	};

	handleChange = (e) => {
		this.setState({
			[e.target.name]: e.target.value
		});
	};

	render() {
		let { user } = this.props;
		return (
			<div style={{ paddingTop: '500px' }}>
				<div>
					<h1>Host Dashboard</h1>
					<h4>Hello, {user.first_name ? user.first_name : null}</h4>
					{user.user_pic ? <img className="avatar" src={user.user_pic} alt="user" /> : null}
				</div>
				<h4>UPDATE YOUR LISTING</h4>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input type="text" value={this.state.title} onChange={this.handleChange} name="title" />
						<input
							type="text"
							value={this.state.address}
							onChange={this.handleChange}
							placeholder="address"
							name="address"
						/>
						<input
							type="text"
							value={this.state.city}
							onChange={this.handleChange}
							placeholder="city"
							name="city"
						/>
						<input
							type="text"
							value={this.state.state}
							onChange={this.handleChange}
							placeholder="state"
							name="state"
						/>
						<input
							type="text"
							value={this.state.zip}
							onChange={this.handleChange}
							placeholder="zip"
							name="zip"
						/>
						<input
							type="text"
							value={this.state.img}
							onChange={this.handleChange}
							placeholder="img"
							name="img"
						/>
						<input
							type="text"
							value={this.state.rent}
							onChange={this.handleChange}
							placeholder="rent"
							name="rent"
						/>
						<button type="submit">Submit</button>
						<Link to="/hostdashboard">
							<button>Cancel</button>
						</Link>
					</form>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		listings: state.hostListings
	};
};

export default connect(mapStateToProps, { getUserData, getHostListings, updateListing })(EditListing);
