import React, { useRef } from 'react'

function Paypal() {
    const paypal = useRef();
  return (
    <div>
      <div ref={paypal}></div>
    </div>
  )
}

export default Paypal
