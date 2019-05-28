import React from "react";
import { geolocated } from "react-geolocated";

import MapContainer from './map-container'
 
class LiveMap extends React.Component {

    constructor(props){
        super(props);
        this.state = {
            geoLocationStream : []

        }
    }

    componentDidUpdate(prevProps){
        if (this.props.coords) 
            if (!prevProps.coords || 
                (this.props.coords.latitude !== prevProps.coords.latitude || this.props.coords.longitude !== prevProps.coords.longitude)){
                this.setState({ 
                    geoLocationStream : this.state.geoLocationStream.concat({ lat: this.props.coords.latitude, lng: this.props.coords.longitude })
                }, ()=>{console.log(" State changed: ", this.state.geoLocationStream)});
        }   
    }

    render() {
        console.log('rendering...');
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

        return liveMapDOM;
    }
}
 
export default geolocated({
    positionOptions: {
        enableHighAccuracy: false,
    },
    watchPosition: true,
})(LiveMap);