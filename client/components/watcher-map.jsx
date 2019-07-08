import React from 'react';
import openSocket from 'socket.io-client';
import {NavLink} from 'react-router-dom'
import {Button} from 'reactstrap'

import MapContainer from './map-container';
import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'
import '../css/watcher-map.css'


/* 
  This app is for rendering a map for dog owner, who can watch the dog being walking outside on live
*/
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
    /* 
        When user leave the chatroom, we disconnect the socket.IO connnection
        to prevent memory leak 
    */
    this.socket.close();
    
  }


  /* 
    A modal inform user that the walk is completed by walker 
  */
  popupModal(){
    this.setState({
      showModal : true,
    })
  }

  /* 
    After owner confirm the pop-up modal, redirect him to home page
  */
  confirmModal(){
    this.props.history.push('/home');
    
  }


  componentDidMount(){
    /* 
      When owner leaves and re-visit live-watch page
      We want the user see what's the ongoing walk current status is
      and continue to watch
      We will call the backend to check if any one is walking for this user outside currently
      if yes we will update the state and draw the path for this user
    */
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
      return res.json();
    })
    .then( res => {

      const geoLocationStream = 
      res.map( geo => {
        return {lat: geo.latitude / Math.pow(10, 7) , lng: geo.longitude / Math.pow(10, 7) }
      });
      this.setState({ geoLocationStream });
    });


    /* 
      connect the socket.IO as well so dog owner get an constantly open channel here to get updated with geolocation
    */
    this.socket = openSocket(process.env.NODE_ENV ==='development' ? 'http://localhost:3001' : undefined);
    // socket.id = this.context.user_id;
    console.log('socket:', this.socket)
    this.socket.on('new-geo-location', data => {
      if (data.current_walk_paired_user_id === this.context.user_id ) {
        let geoLocationStream = this.state.geoLocationStream.concat({lat: data.latitude / Math.pow(10, 7) , lng: data.longitude / Math.pow(10, 7) });
        this.setState({ geoLocationStream });
      }
    });

    /* 
      get informed by socket.IO channel as well when the walki is completed by walker
    */
    this.socket.on('walk-completed', data => {
      if (data.current_walk_paired_user_id === this.context.user_id ) {
        this.context.set_user_type(null);
        this.context.set_current_walk_paired_user_id(0);
        this.context.set_current_walk_route_id(0);
        this.popupModal();
      }
    });
  }

  render() {

    
    /* Deconstructing this component and state 
        This makes JSX neat and clean
    */
    return (
      <div className="watcher-container">
        <NavLink to='/home'>
            <Button className='btn-white mb-2'>Back</Button>
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