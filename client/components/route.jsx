import React from 'react';
import MapContainer from './map-container';


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
    .then( geoLocationStream => {
      
  
    })
  }

  render() {
    return (
      <div className="route">
        <div className="map">
          <MapContainer/>
        </div>
      </div>
    );
  }
}

export default Route;
