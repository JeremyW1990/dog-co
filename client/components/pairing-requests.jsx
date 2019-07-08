import React from 'react';
import { Badge, Button, Row } from 'reactstrap';
import {NavLink} from 'react-router-dom'

import TimeTool from '../../util/time-generator'
import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'
import '../css/pairing-requests.css'

/* 
  This component is for rendering open walk request around neighbourhood
*/
class PairingRequest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      showModal: false,
      /* PickedRouteId record which route user about to confirm to pick up */
      pickedRouteId : null
    };
    this.chooseAWalkPlan = this.chooseAWalkPlan.bind(this);
    this.cancelConfirm = this.cancelConfirm.bind(this);
    this.confirmAWalkPlan = this.confirmAWalkPlan.bind(this);
  }

  static contextType = AuthContext;


  /* 
    update to state when an user is about to pick up a walk plan
    A modal will pop-up to ask user to confirm
  */
  chooseAWalkPlan(route_id){
    this.setState({
      showModal : true,
      pickedRouteId : route_id
    })
  }

  /* 
    update the state when user decide to not confirm to walk this plan
    reset the pickedRouteId and make confirm modal disappear
  */
  cancelConfirm(){
    this.setState({
      showModal : false,
      pickedRouteId : null,
      
    })

  }

  /* 
    call endpoint when user confirm to pick up a walk plan
  */
  confirmAWalkPlan(){
    /* Hit the end point to update the action in database */
    fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
      method: 'POST',
      body: JSON.stringify({
        /* Set up the post load here
          state changes to 'paired'
          and we need the id to update in the datebase
        */
        route_id: this.state.pickedRouteId,
        status: 'paired',
      }),
      headers:{
        'Content-Type': 'application/json'
      }, 
    })
    .then( res => {
      /* When update successfully in database, update according in react state as well
        User will see the update from page
      */
      const routes = this.state.routes.map(route =>{
        if (route.id === this.state.pickedRouteId){
          const updatedRoute = {...route};
          updatedRoute.status = 'paired';
          return updatedRoute
        }
        return route;
      });

       /* Update the state,
          make confirm modal disappear
          and reset the route id 
       */
      this.setState({
        routes,
        showModal : false,
        pickedRouteId : null,
  
      })
    });
  }

  /* 
    When user visit this page,
    we will get all the routes that are avaialbe for this user to pick up and display to frontend
    We pass the current user id to backend so request of user with same id won't showup
    User don't want to walk his own request, no business logic here for this app
  */
  componentDidMount(){
    fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
        method: 'GET',
      })
      .then( res => {
        return res.json();
      })
      .then( routes => {
        this.setState({routes});
      });
  }

  render() {
    let requestListsElements = null;

    /* When no routes is in array
      we don't render anything 
    */
    if (this.state.routes.length > 0) {
      requestListsElements = this.state.routes.map(route => {
        return (
            <Row className="request-item" key={route.id}>
              <div className="col-8">
                <div >
                    Owner: {route['username']}
                </div>
                <div>
                  Plan Time: {TimeTool.converStringToReadableFormat(route['plan_walk_at'])}
                </div>
              </div>
              <div className="col-4 right-side">
                {route.status ==='pairing' ?
                  <Button onClick={()=>this.chooseAWalkPlan(route.id)}>Walk This</Button> :
                  <Badge color="light">My Walk</Badge>}

              </div>
            </Row>
        )
      })
    }
    return (
        <div className="pairing-requests">
          {/*   
            A modal to ask user to confirm if he really wants to pick up this walk plan
          */}
            <ConfirmModal 
              confirm={this.confirmAWalkPlan} 
              cancel={this.cancelConfirm}  
              showModal={this.state.showModal}
              modalBodyContent='You sure you want to walk this schedule?'
              confirmButtonContent='Yes, I will walk it'
              cancelButtonContent='Let me think..'
            />  
          <NavLink to='/home'>
              <Button>Back</Button>
          </NavLink>
          {/* 
            render the open ruquest list for this user
            could be nothing.
          */}
          {requestListsElements}

        </div>


    );
  }
}

export default PairingRequest;
