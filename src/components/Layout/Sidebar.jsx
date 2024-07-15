import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file for styling
import AddImageModal from '../Modal/AddImageModal';
import { FaBars } from 'react-icons/fa';

const Sidebar = () => {
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [isSidebarOpen, setIsSidebarOpen] = useState(false);

    const handleCreateClick = () => {
        setIsModalOpen(true);
    };

    const handleCloseModal = () => {
        setIsModalOpen(false);
    };

    const toggleSidebar = () => {
        setIsSidebarOpen(!isSidebarOpen);
    };

    return (
        <>
            <div className="hamburger-menu" onClick={toggleSidebar}>
                <FaBars size={30} />
            </div>
            <div className={`sidebar ${isSidebarOpen ? 'active' : ''}`}>
                <div className="sidebar-logo">
                    <h1>Momentus</h1>
                </div>
                <nav className="sidebar-nav">
                    <NavLink to="/" activeClassName="active" className="sidebar-link" onClick={toggleSidebar}>
                        <i className="fas fa-home"></i> Home
                    </NavLink>
                    <NavLink to="/search" activeClassName="active" className="sidebar-link" onClick={toggleSidebar}>
                        <i className="fas fa-search"></i> Search
                    </NavLink>
                    <NavLink to="/feed" activeClassName="active" className="sidebar-link" onClick={toggleSidebar}>
                        <i className="fa-regular fa-image"></i> Feed
                    </NavLink>
                    <NavLink to="/messages" activeClassName="active" className="sidebar-link" onClick={toggleSidebar}>
                        <i className="fas fa-envelope"></i> Messages
                    </NavLink>
                    <NavLink to="/notifications" activeClassName="active" className="sidebar-link" onClick={toggleSidebar}>
                        <i className="fas fa-bell"></i> Notifications
                    </NavLink>
                    <button onClick={handleCreateClick} className="sidebar-link create_button">
                        <i className="fa-solid fa-square-plus"></i> Create
                    </button>
                    <NavLink to="/profile" activeClassName="active" className="sidebar-link" onClick={toggleSidebar}>
                        <img src="https://i.pravatar.cc/300" alt="" /> Profile
                    </NavLink>
                    <NavLink to="/settings" activeClassName="active" className="sidebar-link" onClick={toggleSidebar}>
                        <i className="fas fa-cog"></i> Settings
                    </NavLink>
                </nav>
                <AddImageModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
        </>
    );
};

export default Sidebar;
