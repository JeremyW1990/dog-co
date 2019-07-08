import React from 'react';
import {NavLink} from 'react-router-dom'
import { Dropdown, DropdownToggle, DropdownMenu, DropdownItem } from 'reactstrap';

import AuthContext from '../auth-context.js'
import '../css/landing-page.css'

/* 
  This component is for rendering landing-page
  It contains the logo and login button
*/
class LandingPage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
        dropdownOpen: false
    };

    this.toggle = this.toggle.bind(this);
  }

  static contextType = AuthContext;

  /* control the login dropdown is open or not  */
  toggle() {
    this.setState(prevState => ({
      dropdownOpen: !prevState.dropdownOpen
    }));
  }

  render() {

    /* Deconstructing this component and state 
       This makes JSX neat and clean
    */
    const {toggle,context} = this;
    const { dropdownOpen } = this.state;  

    return (
        <div className="landing-page">
            
            <div className="title">
                Dog-CO
            </div>
            <div className="login-area">
                <Dropdown isOpen={dropdownOpen} toggle={toggle}>
                <DropdownToggle caret>
                    Login as 
                </DropdownToggle>

                {/* 
                  As the user system is not included in MVP,
                  We hardcoded two user here , with id 1 and 2
                */}
                <DropdownMenu className='names'>
                    <NavLink onClick={()=> context.login(1)}
                      to={{ pathname: '/home'}} exact>
                    <DropdownItem className="dropdown-item"> Jeremy Wang </DropdownItem>
                    </NavLink>

                    <DropdownItem divider />
                    <NavLink onClick={()=> context.login(2)}
                      to={{ pathname: '/home'}} exact>                       
                    <DropdownItem>Howard Moore</DropdownItem>
                    </NavLink>
                </DropdownMenu>
                </Dropdown>
            </div>

        </div>
    )}
}

export default LandingPage;
