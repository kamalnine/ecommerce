import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Component/Header'

function MainHeader({cart,isLoggedIn}) {
  
    return (
        <div>
          <Header cart={cart} />
          <Outlet />
        </div>
      )
}

export default MainHeader