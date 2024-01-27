import React,{useState} from 'react'
import LoginIcon from '@material-ui/icons/AccountCircle';
import { Button } from '@material-ui/core';
import { useNavigate } from 'react-router';
import { toast } from 'react-toastify';
import './SignupForm.css'
import emailjs from '@emailjs/browser';
import GoogleOauthTest from './GoogleOAuth';



import {
    MDBContainer,
    MDBRow,
    MDBCol,
    MDBCard,
    MDBCardBody,
    MDBInput,
  } from 'mdb-react-ui-kit';

function SignupForm() {
    const [name, setname] = useState('');
    const [email, setemail] = useState('');
    const [password, setpassword] = useState('');
    const [mobile, setmobile] = useState('');
    const [confirmpassword, setconfirmpassword] = useState('');
    const [emailExist, setEmailExist] = useState(false);
    const [check, setcheck] = useState(false);
    const [errorMsg, seterrorMsg] = useState('');
    const [errorMsg1, seterrorMsg1] = useState('');
    const [errorMsg2, seterrorMsg2] = useState('');
    const [errorMsg3, seterrorMsg3] = useState('');
    const [errorMsg4, seterrorMsg4] = useState('');
    const navigate = useNavigate();
    async function Signup() {
      try {
        console.log({ name, email, password, mobile, confirmpassword });
        if (password === confirmpassword) {
         
          let item = { name, email, password, mobile, confirmpassword };
          let result = await fetch('https://localhost:7131/api/Signup', {
            method: 'POST',
            body: JSON.stringify(item),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          result = await result.json();
          console.log(result)
          console.log(result.status);
          if(result.status !== 400 && result!=="Email is already registered. Please login.")
          {
            toast.success("Signup Successfull");
            const serviceId = "service_lr9mb09";
            const templateId = "template_hjtky3k";
            const publicKey ="KqXYWVyrbahI8eQ88";
      console.log(localStorage.getItem('PEmail'));
            const templateParams = {
                     from_name : "ShopSphere",
                      to_email : email,
                     to_name:name,
                     message : "Welcome to ShopShere, explore all the fashionable things here",
      
            };
      
        emailjs.send(serviceId,templateId,templateParams,publicKey)
        .then(() => {
          
          toast.success("Email sent Successfully");
        })
        .catch((emailError) => {
          
          console.error("Error sending email:", emailError);
        }); 
           
          }
          else
          {
            toast.error("Signup UnSucessfull");
          }
  
          console.warn('result', result);
          
          const notification =  "New Signup Detected";
          localStorage.setItem("notification",notification);
        } else {
          setcheck(true);
        }
        if (name === '' || email === '' || password === '' || confirmpassword === '' || mobile === '') {
          alert('Please Fill all the input fields');
        }
      } catch (error) {
        console.log(error);
        toast.error("Signup unsucessfull");
      }
    }
    async function Check() {
      try {
        if (password === confirmpassword) {
          let item1 = { email };
          let result1 = await fetch(`https://localhost:7131/api/Signup/CheckEmailExist?email=${email}`, {
            method: 'POST',
            body: JSON.stringify(item1),
            headers: {
              'Content-Type': 'application/json',
              Accept: 'application/json',
            },
          });
          result1 = await result1.json();
          console.warn('result1', result1);
        
  
          if (result1 !== 1) {
          
          navigate('/login');
          } else {
            console.log('User already Exist');
            setEmailExist(true);
          }
        } else {
          setcheck(true);
        }
      } catch (error) {
        console.log(error);
      }
    }
  
    function Validate() {
      try {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  
        if (!emailRegex.test(email)) {
          seterrorMsg('Please enter a correct email');
          return false;
        }
  
        seterrorMsg('');
        return true;
      }
      catch (error) {
        console.log(error);
      }
    }
    function Validate2() {
      try {
        const mobileregex = /^[0-9]{10}$/;
  
        if (!mobileregex.test(mobile)) {
          seterrorMsg1('Please enter a valid Mobile Number');
          return false;
        }
        seterrorMsg1('');
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  
    function Validate3() {
      try {
        if (name === '') {
          seterrorMsg2('Please Input a Name');
          return false;
        }
        seterrorMsg2('');
        return true;
      } catch (error) {
        console.log(error);
      }
    }
    function Validate4() {
      try {
        if (password === '') {
          seterrorMsg3('Please Enter Password');
          return false;
        }
        seterrorMsg3('');
        return true;
      } catch (error) {
        console.log(error);
      }
    }
    function Validate5() {
      try {
        if (mobile === '0000000000') {
          seterrorMsg4('Please Enter a valid Number');
          return false;
        }
        seterrorMsg4('');
        return true;
      } catch (error) {
        console.log(error);
      }
    }
  
   
  
  
    const handleBoth = () => {
      if (Validate() && Validate2() && Validate3() && Validate4() && Validate5()) {
        Signup();
        Check();
      } else {
        toast.error('Validation failed. Please check the form.');
      }
    }
    
  return (
    <MDBContainer fluid className='p-4 background-radial-gradient overflow-hidden' style={{ minHeight: '100vh' }}>
      
      <MDBRow>
        <MDBCol md='6' className='text-center text-md-start d-flex flex-column justify-content-center'>
          <h3 className="my-5 display-3 fw-bold ls-tight px-3" style={{ color: 'hsl(218, 81%, 95%)' }}>
            Welcome To<br />
            <span style={{ color: 'hsl(218, 81%, 75%)' }}>ShopSphere</span>
          </h3>
          <p className='px-3' style={{ color: 'hsl(218, 81%, 85%)' }}>
          "Welcome to ShopSphere, your premier destination for a seamless shopping experience. Discover a curated collection of high-quality products that blend style, affordability, and innovation. From trendy fashion and cutting-edge electronics to everyday essentials, our platform offers a diverse range of items to cater to your unique needs. Enjoy the convenience of secure online transactions, fast shipping, and a user-friendly interface that makes shopping a breeze. Join our community of satisfied customers and elevate your online shopping journey with ShopSphere.
          </p>
        </MDBCol>
        <MDBCol md='6' className='position-relative'>
          <div id="radius-shape-1" className="position-absolute rounded-circle shadow-5-strong"></div>
          <div id="radius-shape-2" className="position-absolute rounded-circle shadow-5-strong" style={{ marginBottom: '-100px' }}></div>
          <MDBCard className='my-5 bg-glass'>
            <MDBCardBody className='p-5'>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label="Name" value={name} onChange={(e) => setname(e.target.value)} required type="text" />
                  {errorMsg2 ? <p style={{ color: 'red' }}>{errorMsg2}</p> : ''}
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Email' value={email} onChange={(e) => setemail(e.target.value)} required type='text' />
                  {errorMsg ? <p style={{ color: 'red' }}>{errorMsg}</p> : ''}

                </MDBCol>
              </MDBRow>
              <MDBRow>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Password' type='password' value={password} onChange={(e) => setpassword(e.target.value)} required />
                  {errorMsg3 ? <p style={{ color: 'red' }}>{errorMsg3}</p> : ''}
                </MDBCol>
                <MDBCol xs='12' sm='6'>
                  <MDBInput wrapperClass='mb-4' label='Confirm Password' type='password' value={confirmpassword} onChange={(e) => setconfirmpassword(e.target.value)} required />
                </MDBCol>
              </MDBRow>
              <MDBInput wrapperClass='mb-4' label='Mobile' type='number' value={mobile} onChange={(e) => setmobile(e.target.value)} required />
              {errorMsg1 ? <p style={{ color: 'red' }}>{errorMsg1}</p> : ''}
              {errorMsg4 ? <p style={{ color: 'red' }}>{errorMsg4}</p> : ''}
              <Button startIcon={<LoginIcon />} onClick={handleBoth} color="primary" variant="contained">
                Signup
              </Button>
              {emailExist ? <p style={{ color: "red" }}> Email Already Exists. Login to Continue.</p> : ''}
              {check ? 'Password Mismatch' : ''}
              <p>Already have an account? <a href="/login"> Login </a></p>

             <GoogleOauthTest/>
            

            </MDBCardBody>
          </MDBCard>
        </MDBCol>
      </MDBRow>
    </MDBContainer>
  )
}

export default SignupForm