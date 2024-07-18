import './App.css';
import { BrowserRouter, Routes, Route , Navigate  } from 'react-router-dom';
import LoginPage from './pages/LoginPage';
import SignupPage from './pages/SignupPage';
import HomePage from './pages/HomePage';
import OtpVerification from './components/Auth/OtpVerification';
import ProtectedRoute from './components/Auth/ProtectedRoute';
import NotFound from './pages/NotFound';
import ForgotPassword from './components/Auth/ForgotPassword';
import ProfilePage from './pages/ProfilePage';
import AdminHome from './pages/AdminHome';
import UserManagementPage from './pages/UserManagementPage';
import AdminLogin from "./components/Auth/AdminLogin"

function Logout(){
  localStorage.clear()
  return <Navigate to="/login" />
}


function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/login" element={<LoginPage />} />
          <Route path="/signup" element={< SignupPage />} />
          <Route path='/logout' element={ <Logout/> } />
          <Route path="/" element={ <ProtectedRoute><HomePage /></ProtectedRoute> } />
          <Route path="/otp-verification/:id" element={<OtpVerification />} />
          <Route path="/forgot-password" element={<ForgotPassword />} />
          <Route path="/profile" element={ <ProtectedRoute> <ProfilePage /> </ProtectedRoute> } />
          <Route path="/admin-login" element={< AdminLogin/>} />
          <Route path="/admin-home" element={< AdminHome/>} />
          <Route path="/usermanagement" element={< UserManagementPage/>} />
          <Route path='*' element={ <NotFound/> } />
        </Routes>
      </BrowserRouter>
    </>
  );
}

export default App;
