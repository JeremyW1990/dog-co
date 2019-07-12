import React from 'react';
import {BrowserRouter, Switch, Route, Redirect} from 'react-router-dom'


import Header from './header'
import HomePage from './home-page'
import LandingPage from './landing-page'
import AuthContext from '../auth-context'
import WalkerMap from './walker-map'
import WatcherMap from './watcher-map'
import UserRequests from './user-requests'
import RequestForm from './request-form'
import PairingRequests from './pairing-requests'
import ChatRoom from './chat-room'
import '../css/app.css'

/* 
  Start-off Component
  Holding center state

*/
class App extends React.Component {

  constructor(props) {
    super(props);
    /* 
      When user has open walk schedule, which is ongoing at the momoent
      The current_walk_route_id, current_walk_paired_user_id will be update to that paired user's id
      The user_type will be either 'walker' or 'owner'
    */
    this.state = {
      user_id : 0,
      current_walk_route_id : 0,
      current_walk_paired_user_id: 0,
      user_type: null,
      showModal: false,
      
    };
    this.login = this.login.bind(this);
    this.logout = this.logout.bind(this);
    this.set_user_type = this.set_user_type.bind(this);
    this.set_current_walk_route_id = this.set_current_walk_route_id.bind(this);
    this.set_current_walk_paired_user_id = this.set_current_walk_paired_user_id.bind(this);

  }


  /* 
    login a user, 
    save the id to localstorage, too
  */
  login(user_id) {
    this.setState({user_id}, ()=>{
      this.setLocalStorage('user_id',user_id);
      })
  }

  /* 
    logout a user,
    reset every the paired user information as well
    reset the localstorage 
  */
  logout() {
    this.setState({
        user_id : 0,
        current_walk_route_id : 0,
        current_walk_paired_user_id: 0,
        user_type: null
      });
    this.clearLocalStorage()
  }
  /* set user type */
  set_user_type(user_type){
    this.setState({user_type})
  };

  /* set current walk route id */
  set_current_walk_route_id(current_walk_route_id) {
    this.setState({current_walk_route_id});
  }

  /* set urrent walk paired user id */
  set_current_walk_paired_user_id(current_walk_paired_user_id){
    this.setState({current_walk_paired_user_id})
  };

  /* clear user_id in localstorage */
  clearLocalStorage(){
    localStorage.setItem('user_id', 0);

  }

  /* set an anbitary key and value in localstorage */
  setLocalStorage(item, value){
    localStorage.setItem(item, value);
  }

  /* check if user previously login in this browser */
  checkoutLocalStorage(){
    const user_id_string = localStorage.getItem('user_id');
    if (user_id_string && !isNaN(user_id_string)) {
      const user_id = Number(user_id_string);
      this.setState({user_id})
    }
  }
  /* When app is open, check if user login before  */
  componentDidMount(){
    this.checkoutLocalStorage();
  }

  render() {

    /* 
      link every value in state to its get and set method
    */
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

    /* 
      Set up react-router for each component
      Pass down props and logic that component needs
    */
    const routes = (          
    <Switch>
      <Route path="/home" render={(props)=> <HomePage toggleChatRoomDisplay = {this.toggleChatRoomDisplay} {...props}/>}></Route>
      <Route path="/live-watch" render={(props)=> <WatcherMap {...props} />}></Route> :
      <Route path="/live-walker" 
        render={(props)=><WalkerMap 
          {...props}/>}>
      </Route>

      <Route path='/user-requests' render={
        (props)=> 
          <UserRequests 
          {...props}
          setUserType={this.set_user_type} 
          setCurrentWalkRouteId={this.set_current_walk_route_id}/>}>
        </Route>

      <Route path='/new-request' component={RequestForm}></Route>

      <Route path='/chat-room' render={
        (props)=> 
          <ChatRoom 
            showChatRoom={this.state.showChatRoom}
            toggleChatRoomDisplay = {this.toggleChatRoomDisplay}
          />}>  
        </Route>
      
      <Route path='/walk-plan-pool' component={PairingRequests}></Route>
      <Route path="/login" component={LandingPage}></Route>
      <Route path="/" component={HomePage}></Route>
    </Switch>)


    return (
      <BrowserRouter>

      {/* 
        Set up a gload context here
        So all the value in app state can be passby around and change easily in the whole app
      */}
      <AuthContext.Provider value={contextValue}>
        <div className="app">
          <Header ></Header> 

          {/* 
            Set up login redirect logic below
            When user hit any other page without authentication, redirect to login page
            When authenticated user tries to hit login page, redirect to home page 
          */}
          <Route render={(props) =>{
              return (this.state.user_id === 0 && props.location.pathname !=='/login') ? <Redirect to='/login' /> : null
          }}></Route>      

          <Route render={(props) =>{

            return (this.state.user_id !== 0 && props.location.pathname ==='/login') ? <Redirect to='/home' /> : null
          }}></Route>

          {this.state.user_id !== 0 ? routes : <Route path="/login" component={LandingPage}></Route>} 
        </div>

      </AuthContext.Provider>
      </BrowserRouter>

    );
  }
}

export default App;
