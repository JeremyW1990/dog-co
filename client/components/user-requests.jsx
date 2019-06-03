import React from 'react';

import AuthContext from '../auth-context'


class UserRequests extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    };
  }

  static contextType = AuthContext;
  componentDidMount(){
      fetch('/api/routes/' + this.context.user_id,{
        method: 'GET',
      })
      .then( res => {
        console.log(res);

        return res.json();
      })
      .then( res => {
        console.log(res);
       
      });
  }

  render() {
    return (

        <div className="user-requests">
            User requests page
        </div>


    );
  }
}

export default UserRequests;
