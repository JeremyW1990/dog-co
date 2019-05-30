import React from 'react';

import Route from './route'
import LiveMap from './live-map'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      userType : null
    };
  }

  render() {
    return (
      <div className="app">
        <button onClick={()=>{this.setState({userType: 'Walker'})}}>Walker Screen</button>
        <button onClick={()=>{this.setState({userType: 'Owner'})}}>Owner Screen</button>
        {this.state.userType ==='Walker' ? <LiveMap/> : null}
        {this.state.userType ==='Owner' ? <Route/> : null}
      </div>
    );
  }
}

export default App;
