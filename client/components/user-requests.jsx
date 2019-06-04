import React from 'react';

import AuthContext from '../auth-context'
import '../css/user-requests.css'


class UserRequests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [],
      request_type : 'walk-for-me'
    };
    this.changeRequestType = this.changeRequestType.bind(this)
  }

  static contextType = AuthContext;


  changeRequestType(request_type){
    this.setState({request_type});
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
          </div>
        )
      })
    }
    return (

        <div className="user-requests">
            <button onClick={()=>this.changeRequestType('walk-for-me')}>
              Walk For Me
            </button>
            <button onClick={()=>this.changeRequestType('my-walk')}>
              My Walking
            </button>

            {routesElements}
        </div>


    );
  }
}

export default UserRequests;
