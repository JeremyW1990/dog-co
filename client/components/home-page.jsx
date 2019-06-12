import React from 'react'
import {NavLink as RRDNavLink} from 'react-router-dom'

import Header from './header'
import AuthContext from '../auth-context'
import '../css/home-page.css'


class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        menu_spread: true,
    };
    this.toggleMainMenu = this.toggleMainMenu.bind(this);
  }

  static contextType = AuthContext

  toggleMainMenu() {
    this.setState({
        menu_spread: !this.state.menu_spread
    });
  }

  render() {
    let secondaryToggleClass = this.state.menu_spread ? ' open' : ' hide';
    let mainMenu = (
            <React.Fragment>

        <div className="panel">
            <i onClick={this.toggleMainMenu} className="main-button fas fa-paw"></i>

            <div className ={'secondary-button new-requests' + secondaryToggleClass} >
                <RRDNavLink to='/new-request'>

                    <i className="fas fa-plus"></i>
                    <span className="button-text">
                        New Request
                    </span>
                </RRDNavLink>
            </div>

            <div className={"secondary-button walk-plan-pool" + secondaryToggleClass}>
                <RRDNavLink to='/walk-plan-pool'>
                    <i className="fas fa-user-friends"></i>

                    <span className="button-text">
                        Neighbour Requests
                    </span>
                    </RRDNavLink>
            </div>

            <div className={"secondary-button user-requests" + secondaryToggleClass}>
                <RRDNavLink to='/user-requests'>
                    <i className="fas fa-route"></i>

                    <span className="button-text">
                        My Requests
                    </span>
                    </RRDNavLink>
            </div>


            <div className={"secondary-button live-watch" + secondaryToggleClass}>
                <RRDNavLink to='/live-watch'>
                    <i className="fas fa-road"></i>
                    <span className="button-text">
                        Live-Watch
                    </span>
                    </RRDNavLink> 
            </div>

        </div>

    </React.Fragment>
    )
        
    
    return (
        <div className="home-page">
            {mainMenu}  
            
        </div>
    )}
}

export default HomePage;
