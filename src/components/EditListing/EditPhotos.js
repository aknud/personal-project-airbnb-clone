import React, { Component } from 'react';
import { connect } from 'react-redux';
import Dropzone from 'react-dropzone';
import { GridLoader } from 'react-spinners';
import axios from 'axios';

class EditPhotos extends Component {
    constructor(props){
        super(props)
        this.state = {
            isUploading: false
        }
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
				this.setState({ isUploading: false});
				this.props.getUrl(url)
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
    /////////////////////////////////////

    render(){
        console.log(55567, this.props.listings)
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
            </div>
        )
    }
}
const mapStateToProps = (state) => {
	return {
		user: state.user,
		listings: state.hostListings
	};
};

export default connect(mapStateToProps, {})(EditPhotos)