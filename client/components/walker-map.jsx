import React from "react";
import { geolocated } from "react-geolocated";
import {NavLink} from 'react-router-dom'


import MapContainer from './map-container'
import AuthContext from '../auth-context'
 
class WalkerMap extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            geoLocationStream : []

        }
    }

    static contextType = AuthContext;

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


            liveMapDOM = <MapContainer geoLocationStream={this.state.geoLocationStream} />
        }
        else {
            liveMapDOM = <div>Getting the location data&hellip; </div>
        }

        return (
            <React.Fragment>
            <NavLink to='/home'>
                <button>Back</button>
            </NavLink>
            {liveMapDOM}
            </React.Fragment>
        );
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: true,
    },
    watchPosition: true,
})(WalkerMap);