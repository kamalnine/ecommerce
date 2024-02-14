import React, { useState, useEffect, useRef } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import { useReactToPrint } from 'react-to-print';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';
import JsBarcode from 'jsbarcode';
import autoTable from 'jspdf-autotable';
import { MdOutlineFileDownload } from "react-icons/md";
import { IoPrint } from "react-icons/io5";


function OrderDetails({ cart, setCart }) {
    const [orderItem, setOrderItem] = useState([]);
    const [orderDate1, setOrderDate] = useState('');
    const [shipDate1, setShipDate] = useState('');
    const [status, setStatus] = useState('');
    const [totalAmount, setTotalAmount] = useState('');
    const [loading, setLoading] = useState(true);
    const [order, setOrder] = useState([]);
    const [error, setError] = useState(null);
    const currentDate = new Date();
    const orderDate = new Date(currentDate);
    orderDate.setDate(currentDate.getDate() + 0);
    const shipDate = new Date(currentDate);
    shipDate.setDate(currentDate.getDate() + 4);
    const contentRef = useRef(null);

    const customerid = localStorage.getItem('CustomerId');

    useEffect(() => {
        fetchOrderItemById();
       
    }, [customerid]);

    function fetchOrderItemById() {
        try {
            fetch(`https://localhost:7131/api/OrderItems/GetOrderBySignupId?id=${customerid}`)
                .then((response) => {
                    if (!response.ok) {
                        throw new Error('Not Found');
                    }
                    return response.json();
                })
                .then((data) => {
                    setOrderItem(data);
                    setLoading(false);
                    if (data.length > 0) {
                        localStorage.setItem('orderID', data[0].orderId);
                    }
                })
                .catch((error) => {
                    setError(error);
                    setLoading(false);
                });
        } catch (error) {
            setError(error);
            setLoading(false);
        }
    }

    const orderId = localStorage.getItem('orderID');
    useEffect(() => {
        if (orderId) {
            fetchOrderById();
        }
    }, [orderId]);

  
    


    const downloadPDF = (orderItemID) => {
        fetch(`https://localhost:7131/api/OrderItems/${orderItemID}`)
            .then((response) => {
                if (!response.ok) {
                    throw new Error('Failed to fetch order item details');
                }
                return response.json();
            })
            .then((orderItemDetails) => {
                const pdf = new jsPDF();
                const pdfWidth = pdf.internal.pageSize.getWidth();
    
                // Set the font styles
                pdf.setFont('helvetica');
                pdf.setFontSize(12);
    
                // Add Amazon-like header
                const headerText = "Order Invoice";
                pdf.setFontSize(16);
                const headerWidth = pdf.getStringUnitWidth(headerText) * pdf.internal.getFontSize() / pdf.internal.scaleFactor;
                const headerX = (pdfWidth - headerWidth) / 2;
                pdf.text(headerX, 20, headerText);
    
                // Add "sold by" message and additional information
                const sellerInfo = [
                    'Sold by:',
                    'Shopshere,',
                    's-786 Kamal-382 Near Ecr Beach',
                    'GST: 53WE55666DF'
                ];
                pdf.setFontSize(10);
                const sellerInfoMargin = 10;
                sellerInfo.forEach((line, index) => {
                    pdf.text(sellerInfoMargin, 30 + (index * 10), line);
                });
    
                // Generate barcode image
                const barcodeMargin = 180;
                const barcodeValue = 'YourBarcodeValue';
                const barcodeWidth = 100;
                const barcodeHeight = 40;
                const canvas = document.createElement('canvas');
                JsBarcode(canvas, barcodeValue, {
                    format: "CODE128",
                    displayValue: false,
                    height: barcodeHeight,
                    width: barcodeWidth,
                });
                const barcodeDataURL = canvas.toDataURL('image/jpeg');
                const barcodeX = pdfWidth - barcodeMargin - barcodeWidth + 170;
                pdf.addImage(barcodeDataURL, 'JPEG', barcodeX, 50, barcodeWidth, barcodeHeight);
    
                // Add margin before order details table
                const marginTop = 90; // Adjust as needed
    
                // Add order details table
                const tableHeaders = ['Product Name', 'Unit Price', 'Quantity', 'Variant', 'Ordered On', 'Delivery Expected', 'Status', 'Total Price'];
                const tableData = [
                    [
                        orderItemDetails.productName,
                        orderItemDetails.unitPrice,
                        orderItemDetails.quantity,
                        orderItemDetails.variant,
                        formatDate(orderDate1),
                        formatDate(shipDate1),
                        status,
                        orderItemDetails.totalPrice
                    ]
                ];
    
                pdf.autoTable({
                    startY: marginTop, // Adjust the startY position
                    head: [tableHeaders],
                    body: tableData,
                    theme: 'grid',
                    styles: {
                        font: 'helvetica',
                        fontSize: 10,
                    },
                    columnStyles: {
                        0: { fontStyle: 'bold' },
                    },
                });
    
                // Add footer with total amount
    
                // Save the PDF
                pdf.save('order_invoice.pdf');
            })
            .catch((error) => {
                console.error('Error fetching order item details:', error);
            });
    };
    
    
    
    

    
    

    

    if (loading) {
        return <p>Loading...</p>;
    }

    if (error) {
        return <h2 style={{ display: "flex", justifyContent: "center", alignItems: "center" }}>No orders available.</h2>;
    }

    function fetchOrderById() {
        try {
            fetch(`https://localhost:7131/api/Order/GetOrderbyId?id=${orderId}`)
                .then((response) => response.json())
                .then((data) => {
                    if (data) {
                        setOrderDate(orderDate);
                        setShipDate(shipDate);
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

    function deleteNurse(id) {
        try {
            fetch(`https://localhost:7131/api/OrderItems/${id}`, {
                method: 'DELETE'
            })
            .then((response) => {
                toast.success('🦄Order Cancelled Sucessfully!', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: false,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                fetchOrderById();
                fetchOrderItemById();
            })
            .then((data) => {
                console.warn(data);
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
                <div ref={contentRef}>
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
                                        <p className="card-text">Quantity : {prod.quantity}</p>
                                        <p className="card-text">Variant : {prod.variant}</p>
                                        <p className="card-text">Ordered On : {formatDate(orderDate1)}</p>
                                        <p className="card-text">Delivery Expected : {formatDate(shipDate1)}</p>
                                        <p className="card-text">Status: {status}</p>
                                        <button className="btn btn-primary mx-3">
                                            Total Price : {prod.totalPrice}&#36;
                                        </button>
                                        <button
                                            style={{ marginRight: "20px" }}
                                            className='btn btn-danger'
                                            onClick={() => deleteNurse(prod.orderItemID)}
                                        >
                                            Cancel order
                                        </button>

                                        <div style={{marginLeft:"-800px",marginTop:"-80px" }}>
               
                <button className="btn btn-dark my-4" onClick={() => downloadPDF(prod.orderItemID)}>
                <MdOutlineFileDownload />
                </button>
            </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </div>
           
        </>
    );
}

export default OrderDetails;
