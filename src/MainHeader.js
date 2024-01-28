import React,{useState} from 'react'
import { Outlet } from 'react-router-dom'
import Header from './Component/Header'

function MainHeader({cart}) {
  
    return (
        <div>
          <Header cart={cart}/>
          <Outlet />
        </div>
      )
}

export default MainHeader