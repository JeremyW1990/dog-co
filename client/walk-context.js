import React from 'react'

const walkContext = React.createContext({
    current_walk_route_id : 0,
    current_user_type: null
});


export default walkContext;