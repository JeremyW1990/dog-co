import React from 'react'

import AuthContext from '../auth-context'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink, DropdownItem} from 'reactstrap';
import '../css/header.css'

class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            collapsed: true,
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logout = this.logout.bind(this);
        this.outsideDropdownClickCallBack = this.outsideDropdownClickCallBack.bind(this);
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
    
    outsideDropdownClickCallBack(event){
        if (!event.target.classList.contains('navbar-toggler-icon')){
            this.setState({collapsed: true})
        }
    }

    componentDidMount(){
        console.log('Header mounting');
        document.addEventListener('click', this.outsideDropdownClickCallBack);
    }

    componentWillUnmount(){
        console.log('Header unmounting');
        document.removeEventListener('click', this.outsideDropdownClickCallBack)
    }


    render(){
        return(
            <Navbar color="faded" dark className="nav-height">
            <NavbarBrand href="/home" className="mr-auto logo">
                Dog-CO
            </NavbarBrand>
            {this.context.user_id === 1? 'Welcome, Jeremy': null}
            {this.context.user_id === 2? 'Welcome, Howard': null}

            <NavbarToggler onClick={this.toggleNavbar} className="mr-2" />
            <Collapse isOpen={!this.state.collapsed} navbar className='z-1 right'>
                <Nav navbar>
                    <NavItem>
                        <NavLink className='white' onClick={null}>
                            Setting
                        </NavLink>
                    </NavItem>
                    <DropdownItem divider />
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