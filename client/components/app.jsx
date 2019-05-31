import React from 'react';

import Route from './route'
import LiveMap from './live-map'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userType : null,
      user_id : null
    };
    this.login = this.login.bind(this);
  }

  login(user_id) {
    this.setState({user_id}, ()=>console.log("user_id sets to ", user_id));
  }

  render() {
    return (
      <div className="app">
        {/* <LandingPage/> */}
        {/* <button onClick={()=>{this.setState({userType: 'Walker'})}}>Walker Screen</button>
        <button onClick={()=>{this.setState({userType: 'Owner'})}}>Owner Screen</button> */}
        {this.state.userType ==='Walker' ? <LiveMap/> : null}
        {this.state.userType ==='Owner' ? <Route/> : null}
        <button className="jeremy" onClick={()=> this.login(1)}>Jeremy</button>
        <button className="howard" onClick={()=> this.login(2)}>Howard</button>
        
      </div>
    );
  }
}

export default App;
