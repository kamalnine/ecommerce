import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';
import { ToastContainer } from 'react-toastify';
import Slide from './Slide';


const AdminGetOrder = ({ cart, setCart }) => {
    const [order,setOrder] = useState([]);
    const navigate = useNavigate();
    const [error,setError] = useState(null);

    useEffect(() => {
        getOrder();
    }, []);

    const getOrder = async () => {
        try {
            const response = await fetch('https://localhost:7131/api/Order/GetOrder');
            const data = await response.json();

            if (data.status !== 401) {
                setOrder(data);
            } else {
               
            }
        } catch (error) {
            console.log(error);
            setError(error);
        }
    };
    if (error) {
        return <h2 style={{display:"flex",justifyContent:"center",alignItems: "center"}}>No orders yet.</h2>;
    }
    // Function to format date
    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    // Function to calculate total cost of all orders
    function calculateTotalCost() {
        let totalCost = 0;
        order.forEach(ord => {
            totalCost += ord.totalAmount;
        });
        return totalCost.toFixed(2); // ToFixed(2) for 2 decimal places
    }

    return (
        <>
            <div className='container-fluid my-5'>
                <ToastContainer
                    position='top-right'
                    autoClose={2000}
                    hideProgressBar={false}
                    newestOnTop={false}
                    closeOnClick
                    rtl={false}
                    pauseOnFocusLoss
                    draggable
                    pauseOnHover
                    theme='dark'
                />
                {/* Render total cost above order cards */}
                <div className="total-cost mb-3">
                    <h3><center>Total Cost of All Orders: ${calculateTotalCost()}</center></h3>
                    <br></br>
                </div>
                <div className='row my-3' style={{ padding: '10px'}}>
                    {order.map((ord) => (
                        <div key={ord.orderID} className='col-md-4 mb-8'style={{marginBottom:"70px"}}>
                            <MDBCard 
                                style={{
                                    border: '1px solid #ddd',
                                    boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                    borderRadius: '4px',
                                    height: '100%',
                                    width: '65%',
                                    marginLeft:"100px",
                                }}
                            >
                                <MDBCardHeader
                                    style={{
                                        padding: '0',
                                        maxHeight: '300px',
                                        cursor: 'pointer',
                                    }}
                                >
                                    <MDBCardTitle style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                      Order No :   {ord.orderID}
                                    </MDBCardTitle>
                                </MDBCardHeader>
                                <MDBCardBody style={{ padding: '1rem', maxHeight: '160px' }}>
                                <MDBCardText style={{ marginBottom: '1rem' }}>Customer ID : {ord.customerID}</MDBCardText>
                                    <MDBCardText style={{ marginBottom: '1rem' }}>Status : {ord.status}</MDBCardText>
                                    <MDBCardText style={{ marginBottom: '1rem' }}>Ordered Date  : {formatDate(ord.orderDate)}</MDBCardText>
                                    <MDBCardText style={{ marginBottom: '1rem' }}>Delivery Expected Date : {formatDate(ord.shipDate)}</MDBCardText>
                                   
                                </MDBCardBody>
                                <MDBCardFooter
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                    }}
                                >
                                    <button className='btn btn-primary mx-3'>{ord.totalAmount}&#36;</button>
                                    
                                   
                                </MDBCardFooter>
                            </MDBCard>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminGetOrder;
