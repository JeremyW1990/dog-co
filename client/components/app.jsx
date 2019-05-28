import React from 'react';

import Route from './route'
import LiveMap from './live-map'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="app">
        {/* <Route/> */}
        <LiveMap/>
      </div>
    );
  }
}

export default App;
