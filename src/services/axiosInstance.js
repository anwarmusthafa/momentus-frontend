import axios from 'axios';
import { ADMIN_ACCESS_TOKEN, ADMIN_REFRESH_TOKEN, USER_ACCESS_TOKEN, USER_REFRESH_TOKEN } from './constants';

// Function to get a new access token using the refresh token
const refreshToken = async (refreshToken) => {
    try {
        const response = await axios.post('http://127.0.0.1:8000/accounts/token/refresh/', {
            refresh: refreshToken
        });
        return response.data.access;
    } catch (error) {
        throw error;
    }
};

// Create axios instances for user and admin
export const userAxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

export const adminAxiosInstance = axios.create({
    baseURL: 'http://127.0.0.1:8000'
});

// Axios request interceptor for user instance
userAxiosInstance.interceptors.request.use((config) => {
    if (config.url === '/accounts/register/' || config.url === '/accounts/token/' || config.url === '/accounts/verify-email/') {
        // Do not add the Authorization header
    } else {
        const token = localStorage.getItem(USER_ACCESS_TOKEN);
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Axios response interceptor for user instance to handle token expiration
userAxiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshTokenValue = localStorage.getItem(USER_REFRESH_TOKEN);
        if (refreshTokenValue) {
            try {
                const newAccessToken = await refreshToken(refreshTokenValue);
                localStorage.setItem(USER_ACCESS_TOKEN, newAccessToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token', refreshError);
                // Optionally redirect to login page
            }
        }
    }
    return Promise.reject(error);
});

// Axios request interceptor for admin instance
adminAxiosInstance.interceptors.request.use((config) => {
    const token = localStorage.getItem(ADMIN_ACCESS_TOKEN);
    if (token) {
        config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
}, (error) => {
    return Promise.reject(error);
});

// Axios response interceptor for admin instance to handle token expiration
adminAxiosInstance.interceptors.response.use((response) => {
    return response;
}, async (error) => {
    const originalRequest = error.config;
    if (error.response.status === 401 && !originalRequest._retry) {
        originalRequest._retry = true;
        const refreshTokenValue = localStorage.getItem(ADMIN_REFRESH_TOKEN);
        if (refreshTokenValue) {
            try {
                const newAccessToken = await refreshToken(refreshTokenValue);
                localStorage.setItem(ADMIN_ACCESS_TOKEN, newAccessToken);
                axios.defaults.headers.common['Authorization'] = `Bearer ${newAccessToken}`;
                originalRequest.headers['Authorization'] = `Bearer ${newAccessToken}`;
                return axios(originalRequest);
            } catch (refreshError) {
                console.error('Failed to refresh token', refreshError);
                // Optionally redirect to admin login page
            }
        }
    }
    return Promise.reject(error);
});

export default { userAxiosInstance, adminAxiosInstance };
