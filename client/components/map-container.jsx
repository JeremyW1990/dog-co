import React from 'react';
import {Map, GoogleApiWrapper , Polyline, Marker, Polygon} from 'google-maps-react';

export class MapContainer extends React.Component {

  
  render() {

    console.log(this.props.geoLocationStream)
    const coords = {lat: 33.635094, lng: -117.740171};
    const path = [...this.props.geoLocationStream] ;
    return(
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
    )
  }

      
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCqU7RLou2rpqoEGgm--c_KSx3l1DAloMU"
})(MapContainer)