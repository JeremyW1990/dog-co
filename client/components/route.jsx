import React from 'react';

import MapContainer from './map-container';
import '../css/route.css'



class Route extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geoLocationStream : []
    
    };
  }
  componentDidMount(){
    fetch('/api/geo-locations', {
      method: 'GET',
    })
    .then( res => {
      console.log(res);
      return res.json();
    })
    .then( res => {
      const geoLocationStream = 
      res.map( geo => {
        return {lat: geo.longitude / Math.pow(10, 7) , lng: geo.latitude / Math.pow(10, 7) }
      });
      this.setState({ geoLocationStream }, ()=> { console.log(this.state.geoLocationStream)})
  
    })
  }

  render() {
    return (
      <div className="route">
        <div className="map">
          <MapContainer geoLocationStream={this.state.geoLocationStream} />
        </div>
      </div>
    );
  }
}

export default Route;
