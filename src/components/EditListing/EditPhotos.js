import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import axios from 'axios';
import { getPhotos, updatePhotos } from './../../ducks/reducer';

class EditPhotos extends Component {
	constructor(props) {
		super(props);
		this.state = {
			isUploading: false
		};
	}
	componentDidMount = () => {
		axios.get('/api/all-photos').then((res) => {
			this.props.getPhotos(res.data);
		});
	};
	deletePhoto = (id) => {
		axios.delete(`/api/delete-photo/${id}`).then(res =>{
			this.props.updatePhotos(res.data)
			console.log('this is the new list of photos after delete', res.data)
		})
		.catch( err => {
			console.log(err)
		})
	}

	///////////////// S3 //////////////////
	uploadFile = (file, signedRequest, url) => {
		var options = {
			headers: {
				'Content-Type': file.type
			}
		};
		axios
			.put(signedRequest, file, options)
			.then((response) => {
				this.setState({ isUploading: false });
				this.props.getUrl(url);
			})
			.catch((err) => {
				console.log(err);
			});
	};

	getSignedRequest = (file) => {
		const fileName = 'ak1-' + file.name.replace(/\s/g, '-');
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
	/////////////////////////////////////

	render() {
		let { photos, id } = this.props;
		let photo = photos.filter((picture) => picture.property_id === id).map((pic) => {
			return (
				<div className="host_listing_photos" key={pic.photo_id}>
					<img src={pic.url} alt="" />
					<button onClick={()=>this.deletePhoto(pic.photo_id)}>delete</button>
				</div>
			);
		});
		return (
			<div className="EditPhoto_main">
				<h2>Add/Delete Photos</h2>
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
				<div className="editPhotos_photos">{photo}</div>
			</div>
		);
	}
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		listings: state.host_listings,
		photos: state.photos
	};
};

export default connect(mapStateToProps, { getPhotos, updatePhotos })(EditPhotos);
