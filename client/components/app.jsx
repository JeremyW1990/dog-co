import React from 'react';

import Route from './route'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      
    };
  }

  render() {
    return (
      <div className="app">
        <Route/>
      </div>
    );
  }
}

export default App;
