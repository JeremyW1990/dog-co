import React from 'react';
import openSocket from 'socket.io-client';
import MapContainer from './map-container';
import '../css/route.css'



class WalkeeMap extends React.Component {

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
        return {lat: geo.latitude / Math.pow(10, 7) , lng: geo.longitude / Math.pow(10, 7) }
      });
      this.setState({ geoLocationStream }, ()=> { console.log(this.state.geoLocationStream)});
    });


    const socket = openSocket();
    socket.on('mySQL', data => {
      console.log("Socket Client received");
      let geoLocationStream = this.state.geoLocationStream.concat({lat: data.latitude / Math.pow(10, 7) , lng: data.longitude / Math.pow(10, 7) });
      this.setState({ geoLocationStream }, ()=> { console.log(this.state.geoLocationStream)})
    });
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

export default WalkeeMap;