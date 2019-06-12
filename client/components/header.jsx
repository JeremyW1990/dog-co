import React from 'react'

import AuthContext from '../auth-context'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import '../css/header.css'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logout = this.logout.bind(this);
    }
    
    static contextType = AuthContext

    logout(){
        this.context.logout();
    }

    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
      }

    render(){
        return(
            <Navbar color="faded" dark className="nav-height">
            <NavbarBrand href="/" className="mr-auto logo">
                <i className="fas fa-paw"></i>{' '}
                Dog-CO
            </NavbarBrand>
            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar className='z-1 right'>
                <Nav navbar>
                    <NavItem>
                        <NavLink className='white' onClick={null}>
                            Walk History
                        </NavLink>
                    </NavItem>
                    
                    <NavItem>
                        <NavLink className='white' onClick={this.logout}> 
                        Logout
                        </NavLink>
                    </NavItem>
                </Nav>
            </Collapse>
            </Navbar>

        )
    }
}

export default Header;