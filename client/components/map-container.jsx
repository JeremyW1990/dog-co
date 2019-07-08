import React from 'react';
import {Map, GoogleApiWrapper, Polyline} from 'google-maps-react';

import '../css/map-container.css'


/* 
  This component is for rendering a good map

*/
export class MapContainer extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      loading: true,
    };

  }
  
  render() {

    let renderComponent = null;
    /* If no geoLocationStream as props has been passed in
      We don't render the map, instead showing a "loading" message
    */
    if ( this.props.geoLocationStream.length === 0) {
      renderComponent = <div>Loading...</div>
    } 
    else {
      /* 
        If we have geoLocationStream to draw on the map,
        then we pick up the first lattitude and longtitude as the the center of the map
      */      
      const coords = {lat: this.props.geoLocationStream[0].lat, lng: this.props.geoLocationStream[0].lng};
      renderComponent = 
        <Map 
          initialCenter={coords}
          google={this.props.google}
          style={{width: '100%', height: '100%', position: 'relative'}}
          className={'map'}
          zoom={14}>

          {/* 
            pass throught the geoLocationStream to Polyline component to draw the path on map
          */}
          <Polyline
            path={this.props.geoLocationStream}
            strokeColor="#000000"
            strokeOpacity={0.8}
            strokeWeight={3} />
        </Map>
      
    }
    return (renderComponent)
    
  }
     
}



export default GoogleApiWrapper({
  apiKey: "AIzaSyCqU7RLou2rpqoEGgm--c_KSx3l1DAloMU"
})(MapContainer)