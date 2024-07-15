import React, { useEffect, useState } from 'react';
import './Profile.css';
import { userAxiosInstance } from '../../services/axiosInstance';

const Profile = () => {
    const profile_data = localStorage.getItem('profile');
    const profile = profile_data ? JSON.parse(profile_data) : null;
    

    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src={profile?.profile_picture_url} alt="Profile" className="profile-image" />
                <div className="profile-info">
                    <h1>{profile?.momentus_user_name}</h1>
                    <button className="edit-profile-button">Edit Profile</button>
                    <div className="profile-stats">
                        <div className="profile-stat">
                            <span className="stat-number">123</span>
                            <span className="stat-label">Posts</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-number">456</span>
                            <span className="stat-label">Followers</span>
                        </div>
                        <div className="profile-stat">
                            <span className="stat-number">789</span>
                            <span className="stat-label">Following</span>
                        </div>
                    </div>
                    <div className="full-name">
                    <p className="bold-text">{profile?.full_name}</p>
                    </div>
                    <div className="profile-bio">
                        <p>{profile?.bio}</p>
                    </div>
                </div>
            </div>
            <div className="profile-gallery">
                {/* Sample images */}
                <img src="https://via.placeholder.com/300" alt="Gallery" className="gallery-image" />
                <img src="https://via.placeholder.com/300" alt="Gallery" className="gallery-image" />
                <img src="https://via.placeholder.com/300" alt="Gallery" className="gallery-image" />
                <img src="https://via.placeholder.com/300" alt="Gallery" className="gallery-image" />
                <img src="https://via.placeholder.com/300" alt="Gallery" className="gallery-image" />
                <img src="https://via.placeholder.com/300" alt="Gallery" className="gallery-image" />
            </div>
        </div>
    );
};

export default Profile;
