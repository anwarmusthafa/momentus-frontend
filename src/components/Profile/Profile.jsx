import React, { useEffect, useState } from 'react';
import './Profile.css';
import { userAxiosInstance } from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/slices/profileSlice';
import EditProfileModal from '../Modal/EditProfileModal';

const Profile = () => {
  const profile = useSelector((state) => state.profile.profile);
  const [posts, setPosts] = useState([]);
  const [loading, setLoading] = useState(false);
  const [isEditProfileOpen, setisEditProfileOpen] = useState("");

  const dispatch = useDispatch();
  const navigate = useNavigate();

  useEffect(() => {
    setLoading(true);
    const fetchPosts = async () => {
      try {
        const response = await userAxiosInstance.get('my-posts');
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoading(false);
      }
    };

    fetchPosts();
  }, []);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/login');
  };

  const handleEditProfileClick = () => {
    setisEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setisEditProfileOpen(false);
  };

  const handleViewPost = (post) => {
    const scrollY = window.scrollY;
    navigate(`/post/${post.id}`, { state: { scrollY } });
  };

  return (
    <div className="profile-container">
      <div className="profile-header">
        <img src={profile?.profile_picture_url} alt="Profile" className="user-profile-image" />
        <div className="profile-info">
          <h1>{profile?.momentus_user_name}</h1>
          <div className="button-container">
            <button className="edit-profile-button" onClick={handleEditProfileClick}>Edit Profile</button>
            <button className="logout-button" onClick={handleLogout}>Logout</button>
          </div>
          <div className="profile-stats">
            <div className="profile-stat">
              <span className="stat-number">{posts.length}</span>
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
        {loading ? (
          <p>Loading...</p>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className='post-container' onClick={() => handleViewPost(post)}>
              <img
                src={post.image_url} // Adjust according to your post model
                alt={post.caption} // Adjust according to your post model
                className="gallery-image"
              />
            </div>
          ))
        ) : (
          <p className="text-center">No posts to show</p>
        )}
      </div>
      <EditProfileModal isOpen={isEditProfileOpen} user={profile} onClose={handleEditProfileClose} />
    </div>
  );
};

export default Profile;
