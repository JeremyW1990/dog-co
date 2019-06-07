import React from 'react'

const authContext = React.createContext({
    user_id : 0,
    login : ()=>{},

    current_walk_route_id : 0,
    current_user_type: null,
    current_walk_paired_user_id : 0,
    set_user_type : ()=>{},
    set_current_walk_route_id : ()=>{},
    set_current_walk_paired_user_id : () =>{}
});


export default authContext;