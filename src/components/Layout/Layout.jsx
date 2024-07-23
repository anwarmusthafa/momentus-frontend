import React from 'react';
import { Outlet, useLocation } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from "../Profile/Profile";

const Layout = () => {
  const location = useLocation();
  
  // Conditionally render Profile component based on route
  const showProfile = location.pathname.startsWith('/profile/');

  return (
    <div>
      <Sidebar />
      {showProfile && <Profile />}
      <Outlet /> {/* Render nested routes here */}
    </div>
  );
};

export default Layout;
