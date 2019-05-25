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

//   render() {
//     return (
//       <Map google={this.props.google}
//     style={{width: '100%', height: '100%', position: 'relative'}}
//     className={'map'}
//     zoom={14}>
//   <Marker
//     title={'The marker`s title will appear as a tooltip.'}
//     name={'SOMA'}
//     position={{lat: 37.778519, lng: -122.405640}} />
//   <Marker
//     name={'Dolores park'}
//     position={{lat: 37.759703, lng: -122.428093}} />
//   <Marker />
//   <Marker
//     name={'Your position'}
//     position={{lat: 37.762391, lng: -122.439192}}
//     icon={{
//       url: "/path/to/custom_icon.png",
//       anchor: new google.maps.Point(32,32),
//       scaledSize: new google.maps.Size(64,64)
//     }} />
// </Map>
//     )
//   }
      
}

export default GoogleApiWrapper({
  apiKey: "AIzaSyCqU7RLou2rpqoEGgm--c_KSx3l1DAloMU"
})(MapContainer)