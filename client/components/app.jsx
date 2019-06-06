import React from 'react';
import {BrowserRouter, Switch, Route} from 'react-router-dom'

import HomePage from './home-page'
import LandingPage from './landing-page'
import AuthContext from '../auth-context'
import WalkerMap from './walker-map'
import WalkeeMap from './walkee-map'
import UserRequests from './user-requests'
import RequestForm from './request-form'
import PairingRequests from './pairing-requests'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id : 1,
      current_walk_route_id : 0,
      user_type: null
      
    };
    this.login = this.login.bind(this);
    this.set_user_type = this.set_user_type.bind(this);
    this.set_current_walk_route_id = this.set_current_walk_route_id.bind(this);

  }

  login(user_id) {
    this.setState({user_id}, ()=>console.log("user_id sets to ", user_id));
  }

  set_user_type(user_type){
    this.setState({user_type})
  }

  set_current_walk_route_id(current_walk_route_id){
    this.setState({current_walk_route_id})
  }

  componentWillUnmount(){
    this.set_current_walk_route_id = null;
    this.set_user_type = null;
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
            <Route path="/live-walkee" component={WalkeeMap}></Route> :
            <Route path="/live-walker" component={()=><WalkerMap route_id={this.state.current_walk_route_id}/>}></Route>

            <Route path='/user-requests' render={
              (props)=> 
                <UserRequests 
                {...props}
                setUserType={this.set_user_type} 
                setCurrentWalkRouteId={this.set_current_walk_route_id}/>}>
              </Route>

            <Route path='/new-request' component={RequestForm}></Route>
            
            <Route path='/walk-plan-pool' component={PairingRequests}></Route>
            <Route path="/" component={LandingPage}></Route>
          </Switch>
        </div>

      </AuthContext.Provider>
      </BrowserRouter>

    );
  }
}

export default App;
