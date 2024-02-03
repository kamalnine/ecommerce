import React, { useState } from 'react';
import { FaFilter } from 'react-icons/fa';
import { useNavigate } from 'react-router-dom';
import { MDBCard, MDBCardBody, MDBCardTitle, MDBCardText, MDBCardHeader, MDBCardFooter } from 'mdb-react-ui-kit';

function PriceFilter() {
    const [minPrice, setMinPrice] = useState('');
    const [maxPrice, setMaxPrice] = useState('');
    const [products, setProducts] = useState([]);
    const navigate = useNavigate();
    const [error, setError] = useState('');

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await fetch(`https://localhost:7131/api/Product/GetProductsByPriceRange?minPrice=${minPrice}&maxPrice=${maxPrice}`);
            if (!response.ok) {
                throw new Error('Network response was not ok');
            }
            const data = await response.json();
            setProducts(data);
            setError('');
        } catch (error) {
            setError('Error fetching products. Please try again later.');
        }
    };

    return (
        <div className="container">
           <br></br>
           <br></br>
            <form onSubmit={handleSubmit}>
                <div className="row mb-3">
                    <div className="col-sm-6">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Minimum Price"
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            required
                        />
                    </div>
                    <div className="col-sm-6">
                        <input
                            type="number"
                            className="form-control"
                            placeholder="Maximum Price"
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            required
                        />
                    </div>
                </div>
                <button className="btn btn-primary" type="submit" style={{position:"absolute",right:"45vw"}}>
                    <FaFilter /> Filter Products
                </button>
                <br></br>
                <br></br>
                <br></br>

            </form>
            {error && <p className="text-danger">{error}</p>}
            <div className='row my-3'>
                {products.map((prod) => (
                    <div key={prod.productID} className='col-md-4 mb-8' style={{ marginBottom: "70px" }}>
                        <MDBCard onClick={() => navigate(`/productDetails?data1=${JSON.stringify(prod)}`)}
                            style={{
                                border: '1px solid #ddd',
                                boxShadow: '0 2px 6px rgba(0,0,0,0.1)',
                                borderRadius: '4px',
                                height: '100%',
                                width: '90%',
                                marginLeft: "70px",
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
                                        height: '100%',
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
                            </MDBCardFooter>
                        </MDBCard>
                    </div>
                ))}
            </div>
        </div>
    );
}

export default PriceFilter;
