import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader } from 'mdb-react-ui-kit';


function UserProfile() {
    const [user, setUser] = useState(null);
    const [addresses, setAddresses] = useState([]);

    useEffect(() => {
       
        fetchUserDetails();
        fetchAddress();
    }, []); 

    const fetchUserDetails = async () => {
        try {
            const id = localStorage.getItem('CustomerId');
            const response = await fetch(`https://localhost:7131/api/Signup/GetSignupById/${id}`); // Replace {id} with the actual user ID
            const userData = await response.json();
            setUser(userData);
        } catch (error) {
            console.error('Error fetching user details:', error);
        }
    };

    const fetchAddress = async () => {
        try {
            const customerid = localStorage.getItem('CustomerId');
            const response = await fetch(`https://localhost:7131/api/Adresses/GetAdressById/${customerid}`);
            if (response.ok) {
                const data = await response.json();
                setAddresses(data);
               
            }
        } catch (error) {
            console.error('Error fetching address:', error);
        }
    };

    return (
        <>
        <div style={{ display: 'flex', height: '15vh',marginTop:"7vh",marginLeft:"35vw" }}>
            <MDBCard style={{ width: '500px', height: '170px', boxShadow: '0 4px 8px 0 rgba(0, 0, 0, 0.2)', transition: '0.3s', borderRadius: '15px' }}>
                <MDBCardHeader><center>{user ? user.name : 'Loading...'}</center></MDBCardHeader>
                <MDBCardBody style={{ textAlign: 'center' }}>
                    {user ? (
                        <>
                            <MDBCardText>Email: {user.email}</MDBCardText>
                            <MDBCardText>Mobile: {user.mobile}</MDBCardText>
                        </>
                    ) : (
                        <MDBCardText>Loading...</MDBCardText>
                    )}
                </MDBCardBody>
            </MDBCard>


          
        </div>

        <div style={{ display: 'flex',gap:"30px", height: '40vh',marginTop:"20vh",marginLeft:"35vw", }}>
        {addresses.map((address, index) => (
                <MDBCard className="mb-3" key={index}>
                    <MDBCardBody>
                        <h5 className="card-title">Address {index + 1}</h5>
                        <MDBCardText>Street: {address.street}</MDBCardText>
                        <MDBCardText>City: {address.city}</MDBCardText>
                        <MDBCardText>State: {address.state}</MDBCardText>
                        <MDBCardText>Zip Code: {address.zipCode}</MDBCardText>
                        <MDBCardText>Country: {address.country}</MDBCardText>
                    </MDBCardBody>
                </MDBCard>
            ))}
        </div>
        
        </>
    );
}

export default UserProfile;
