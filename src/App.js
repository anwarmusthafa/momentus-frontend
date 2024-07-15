import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import OtpVerification from './components/Auth/OtpVerification';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import ForgotPassword from './components/Auth/ForgotPassword';
function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={< SignupPage />} />
          <Route path="/" element={ <ProtectedRoute><HomePage /></ProtectedRoute> } />
          <Route path="/otp-verification/:id" element={<OtpVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
