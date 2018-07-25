import React, { Component } from 'react';
import { connect } from 'react-redux';
import axios from 'axios';
import Nav from './../Nav/Nav';
import { updateListing } from '../../ducks/reducer';
import { Link } from 'react-router-dom';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';

class NewListing extends Component {
	constructor() {
		super();
		this.state = {
			title: '',
			address: '',
			city: '',
			state: '',
			zip: '',
			img: '',
			rent: '',
			isUploading: false,
			url: ''
		};
	}
	//////// S3 //////////////
	uploadFile = (file, signedRequest, url) => {
		var options = {
			headers: {
				'Content-Type': file.type
			}
		};
		axios
			.put(signedRequest, file, options)
			.then((response) => {
				this.setState({ isUploading: false, url: url });
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getSignedRequest = (file) => {
		const fileName = 'ta1-' + file.name.replace(/\s/g, '-');
		axios
			.get('/sign-s3', {
				params: {
					'file-name': fileName,
					'file-type': file.type
				}
			})
			.then((response) => {
				const { signedRequest, url } = response.data;
				this.setState({ isUploading: true });
				this.uploadFile(file, signedRequest, url);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	addFile = ([ file ]) => {
		// const file = files[0]
		this.getSignedRequest(file);
	};

	handleSubmit = (e) => {
		e.preventDefault();
		const { title, address, city, state, zip, url, rent } = this.state;
		let payload = { title, address, city, state, zip, url, rent };
		axios
			.post('/api/new-property', payload)
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
		const { user } = this.props;
		return (
			<div>
				<Nav {...this.props} />
				<h4 style={{ paddingTop: '100px' }}>CREATE A NEW LISTING</h4>
				<div className="host_profile">
					<h4>Hello, {user.first_name ? user.first_name : null}</h4>
				</div>
				<div>
					<form onSubmit={this.handleSubmit}>
						<input
							type="text"
							value={this.state.title}
							onChange={this.handleChange}
							placeholder="title"
							name="title"
						/>
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
						{/* <input type="text" value={this.state.state} onChange={this.handleChange}
                            placeholder="state" name="state" /> */}
						<select name="state" size="1" onChange={this.handleChange}>
							<option value="NULL">SELECT STATE</option>
							<option value="Alabama">Alabama</option>
							<option value="Alaska">Alaska</option>
							<option value="Arizona">Arizona</option>
							<option value="Arkansas">Arkansas</option>
							<option value="California">California</option>
							<option value="Colorado">Colorado</option>
							<option value="Connecticut">Connecticut</option>
							<option value="Delaware">Delaware</option>
							<option value="District Of Columbia">District Of Columbia</option>
							<option value="Florida">Florida</option>
							<option value="Georgia">Georgia</option>
							<option value="Hawaii">Hawaii</option>
							<option value="Idaho">Idaho</option>
							<option value="Illinois">Illinois</option>
							<option value="Indiana">Indiana</option>
							<option value="Iowa">Iowa</option>
							<option value="Kansas">Kansas</option>
							<option value="Kentucky">Kentucky</option>
							<option value="Louisiana">Louisiana</option>
							<option value="Maine">Maine</option>
							<option value="Maryland">Maryland</option>
							<option value="Massachusetts">Massachusetts</option>
							<option value="Michigan">Michigan</option>
							<option value="Minnesota">Minnesota</option>
							<option value="Mississippi">Mississippi</option>
							<option value="Missouri">Missouri</option>
							<option value="Montana">Montana</option>
							<option value="Nebraska">Nebraska</option>
							<option value="Nevada">Nevada</option>
							<option value="New Hampshire">New Hampshire</option>
							<option value="New Jersey">New Jersey</option>
							<option value="New Mexico">New Mexico</option>
							<option value="New York">New York</option>
							<option value="North Carolina">North Carolina</option>
							<option value="North Dakota">North Dakota</option>
							<option value="Ohio">Ohio</option>
							<option value="Oklahoma">Oklahoma</option>
							<option value="Oregon">Oregon</option>
							<option value="Pennsylvania">Pennsylvania</option>
							<option value="Rhode Island">Rhode Island</option>
							<option value="South Carolina">South Carolina</option>
							<option value="South Dakota">South Dakota</option>
							<option value="Tennessee">Tennessee</option>
							<option value="Texas">Texas</option>
							<option value="Utah">Utah</option>
							<option value="Vermont">Vermont</option>
							<option value="Virginia">Virginia</option>
							<option value="Washington">Washington</option>
							<option value="West Virginia">West Virginia</option>
							<option value="Wisconsin">Wisconsin</option>
							<option value="Wyoming">Wyoming</option>
						</select>
						<input
							type="text"
							value={this.state.zip}
							onChange={this.handleChange}
							placeholder="zip"
							name="zip"
						/>
						{/* <input
							type="text"
							value={this.state.img}
							onChange={this.handleChange}
							placeholder="img"
							name="img"
						/> */}
						<input
							type="text"
							value={this.state.rent}
							onChange={this.handleChange}
							placeholder="rent"
							name="rent"
						/>
						<div className="dropzone">
							<Dropzone
								onDropAccepted={this.addFile}
								style={{
									position: 'relative',
									width: 200,
									height: 200,
									borderWidth: 7,
									borderColor: 'rgb(102, 102, 102)',
									borderStyle: 'dashed',
									borderRadius: 5,
									display: 'flex',
									justifyContent: 'center',
									alignItems: 'center',
									fontSize: 28
								}}
								accept="image/*"
								multiple={false}
							>
								{this.state.isUploading ? <GridLoader /> : <p>Drop File or Click Here</p>}
							</Dropzone>
						</div>

						<button type="submit">Submit</button>
					</form>

					<Link to="/hostdashboard">
						<button>Cancel</button>
					</Link>
				</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user
	};
};

export default connect(mapStateToProps, { updateListing })(NewListing);
