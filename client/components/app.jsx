import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'

import HomePage from './home-page'
import LandingPage from './landing-page'
import AuthContext from '../auth-context'
import WalkerMap from './walker-map'
import WatcherMap from './watcher-map'
import UserRequests from './user-requests'
import RequestForm from './request-form'
import PairingRequests from './pairing-requests'


class App extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      user_id : 0,
      current_walk_route_id : 0,
      current_walk_paired_user_id: 0,
      user_type: null,
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.set_user_type = this.set_user_type.bind(this);
    this.set_current_walk_route_id = this.set_current_walk_route_id.bind(this);
    this.set_current_walk_paired_user_id = this.set_current_walk_paired_user_id.bind(this);

  }

  login(user_id) {
    this.setState({user_id}, ()=>{
      this.setLocalStorage('user_id',user_id);
      console.log('login in via user_id', user_id)})
  }

  logout() {
    this.setState({
        user_id : 0,
        current_walk_route_id : 0,
        current_walk_paired_user_id: 0,
        user_type: null
      }, 
      ()=>{this.clearLocalStorage()});
  }

  set_user_type(user_type){
    this.setState({user_type})
  };

  set_current_walk_route_id(current_walk_route_id) {
    this.setState({current_walk_route_id});
  }
  set_current_walk_paired_user_id(current_walk_paired_user_id){
    this.setState({current_walk_paired_user_id})
  };

  clearLocalStorage(){
    localStorage.setItem('user_id', 0);
    console.log('local storage user_id set to 0')

  }

  setLocalStorage(item, value){
    localStorage.setItem(item, value);
  }
  checkoutLocalStorage(){
    const user_id_string = localStorage.getItem('user_id');
    if (user_id_string && !isNaN(user_id_string)) {
      const user_id = Number(user_id_string);
      this.setState({user_id})
    }
  }

  componentDidMount(){
    this.checkoutLocalStorage();
  }

  componentDidUpdate(){
    console.log(this.state)
  }


  render() {

    const contextValue = {
      user_id: this.state.user_id,
      login: this.login,
      logout: this.logout,


      current_walk_route_id : this.state.current_walk_route_id,
      current_user_type: this.state.current_user_type,
      current_walk_paired_user_id : this.state.current_walk_paired_user_id,
      set_user_type : this.set_user_type,
      set_current_walk_route_id : this.set_current_walk_route_id,
      set_current_walk_paired_user_id : this.set_current_walk_paired_user_id,
    }
    const routes = (          
    <Switch>
      <Route path="/home" component={HomePage}></Route>
      <Route path="/live-watch" render={(props)=> <WatcherMap {...props} />}></Route> :
      <Route path="/live-walker" 
        render={(props)=><WalkerMap 
          {...props}
          walkee_id = {this.state.current_walk_paired_user_id}
          route_id={this.state.current_walk_route_id}/>}>
      </Route>

      <Route path='/user-requests' render={
        (props)=> 
          <UserRequests 
          {...props}
          setUserType={this.set_user_type} 
          setCurrentWalkRouteId={this.set_current_walk_route_id}/>}>
        </Route>

      <Route path='/new-request' component={RequestForm}></Route>
      
      <Route path='/walk-plan-pool' component={PairingRequests}></Route>
      <Route path="/login" component={LandingPage}></Route>


    </Switch>)
    return (
      <BrowserRouter>

      <AuthContext.Provider value={contextValue}>
        <div className="app">
          ROOT PAGE

          <Route render={(props) =>{
              console.log( props);
              return (this.state.user_id === 0 && props.location.pathname !=='/login') ? <Redirect to='/login' /> : null
          }}></Route>      

          <Route render={(props) =>{
              console.log( props);

            return (this.state.user_id !== 0 && props.location.pathname ==='/login') ? <Redirect to='/home' /> : null
          }}></Route>

          {this.state.user_id !== 0 ?
             routes : 
             <Route path="/login" component={LandingPage}></Route>
          }


        </div>

      </AuthContext.Provider>
      </BrowserRouter>

    );
  }
}

export default App;
