import React, { useState } from 'react';
import { useNavigate , Link } from 'react-router-dom';
import { userAxiosInstance } from '../../services/axiosInstance';
import "./Signup.css";

function Signup() {
  const [formData, setFormData] = useState({
    username: '',
    full_name: '',
    momentus_user_name: '',
    password: ''
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState(null);
  const [validationErrors, setValidationErrors] = useState({});

  const navigate = useNavigate();

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const validateForm = () => {
    const errors = {};
    const { username, full_name, momentus_user_name, password } = formData;

    // Username validation
    if (!username.includes('@')) {
      errors.username = 'Email must contain "@" symbol.';
    }

    // Momentus username validation
    if (momentus_user_name.length < 6) {
      errors.momentus_user_name = 'Username must be at least 6 characters long.';
    }
    if (!/^[A-Za-z_]+$/.test(momentus_user_name)) {
      errors.momentus_user_name = 'Username can only contain letters and underscores.';
    }

    // Password validation
    if (password.length < 6) {
      errors.password = 'Password must be at least 6 characters long.';
    }
    if (!/[A-Z]/.test(password)) {
      errors.password = 'Password must contain at least one uppercase letter.';
    }
    if (!/[0-9]/.test(password)) {
      errors.password = 'Password must contain at least one digit.';
    }
    if (!/[!@#$%^&*()_+={}\[\]|\\:;\'",.<>?/-]/.test(password)) {
      errors.password = 'Password must contain at least one special character.';
    }

    return errors;
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const errors = validateForm();

    if (Object.keys(errors).length > 0) {
      setValidationErrors(errors);
      return;
    }

    const { username, full_name, momentus_user_name, password } = formData;

    try {
      setLoading(true);
      setError(null);
      setValidationErrors({});

      const formDataToSend = {
        username,
        full_name,
        momentus_user_name,
        password
      };

      const response = await userAxiosInstance.post('/accounts/register/', formDataToSend);

      if (response.status === 201) {
        navigate(`/otp-verification/${response.data.user}`);
      }
    } catch (error) {
      if (error.response && error.response.data && error.response.data.error) {
        if (typeof error.response.data.error === 'string') {
          setError(error.response.data.error);
        } else {
          setValidationErrors(error.response.data.error);
        }
      } else {
        setError('Registration failed. Please try again.');
      }
      console.error(error);
    } finally {
      setLoading(false);
    }
  };

  return (
    <div className="signup-container">
      <h1>Momentus</h1>
      <form onSubmit={handleSubmit} className="signup-form">
        <input
          type="text"
          name="username"
          placeholder="Email"
          value={formData.username}
          onChange={handleChange}
        />
        {validationErrors.username && <p className="error-message">{validationErrors.username}</p>}

        <input
          type="text"
          name="full_name"
          placeholder="Full Name"
          value={formData.full_name}
          onChange={handleChange}
        />

        <input
          type="text"
          name="momentus_user_name"
          placeholder="Momentus Username"
          value={formData.momentus_user_name}
          onChange={handleChange}
        />
        {validationErrors.momentus_user_name && <p className="error-message">{validationErrors.momentus_user_name}</p>}

        <input
          type="password"
          name="password"
          placeholder="Password"
          value={formData.password}
          onChange={handleChange}
        />
        {validationErrors.password && <p className="error-message">{validationErrors.password}</p>}

        <button type="submit">{loading ? "Loading..." : "Register"}</button>
      </form>
      {error && <p className="error-message">{error}</p>}
      <p>
        Already have an account? <Link to="/login">Log In</Link>
      </p>
    </div>
  );
}

export default Signup;
