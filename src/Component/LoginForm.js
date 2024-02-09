import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router';
import LoginIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { FaEye, FaEyeSlash } from 'react-icons/fa';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import {
  MDBContainer,
  MDBRow,
  MDBCol,
  MDBCard,
  MDBCardBody,
  MDBInput,
} from 'mdb-react-ui-kit';

function LoginForm({ setRole }) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();
  const [isLoggedIn, setIsLoggedIn] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');
  const [errorMsg1, setErrorMsg1] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [loggedIn, setLoggedIn] = useState(false);

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  useEffect(() => {
    fetchData();
  });

  const encodedpassword = encodeURIComponent(password);

  async function login() {
    localStorage.setItem('email', email);
    localStorage.setItem('password', password);
    console.warn({ email, password });

    try {
      let item = { email, password };
      let result = await fetch(`https://localhost:7131/api/Login?email=${email}&password=${encodedpassword}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item),
      });
      result = await result.json();
      localStorage.setItem('result', result);
      localStorage.setItem('par', result.token);
      localStorage.setItem('role', result.role);
      setRole(result.role);
      localStorage.setItem('Title', result.title);
      console.log(result);
      console.log(result.title);
      console.log(result.role);
      console.log(isLoggedIn);

      let item2 = { email, password };
      let result1 = await fetch(`https://localhost:7131/api/Login/GetName?email=${email}&password=${encodedpassword}`, {
        method: 'POST',
        headers: {
          Accept: 'application/json',
          'Content-Type': 'application/json',
        },
        body: JSON.stringify(item2),
      });
      result1 = await result1.json();
      console.log(result1);
      localStorage.setItem('name', result1);
      console.log(`Global name is ${result1}`);
      console.log(localStorage.getItem('name').length);

      if (result.title !== 'Unauthorized' && result.status !== 400) {
        localStorage.setItem('r', 'Authorized');
        setIsLoggedIn(true);
        navigate('/');
        toast.success('Login Successful!');
        setLoggedIn(true);
      } else {
        console.log('User not found');
        setIsLoggedIn(false);
        setLoggedIn(false);
        toast.error('🦄Login Unsuccessful!');
      }
    } catch (error) {
      console.log(error);
    }
    console.log(loggedIn);
    localStorage.setItem('log', isLoggedIn);
    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      setIsLoggedIn(false);
      setErrorMsg('Please Enter an Email Address in Valid format');
      try {
        toast.error('Please enter an email address in valid format');
      } catch (error) {
        console.log(error);
      }
      return false;
    }

    try {
      if (email === '') {
        setIsLoggedIn(true);
        setErrorMsg('Please Enter An Email');
        return false;
      }
      setErrorMsg('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const fetchData = async () => {
    try {
      const response = await fetch(`https://localhost:7131/api/Signup/GetSignupIdByEmail?email=${email}`, {});
      const jsonData = await response.json();
      console.log(jsonData);
      localStorage.setItem('CustomerId', jsonData);
    } catch (error) {
      console.log(error);
    }
  };

  function validate() {
    try {
      if (password === '') {
        setIsLoggedIn(true);
        setErrorMsg1('Please Enter A Password');
        return false;
      }
      setErrorMsg1('');
      return true;
    } catch (error) {
      console.log(error);
    }
  }

  const handleBoth = () => {
    login();
    validate();
  };

  return (
    <MDBContainer fluid style={{  backgroundImage: `url("https://thumbs.dreamstime.com/b/ecommerce-icon-special-blue-banner-background-ecommerce-icon-isolated-special-blue-banner-background-abstract-illustration-123108022.jpg")`,backgroundSize:"cover", minHeight: '100vh' }}>
      <ToastContainer />
      <MDBRow className='d-flex justify-content-center align-items-center h-100'>
        <MDBCol sm='12' md='6' lg='4'>
          
          <MDBCard className='bg-white my-5' style={{ borderRadius: '1rem', boxShadow: '0 0 10px rgba(0, 0, 0, 0.1)',backgroundImage:`url("https://thumbs.dreamstime.com/b/ecommerce-icon-special-blue-banner-background-ecommerce-icon-isolated-special-blue-banner-background-abstract-illustration-123108022.jpg")`,backgroundSize:"cover" }}>
            <MDBCardBody className='p-5'>
              <h2 className='fw-bold mb-4 text-center' style={{color:"white"}}>Login</h2>
              <p className='text-white-50 mb-4 text-center fw-bold'style={{color:"white"}} >Please enter your login and password!</p>
              <h5 style={{color:"white"}}>Email Address</h5>
              <MDBInput wrapperClass='mb-4' placeholder='Email' value={email} onChange={(e) => setEmail(e.target.value)} type='email' size='lg' />
              {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : ''}
              <h5 style={{color:"white"}}>Password</h5>
              <div style={{ position: 'relative' }}>
                <MDBInput
                  wrapperClass='mb-4'
                  placeholder='Password'
                  value={password}
                  onChange={(e) => setPassword(e.target.value)}
                  type={showPassword ? 'text' : 'password'}
                  size='lg'
                />
                <Button
                  type='Button'
                  onClick={toggleShowPassword}
                  style={{
                    position: 'absolute',
                    top: '50%',
                    right: '10px',
                    transform: 'translateY(-50%)',
                    border: 'none',
                    background: 'transparent',
                    cursor: 'pointer',
                  }}
                >
                  {showPassword ? <FaEye /> : <FaEyeSlash />}
                </Button>
              </div>
              {errorMsg1 ? <p style={{ color: 'red' }}>{errorMsg1}</p> : ''}
              <Button
                startIcon={<LoginIcon />}
                onClick={handleBoth}
                color='primary'
                variant='contained'
                fullWidth
                style={{ marginTop: '1rem' }}
              >
                Login
              </Button>
              {isLoggedIn ? null : (
                <p style={{ fontWeight: 'bold', color: 'red', textAlign: 'center', marginTop: '1rem' }}>
                  Email or Password is Incorrect
                </p>
              )}
              <p className='text-center mt-4' style={{color:"white"}}>
                New User? <a href='/signup' style={{color:"white"}}>Create Account</a>
              </p>
            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
      {/* <footer style={{color: 'white', padding: '20px', position: 'absolute', bottom: '0', width: '100%', textAlign: 'center' }}>
        &copy; {new Date().getFullYear()} Shopshere. All rights reserved.
      </footer> */}
    </MDBContainer>
  );
}

export default LoginForm;
