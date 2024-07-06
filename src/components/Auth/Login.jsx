import React, { useState } from 'react';
import './Login.css'; // You can style this component using a CSS file

function Login() {
  const [formData, setFormData] = useState({
    identifier: '',
    password: ''
  });

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Handle form submission logic here
  };

  const handleGoogleAuth = () => {
    // Handle Google Authentication logic here
  };

  return (
    <div className="login-container">
      <h1>Momentus</h1>
      <form onSubmit={handleSubmit} className="login-form">
        <input
          type="text"
          name="identifier"
          placeholder="Mobile Number, Email, or Username"
          value={formData.identifier}
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
        <button type="button" onClick={handleGoogleAuth} className="google-auth-button">
          Log In with Google
        </button>
      </form>
      <p>
        Don't have an account? <a href="/signup">Sign up</a>
      </p>
    </div>
  );
}

export default Login;
