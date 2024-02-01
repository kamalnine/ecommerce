import React, { useState, useEffect } from 'react';

function OrderDetails({ cart, setCart }) {
    const [orderItem, setOrderItem] = useState([]);
    const [orderDate, setOrderDate] = useState('');
    const [shipDate, setShipDate] = useState('');
    const [status, setStatus] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
  
    const customerid = localStorage.getItem('CustomerId');

    

    useEffect(() => {
        fetchOrderItemById();
        fetchOrderById();
    }, []);

    function fetchOrderItemById() {
        try {
            fetch(`https://localhost:7131/api/OrderItems/GetOrderBySignupId?id=${customerid}`)
                .then((response) => response.json())
                .then((data) => {
                    setOrderItem(data);
                    console.log(data);
                    if (data.length > 0) {
                        console.log(data[0].orderId);
                        localStorage.setItem('orderID', data[0].orderId);
                    }
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    const productId = localStorage.getItem('ProductId');
    const orderId = localStorage.getItem('orderID');
    

    function fetchOrderById() {
        try {
            fetch(`https://localhost:7131/api/Order/GetOrderbyId?id=${orderId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        setOrderDate(data[0].orderDate);
                        setShipDate(data[0].shipDate);
                        setStatus(data[0].status);
                        setTotalAmount(data[0].totalAmount);
                    }
                    console.log(data[0].status);
                    console.log(data);
                })
                .catch((error) => {
                    console.log(error);
                });
        } catch (error) {
            console.log(error);
        }
    }

    function formatDate(dateString) {
        const date = new Date(dateString);
        const options = { year: 'numeric', month: 'long', day: 'numeric' };
        return date.toLocaleDateString('en-US', options);
    }

    return (
        <>
            <div className="container my-5" style={{ width: '45%' }}>
                {orderItem.map((prod) => (
                    <div key={prod.productID} className="card mb-3 my-5" style={{ width: '700px' }}>
                        <div className="row g-0">
                            <div className="col-md-4">
                                <img src={prod.imageURL} className="img-fluid rounded-start" alt="Product" />
                            </div>
                            <div className="col-md-8">
                                <div className="card-body text-center">
                                    <h5 className="card-title">Product Name : {prod.productName}</h5>
                                    <p className="card-text">Unit Price : {prod.unitPrice}</p>
                                    <p className="card-text">Ordered On : {formatDate(orderDate)}</p>
                                    <p className="card-text">Delivered On : {formatDate(shipDate)}</p>
                                    <p className="card-text">Status: {status}</p>
                                    <button className="btn btn-primary mx-3">
                                        Total Price : {prod.totalPrice} ₹
                                    </button>
                                </div>
                            </div>
                        </div>
                    </div>
                ))}
            </div>
        </>
    );
}

export default OrderDetails;
