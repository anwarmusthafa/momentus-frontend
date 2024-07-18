import React, { useState } from 'react';
import './AdminLogin.css'; // Import the CSS file for styling
import { adminAxiosInstance } from '../../services/axiosInstance';
import { ADMIN_ACCESS_TOKEN, ADMIN_REFRESH_TOKEN } from '../../services/constants';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const AdminLoginForm = () => {
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    // Handle form submission, e.g., make an API call to authenticate the admin
    try{
      const response = await adminAxiosInstance.post("/admin-login/",{username,password});
      
      if (response.status === 200){
        localStorage.setItem(ADMIN_ACCESS_TOKEN, response.data.access);
      localStorage.setItem(ADMIN_REFRESH_TOKEN, response.data.access);
      navigate('/admin-home')

      }

    }catch(error){
      toast.error("Username or password is invalid, Try Again")

    }
  };

  return (
    <div className="admin-login-form-container">
      <div className="admin-login-form">
        <h2>Admin Login</h2>
        <form onSubmit={handleSubmit}>
          <div className="admin-form-group">
            <label htmlFor="admin-username">Username:</label>
            <input
              type="text"
              id="admin-username"
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              required
            />
          </div>
          <div className="admin-form-group">
            <label htmlFor="admin-password">Password:</label>
            <input
              type="password"
              id="admin-password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </div>
          <button type="submit" className="admin-login-button">Login</button>
        </form>
      </div>
      <ToastContainer/>
    </div>
  );
};

export default AdminLoginForm;
