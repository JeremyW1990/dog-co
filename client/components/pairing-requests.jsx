import React from 'react';

import AuthContext from '../auth-context'


class PairingRequest extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
      routes: [],
    };
  }

  static contextType = AuthContext;

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
    let routesElements = null;
    if (this.state.routes.length > 0) {
      routesElements = this.state.routes.map(route => {
        return (
          <div className="route-item" key={route.id}>
            <div>
                Owner: {route['username']}
            </div>
            <div>
              Plan Walk Time: {route['plan_walk_at']}
            </div>
          </div>
        )
      })
    }
    return (

        <div className="pairing-requests">
            {routesElements}
        </div>


    );
  }
}

export default PairingRequest;
