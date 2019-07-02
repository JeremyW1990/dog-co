import React from "react";
import { geolocated } from "react-geolocated";
import {NavLink} from 'react-router-dom'
import {Button} from 'reactstrap'


import MapContainer from './map-container'
import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'

import '../css/walker-map.css'
 
class WalkerMap extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            geoLocationStream : [],
            showModal: false,
        }
        this.completeWalkStart = this.completeWalkStart.bind(this);
        this.cancelCompleteWalk = this.cancelCompleteWalk.bind(this);
        this.completeWalkSuccess = this.completeWalkSuccess.bind(this);
    }

    static contextType = AuthContext;

    completeWalkStart(){
      this.setState({
        showModal : true,
      })
    }
  
    cancelCompleteWalk(){
      this.setState({
        showModal : false,        
      })
      console.log('cancel');
  
    }
  
    completeWalkSuccess(){
  
      console.log('confirmed, update to Database with route_id to COMPLETE');
  
      const postData = {
        route_id: this.props.route_id,
        current_walk_paired_user_id: this.context.current_walk_paired_user_id,
        status: 'completed',
      }

      console.log(postData);

      fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
        method: 'POST',
        body: JSON.stringify(postData),
        headers:{
          'Content-Type': 'application/json'
        }, 
      })
      .then( res => {
        this.context.set_user_type(null);
        this.context.set_current_walk_paired_user_id(0);
        this.context.set_current_walk_route_id(0);
        this.props.history.push('/home');
      });
    }



    componentDidUpdate(prevProps){
        console.log(this.props)
        if (this.props.route_id > 0 && this.props.walkee_id > 0)
        if (this.props.coords) 
            if (!prevProps.coords || 
                (this.props.coords.latitude !== prevProps.coords.latitude || this.props.coords.longitude !== prevProps.coords.longitude)){
                    const longitude = Math.floor(this.props.coords.longitude * Math.pow(10, 7));
                    const latitude = Math.floor(this.props.coords.latitude * Math.pow(10, 7));
                    
                    const data = {
                        longitude,
                        latitude,
                        route_id : this.props.route_id,
                        walkee_id: this.props.walkee_id,
                    };
                    console.log("Geo locaiton post data:",data)

                    fetch('/api/geo-locations', {
                        method: 'POST',
                        body: JSON.stringify(data),
                        headers:{
                            'Content-Type': 'application/json'
                        }
                    })
                    .then( res => {
                        return res.json();
                    })
                    .then( res => {
                        const geoLocationStream = this.state.geoLocationStream.concat({ lat: this.props.coords.latitude, lng: this.props.coords.longitude })
                        this.setState({ geoLocationStream }
                        , ()=>{console.log(" State changed: ", this.state.geoLocationStream)});
                    })

        }   
    }

    render() {
        console.log('rendering live map...');
        let liveMapDOM = null;
        if (!this.props.isGeolocationAvailable) {
            liveMapDOM = <div>Your browser does not support Geolocation</div>;
        } 
        else if (!this.props.isGeolocationEnabled){
            liveMapDOM =  <div>Geolocation is not enabled</div>;
        }
        else if (this.props.coords) {
            console.log("Props: ", this.props.coords);
            console.log("STATE to render: ", this.state.geoLocationStream);


            liveMapDOM = (
                <div className="outer-map-container">
                    <div className="walker-map">
                        <MapContainer geoLocationStream={this.state.geoLocationStream} />
                    </div>
                </div>
            )
        }
        else {
            liveMapDOM = <div>Getting the location data&hellip; </div>
        }

        return (
            <div className="walker-container">
            
                <ConfirmModal 
                    confirm={this.completeWalkSuccess} 
                    cancel={this.cancelCompleteWalk} 
                    showModal={this.state.showModal}
                    modalBodyContent='You want to end this walk now??'
                    confirmButtonContent='Yes'
                    cancelButtonContent='Not yet'
                />  
            <Button outline className='btn-white' onClick={this.completeWalkStart}>COMPLETE</Button>{'  '}
            <NavLink to='/home'>
                <Button outline>Back</Button>
            </NavLink>
            {liveMapDOM}
            <input type="text" />
            <Button outline className='btn-white'onClick={this.sendMessage}>Send message</Button>
            </div>
        );
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    watchPosition: true,
})(WalkerMap);