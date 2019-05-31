import React from 'react'

const authContext = React.createContext({
    user_id : 0,
    login : ()=>{}
});


export default authContext;