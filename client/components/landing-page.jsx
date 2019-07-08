import React from 'react';
import {NavLink} from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AuthContext from '../auth-context.js'
import '../css/landing-page.css'


class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  static contextType = AuthContext;

  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {

    return (
        <div className="landing-page">
            
            <div className="title">
                Dog-CO
            </div>
            <AuthContext.Consumer>{()=> (
                <div className="login-area">
                    <Dropdown isOpen={this.state.dropdownOpen} toggle={this.toggle}>
                    <DropdownToggle caret>
                        Login as 
                    </DropdownToggle>
                    <DropdownMenu className='names'>
                        <NavLink onClick={()=> this.context.login(1)}
                          to={{ pathname: '/home',}} exact>
                        <DropdownItem className="dropdown-item"> Jeremy Wang </DropdownItem>
                        </NavLink>

                        <DropdownItem divider />
                        <NavLink onClick={()=> this.context.login(2)}
                          to={{ pathname: '/home',}} exact>                       
                        <DropdownItem>Howard Moore</DropdownItem>
                        </NavLink>
                    </DropdownMenu>
                    </Dropdown>
                </div>
            )}
            </AuthContext.Consumer>

        </div>
    )}
}

export default LandingPage;
