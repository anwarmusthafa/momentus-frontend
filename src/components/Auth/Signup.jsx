import React, { useState } from 'react';
import './Signup.css'; // You can style this component using a CSS file

function Signup() {
  const [formData, setFormData] = useState({
    mobileOrEmail: '',
    fullName: '',
    username: '',
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
    <div className="signup-container">
      <h1>Momentus</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="mobileOrEmail"
          placeholder="Mobile Number or Email"
          value={formData.mobileOrEmail}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="fullName"
          placeholder="Full Name"
          value={formData.fullName}
          onChange={handleChange}
          required
        />
        <input
          type="text"
          name="username"
          placeholder="Username"
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
        <button type="submit">Sign Up</button>
        <button type="button" onClick={handleGoogleAuth} className="google-auth-button">
          Sign Up with Google
        </button>
      </form>
      <p>
        Already have an account? <a href="/login">Log in</a>
      </p>
    </div>
  );
}

export default Signup;
