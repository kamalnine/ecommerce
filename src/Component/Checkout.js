import React from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';

const Checkout = ({ cart,setCart }) => {
    const totalAmount = localStorage.getItem("TotalCost");
  return (
    <Container className="my-5">
      <h1 className="text-center mb-5">Checkout</h1>
      <div className="text-center">
        <h4>Total Amount: {totalAmount}&#8377;</h4>
        <p>Enter your payment and shipping details below:</p>
      </div>
      <form>
        <div className="mb-3">
          <label htmlFor="name" className="form-label">Full Name</label>
          <input type="text" className="form-control" id="name" placeholder="Enter your full name" required />
        </div>
        <div className="mb-3">
          <label htmlFor="email" className="form-label">Email address</label>
          <input type="email" className="form-control" id="email" placeholder="Enter your email address" required />
        </div>
        <div className="mb-3">
          <label htmlFor="address" className="form-label">Address</label>
          <input type="text" className="form-control" id="address" placeholder="Enter your address" required />
        </div>
        <div className="mb-3">
          <label htmlFor="payment" className="form-label">Payment Method</label>
          <select className="form-select" id="payment" required>
            <option value="">Choose...</option>
            <option>Credit Card</option>
            <option>Debit Card</option>
            <option>PayPal</option>
            <option>Other</option>
          </select>
        </div>
        <Button variant="primary" type="submit" className="me-3">Place Order</Button>
        <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
      </form>
    </Container>
  );
}

export default Checkout;
