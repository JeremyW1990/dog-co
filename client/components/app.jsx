import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import HomePage from './home-page'
import LandingPage from './landing-page'
import AuthContext from '../auth-context.js'
import LiveDisplay from './route'
import LiveMap from './live-map'
import UserRequests  from './user-requests'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id : null
    };
    this.login = this.login.bind(this);
  }

  login(user_id) {
    this.setState({user_id}, ()=>console.log("user_id sets to ", user_id));
  }

  render() {
    return (
      <BrowserRouter>
      <AuthContext.Provider value={{
          user_id: this.state.user_id,
          login: this.login
        }}>
        <div className="app">
          ROOT PAGE

          <Switch>
            <Route path="/home" component={HomePage}></Route>
            {this.state.user_id === 1 ? 
              <Route path="/live-walking" component={LiveDisplay}></Route> :
              <Route path="/live-walking" component={LiveMap}></Route>
            }
            <Route path='/user-requests' component={UserRequests}></Route>

            <Route path="/" component={LandingPage}></Route>
          </Switch>
        </div>

      </AuthContext.Provider>
      </BrowserRouter>

    );
  }
}

export default App;
