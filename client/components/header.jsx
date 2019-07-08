import React from 'react'

import AuthContext from '../auth-context'
import { Collapse, Navbar, NavbarToggler, NavbarBrand, Nav, NavItem, NavLink} from 'reactstrap';
import '../css/header.css'

/* 
    This component is for rendering Header 
*/
class Header extends React.Component {

    constructor(props) {
        super(props);
        this.state = {
            /* 
                control the dropdown menu
            */
            collapsed: true,
        };
        this.toggleNavbar = this.toggleNavbar.bind(this);
        this.logout = this.logout.bind(this);
        this.outsideDropdownClickCallBack = this.outsideDropdownClickCallBack.bind(this);
    }
    
    static contextType = AuthContext

    /*
        logout the current user via context 
    */
    logout(){
        this.context.logout();
    }

    /* 
        control open dropdown menu or close it 
    */
    toggleNavbar() {
        this.setState({
          collapsed: !this.state.collapsed
        });
    }
    
    /* 
        If user click anywhere else outside the dropdown menu while it is open
        we close it 
    */
    outsideDropdownClickCallBack(event){
        if (!event.target.classList.contains('navbar-toggler-icon')){
            this.setState({collapsed: true})
        }
    }


    /*  
        When this component is mounted, set up the dropdown close event listener   
    */
    componentDidMount(){
        document.addEventListener('click', this.outsideDropdownClickCallBack);
    }

    /*  
        When this component is unmounted, clear the dropdown close event listener   
    */
    componentWillUnmount(){
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