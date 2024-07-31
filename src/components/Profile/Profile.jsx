import React, { useEffect, useState } from 'react';
import Skeleton from 'react-loading-skeleton';
import 'react-loading-skeleton/dist/skeleton.css';
import './Profile.css';
import { userAxiosInstance } from '../../services/axiosInstance';
import { useNavigate, useParams } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import { userLogout } from '../../redux/slices/profileSlice';
import EditProfileModal from '../Modal/EditProfileModal';

const Profile = () => {
  const [posts, setPosts] = useState([]);
  const [loadingProfile, setLoadingProfile] = useState(true);
  const [loadingPosts, setLoadingPosts] = useState(true);
  const [isEditProfileOpen, setIsEditProfileOpen] = useState(false);
  const [profile, setProfile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();
  const { momentusUsername } = useParams();
  const user = useSelector((state) => state.profile.profile);

  const fetchProfile = async () => {
    setLoadingProfile(true);
    try {
      const response = await userAxiosInstance.get(`/accounts/user-profile/${momentusUsername}/`);
      setProfile(response.data);
    } catch (error) {
      console.error(error);
    } finally {
      setLoadingProfile(false);
    }
  };

  useEffect(() => {
    fetchProfile();
  }, [momentusUsername]);

  useEffect(() => {
    const fetchPosts = async () => {
      setLoadingPosts(true);
      try {
        const response = await userAxiosInstance.get(`/my-posts/${momentusUsername}/`);
        setPosts(response.data);
      } catch (error) {
        console.error(error);
      } finally {
        setLoadingPosts(false);
      }
    };

    fetchPosts();
  }, [momentusUsername]);

  const handleLogout = () => {
    dispatch(userLogout());
    navigate('/login');
  };

  const handleEditProfileClick = () => {
    setIsEditProfileOpen(true);
  };

  const handleEditProfileClose = () => {
    setIsEditProfileOpen(false);
  };

  const handleViewPost = (post) => {
    navigate(`/post/${post.id}`, { state: { scrollY: window.scrollY } });
  };

  const handleProfileSave = () => {
    fetchProfile(); // Refresh profile data after saving
  };
  const defaultProfilePicture = 'https://via.placeholder.com/150'; // Replace with your preferred default image URL
  return (
    <div className="profile-container">
      <div className="profile-header">
        {loadingProfile ? (
          <>
            <Skeleton circle height={100} width={100} />
            <div className="profile-info">
              <Skeleton height={30} width={200} />
              <div className="button-container">
                <Skeleton height={35} width={100} />
                <Skeleton height={35} width={100} />
              </div>
              <div className="profile-stats">
                <Skeleton height={20} width={60} />
                <Skeleton height={20} width={60} />
                <Skeleton height={20} width={60} />
              </div>
              <div className="full-name">
                <Skeleton height={20} width={150} />
              </div>
              <div className="profile-bio">
                <Skeleton height={50} width={300} />
              </div>
            </div>
          </>
        ) : (
          <>
            <img src={profile?.profile_picture_url || defaultProfilePicture} alt="Profile" className="user-profile-image" />
            <div className="profile-info">
              <h1>{profile?.momentus_user_name}</h1>
              {user.id === profile?.id && (
                <div className="button-container">
                  <button className="edit-profile-button" onClick={handleEditProfileClick}>
                    Edit Profile
                  </button>
                  <button className="logout-button" onClick={handleLogout}>
                    Logout
                  </button>
                </div>
              )}
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
          </>
        )}
      </div>
      <div className="profile-gallery">
        {loadingPosts ? (
          <>
            <Skeleton count={6} height={200} width={200} />
          </>
        ) : posts.length > 0 ? (
          posts.map((post) => (
            <div key={post.id} className="post-container" onClick={() => handleViewPost(post)}>
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
      <EditProfileModal isOpen={isEditProfileOpen} user={profile} onClose={handleEditProfileClose} onSave={handleProfileSave} />
    </div>
  );
};

export default Profile;
