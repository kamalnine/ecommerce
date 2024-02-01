import React from 'react'
import { useNavigate } from 'react-router'

function OrderPlaced() {
  const navigate = useNavigate();
  return (
    <div style={{position:"absolute",top:"40vh",right:"35vw"}}>
    <img src="https://www.primehairdepot.com/images/order_success_placed.gif" alt=""/>
    <br></br>
    <button className='btn btn-warning' onClick={()=>navigate("/")}>Back to Home</button>&nbsp;&nbsp;&nbsp;&nbsp;
    
    </div>
  )
}

export default OrderPlaced
