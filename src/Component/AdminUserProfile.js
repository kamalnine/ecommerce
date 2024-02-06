import React,{useState,useEffect} from 'react'
import {
    MDBCard,
    MDBCardBody,
    MDBCardTitle,
    MDBCardText,
    MDBCardHeader,
    MDBCardFooter,
} from 'mdb-react-ui-kit';

function AdminUserProfile() {
    const[user,setUser] = useState([]);
    useEffect(() => {


       getUserList();
       
      }, []);
    function getUserList() {
        try {
          
         
          fetch('https://localhost:7131/api/Signup/GetSignup',{
            headers: {
            //   'Authorization': `Bearer ${token}`,
            //   'Content-Type': 'application/json'
              
            },
            
          })
            .then((response) => response.json())
            .then((data) => {
             setUser(data);
             
          })
            .catch((error) => {
              console.log(error);
            });
        }
        catch (error) {
          console.log(error);
        }
      
      }
  return (
  <div>
    <h2 className="text-center mt-5">User Profile</h2>
    <div className='row my-3' style={{ padding: '10px'}}>
                    {user.map((prod) => (
                        <div key={prod.signupid} className='col-md-4 mb-8'style={{marginBottom:"70px"}}>
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
                                 User ID:-  {prod.signupid}
                                </MDBCardHeader>
                                <MDBCardBody style={{ padding: '1rem', maxHeight: '150px' }}>
                                    <MDBCardTitle style={{ fontWeight: 'bold', fontSize: '1.2rem', marginBottom: '0.5rem' }}>
                                     User Name :-    {prod.name}
                                    </MDBCardTitle>
                                    <MDBCardText style={{ marginBottom: '1rem' }}>User Email :- {prod.email}</MDBCardText>
                                   
                                </MDBCardBody>
                                <MDBCardFooter
                                    style={{
                                        display: 'flex',
                                        justifyContent: 'space-between',
                                        alignItems: 'center',
                                        padding: '1rem',
                                    }}
                                >
                                    <button className='btn btn-primary mx-3'>{prod.mobile}</button>
                                  
                                </MDBCardFooter>
                            </MDBCard>
                        </div>
                    ))}
                </div>
  </div>
  )
}

export default AdminUserProfile
