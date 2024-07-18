import React, { useState } from 'react';
import './ForgotPassword.css';
import { userAxiosInstance } from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

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
      // setMessage(response.data.message);
      console.log(response.data.message);
      toast.success("OTP send to the email")
      setStep(2);
    } catch (error) {
      toast.error("Error, Try Again")
      // setMessage(error.response.data.error);
    }
  };

  const handleOtpSubmit = async () => {
    try {
      const response = await userAxiosInstance.post('/accounts/forgot-password-otp/', { email, otp });
      // setMessage(response.data.message);
      toast.success("OTP Verification is Successfull")
      setStep(3);
    } catch (error) {
      // setMessage(error.response.data.error);
      toast.error("OTP is invalid, Try Again")
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
        toast.success("Password Reset is Successfull, Please Login")
        setTimeout(() => {
          navigate('/login');
        }, 2000); //
      }

    } catch (error) {
      toast.error("Password Reset Failed, Try Again")
      // setMessage(error.response.data.error);
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
            <button className='forgot-password-button' onClick={handleEmailSubmit}>Send OTP</button>
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
              <button className='forgot-password-button' onClick={handleOtpSubmit}>Verify OTP</button>
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
            <button className='forgot-password-button' onClick={handlePasswordReset}>Reset Password</button>
          </div>
        )}
        
        {message && <p className="message">{message}</p>}
      </div>
      <ToastContainer/>
    </div>
  );
}

export default ForgotPassword;
