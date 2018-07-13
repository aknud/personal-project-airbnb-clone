import React from 'react';
import {Map, GoogleApiWrapper} from 'google-maps-react';

export class MapContainer extends React.Component {
    render(){
        return (
            <Map google={this.props.google} zoom={14} />
        )
    }
}

export default GoogleApiWrapper({
    apiKey: (process.env.GOOGLE_KEY)
})(MapContainer)
