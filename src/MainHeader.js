import React from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Component/Header'

function MainHeader() {
    return (
        <div>
          <Header />
          <Outlet />
        </div>
      )
}

export default MainHeader