import React from 'react';

import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'

import '../css/user-requests.css'


class UserRequests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      request_type : 'my-walk',
      showModal: false,
      pickedRouteId : null,
      walkee_id: null,
    };
    this.changeRequestType = this.changeRequestType.bind(this)
    this.chooseAWalkPlan = this.chooseAWalkPlan.bind(this);
    this.cancelConfirm = this.cancelConfirm.bind(this);
    this.confirmStartWalk = this.confirmStartWalk.bind(this);
  }

  static contextType = AuthContext;


  changeRequestType(request_type){
    this.setState({request_type});
  }

  chooseAWalkPlan(pickedRouteId, walkee_id){
    this.setState({
      showModal : true,
      pickedRouteId,
      walkee_id,
    })
  }

  cancelConfirm(){
    this.setState({
      showModal : false,
      pickedRouteId : null,
      walkee_id: null,
      
    })
    console.log('cancel');
  }

  confirmStartWalk(){
    console.log('confirmed, update to Database with route_id and user_id: ', this.state.pickedRouteId, this.context.user_id);

    fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
      method: 'POST',
      body: JSON.stringify({
        route_id: this.state.pickedRouteId,
        status: 'ongoing',
      }),
      headers:{
        'Content-Type': 'application/json'
      }, 
    })
    .then( res => res.json())
    .then( res => {
      console.log('Route status changed in DB');
      this.context.set_user_type('walker');
      this.context.set_current_walk_paired_user_id(this.state.walkee_id);
      this.context.set_current_walk_route_id(this.state.pickedRouteId)
      this.props.history.push('/live-walker')
    //   const routes = this.state.routes.map(route =>{
    //     if (route.id === this.state.pickedRouteId){
    //       const updatedRoute = {...route};
    //       updatedRoute.status = 'ongoing';
    //       return updatedRoute
    //     }
    //     return route;
    //   });
    //   this.setState({
    //     routes,
    //     showModal : false,
    //     pickedRouteId : null,
  
    //   },()=>console.log('updated Routes:', this.state.routes))
    });
  }



  fetchData() {


    fetch(`/api/routes/${this.context.user_id}/?request=${this.state.request_type}` ,{
      method: 'GET',
    })
    .then( res => {
      return res.json();
    })
    .then( routes => {
      console.log(routes);
      this.setState({routes});
    });
  }

  componentDidMount(prevProps, prevState){
      this.fetchData()
  }

  componentDidUpdate(prevProps, prevState){
    if (prevState.request_type !== this.state.request_type) {
      this.fetchData();
    }
  }



  render() {
    let routesElements = null;
    if (this.state.routes.length > 0) {
      routesElements = this.state.routes.map(route => {
        return (
          <div className="route-item" key={route.id}>
            <div>
              Status: {route.status}
            </div>
            <div>
              {this.state.request_type ==='walk-for-me' ? 'Walker' : 'Owner'}
              : 
              {this.state.request_type ==='walk-for-me' ? route['my-walker'] : route['i-walk-for'] }

            </div>
            <div>
              Create at: {route['create_at']}
            </div>
            {this.state.request_type ==='my-walk' ? 
              <button onClick={()=>{this.chooseAWalkPlan(route.id,route.walkee_id)}}>Start this walk</button> : null
            }

          </div>
        )
      })
    }

    return (

        <div className="user-requests">
            <ConfirmModal 
              confirm={this.confirmStartWalk} 
              cancel={this.cancelConfirm} 
              showModal={this.state.showModal}
              modalBodyContent='You sure you have the dog?'
              confirmButtonContent='Yes, I have it'
              cancelButtonContent='No, not yet'    
            />  
            <button onClick={()=>this.changeRequestType('my-walk')}>
              My Walking
            </button>
            <button onClick={()=>this.changeRequestType('walk-for-me')}>
              Walk For Me
            </button>


            {routesElements}
        </div>


    );
  }
}

export default UserRequests;
