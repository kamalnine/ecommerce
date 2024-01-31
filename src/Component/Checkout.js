import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { Link } from 'react-router-dom';
import { CLIENT_ID } from '../Config/Config';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer,toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';
import { FaWindows } from 'react-icons/fa';
const Checkout = ({ cart, setCart }) => {
    const totalAmount = localStorage.getItem("TotalCost");
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const customerid = localStorage.getItem("CustomerId");
    const[street,setStreet] = useState();
    const[city,setCity] = useState();
    const[state,setState] = useState();
    const[zipcode,setZipcode] = useState();
    const[country,setCountry] = useState();
    const navigate = useNavigate();
    const currentDate = new Date();
   const orderDate =  new Date(currentDate);
   orderDate.setDate(currentDate.getDate()+0);
    const shipDate = new Date(currentDate);
    shipDate.setDate(currentDate.getDate() + 4);
    const status = "Confirmed"
    console.log(currentDate.toISOString().split('T')[0]);
    async function onSubmitClick() {
        try {
            console.log({ customerid, orderDate, shipDate, status, totalAmount });
            let item = { customerid, orderDate, shipDate, status, totalAmount }
            let result = await fetch("https://localhost:7131/api/Order", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }

            })
            result = await result.json()
            console.warn("result", result);

        }
        catch (error) {
            console.log(error);
        }
    }

    async function AdressStore() {
      try {
          console.log({ customerid,street,city,state,zipcode,country });
          let item = { customerid,street,city,state,zipcode,country }
          let result = await fetch("https://localhost:7131/api/Adresses", {
              method: "POST",
              body: JSON.stringify(item),
              headers: {
                  "Content-Type": "application/json",
                  "Accept": "application/json"
              }

          })
          result = await result.json()
          console.warn("result", result);

      }
      catch (error) {
          console.log(error);
      }
  }


    const createOrder = (data, actions) => {
        return actions.order.create({
            purchase_units: [
                {
                    amount: {
                        currency_code: "USD",
                        value: totalAmount,
                    },
                },
            ],
        }).then((orderID) => {
            setOrderID(orderID);
            return orderID;
        });
    };

    const onApprove = (data, actions) => {
        return actions.order.capture().then(function (details) {
            const { payer } = details;
            setSuccess(true);
        });
    };

    //capture likely error
    const onError = (data, actions) => {
        setErrorMessage("An Error occured with your payment ");
        toast.error('🦄 An Error occured with your payment!', {
          position: "top-right",
          autoClose: 2000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "dark",
         
          });
    };

    useEffect(() => {
        if (success) {
          
          toast.success('🦄 Payment sucessfull!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
           
            });
            console.log('Order successful . Your order id is--', orderID);
            setCart([]);
             setTimeout(() => {
              navigate('/placed');
           
              
           }, 3000);
         

        }
    }, [success]);

    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }}>
            <Container className="my-5">
            <ToastContainer
position="top-right"
autoClose={2000}
hideProgressBar={false}
newestOnTop={false}
closeOnClick
rtl={false}
pauseOnFocusLoss
draggable
pauseOnHover
theme="dark"

/>
                <h1 className="text-center mb-5">Checkout</h1>
                <div className="text-center">
                    <h4>Total Amount: {totalAmount}&#8377;</h4>
                    <p>Enter your payment and shipping details below:</p>
                </div>
                <form>
                  
                    <div className="mb-3">
                        <label htmlFor="address" className="form-label">Street Address</label>
                        <input type="text" className="form-control" name="Street" value={street} onChange={(e)=>setStreet(e.target.value)} placeholder="Enter your street address" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="city" className="form-label">City</label>
                        <input type="text" className="form-control" name="City" value={city} onChange={(e)=>setCity(e.target.value)} placeholder="Enter your city" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="state" className="form-label">State</label>
                        <input type="text" className="form-control" name="State" value={state} onChange={(e)=>setState(e.target.value)} placeholder="Enter your state" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="zipcode" className="form-label">Zip Code</label>
                        <input type="text" className="form-control" name="ZipCode" value={zipcode} onChange={(e)=>setZipcode(e.target.value)} placeholder="Enter your zip code" required />
                    </div>
                    <div className="mb-3">
                        <label htmlFor="country" className="form-label">Country</label>
                        <input type="text" className="form-control" name="Country" value={country} onChange={(e)=>setCountry(e.target.value)} placeholder="Enter your country" required />
                    </div>
                    <Button variant="primary" type="button" className="me-3" onClick={() => { setShow(true); onSubmitClick(); AdressStore();}}>Place Order</Button>
                    <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
                </form>

                <br></br>
                {show ? (
                    <PayPalButtons
                        style={{ layout: "vertical" }}
                        createOrder={createOrder}
                        onApprove={onApprove}
                    />
                ) : null}

            </Container>

        </PayPalScriptProvider>
    );
}

export default Checkout;
