import React, { Component } from 'react';
import { connect } from 'react-redux';
import { Link } from 'react-router-dom';
import axios from 'axios';
import Nav from './../Nav/Nav';
import EditPhotos from './EditPhotos';
import { getUserData, updatePhotos, getHostListings, updateListing } from './../../ducks/reducer';

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
			rent: list[0] ? list[0].rent : '',
			url: []
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
				const { title, address, city, state, zip, img,url, rent } = list[0];
				this.setState({
					title,
					address,
					city,
					state,
					zip,
					img,
					url,
					rent
				});
			});
		}
	}

	handleSubmit = (e) => {
		e.preventDefault();
		const { address, city, state, zip, rent, title } = this.state;
		const property_id = this.props.match.params.id;
		let payload = { address, city, state, zip, rent, title };
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

	getUrl = (url) => {
		const param = this.props.match.params.id
		axios.post(`/api/addphoto/${param}`, {url})
		.then( photos => {
			this.props.updatePhotos(photos.data)
		})
		.catch( err => {
			console.log(err)
		})
	}

	render() {
		let { user } = this.props;
		return (
			<div className="EditListing_main">
			<Nav {...this.props}/>
				<h2>UPDATE YOUR LISTING</h2>
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
							value={this.state.rent}
							onChange={this.handleChange}
							placeholder="rent"
							name="rent"
						/>
						<EditPhotos getUrl={this.getUrl} id={+this.props.match.params.id}/>
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
		listings: state.host_listings
	};
};

export default connect(mapStateToProps, { getUserData, getHostListings, updateListing, updatePhotos })(EditListing);
