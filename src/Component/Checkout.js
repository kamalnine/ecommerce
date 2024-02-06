import React, { useState, useEffect } from 'react';
import { Container, Button } from 'react-bootstrap';
import { PayPalScriptProvider, PayPalButtons } from "@paypal/react-paypal-js";
import { ToastContainer, toast } from 'react-toastify';
import { useNavigate,Link } from 'react-router-dom';
import { CLIENT_ID } from '../Config/Config';
import emailjs from '@emailjs/browser';



const Checkout = ({ cart, setCart }) => {
    const totalAmount = localStorage.getItem("TotalCost");
    const [showAddress, setShowAddress] = useState(false);
    const [addresses, setAddresses] = useState([]);
    const [selectedAddress, setSelectedAddress] = useState(null);
    const [showAddressForm, setShowAddressForm] = useState(false);
    const [show, setShow] = useState(false);
    const [success, setSuccess] = useState(false);
    const [ErrorMessage, setErrorMessage] = useState("");
    const [orderID, setOrderID] = useState(false);
    const customerid = localStorage.getItem("CustomerId");
    const [street, setStreet] = useState();
const [city, setCity] = useState();
const [state, setState] = useState();
const[zipCode, setZipcode] = useState();
const [country, setCountry] = useState();
    const navigate = useNavigate();
    const currentDate = new Date();
    const orderDate = new Date(currentDate);
    orderDate.setDate(currentDate.getDate() + 0);
    const shipDate = new Date(currentDate);
    shipDate.setDate(currentDate.getDate() + 4);
    const status = "Confirmed";


    useEffect(() => {
        fetchAddress().then(() => showAddressCard());
    }, []);

    const fetchAddress = async () => {
        try {
            const response = await fetch(`https://localhost:7131/api/Adresses/GetAdressById/${customerid}`);
            if (response.ok) {
                const data = await response.json();
                console.log(data);
                setAddresses(data);
                if (data.length > 0) {
                    setShowAddress(true); // Show the address card if there are addresses available
                }
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };
    
    const toggleAddressForm = () => {
        setShowAddressForm(!showAddressForm);
       // Toggle the visibility of the address form
    };

    const showAddressCard = () => {
        setShowAddress(true); // Show the address card
       
    };

    const onSubmitClick = async () => {
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
            });
            result = await result.json();
            console.warn("result", result);
            console.log(result.orderID);
const variant = localStorage.getItem("Variant");
const unitprice = localStorage.getItem("unitPrice");
            for (const item of cart) {
                const orderItem = {
                    OrderId: result.orderID,
                    signupId: customerid,
                    ProductID: item.productID,
                    ProductName: item.name,
                    Quantity: item.quantity,
                    UnitPrice: unitprice,
                    TotalPrice: item.quantity * unitprice,
                    ImageURL: item.imageURL,
                    Variant : variant
                };

                let orderItemResult = await fetch("https://localhost:7131/api/OrderItems", {
                    method: "POST",
                    body: JSON.stringify(orderItem),
                    headers: {
                        "Content-Type": "application/json",
                        "Accept": "application/json"
                    }
                });
                orderItemResult = await orderItemResult.json();
                console.log(orderItemResult);
            }

        } catch (error) {
            console.log(error);
        }
    };

    const AdressStore = async () => {
        try {
            console.log({ customerid, street, city, state, zipCode, country });
            let item = { customerid, street, city, state, zipCode, country }
            let result = await fetch("https://localhost:7131/api/Adresses", {
                method: "POST",
                body: JSON.stringify(item),
                headers: {
                    "Content-Type": "application/json",
                    "Accept": "application/json"
                }
            });
            result = await result.json();
            console.warn("result", result);

        } catch (error) {
            console.log(error);
        }
    };

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

    const onError = (data, actions) => {
        setErrorMessage("An Error occurred with your payment ");
        toast.error('🦄 An Error occurred with your payment!', {
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
const name = localStorage.getItem("name");
    useEffect(() => {
        if (success) {
            toast.success('🦄 Payment successful!', {
                position: "top-right",
                autoClose: 2000,
                hideProgressBar: false,
                closeOnClick: true,
                pauseOnHover: true,
                draggable: true,
                progress: undefined,
                theme: "dark",
            });
            const serviceId = "service_lr9mb09";
            const templateId = "template_hjtky3k";
            const publicKey ="KqXYWVyrbahI8eQ88";
     
            const templateParams = {
                     from_name : "ShopSphere",
                      to_email : localStorage.getItem("email"),
                     to_name: localStorage.getItem("name"),
                     message: `Your Order is Confirmed\n\nCustomer Name: ${name}\nOrder Date: ${orderDate}\nShip Date: ${shipDate}\nStatus: ${status}\nTotal Amount: ${totalAmount}`,
      
            };
      
        emailjs.send(serviceId,templateId,templateParams,publicKey)
        .then(() => {
          
          toast.success("Email sent Successfully");
        })
        .catch((emailError) => {
          
          console.error("Error sending email:", emailError);
        }); 
            console.log('Order successful. Your order id is:', orderID);
            setCart([]);
            setTimeout(() => {
                navigate('/placed');
            }, 3000);
        }
    }, [success]);

    const handleSelectAddress = (index) => {
        // Set the selected address based on the index
        setSelectedAddress(addresses[index]);
      
    };
    console.log(selectedAddress);
    return (
        <PayPalScriptProvider options={{ "client-id": CLIENT_ID }} style={{marginLeft: "150px"}}>
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
                {showAddress ? (
                    <>
                        {addresses.map((address, index) => (
                            <div className="card mb-3" key={index}>
                                <div className="card-body">
                                    <h5 className="card-title">Shipping Address {index + 1}</h5>
                                    <p className="card-text">Street: {address.street}</p>
                                    <p className="card-text">City: {address.city}</p>
                                    <p className="card-text">State: {address.state}</p>
                                    <p className="card-text">Zip Code: {address.zipCode}</p>
                                    <p className="card-text">Country: {address.country}</p>
                                    <input
                                        type="radio"
                                        name="shippingAddress"
                                        value={index}
                                        onChange={() => handleSelectAddress(index)}
                                    />
                                    <label htmlFor={`shippingAddress_${index}`}>Select</label>
                                </div>
                            </div>
                        ))}
                    </>
                ) : null}
                {showAddress && !showAddressForm && (
                    // Show the button to add another address if address is shown and address form is not visible
                    <Button variant="primary" onClick={toggleAddressForm}>{addresses.length !== 0 ?  "Add Another Address":"Add New Adress"}</Button>
                )}
                {showAddressForm ? (
                     <form>
                     <div className="mb-3">
                         <label htmlFor="address" className="form-label">Street Address</label>
                         <input type="text" className="form-control" name="Street" value={street} onChange={(e) => setStreet(e.target.value)} placeholder="Enter your street address" required />
                     </div>
                     <div className="mb-3">
                         <label htmlFor="city" className="form-label">City</label>
                         <input type="text" className="form-control" name="City" value={city} onChange={(e) => setCity(e.target.value)} placeholder="Enter your city" required />
                     </div>
                     <div className="mb-3">
                         <label htmlFor="state" className="form-label">State</label>
                         <input type="text" className="form-control" name="State" value={state} onChange={(e) => setState(e.target.value)} placeholder="Enter your state" required />
                     </div>
                     <div className="mb-3">
                         <label htmlFor="zipcode" className="form-label">Zip Code</label>
                         <input type="text" className="form-control" name="ZipCode" value={zipCode} onChange={(e) => setZipcode(e.target.value)} placeholder="Enter your zip code" required />
                     </div>
                     <div className="mb-3">
                         <label htmlFor="country" className="form-label">Country</label>
                         <input type="text" className="form-control" name="Country" value={country} onChange={(e) => setCountry(e.target.value)} placeholder="Enter your country" required />
                     </div>
                     <Button variant="secondary" onClick={toggleAddressForm}>Cancel</Button>
                 </form>
                ) : null}
                &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  <Button variant="primary" type="button" className="me-3" onClick={() => {setShow(true); onSubmitClick(); AdressStore(); }}>Place Order</Button>
                  &nbsp;&nbsp;&nbsp;&nbsp;&nbsp;
                  
                    <Link to="/cart" className="btn btn-secondary">Back to Cart</Link>
                <br />
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
