import React, { useEffect, useState } from 'react';
import { MDBCard, MDBCardBody, MDBCardText, MDBCardHeader } from 'mdb-react-ui-kit';


function UserProfile() {
    const [user, setUser] = useState(null);

    useEffect(() => {
        // Fetch user details based on login and set user state
        fetchUserDetails();
    }, []); // Empty dependency array ensures this effect runs only once on component mount

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

    return (
        <div style={{ display: 'flex', height: '100vh',marginTop:"7vh",marginLeft:"35vw" }}>
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
    );
}

export default UserProfile;
