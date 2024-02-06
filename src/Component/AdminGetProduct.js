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


const AdminGetProduct = ({ cart, setCart }) => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();

    useEffect(() => {
        getProduct();
    }, []);

    const getProduct = async () => {
        try {
            const response = await fetch('https://localhost:7131/api/Product/GetProduct');
            const data = await response.json();

            if (data.status !== 401) {
                setProduct(data);
            } else {
               
            }
        } catch (error) {
            console.log(error);
        }
    };

    return (
        <>
            {/* <div className='contain1'>
                <Slide1 style={{ width: '100%' }} />
            </div> */}

            <div className='contain mx-3 my-5'>
                <Slide style={{ width: '100%' }} />
            </div>

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
                <div className='row my-3' style={{ padding: '10px'}}>
                    {product.map((prod) => (
                        <div key={prod.productID} className='col-md-4 mb-8'style={{marginBottom:"70px"}}>
                            <MDBCard onClick={() => navigate(`/update?data2=${JSON.stringify(prod)}`)}
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
                                    <img
                                        src={prod.imageURL}
                                        className='card-img-top'
                                        alt='...'
                                        style={{
                                            width: '100%',
                                            height: '300px', // Fixed height for all images
                                            objectFit: 'cover',
                                            borderTopLeftRadius: '4px',
                                            borderTopRightRadius: '4px',
                                        }}
                                    />
                                </MDBCardHeader>
                                <MDBCardBody style={{ padding: '1rem', maxHeight: '150px' }}>
                                    <MDBCardTitle style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                        {prod.name}
                                    </MDBCardTitle>
                                    <MDBCardText style={{ marginBottom: '1rem' }}>{prod.description}</MDBCardText>
                                   
                                </MDBCardBody>
                                <MDBCardFooter
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                    }}
                                >
                                    <button className='btn btn-primary mx-3'>{prod.price}&#36;</button>
                                    <MDBCardText>{prod.category}</MDBCardText>
                                    <button className='btn btn-primary mx-3'>{prod.quantity}</button>
                                </MDBCardFooter>
                            </MDBCard>
                        </div>
                    ))}
                </div>
            </div>
        </>
    );
};

export default AdminGetProduct;