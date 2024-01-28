import React from 'react'
import { Link } from 'react-router-dom';

import { AiOutlineDelete } from "react-icons/ai";

const Cart = ({ cart, setCart }) => {
  if (!Array.isArray(cart)) {
    setCart([]);
  }

  const removeFromCart = (productID) => {
    setCart(cart.filter(item => item.productID !== productID));

  };
  const totalAmount = cart.reduce((total, product) => total + product.price, 0);
  return (
    <>
      <div className="container my-5" style={{ width: "45%" }}>
        {
          cart.length === 0 ? (
            <>
              <div className='text-center'>

                <h1>Your Cart Is Empty</h1>
                <Link to={"/home"} className='btn btn-warning'>Continue shopping...</Link>
              </div>

            </>
          ) :
            cart.map((prod) => {
              console.log("Image URL:", prod.imageURL);
              console.log("Name", prod.name);
              return (
                <>
                  <div className="card mb-3 my-5" style={{ width: "700px" }}>
                    <div className="row g-0">
                      <div className="col-md-4">
                        <img src={prod.imageURL} className="card-img-top" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} />
                      </div>
                      <div className="col-md-8">
                        <div className="card-body text-center">
                          <h5 className="card-title">{prod.name}</h5>
                          <p className="card-text">{prod.description}</p>
                          <button className='btn btn-primary mx-3'>{prod.price} &#8377;</button>
                          <button className='btn btn-warning mx-3'>Buy Now</button>
                          <button className='btn btn-light  mx-3' onClick={() => removeFromCart(prod.productID)}><AiOutlineDelete /></button>

                        </div>
                      </div>
                    </div>
                  </div>

                </>
              )
            })}

      </div>


      <div className="container text-center my-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {cart.length === 0 ? "" : <div>

          <button className="btn btn-warning mx-3">Checkout</button>
          <button onClick={() => setCart([])} className='btn btn-danger'>Clear Cart</button>
          <div className='container text-center my-5'>
            <h1 style={{ fontSize: "bolder" }}> Total Amount: {totalAmount}&#8377;</h1>
          </div>
        </div>

        }
      </div>
    </>
  )
}

export default Cart