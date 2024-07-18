import React, { useState , useEffect } from 'react';
import './Login.css';
import { Link, useNavigate } from 'react-router-dom';
import { userAxiosInstance } from '../../services/axiosInstance';
import { USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from '../../services/constants';

function Login() {
  const [formData, setFormData] = useState({
    username: '',
    password: ''
  });
  const [error, setError] = useState(null);
  const navigate = useNavigate();

  useEffect(() => {
    localStorage.clear();
  }, []);


  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    setError(null); // Clear previous error
    try {
      const response = await userAxiosInstance.post('/accounts/token/', formData);
      if (response.status === 200) {
        localStorage.setItem(USER_ACCESS_TOKEN, response.data.access);
        localStorage.setItem(USER_REFRESH_TOKEN, response.data.refresh);
        navigate('/');
      } else {
        console.error('Login failed:', response.data);
        setError('Login failed. Please check your username and password.');
      }
    } catch (error) {
      console.error('Login error:', error.response.data);
      setError('Login failed. Please check your username and password.');
    }
  };

  return (
    <div className="login-container">
      <h1>Momentus</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="username"
          placeholder="Mobile Number, Email, or Username"
          value={formData.username}
          onChange={handleChange}
          required
        />
        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
          required
        />
        <button type="submit">Log In</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p className='forgot-password'>
         <Link  to="/forgot-password">forgot password?</Link>
      </p>
      <p>
        Don't have an account? <Link to="/signup">Sign Up</Link>
      </p>
    </div>
  );
}

export default Login;
