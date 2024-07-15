import React from 'react';
import './Profile.css';

const Profile = () => {
    return (
        <div className="profile-container">
            <div className="profile-header">
                <img src="https://i.pravatar.cc/300" alt="Profile" className="profile-image" />
                <div className="profile-info">
                    <h1>Username</h1>
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
                    <div className="profile-bio">
                        <p>Bio goes here. This is a sample bio.</p>
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
