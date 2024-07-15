import React, { useState } from 'react';
import './ForgotPassword.css';
import { userAxiosInstance } from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';

function ForgotPassword() {
  const [step, setStep] = useState(1);
  const [email, setEmail] = useState('');
  const [otp, setOtp] = useState('');
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [message, setMessage] = useState('');
  const navigate = useNavigate();

  const handleEmailSubmit = async () => {
    try {
      const response = await userAxiosInstance.post('/accounts/forgot-password/', { email });
      setMessage(response.data.message);
      console.log(response.data.message);
      setStep(2);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await userAxiosInstance.post('/accounts/forgot-password-otp/', { email, otp });
      setMessage(response.data.message);
      setStep(3);
    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  const handlePasswordReset = async () => {
    if (newPassword !== confirmPassword) {
      setMessage('Passwords do not match');
      return;
    }
    try {
      const response = await userAxiosInstance.post('/accounts/reset-password/', { email, otp, new_password: newPassword });
      setMessage(response.data.message);
      setEmail('');
      setOtp('');
      setNewPassword('');
      setConfirmPassword('');
      if (response.status === 200) {
        navigate('/login');
      }

    } catch (error) {
      setMessage(error.response.data.error);
    }
  };

  return (
    <div className="container">
      <div className="card">
        <h2>Forgot Password</h2>
        <div>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Enter your email"
            disabled={step > 1}
          />
          {step === 1 && (
            <button onClick={handleEmailSubmit}>Send OTP</button>
          )}
        </div>

        {step >= 2 && (
          <div>
            <input
              type="text"
              value={otp}
              onChange={(e) => setOtp(e.target.value)}
              placeholder="Enter OTP"
              disabled={step > 2}
            />
            {step === 2 && (
              <button onClick={handleOtpSubmit}>Verify OTP</button>
            )}
          </div>
        )}

        {step >= 3 && (
          <div>
            <input
              type="password"
              value={newPassword}
              onChange={(e) => setNewPassword(e.target.value)}
              placeholder="Enter new password"
            />
            <input
              type="password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              placeholder="Confirm new password"
            />
            <button onClick={handlePasswordReset}>Reset Password</button>
          </div>
        )}
        
        {message && <p className="message">{message}</p>}
      </div>
    </div>
  );
}

export default ForgotPassword;
