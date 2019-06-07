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

            <NavLink to='/live-walker'>
                <div className="button">
                    <button>
                        <i className="fas fas fa-road"></i>
                    </button>
                    LIVE Walker
                </div>
            </NavLink>

            <NavLink to='/live-watch'>
                <div className="button">
                    <button>
                        <i className="fas fas fa-road"></i>
                    </button>
                    LIVE Watch
                </div>
            </NavLink>

            <NavLink to='/walk-plan-pool'>
                <div className="button">
                    <button>
                        <i className="fas fa-user-friends"></i>
                    </button>
                    Walk-Plan Pool
                </div>
            </NavLink>


            <NavLink to='/user-requests'>
                <div className="button">
                    <button>
                        <i className="fas fa-route"></i>
                    </button>
                    my request 
                </div>
            </NavLink>

            <NavLink to='/new-request'>
                <div className="button">
                    <button>
                        <i className="fas fa-plus"></i>
                    </button>
                    New Request
                </div>
            </NavLink>

            
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
