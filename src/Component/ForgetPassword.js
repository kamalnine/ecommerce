import React, { useState } from 'react';
import { ToastContainer, toast } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate } from 'react-router';
import { IoIosArrowBack } from "react-icons/io";

function UpdatePasswordForm() {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleUpdatePassword = async () => {
    try {
      const response = await fetch(`https://localhost:7131/api/Signup/UpdatePassword?email=${encodeURIComponent(email)}&password=${encodeURIComponent(password)}&confirmpassword=${encodeURIComponent(confirmPassword)}`, {
        method: 'PATCH',
      });

      const data = await response.json();

      console.log(data);

      if (response.ok) {
        setMessage('Password updated successfully');
      } 
    } catch (error) {
   
        toast.success('🦄 Password updated sucessfully!', {
            position: "top-right",
            autoClose: 2000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "dark",
    
          });
          setTimeout(() => {
            navigate('/login');
        }, 2000);
    }
  };

  return (
    <div className="container mt-5">
         <IoIosArrowBack onClick={() => navigate('/login')} style={{ position: "absolute", top: "13vh", left: "6vw", fontSize: "50px" }} />
         <ToastContainer
        position="top-right"
        autoClose={2000}
        hideProgressBar={false}
        newestOnTop={false}
        closeOnClick
        rtl={false}
        pauseOnFocusLoss
        draggable
        pauseOnHover
        theme="dark"

      />
      <h2 className="mb-4">Update Password</h2>
      <div className="mb-3">
        <label htmlFor="email" className="form-label">Email:</label>
        <input type="email" className="form-control" id="email" value={email} onChange={(e) => setEmail(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="password" className="form-label">New Password:</label>
        <input type="password" className="form-control" id="password" value={password} onChange={(e) => setPassword(e.target.value)} />
      </div>
      <div className="mb-3">
        <label htmlFor="confirmPassword" className="form-label">Confirm New Password:</label>
        <input type="password" className="form-control" id="confirmPassword" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} />
      </div>
      <button className="btn btn-primary" onClick={handleUpdatePassword}>Update Password</button>
      {message && <p className="mt-3">{message}</p>}
    </div>
  );
}

export default UpdatePasswordForm;
