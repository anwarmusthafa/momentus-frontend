import React from 'react';
import { Outlet } from 'react-router-dom';
import Sidebar from './Sidebar';
import Profile from "../Profile/Profile"

const Layout = () => {
  return (
    <div>
      {/* Optionally include a header or sidebar here */}
      <Sidebar/>
      <Profile/>
      <Outlet />
    </div>
  );
};

export default Layout;
