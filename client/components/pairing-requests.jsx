import React from 'react';
import { Badge, Button, Row } from 'reactstrap';
import {NavLink} from 'react-router-dom'


import TimeTool from '../../util/time-generator'
import AuthContext from '../auth-context'
import ConfirmModal from '../functions/confirm-modal'
import '../css/pairing-requests.css'


class PairingRequest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      showModal: false,
      pickedRouteId : null
    };
    this.chooseAWalkPlan = this.chooseAWalkPlan.bind(this);
    this.cancelConfirm = this.cancelConfirm.bind(this);
    this.confirmAWalkPlan = this.confirmAWalkPlan.bind(this);
  }

  static contextType = AuthContext;


  chooseAWalkPlan(route_id){
    this.setState({
      showModal : true,
      pickedRouteId : route_id
    })
  }

  cancelConfirm(){
    this.setState({
      showModal : false,
      pickedRouteId : null,
      
    })
    console.log('cancel');

  }

  confirmAWalkPlan(){

    console.log('confirmed, update to Database with route_id and user_id: ', this.state.pickedRouteId, this.context.user_id);

    fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
      method: 'POST',
      body: JSON.stringify({
        route_id: this.state.pickedRouteId,
        status: 'paired',
      }),
      headers:{
        'Content-Type': 'application/json'
      }, 
    })
    .then( res => {
      console.log('Route status changed in DB');
      const routes = this.state.routes.map(route =>{
        if (route.id === this.state.pickedRouteId){
          const updatedRoute = {...route};
          updatedRoute.status = 'paired';
          return updatedRoute
        }
        return route;
      });
      this.setState({
        routes,
        showModal : false,
        pickedRouteId : null,
  
      },()=>console.log('updated Routes:', this.state.routes))
    });
  }

  componentDidMount(prevProps, prevState){
    fetch(`/api/available-pairing-route-for-user/${this.context.user_id}` ,{
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

  render() {
    let requestListsElements = null;
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
                  <Badge color="success">My Walk</Badge>}

              </div>
            </Row>
        )
      })
    }
    return (
        <div className="pairing-requests">
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

            {requestListsElements}

        </div>


    );
  }
}

export default PairingRequest;
