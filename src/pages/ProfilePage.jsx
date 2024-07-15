import React from 'react';
import Profile from '../components/Profile/Profile';
import Sidebar from '../components/Layout/Sidebar';
import './ProfilePage.css'; // Import the CSS file for styling

function ProfilePage() {
    return (
        <div className="profile-page">
            <Sidebar />
            <div className="content">
                <Profile />
            </div>
        </div>
    );
}

export default ProfilePage;
