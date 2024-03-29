import React, { useState, useEffect } from 'react';
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
    MDBIcon,
    MDBFooter,
    MDBContainer,MDBRow,
    MDBCol,
   } from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';
import { ToastContainer,toast } from 'react-toastify';
import Slide from './Slide';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import FavoriteIcon from '@mui/icons-material/Favorite';


const Product = ({ cart, setCart }) => {
    const [product, setProduct] = useState([]);
    const navigate = useNavigate();
    const [wishlist, setWishlist] = useState([]);

    useEffect(() => {
        getProduct();
        getWishlistByCustomerId();
    }, []);

    const getProduct = async () => {
        try {
            const response = await fetch('https://localhost:7131/api/Product/GetProduct');
            const data = await response.json();

            if (data.status !== 401) {
                setProduct(data);
            } else {
                // Handle error
            }
        } catch (error) {
            console.log(error);
        }
    };
    
    const getWishlistByCustomerId = async () => {
        try {
            const customerid = localStorage.getItem('CustomerId');
            const response = await fetch(`https://localhost:7131/api/Wishlist/Customer/${customerid}`);
            if (!response.ok) {
                console.error('Failed to fetch wishlist items:', response.statusText);
                return []; // Return an empty array if there's an error
            }
            const wishlistItems = await response.json();
            setWishlist(wishlistItems);
        } catch (error) {
            console.error('Error fetching wishlist items:', error);
            return []; // Return an empty array if there's an error
        }
    };
    
    const addToWishlist = async (prod) => {
        try {
           
            const customerid = localStorage.getItem('CustomerId');
            
            const wishlistItem = {
                CustomerID: customerid,
                ProductID: prod.productID,
                Name: prod.name,
                Description: prod.description,
                Price: prod.price,
                Quantity: prod.quantity, 
                Category: prod.category,
                ImageURL: prod.imageURL,
                Isactive: true
            };
    
            const response = await fetch('https://localhost:7131/api/Wishlist', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json'
                },
                body: JSON.stringify(wishlistItem)
            });
    
            if (response.ok) {
                // Product added successfully to the wishlist
                toast.success('Product added to wishlist', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
                const updatedWishlist = [...wishlist, prod];
                  setWishlist(updatedWishlist);
            } else {
                // Handle error if product could not be added to the wishlist
                toast.error('Failed to add product to wishlist. Please try again later.');
            }
        } catch (error) {
            console.error('Error adding product to wishlist:', error);
            // Handle any network or other errors
            toast.error('Failed to add product to wishlist. Please try again later.');
        }
    };

    const removeFromWishlist = async(prod) => {
        try {
            const response = await fetch(`https://localhost:7131/api/Wishlist/${prod.productID}`, {
                method: 'DELETE',
                headers: {
                    'Content-Type': 'application/json'
                }
            });
    
            if (response.ok) {
                const updatedWishlist = wishlist.filter(item => item.productID !== prod.productID);
                setWishlist(updatedWishlist);
                toast.error('Product Removed from wishlist', {
                    position: "top-right",
                    autoClose: 2000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: true,
                    draggable: true,
                    progress: undefined,
                });
            } else {
                toast.error('Failed to remove product from wishlist. Please try again later.');
            }
        } catch (error) {
            console.error('Error removing product from wishlist:', error);
            toast.error('Failed to remove product from wishlist. Please try again later.');
        }
    };
       
        


    const isProductInWishlist = (prod) => {
    
        return wishlist.some((item) => item.productID === prod.productID);
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
                                <MDBCardHeader  onClick={() => navigate(`/productDetails?data1=${JSON.stringify(prod)}`)}
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
                                <MDBCardBody style={{ padding: '1rem', maxHeight: '150px' }}  onClick={() => navigate(`/productDetails?data1=${JSON.stringify(prod)}`)}>
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
                                    {isProductInWishlist(prod) ? (
                                        <FavoriteIcon onClick={() => removeFromWishlist(prod)} style={{ color: 'red' }} />
                                    ) : (
                                        <FavoriteBorderIcon onClick={() => addToWishlist(prod)} />
                                    )}
                                </MDBCardFooter>
                            </MDBCard>
                         
                        </div>
                        
                    ))}
                </div>
            </div>

            <MDBFooter bgColor='light' className='text-center text-lg-start text-muted'>
      <section className='d-flex justify-content-center justify-content-lg-between p-4 border-bottom'>
        <div className='me-5 d-none d-lg-block'>
          <span>Get connected with us on social networks:</span>
        </div>

        <div>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="facebook-f" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="twitter" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="google" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="instagram" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="linkedin" />
          </a>
          <a href='' className='me-4 text-reset'>
            <MDBIcon fab icon="github" />
          </a>
        </div>
      </section>

      <section className=''>
        <MDBContainer className='text-center text-md-start mt-5'>
          <MDBRow className='mt-3'>
            <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>
                <MDBIcon icon="gem" className="me-3" />
                ShopSphere
              </h6>
              <p>
              Welcome to ShopSphere, your premier destination for a seamless shopping experience.
              </p>
            </MDBCol>

            <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Products</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Ornaments
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                 Sports
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                Clothing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Electronics
                </a>
              </p>
            </MDBCol>

            <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Useful links</h6>
              <p>
                <a href='#!' className='text-reset'>
                  Pricing
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Settings
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Orders
                </a>
              </p>
              <p>
                <a href='#!' className='text-reset'>
                  Help
                </a>
              </p>
            </MDBCol>

            <MDBCol md="4" lg="3" xl="3" className='mx-auto mb-md-0 mb-4'>
              <h6 className='text-uppercase fw-bold mb-4'>Contact</h6>
              <p>
                <MDBIcon icon="home" className="me-2" />
                New York, NY 10012, US
              </p>
              <p>
                <MDBIcon icon="envelope" className="me-3" />
                shopsphere@gmail.com
              </p>
              <p>
                <MDBIcon icon="phone" className="me-3" /> +91 7620317944
              </p>
              <p>
                <MDBIcon icon="print" className="me-3" /> +91 8732472722
              </p>
            </MDBCol>
          </MDBRow>
        </MDBContainer>
      </section>

      <div className='text-center p-4' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
        © 2024 Copyright:
        <a className='text-reset fw-bold' href='https://mdbootstrap.com/'>
          Shopsphere.com
        </a>
      </div>
    </MDBFooter>
        </>
    );
};

export default Product;
