import React from 'react';
import {Map, GoogleApiWrapper, Polyline} from 'google-maps-react';

import '../css/map-container.css'

export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

  }
  
  render() {

    let renderComponent = null;
    if ( this.props.geoLocationStream.length === 0) {
      renderComponent = <div>Loading...</div>
    } 
    else {
      console.log("Map-container, Path to be drawed: " , this.props.geoLocationStream);
      const coords = {lat: this.props.geoLocationStream[0].lat, lng: this.props.geoLocationStream[0].lng};
      renderComponent = 
        <Map 
          initialCenter={coords}
          google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}>
          <Polyline
            path={this.props.geoLocationStream}
            strokeColor="#0000FF"
            strokeOpacity={0.8}
            strokeWeight={2} />
        </Map>
      
    }
    return (renderComponent)
    
  }

      
}



export default GoogleApiWrapper({
  apiKey: "AIzaSyCqU7RLou2rpqoEGgm--c_KSx3l1DAloMU"
})(MapContainer)