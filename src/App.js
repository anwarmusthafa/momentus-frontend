import React from 'react';
import { BrowserRouter, Routes, Route, Navigate } from 'react-router-dom';
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
import AdminLogin from "./components/Auth/AdminLogin";
import ViewPost from './components/Post/ViewPost';
import Layout from './components/Layout/Layout';
import SearchUserPage from './pages/SearchUserPage';
import ExplorePage from './pages/ExplorePage';

function Logout() {
  localStorage.clear();
  return <Navigate to="/login" />;
}

function App() {
  return (
    <BrowserRouter>
      <Routes>
        <Route path="/login" element={<LoginPage />} />
        <Route path="/signup" element={<SignupPage />} />
        <Route path="/logout" element={<Logout />} />
        <Route path="/otp-verification/:id" element={<OtpVerification />} />
        <Route path="/forgot-password" element={<ForgotPassword />} />
        <Route path="/admin-login" element={<AdminLogin />} />
        <Route path="/search" element={<ProtectedRoute ><SearchUserPage /></ProtectedRoute>} />
        <Route path="/explore" element={<ProtectedRoute >< ExplorePage /></ProtectedRoute>} />


        <Route path="/admin-home" element={<ProtectedRoute admin={true}><AdminHome /></ProtectedRoute>} />
        <Route path="/usermanagement" element={<ProtectedRoute admin={true}><UserManagementPage /></ProtectedRoute>} />

        <Route path="/" element={<ProtectedRoute><Layout /></ProtectedRoute>}>
          <Route index element={<HomePage />} />
          <Route path="post/:postId" element={<ViewPost />} />
          <Route path="profile/:momentusUsername" element={<ProfilePage />} />
        </Route>

        <Route path="*" element={<NotFound />} />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
