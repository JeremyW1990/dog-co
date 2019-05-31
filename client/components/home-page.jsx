import React from 'react';
import {NavLink} from 'react-router-dom'

class HomePage extends React.Component {

  constructor(props) {
    super(props);
    this.state = {
    
    };
  }

  render() {
    return (
        <div className="home-page">
            <NavLink to='/'>
                <button>Back to login</button>
            </NavLink>

            <div className="button">
                <button>
                    <i className="fas fa-user-friends"></i>
                </button>
                other's pending request 
            </div>

            <div className="button">
                <button>
                    <i className="fas fa-route"></i>
                </button>
                my pending request 
            </div>
            <div className="button">
                <button>
                    <i className="fas fa-folder-open"></i>
                </button>
                History walk
            </div>
            <div className="button">
                <button>
                    <i className="fas fa-user-cog"></i>
                </button>
                Edit user

            </div>
            <div className="button">
                <button>
                    <i className="fas fa-dog"></i>
                </button>
                Edit my dog
            </div>
            

        </div>
    )}
}

export default HomePage;
