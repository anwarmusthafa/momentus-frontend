import React, { useState, useEffect, useRef } from 'react';
import './EditProfileModal.css'; // Import your CSS file here
import { userAxiosInstance } from '../../services/axiosInstance';
import { toast, ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';
import { useDispatch } from 'react-redux';
import { userLogin } from '../../redux/slices/profileSlice';

const EditProfileModal = ({ isOpen, onClose, user, onSave }) => {
    const [profilePicture, setProfilePicture] = useState('');
    const [username, setUsername] = useState('');
    const [fullName, setFullName] = useState('');
    const [bio, setBio] = useState('');
    const [initialProfilePicture, setInitialProfilePicture] = useState('');
    const [initialUsername, setInitialUsername] = useState('');
    const [initialFullName, setInitialFullName] = useState('');
    const [initialBio, setInitialBio] = useState('');
    const fileInputRef = useRef(null);
    const dispatch = useDispatch();

    useEffect(() => {
        if (user) {
            setProfilePicture(user.profile_picture_url || '');
            setUsername(user.momentus_user_name || '');
            setFullName(user.full_name || '');
            setBio(user.bio || '');
            setInitialProfilePicture(user.profile_picture_url || '');
            setInitialUsername(user.momentus_user_name || '');
            setInitialFullName(user.full_name || '');
            setInitialBio(user.bio || '');
        }
    }, [user]);

    const handleProfilePictureChange = (e) => {
        if (e.target.files[0]) {
            setProfilePicture(URL.createObjectURL(e.target.files[0]));
        }
    };

    const handleSave = async () => {
        const updatedFields = {};
        let hasChanges = false;
        if (profilePicture !== initialProfilePicture) {
            updatedFields.profile_picture = fileInputRef.current.files[0];  // Use actual file object
            hasChanges = true;
        }
        if (username !== initialUsername) {
            updatedFields.momentus_user_name = username;
            hasChanges = true;
        }
        if (fullName !== initialFullName) {
            updatedFields.full_name = fullName;
            hasChanges = true;
        }
        if (bio !== initialBio) {
            updatedFields.bio = bio;
            hasChanges = true;
        }
        if (!hasChanges) {
            toast.error("Please make any changes to submit.");
            return;  // Exit early if there are no changes
        }

        if (Object.keys(updatedFields).length > 0) {
            const formData = new FormData();
            Object.keys(updatedFields).forEach(key => {
                formData.append(key, updatedFields[key]);
            });

            try {
                const response = await userAxiosInstance.patch("/accounts/my-profile/", formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data'
                    }
                });
                console.log("Profile updated successfully", response);
                dispatch(userLogin(response.data));
                toast.success("Profile updated");
                onSave(); // Call onSave to refresh the profile data in the Profile component
                handleClose();

            } catch (error) {
                console.error("Error updating profile", error);
                let errorMessage = 'Error updating profile. Please try again.';
                
                if (error.response && error.response.data) {
                    const errorData = error.response.data;
                    
                    if (errorData.detail) {
                        errorMessage = errorData.detail;
                    } else if (typeof errorData === 'object') {
                        errorMessage = Object.values(errorData).flat().join(', ');
                    } else {
                        errorMessage = error.message;
                    }
                } else if (error.message) {
                    errorMessage = error.message;
                }
                
                console.error("Error updating profile", error);
                toast.error(errorMessage);
            }
        }
    };

    const handleClose = () => {
        setProfilePicture(user.profile_picture_url);
        setUsername(user.momentus_user_name);
        setFullName(user.full_name);
        setBio(user.bio);
        onClose();
    };

    const triggerFileInput = () => {
        fileInputRef.current.click();
    };

    if (!isOpen) return null;

    return (
        <div className="edit-profile-modal">
            <div className="edit-profile-modal-content">
                <button className="edit-profile-modal-close" onClick={handleClose}>X</button>
                <h2 className="edit-profile-modal-title">Edit Profile</h2>
                <div className="edit-profile-modal-profile-picture">
                    {profilePicture && (
                        <img src={profilePicture} alt="Profile" className="edit-profile-modal-profile-picture-img" />
                    )}
                    <button className="edit-profile-modal-change-picture-button" onClick={triggerFileInput}>
                        {profilePicture ? "Change Image" : "Add Image"}
                    </button>
                    <input
                        type="file"
                        accept="image/*"
                        onChange={handleProfilePictureChange}
                        className="edit-profile-modal-profile-picture-input"
                        ref={fileInputRef}
                        style={{ display: 'none' }}
                    />
                </div>
                <div className="edit-profile-modal-form">
                    <label className="edit-profile-modal-form-label">Username</label>
                    <input
                        type="text"
                        value={username}
                        onChange={(e) => setUsername(e.target.value)}
                        className="edit-profile-modal-form-input"
                    />
                    
                    <label className="edit-profile-modal-form-label">Full Name</label>
                    <input
                        type="text"
                        value={fullName}
                        onChange={(e) => setFullName(e.target.value)}
                        className="edit-profile-modal-form-input"
                    />

                    <label className="edit-profile-modal-form-label">Bio</label>
                    <textarea
                        value={bio}
                        onChange={(e) => setBio(e.target.value)}
                        className="edit-profile-modal-form-textarea"
                    ></textarea>

                    <button className="edit-profile-modal-save-button" onClick={handleSave}>Save</button>
                </div>
            </div>
            <ToastContainer />
        </div>
    );
};

export default EditProfileModal;
