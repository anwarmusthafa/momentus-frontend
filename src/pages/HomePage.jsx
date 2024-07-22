// HomePage.js
import React, { useEffect, useState } from 'react';
import Sidebar from '../components/Layout/Sidebar';
import { userAxiosInstance } from '../services/axiosInstance';
import { useDispatch } from 'react-redux';
import { userLogin } from '../redux/slices/profileSlice';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

  useEffect(() => {
    
    setLoading(true);
    const fetchProfile = async () => {
      try {
        const response = await userAxiosInstance.get('accounts/my-profile/');
        dispatch(userLogin(response.data));
        setLoading(false);
      } catch (error) {
        console.error(error);
      }
    };

    fetchProfile();
  }, [dispatch]);

  return (
    <div>
      <Sidebar />
    </div>
  );
}

export default HomePage;
