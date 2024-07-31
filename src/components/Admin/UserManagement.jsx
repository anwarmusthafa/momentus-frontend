import React, { useState, useEffect } from 'react';
import './UserManagement.css';
import axios from 'axios';

const UserManagementPage = () => {
    const [users, setUsers] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchUsers = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/users/');
                if (Array.isArray(response.data)) {
                    setUsers(response.data);
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching users:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchUsers();
    }, []);

    const handleToggleBlock = async (userId) => {
        const user = users.find(user => user.id === userId);
        try {
            await axios.patch(`http://127.0.0.1:8000/user/${userId}/block/`, {
                is_blocked: !user.is_blocked
            });

            setUsers(users.map(u =>
                u.id === userId ? { ...u, is_blocked: !u.is_blocked } : u
            ));
        } catch (error) {
            console.error('Error updating user block status:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="user-management-page">
            <h1>User Management</h1>
            <table className="user-table">
                <thead>
                    <tr>
                        <th>Sl No</th>
                        <th>Profile Image</th>
                        <th>Email</th>
                        <th>Username</th>
                        <th>Block/Unblock</th>
                    </tr>
                </thead>
                <tbody>
                    {users.map((user, index) => (
                        <tr key={user.id}>
                            <td>{index + 1}</td>
                            <td>
                                <img
                                    src={user.profile_picture_url || 'https://via.placeholder.com/50'}
                                    alt="Profile"
                                    className="profile-image"
                                />
                            </td>
                            <td>{user.username}</td>
                            <td>{user.momentus_user_name}</td>
                            <td>
                                <button 
                                    onClick={() => handleToggleBlock(user.id)}
                                    className={`toggle-button ${user.is_blocked ? 'blocked' : 'unblocked'}`}
                                >
                                    {user.is_blocked ? 'Unblock' : 'Block'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default UserManagementPage;
