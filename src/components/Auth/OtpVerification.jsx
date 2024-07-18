import React, { useState } from 'react';
import './OtpVerification.css';
import { userAxiosInstance } from '../../services/axiosInstance';
import { useNavigate , useParams } from 'react-router-dom';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';

const OtpVerification = () => {
  const [otp, setOtp] = useState(['', '', '', '']);
  const [isSubmitted, setIsSubmitted] = useState(false);
  const [error, setError] = useState(null);
  const navigate = useNavigate();
  const params = useParams();

  const handleChange = (element, index) => {
    const value = element.value.replace(/[^0-9]/g, '');
    if (value.length <= 1) {
      const newOtp = [...otp];
      newOtp[index] = value;
      setOtp(newOtp);

      if (value !== '' && index < 3) {
        document.getElementById(`otp-input-${index + 1}`).focus();
      }
    }
  };

  const handleSubmit = async (event) => {
    event.preventDefault();
    if (otp.every((digit) => digit !== '')) {
      const verificationCode = otp.join('');
      const { id } = params;
      try {
        const response = await userAxiosInstance.post('/accounts/verify-email/', {
          verification_code: verificationCode,
          user_id: id
        });
        if (response.status === 200) {
          setIsSubmitted(true);
          setError(null);
          toast.success("Otp verified, Please Login")
          setTimeout(() => {
            navigate('/login');
          }, 2000); 

        }
      } catch (error) {
        setError('Invalid OTP. Please try again.');
        console.error('Error verifying OTP:', error.response.data);
        toast.error("Invalid Otp")
      }
    }
  };

  return (
    <div className="otp-container">
      <h2 className="otp-heading">OTP Verification</h2>
      <form className="otp-form" onSubmit={handleSubmit}>
        <div className="otp-input-container">
          {otp.map((data, index) => (
            <input
              key={index}
              type="text"
              maxLength="1"
              value={data}
              onChange={(e) => handleChange(e.target, index)}
              id={`otp-input-${index}`}
              className="otp-input"
            />
          ))}
        </div>
        <button type="submit" className="otp-button">
          Verify OTP
        </button>
      </form>
      {isSubmitted && <p className="otp-verified-message">OTP Verified!</p>}
      {error && <p className="otp-error-message">{error}</p>}
      <ToastContainer />
    </div>
  );
};

export default OtpVerification;
