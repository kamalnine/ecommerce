import React, { useState, useEffect } from 'react';
import { Link } from 'react-router-dom';
import { AiOutlineDelete } from "react-icons/ai";
import { useNavigate } from 'react-router';

const Cart = ({ cart, setCart }) => {
  const [cartItems, setCartItems] = useState([]);
  const [variantSelections, setVariantSelections] = useState({});
  const navigate = useNavigate();

  
  const customerid = localStorage.getItem('CustomerId');

  const getCartByCustomerId = async () => {
    try {
      const response = await fetch(`https://localhost:7131/api/Cart/Customer/${customerid}`);
      if (!response.ok) {
        console.error('Failed to fetch cart items:', response.statusText);
        return [];
      }
      const cartItemsData = await response.json();
      setCartItems(cartItemsData);
      console.log(cartItemsData)
    } catch (error) {
      console.error('Error fetching cart items:', error);
      return [];
    }
  };
useEffect(()=>{
  getCartByCustomerId()
})
  // useEffect(() => {
  //   setCartItems(cart);
  // }, [cart]);

  const removeFromCart = async (productID) => {
    try {
      const response = await fetch(`https://localhost:7131/api/Cart/${productID}`, {
        method: 'DELETE',
        mode: 'no-cors',
      });
      if (!response.ok) {
        console.error('Failed to delete item from cart:', response.statusText);
        return;
      }
      const updatedCart = cartItems.filter(item => item.productID !== productID);
      setCartItems(updatedCart);
      setCart(updatedCart);
    } catch (error) {
      console.error('Error deleting item from cart:', error);
    }
  };
const removeAllCart = async()=>{
  try {
    const response = await fetch(`https://localhost:7131/api/Cart/Customer/${customerid}`, {
      method: 'DELETE',
      mode: 'no-cors',
    });
    if (!response.ok) {
      console.error('Failed to delete item from cart:', response.statusText);
      return;
    }
    setCart([])
  } catch (error) {
    console.error('Error deleting item from cart:', error);
  }
}


const updateQuantity = async (productID, quantity) => {
  try {
    const response = await fetch(`https://localhost:7131/api/Cart/UpdateQuantity/${productID}`, {
      method: 'PUT',
      mode: 'no-cors',
      headers: {
        'Content-Type': 'application/json'
      },
      body: JSON.stringify(quantity)
    });

    if (!response.ok) {
      console.error('Failed to update quantity:', response.statusText);
      return;
    }

    const updatedCart = cartItems.map(item => {
      if (item.productID === productID) {
        return { ...item, quantity: quantity };
      }
      return item;
    });

    setCartItems(updatedCart);
    setCart(updatedCart);
  } catch (error) {
    console.error('Error updating quantity:', error);
  }
};



  const renderVariantOptions = (product) => {
    const { category } = product;
    const selectedVariant = variantSelections[product.productID] || 'default';

    switch (category) {
      case "Mobile":
      case "Tablet":
        return (
          <select className='mx-3' value={selectedVariant} onChange={(e) => handleVariantChange(product.productID, e.target.value)}>
            <option value="default">Select variant</option>
            <option value="128GB">128GB</option>
            <option value="256GB">256GB</option>
            <option value="512GB">512GB</option>
            <option value="1TB">1TB</option>
          </select>
        );
      case "Laptop":
        return (
          <select className='mx-3' value={selectedVariant} onChange={(e) => handleVariantChange(product.productID, e.target.value)}>
            <option value="default">Select variant</option>
            <option value="i3">i3</option>
            <option value="i5">i5</option>
            <option value="i7">i7</option>
          </select>
        );
      case "Clothes":
        return (
          <select className='mx-3' value={selectedVariant} onChange={(e) => handleVariantChange(product.productID, e.target.value)}>
            <option value="default">Select Size</option>
            <option value="S">S</option>
            <option value="M">M</option>
            <option value="L">L</option>
            <option value="XL">XL</option>
          </select>
        );
      case "Shoes":
        return (
          <select className='mx-3' value={selectedVariant} onChange={(e) => handleVariantChange(product.productID, e.target.value)}>
            <option value="default">Select Size</option>
            <option value="6">6</option>
            <option value="7">7</option>
            <option value="8">8</option>
            <option value="9">9</option>
          </select>
        );

        case "Bottle" : 
        return(
          <select className='mx-3' value={selectedVariant} onChange={(e) => handleVariantChange(product.productID, e.target.value)}>
          <option value="default">Select Volume</option>
          <option value="500">500ML</option>
          <option value="750ML">700ML</option>
          <option value="1L">1L</option>
          <option value="1.5L">1.5L</option>
        </select>
        );
      default:
        return null;
    }
  };

  const handleVariantChange = async (productID, variant) => {
    try {
      // Make a PUT request to the API endpoint with the updated variant
      const response = await fetch(`https://localhost:7131/api/Cart/UpdateVariant/${productID}`, {
        method: 'PUT',
        mode: 'no-cors',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(variant)
      });
  
      // Check if the request was successful
      if (!response.ok) {
        // Handle error if the request was not successful
        console.error('Failed to update variant:', response.statusText);
        return;
      }
  
      // If successful, update the local state with the new variant
      setVariantSelections(prevState => ({
        ...prevState,
        [productID]: variant
      }));
     
    } catch (error) {
      // Handle any errors that occur during the request
      console.error('Error updating variant:', error);
    }
  };
  
  

  const calculateProductPrice = (product) => {
    const selectedVariant = variantSelections[product.productID] || 'default';
    console.log(selectedVariant);
localStorage.setItem("Variant",selectedVariant);
    let updatedPrice = product.price; // Initialize with the default price
    
    // Calculate the updated price based on the selected variant
    switch (selectedVariant) {
      case "128GB":
        updatedPrice += 0; // Example: Add $0 for 128GB variant
        break;
      case "256GB":
        updatedPrice += 50; // Example: Add $50 for 256GB variant
        break;
      case "512GB":
        updatedPrice += 100;
        break;
      case "1TB":
        updatedPrice += 200;
        break;
      case "i3":
        updatedPrice += 0;
        break;
      case "i5":
        updatedPrice += 200;
        break;
      case "i7":
        updatedPrice += 400;
        break;
      case "S":
        updatedPrice += 0;
        break;
      case "M":
        updatedPrice += 10;
        break;
      case "L":
        updatedPrice += 20;
        break;
      case "XL":
        updatedPrice += 30;
        break;
      case "6":
        updatedPrice += 0;
        break;
      case "7":
        updatedPrice += 5;
        break;
      case "8":
        updatedPrice += 10;
        break;
      case "9":
        updatedPrice += 15;
        break;
        case "500ML":
          updatedPrice +=0;
          break;
        case "750ML":
          updatedPrice+=10;
          break;
        case "1L":
          updatedPrice+=15;
          break;

        case "1.5L":
          updatedPrice+=20;
          break;
      default:
        updatedPrice += 0;
    }
    
    // Store the updated price in local storage
    localStorage.setItem("unitPrice", updatedPrice);
  
    return updatedPrice;
  };
  
 

  const totalAmount = cartItems.reduce((total, product) => {
    const quantity = parseInt(product.quantity);
    if (isNaN(quantity)) return 0;
    return total + calculateProductPrice(product) * quantity;
  }, 0);
  localStorage.setItem("TotalCost", totalAmount);

  return (
    <>
      <div className="container my-5" style={{ width: "45%" }}>
        {
          cartItems.length === 0 ? (
            <div className='text-center'>
              <h1>Your Cart Is Empty</h1>
              <Link to={"/"} className='btn btn-warning'>Continue shopping...</Link>
            </div>
          ) : cartItems.map((prod) => (
            <div key={prod.productID} className="card mb-3 my-5" style={{ width: "700px" }}>
              <div className="row g-0">
                <div className="col-md-4">
                  <img src={prod.imageURL} className="card-img-top" alt="..." style={{ width: '100%', height: '100%', objectFit: 'cover', borderTopLeftRadius: '4px', borderTopRightRadius: '4px' }} />
                </div>
                <div className="col-md-8">
                  <div className="card-body text-center">
                    <h5 className="card-title">{prod.name}</h5>
                    <p className="card-text">{prod.description}</p>
                    <button className='btn btn-primary mx-3'>{calculateProductPrice(prod)} &#36;</button>
                  {renderVariantOptions(prod)}
                    
                    <select className='mx-3' value={prod.quantity} onChange={(e) => updateQuantity(prod.productID, e.target.value)}>
                      {["quantity", 1, 2, 3, 4, 5].map((quantity) => (
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
            <button className="btn btn-warning mx-3" onClick={() => navigate('/checkout')}>Checkout</button>
            <button onClick={()=>removeAllCart(customerid)} className='btn btn-danger'>Clear Cart</button>
            <div className='container text-center my-5'>
              <h1 style={{ fontSize: "bolder" }}> Total Amount: {totalAmount}&#36;</h1>
            </div>
          </div>
        }
      </div>
    </>
  )
}

export default Cart;
