import React from 'react';
import axios from "axios";
import { useNavigate } from 'react-router';
import { GoogleOAuthProvider, GoogleLogin } from '@react-oauth/google';
import jwt_decode from "jwt-decode";
import { ToastContainer,toast } from 'react-toastify';
import  emailjs  from '@emailjs/browser';


const GoogleOauthTest = () => {
    const navigate = useNavigate();

    // Separate function for registering the user
    const registerUser = async (user) => {
      const password = "pass#123";
      try {
        const response = await axios.post('https://localhost:7131/api/Signup', {
          name: user.name,
          email: user.email,
          password: password,
          mobile: 9090909090,
          confirmPassword: password
        });
     console.log(response.status);
        if (response.status === 201) {
          const Googlesignup = "Authorized";
          localStorage.setItem("GoogleSignup",Googlesignup);
          console.log('User registered successfully!');
          toast.success("Signup Successfull");
            const serviceId = "service_lr9mb09";
            const templateId = "template_hjtky3k";
            const publicKey ="KqXYWVyrbahI8eQ88";
      console.log(localStorage.getItem('PEmail'));
            const templateParams = {
                     from_name : "ShopSphere",
                      to_email : user.email,
                     to_name:user.name,
                     message : "Welcome to ShopShere, explore all the fashionable things here",
      
            };
      
        emailjs.send(serviceId,templateId,templateParams,publicKey)
        .then(() => {
          
          toast.success("Email sent Successfully");
        })
        .catch((emailError) => {
          
          console.error("Error sending email:", emailError);
        }); 
          
          const notification = "New Signup Detected";
          localStorage.setItem("notification",notification);
          navigate('/home');

        } 
        else {
          console.error('Failed to register user.');
          toast.error("Signup Unsucessfull");
        }
      } catch (error) {
        console.error('Error registering user:', error);
      }
    }

    // Separate function for handling successful authentication
    const handleSuccess = async (ResponseCredential) => {
       
            const user = jwt_decode(ResponseCredential.credential);
            console.log('Authenticated!', user);
            const email = user.email;
            console.log(email);
            localStorage.setItem("email", email);
            const GoogleName = user.name;
            localStorage.setItem("name", GoogleName);
            const password = "pass#123";
  
            const encodedpassword = encodeURIComponent(password);
           
      
        
            const response = await axios.post(`https://localhost:7131/api/Login/GetDetails?email=${email}`);
            console.log(response);
            if (response.data === "Authorized") {
              console.log(response.data);
                localStorage.setItem('resultGoogle', response.data);
                navigate('/home');
            }  if (response.data === "Not Authorized") {
                await registerUser(user);
            }
           
            const response1 = await axios.post(`https://localhost:7131/api/Login/GetName?email=${email}&password=${encodedpassword}`);
            console.log(response1.data.token);
            localStorage.setItem("Token",response1.data.token);
            localStorage.setItem("role1",response1.data.role);
            window.location.reload();
    };

    const handleFailure = (error) => {
        console.error('Authentication failed:', error);
    };

    return (
        <div>
            <ToastContainer/>
            <GoogleOAuthProvider clientId="1010862499789-9v2al6mbhmvj158idvquochmj3s00hle.apps.googleusercontent.com">
                <GoogleLogin
                 text="continue_with"
                    onSuccess={credentialResponse => {
                        handleSuccess(credentialResponse);
                    }}
                    onError={() => {
                        handleFailure();
                    }}
                   
                />
            </GoogleOAuthProvider>
        </div>
    );
};

export default GoogleOauthTest;
