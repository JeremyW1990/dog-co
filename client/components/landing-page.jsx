import React from 'react';
import {NavLink} from 'react-router-dom'

import AuthContext from '../auth-context.js'


class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  static contextType = AuthContext;

  render() {
    return (
        <div className="landing-page">
            Landing-Page

            <AuthContext.Consumer>{()=> (
                <div className="user-choice">
                    <NavLink
                        to={{
                        pathname: '/home',
                        }}
                        exact>
                        <button className="jeremy" onClick={()=> this.context.login(1)}>Jeremy</button>
                    </NavLink>

                    <NavLink
                        to={{
                        pathname: '/home',
                        }}
                        exact>
                        <button className="howard" onClick={()=> this.context.login(2)}>Howard</button>
                    </NavLink>
                </div>
            )}
            </AuthContext.Consumer>

        </div>
    )}
}

export default LandingPage;
