import React from 'react'
import Sidebar from '../components/Layout/Sidebar'
import { userAxiosInstance } from '../services/axiosInstance';
import { userLogin } from '../redux/slices/profileSlice';
import { useDispatch } from 'react-redux';
import { useEffect , useState } from 'react';

function HomePage() {
  const [loading, setLoading] = useState(true);
  const dispatch = useDispatch();

    useEffect(() => {
      setLoading(true);
        const fetchProfile = async () => {
            try {
                const response = await userAxiosInstance.get('accounts/get-profile/');
                dispatch(userLogin(response.data));
                setLoading(false);
            } catch (error) {
                console.error(error);
            }
        };

        fetchProfile();
    }, []);
  return (
    <div>
      <Sidebar />
      
    </div>
  )
}

export default HomePage
