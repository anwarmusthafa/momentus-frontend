import React from 'react';
import { NavLink } from 'react-router-dom';
import './AdminSidebar.css'; // Import the CSS file for styling

const Sidebar = () => {
    return (
        <>
            <div className="hamburger-menu">
                {/* Hamburger menu icon */}
            </div>
            <div className="sidebar">
                <div className="sidebar-logo">
                    <h1>Momentus Admin</h1>
                </div>
                <nav className="sidebar-nav">
                <NavLink to="/admin-home" activeClassName="active" className="sidebar-link">
                        <i className="fas fa-search"></i> Dashboard
                    </NavLink>
                    <NavLink to="/usermanagement" activeClassName="active" className="sidebar-link">
                    <i class="fa-solid fa-user"></i> Users
                    </NavLink>
                    
                    <NavLink to="/postmanagement" activeClassName="active" className="sidebar-link">
                        <i className="fa-regular fa-image"></i> Posts
                    </NavLink>
                    {/* <NavLink to="/messages" activeClassName="active" className="sidebar-link">
                        <i className="fas fa-envelope"></i> Messages
                    </NavLink>
                    <NavLink to="/notifications" activeClassName="active" className="sidebar-link">
                        <i className="fas fa-bell"></i> Notifications
                    </NavLink>
                    <button className="sidebar-link create_button">
                        <i className="fa-solid fa-square-plus"></i> Create
                    </button>
                    <NavLink to="/profile" activeClassName="active" className="sidebar-link">
                        <img src="" alt="" /> Profile
                    </NavLink>
                    <NavLink to="/settings" activeClassName="active" className="sidebar-link">
                        <i className="fas fa-cog"></i> Settings
                    </NavLink> */}
                </nav>
            </div>
        </>
    );
};

export default Sidebar;
