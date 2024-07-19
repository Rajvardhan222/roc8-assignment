'use client';
import React, { createContext, useState } from 'react'

let UserContext = createContext({
    isLoggedIn: false,
    name : "",
    email : "",

})
function UserContextProvider({children })  {
    let [user,setUser] = useState({
        isLoggedIn: false,
        name : "",
        email : "",
    
    })
  return (
   <UserContext.Provider value={{user,setUser}}>
        {children}
   </UserContext.Provider>
  )
}

export default UserContextProvider

export function useUser() {
    return React.useContext(UserContext)
}