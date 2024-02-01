import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import {useNavigate} from 'react-router';

const Cart = ({ cart, setCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const navigate = useNavigate();

  useEffect(() => {
    setCartItems(cart);
    console.log(cart);
  }, [cart]);

  const removeFromCart = (productID) => {
    const updatedCart = cartItems.filter(item => item.productID !== productID);
    setCartItems(updatedCart);
    setCart(updatedCart);
  };

  const updateQuantity = (productID, quantity) => {
    const updatedCart = cartItems.map(item => {
      if (item.productID === productID) {
        return { ...item, quantity: quantity };
      }
      return item;
    });
    setCartItems(updatedCart);
    setCart(updatedCart);
  };

  const totalAmount = cartItems.reduce((total, product) => {
    // Check if the quantity is a number, if not, return 0
    const quantity = parseInt(product.quantity);
    if (isNaN(quantity)) return 0;
    return total + product.price * quantity;
  }, 0);
  localStorage.setItem("TotalCost",totalAmount);
  console.log(totalAmount);

  return (
    <>
      <div className="container my-5" style={{ width: "45%" }}>
        {
          cartItems.length === 0 ? (
            <div className='text-center'>
              <h1>Your Cart Is Empty</h1>
              <Link to={"/"} className='btn btn-warning'>Continue shopping...</Link>
            </div>
          ) :
           cartItems.map((prod) => (
              <div key={prod.productID} className="card mb-3 my-5" style={{ width: "700px" }}>
                <div className="row g-0">
                  <div className="col-md-4">
                    <img src={prod.imageURL} className="card-img-top" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} />
                  </div>
                  <div className="col-md-8">
                    <div className="card-body text-center">
                      <h5 className="card-title">{prod.name}</h5>
                      <p className="card-text">{prod.description}</p>
                      <button className='btn btn-primary mx-3'>{prod.price} &#8377;</button>
                      <select className='mx-3' value={prod.quantity} onChange={(e) => updateQuantity(prod.productID, e.target.value)}>
                        {["quantity",1, 2, 3, 4, 5].map((quantity) => (
                          <option key={quantity} value={quantity}>{quantity}</option>
                        ))}
                        </select>
                      <button className='btn btn-light  mx-3' onClick={() => removeFromCart(prod.productID)}><AiOutlineDelete /></button>
                      
                    </div>
                  </div>
                </div>
              </div>
            )) 
        }
      </div>
      <div className="container text-center my-5" style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>
        {cartItems.length === 0 ? "" :
          <div>
            <button className="btn btn-warning mx-3" onClick={()=>navigate('/checkout')}>Checkout</button>
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

export default Cart;
