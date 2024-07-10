import { Navigate } from 'react-router-dom';
import { useState, useEffect } from 'react';
import { jwtDecode } from "jwt-decode";
import { adminAxiosInstance, userAxiosInstance } from '../../services/axiosInstance';
import { ADMIN_ACCESS_TOKEN, USER_ACCESS_TOKEN, USER_REFRESH_TOKEN , ADMIN_REFRESH_TOKEN } from '../../services/constants';

function ProtectedRoute({ children, admin = false }) {
    const [isAuthorized, setIsAuthorized] = useState(null);
    console.log("isAuthorized", isAuthorized);
    console.log("admin", admin);

    useEffect(() => {
        auth().catch(() => setIsAuthorized(false));
    }, []);

    const refreshToken = async () => {
        const refreshToken = localStorage.getItem(admin ? ADMIN_REFRESH_TOKEN : USER_REFRESH_TOKEN);
        try {
            const res = await (admin ? adminAxiosInstance : userAxiosInstance).post('/token/refresh/', {
                refresh: refreshToken,
            });
            if (res.status === 200) {
                localStorage.setItem(admin ? ADMIN_ACCESS_TOKEN : USER_ACCESS_TOKEN, res.data.access);
                setIsAuthorized(true);
            } else {
                setIsAuthorized(false);
            }
        } catch (error) {
            console.log(error);
            setIsAuthorized(false);
        }
    };

    const auth = async () => {
        const token = localStorage.getItem(admin ? ADMIN_ACCESS_TOKEN : USER_ACCESS_TOKEN);
        if (!token) {
            setIsAuthorized(false);
            return;
        }
        console.log("token", token);

        const decoded = jwtDecode(token);
        const tokenExpiration = decoded.exp;
        const now = Date.now() / 1000;

        if (tokenExpiration < now) {
            await refreshToken();
        } else {
            setIsAuthorized(true);
        }
    };

    if (isAuthorized === null) {
        return <div>Loading...</div>;
    }

    return isAuthorized ? children : <Navigate to="/login" />;
}

export default ProtectedRoute;
