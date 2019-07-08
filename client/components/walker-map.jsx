import React from "react";
import { geolocated } from "react-geolocated";
import {NavLink} from 'react-router-dom'
import {Button} from 'reactstrap'


import MapContainer from './map-container'
import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'

import '../css/walker-map.css'
 

/* 
  This component is for rendering a map for user who are currently walking a dog
  The map will detect his current geolocation and draw his path on the map
*/
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

    /* 
      A modal pop-up to comfirm with user if he want to end this walking now
    */
    completeWalkStart(){
      this.setState({
        showModal : true,
      })
    }

    /* 
      The user decide not to end the current walk now , the modal will disappear
    */
    cancelCompleteWalk(){
      this.setState({
        showModal : false,        
      })
  
    }
  
    /* 
      The user confirm to end the current walk now,
      we update this action and state to backend
      with state 'completed' and route id information
    */
    completeWalkSuccess(){
  
      console.log('confirmed, update to Database with route_id to COMPLETE');
  
      const postData = {
        route_id: this.context.current_walk_route_id,
        current_walk_paired_user_id: this.context.current_walk_paired_user_id,
        status: 'completed',
      }

      fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
        method: 'POST',
        body: JSON.stringify(postData),
        headers:{
          'Content-Type': 'application/json'
        }, 
      })
      .then( res => {
        /* 
          We also reset the current walking to null
          after backedn successfully updated to 'completed'
          and redirect user to home page
        */
        this.context.set_user_type(null);
        this.context.set_current_walk_paired_user_id(0);
        this.context.set_current_walk_route_id(0);
        this.props.history.push('/home');
      });
    }


    
  /* 
    When walker leaves and re-visit live-walker page
    We want the user see what's the ongoing walk was, before he leaves the map
    and continue this walk
  */
  componentDidMount(){

    const postData = {
      status: 'ongoing',
      userType: 'walker',
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
        
      if (res.length > 0) {
        this.context.set_current_walk_paired_user_id(res[0].beneficiary_id);
        this.context.set_current_walk_route_id(res[0].id);
        this.context.set_user_type('walker');

        const geoLocationStream = 
        res.map( geo => {
          return {lat: geo.latitude / Math.pow(10, 7) , lng: geo.longitude / Math.pow(10, 7) }
        });
        this.setState({ geoLocationStream }, ()=> { console.log(this.state.geoLocationStream)});
      }

    })};


    /* 
      Whenever a new geolocation information is passed in from higer order component,
      it means the walker is moving ,
      we need to update the geolocation to state, and  to database,
      and draw the new location on the map
    */

    componentDidUpdate(prevProps){
        if (this.context.current_walk_route_id > 0 && this.context.current_walk_paired_user_id > 0)
        if (this.props.coords) 
            if (!prevProps.coords || 
                /*  
                  check if it is a new geolocation, different from previous one 
                */
                (this.props.coords.latitude !== prevProps.coords.latitude || this.props.coords.longitude !== prevProps.coords.longitude)){
                    const longitude = Math.floor(this.props.coords.longitude * Math.pow(10, 7));
                    const latitude = Math.floor(this.props.coords.latitude * Math.pow(10, 7));
                    
                    const data = {
                        longitude,
                        latitude,
                        route_id : this.context.current_walk_route_id,
                        walkee_id: this.context.current_walk_paired_user_id,
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

                      /* update the state when we know we save the geolocation in database */
                        const geoLocationStream = this.state.geoLocationStream.concat({ lat: this.props.coords.latitude, lng: this.props.coords.longitude })
                        this.setState({ geoLocationStream }
                        , ()=>{console.log(" State changed: ", this.state.geoLocationStream)});
                    })

        }   
    }

    render() {
        console.log('rendering live map...');

        /* 
          Give user friendly information when brower is not supporting Geolocation
          OR Geolocation is not enabled yet
        */
        let liveMapDOM = null;
        if (!this.props.isGeolocationAvailable) {
            liveMapDOM = <div>Your browser does not support Geolocation</div>;
        } 
        else if (!this.props.isGeolocationEnabled){
            liveMapDOM =  <div>Geolocation is not enabled</div>;
        }
        /*  
          Give walker a friendly information when no walk is ongoing under his account
        */
        else if (this.state.geoLocationStream.length === 0){
            liveMapDOM = <div className='mt-5'>You are not walking any dog at the momnent.</div>;
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
            {this.state.geoLocationStream.length > 0? 
                <Button outline className='btn-white' onClick={this.completeWalkStart}>COMPLETE</Button>:null}
            {'  '}
            <NavLink to='/home'>
                <Button className='btn-white'>Back</Button>
            </NavLink>
            {liveMapDOM}

            </div>
        );
    }
}
 

/* 
  A higer order component, resposible to pass new geolocation as props to this walker-map component
   
*/
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    watchPosition: true,
})(WalkerMap);