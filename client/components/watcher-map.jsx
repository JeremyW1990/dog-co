import React from 'react';
import openSocket from 'socket.io-client';
import {NavLink} from 'react-router-dom'

import MapContainer from './map-container';
import AuthContext from '../auth-context'
import '../css/route.css'



class WatcherMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geoLocationStream : []
    
    };
  }

  static contextType = AuthContext;
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
    // socket.id = this.context.user_id;
    console.log('socket:', socket)
    socket.on('new-geo-location', data => {
      console.log("Socket Client received",data);
      if (data.current_walk_paired_user_id === this.context.user_id ) {
        let geoLocationStream = this.state.geoLocationStream.concat({lat: data.latitude / Math.pow(10, 7) , lng: data.longitude / Math.pow(10, 7) });
        this.setState({ geoLocationStream }, ()=> { console.log(this.state.geoLocationStream)})
      }

    });
  }

  render() {
    return (
      <div className="route">
        <NavLink to='/home'>
            <button>Back</button>
        </NavLink>
        <div className="map">
          <MapContainer geoLocationStream={this.state.geoLocationStream} />
        </div>
      </div>
    );
  }
}

export default WatcherMap;
