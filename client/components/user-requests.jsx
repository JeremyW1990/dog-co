import React from 'react';
import {NavLink} from 'react-router-dom'
import {Button, Row, Container} from 'reactstrap'


import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'
import TimeTool from '../../util/time-generator'

import '../css/user-requests.css'

/* 
  This component is for rendering request under current user
  It includes the requests that user submit
  and the requests that user confirm to walk in the future for other users
*/
class UserRequests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      /* two type of requests: 'my-walk' or 'walk-for-me' */
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


  /* update state to display different request type */
  changeRequestType(request_type){
    this.setState({request_type});
  }

  /* 
    When user picked up a plan, 
    pop-up the confirm modal asking him if he wants to walk it right now

  */
  chooseAWalkPlan(pickedRouteId, walkee_id){
    this.setState({
      showModal : true,
      pickedRouteId,
      walkee_id,
    })
  }

  /* 
    Give user a chance to cancel "walk right now", if he clicks cancel button
    confirm modal will disappear
  */
  cancelConfirm(){
    this.setState({
      showModal : false,
      pickedRouteId : null,
      walkee_id: null,
      
    })
  }

  /* 
    When user confirm to walk this plan right now
    we need to update this information to backend

  */
  confirmStartWalk(){

    fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
      method: 'POST',
      body: JSON.stringify({
        /* 
          pass the body load to backend with that route id and 'ongoing' status
        */
        route_id: this.state.pickedRouteId,
        status: 'ongoing',
      }),
      headers:{
        'Content-Type': 'application/json'
      }, 
    })
    .then( res => res.json())
    .then( res => {
      /* 
        When successfully callback from database,
        we need to update the state in app,
        update the infomation of current ongoing route, like route_id, who is paired with this plan etc..
        and we redirect user to the google map so we can acquire his geo location data there
      */
      this.context.set_user_type('walker');
      this.context.set_current_walk_paired_user_id(this.state.walkee_id);
      this.context.set_current_walk_route_id(this.state.pickedRouteId);
      this.props.history.push('/live-walker')
    });
  }



  /* 
    get the data from backend depending on the query
    we will get two type of data:
    1. requests user submit asking other for helping 
    2. request user commit to help others
  */
  fetchData() {
    fetch(`/api/routes/${this.context.user_id}/?request=${this.state.request_type}` ,{
      method: 'GET',
    })
    .then( res => {
      return res.json();
    })
    .then( routes => {
      this.setState({routes});
    });
  }

  componentDidMount(prevProps, prevState){
      this.fetchData()
  }

  /* 
    Whenever the ruquest type changed,
    We need to fetch another type of request data from database
  */
  componentDidUpdate(prevProps, prevState){
    if (prevState.request_type !== this.state.request_type) {
      this.fetchData();
    }
  }



  render() {
    let requestListsElements = null;
    /* 
      render nothing when array is 0 length
     */
    if (this.state.routes.length > 0) {
      requestListsElements = this.state.routes.map(route => {
        return (
          <Container className="request-item" key={route.id}>
            <Row>
              <div className="col-8">
                <div>
                  Status: {route.status}
                </div>
                <div>
                  {this.state.request_type ==='walk-for-me' ? 'Walker' : 'Owner'}
                  : 
                  {this.state.request_type ==='walk-for-me' ? route['my-walker'] : route['i-walk-for'] }

                </div>
                <div>
                  Create at: {TimeTool.converStringToReadableFormat(route['create_at'])}
                </div>

              </div>
              <div className="col-4 right-side">
                {this.state.request_type ==='my-walk' ? 
                  <Button  className='btn-white' onClick={()=>{this.chooseAWalkPlan(route.id,route.walkee_id)}}>Walk Now</Button> : null
                }

              </div>
            </Row>
          </Container>
        )
      })
    }

    return (

        <div className="user-requests">

          {/* A Modal to comfirm if user wants to start a walk right now  */}
            <ConfirmModal 
              confirm={this.confirmStartWalk} 
              cancel={this.cancelConfirm} 
              showModal={this.state.showModal}
              modalBodyContent='You sure you have the dog?'
              confirmButtonContent='Yes, I have it'
              cancelButtonContent='No, not yet'    
            />  
            <Button outline className='btn-white' onClick={()=>this.changeRequestType('my-walk')}>
              My Walk
            </Button>  {'  '}
            <Button outline className='btn-white' onClick={()=>this.changeRequestType('walk-for-me')}>
              Walk My Dog
            </Button>  {'  '}
            <NavLink to='/home'>
                <Button >Back</Button>
            </NavLink>

            {requestListsElements}
        </div>


    );
  }
}

export default UserRequests;
