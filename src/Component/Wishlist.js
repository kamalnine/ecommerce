import React, { useEffect, useState } from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
} from 'mdb-react-ui-kit';
import { useNavigate } from 'react-router';


function Wishlist() {
    const[wishlist,setWishlist] = useState([]);
     const navigate = useNavigate();
     const [error, setError] = useState(null);
    useEffect(()=>{
   getWishlistByCustomerId();
    },[]);

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
            setError(error);
            return []; // Return an empty array if there's an error
        }
    };

   
    if (error || wishlist.length === 0) {
        return (
            <div style={{ display: 'flex', justifyContent: 'center', alignItems: 'center', height: '80vh' }}>
                <h2>Wishlist is Empty</h2>
            </div>
        );
    }
  return (
    <div>
        <br></br>
        <h3><center>Favourite Products</center></h3>
        <br></br>
        <div className='row my-3' style={{ padding: '10px'}}>
                    {wishlist.map((prod) => (
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
                                   
                                </MDBCardFooter>
                            </MDBCard>
                        </div>
                    ))}
                </div>
    </div>
  )
}

export default Wishlist
