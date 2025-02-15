import React, { useState } from 'react';
import { NavLink } from 'react-router-dom';
import './Sidebar.css'; // Import the CSS file for styling
import AddImageModal from '../Modal/AddImageModal';
import { FaBars } from 'react-icons/fa';
import { useSelector } from 'react-redux';

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

    const profile = useSelector((state) => state.profile.profile);

    // Default profile picture URL
    const defaultProfilePicture = 'https://via.placeholder.com/40'; // Replace with your preferred default image URL

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
                    <NavLink to="/" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")} onClick={toggleSidebar}>
                        <i className="fas fa-home"></i> Home
                    </NavLink>
                    <NavLink to="/search" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")} onClick={toggleSidebar}>
                        <i className="fas fa-search"></i> Search
                    </NavLink>
                    <NavLink to="/explore" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")} onClick={toggleSidebar}>
                        <i className="fa-regular fa-image"></i> Explore
                    </NavLink>
                    <NavLink to="/messages" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")} onClick={toggleSidebar}>
                        <i className="fas fa-envelope"></i> Messages
                    </NavLink>
                    <NavLink to="/notifications" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")} onClick={toggleSidebar}>
                        <i className="fas fa-bell"></i> Notifications
                    </NavLink>
                    <button onClick={handleCreateClick} className="sidebar-link create_button">
                        <i className="fa-solid fa-square-plus"></i> Create
                    </button>
                    <NavLink 
                      to={`/profile/${profile?.momentus_user_name}`} 
                      className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")} 
                      onClick={toggleSidebar}
                    >
                      <img src={profile?.profile_picture_url || defaultProfilePicture} alt="Profile" />
                      Profile
                    </NavLink>
                    <NavLink to="/settings" className={({ isActive }) => (isActive ? "active sidebar-link" : "sidebar-link")} onClick={toggleSidebar}>
                        <i className="fas fa-cog"></i> Settings
                    </NavLink>
                </nav>
                <AddImageModal isOpen={isModalOpen} onClose={handleCloseModal} />
            </div>
        </>
    );
};

export default Sidebar;
