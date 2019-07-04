import React from 'react';
import openSocket from 'socket.io-client';
import {NavLink} from 'react-router-dom'
import {Button} from 'reactstrap'

import MapContainer from './map-container';
import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'
import '../css/watcher-map.css'




class WatcherMap extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      geoLocationStream : [],
      showModal: false,
    
    };
    this.popupModal = this.popupModal.bind(this);
    this.confirmModal = this.confirmModal.bind(this);
    this.socket = null;
  }

  static contextType = AuthContext;

  componentWillUnmount() {
    console.log('unmounting....');
    //clear sockets here
    this.socket.close();
    
  }

  popupModal(){
    this.setState({
      showModal : true,
    })
  }


  confirmModal(){
    this.props.history.push('/home');
    
  }

  componentDidMount(){

  const postData = {
    status: 'ongoing',
    userType: 'owner',
  }
  fetch(`/api/fetch-by-status/${this.context.user_id}`, {
      method: 'POST',
      body: JSON.stringify(postData),
      headers:{
          'Content-Type': 'application/json'
      }
  })
  .then( res => {
    console.log('fetched geolocation of ongoing route',res);
    return res.json();
  })
  .then( res => {
    console.log('fetched geolocation of ongoing route',res);

    const geoLocationStream = 
    res.map( geo => {
      return {lat: geo.latitude / Math.pow(10, 7) , lng: geo.longitude / Math.pow(10, 7) }
    });
    this.setState({ geoLocationStream }, ()=> { console.log(this.state.geoLocationStream)});
  });

    this.socket = openSocket('http://localhost:3001');
    // socket.id = this.context.user_id;
    console.log('socket:', this.socket)
    this.socket.on('new-geo-location', data => {
      console.log("Socket Client received : new-geo-location",data);
      if (data.current_walk_paired_user_id === this.context.user_id ) {
        let geoLocationStream = this.state.geoLocationStream.concat({lat: data.latitude / Math.pow(10, 7) , lng: data.longitude / Math.pow(10, 7) });
        this.setState({ geoLocationStream }, ()=> { console.log(this.state.geoLocationStream)})
      }
    });

    this.socket.on('walk-completed', data => {
      console.log("Socket Client received : walk-completed",data);
      if (data.current_walk_paired_user_id === this.context.user_id ) {
        console.log("Walk Completed");
        this.context.set_user_type(null);
        this.context.set_current_walk_paired_user_id(0);
        this.context.set_current_walk_route_id(0);
        this.popupModal();
      }
    });
  }

  render() {
    return (
      <div className="watcher-container">
        <NavLink to='/home'>
            <Button className='btn-white'>Back</Button>
        </NavLink>
        <ConfirmModal 
                    confirm={this.confirmModal} 
                    showModal={this.state.showModal}
                    modalBodyContent='You dog is back'
                    confirmButtonContent='Noted'
                    cancelButtonContent= {null}
                />  

        {this.state.geoLocationStream.length === 0 ? 
          <div className='mt-5'>Your dog is not been walking at the momnent.</div>:
        
          <div className="outer-map-container">
            <div className="watcher-map">
              <MapContainer geoLocationStream={this.state.geoLocationStream} />
            </div>

          </div>
        }
      </div>
    );
  }
}

export default WatcherMap;