import React, { useState, useEffect } from 'react';
import './PostManagement.css';
import axios from 'axios';

const PostManagementPage = () => {
    const [posts, setPosts] = useState([]);
    const [loading, setLoading] = useState(true);

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await axios.get('http://127.0.0.1:8000/posts/');
                if (Array.isArray(response.data)) {
                    setPosts(response.data);
                } else {
                    console.error('Unexpected response structure:', response.data);
                }
            } catch (error) {
                console.error('Error fetching posts:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchPosts();
    }, []);

    const handleToggleBlock = async (postId) => {
        const post = posts.find(post => post.id === postId);
        try {
            await axios.patch(`http://127.0.0.1:8000/post/${postId}/block/`, {
                is_blocked: !post.is_blocked
            });

            setPosts(posts.map(p =>
                p.id === postId ? { ...p, is_blocked: !p.is_blocked } : p
            ));
        } catch (error) {
            console.error('Error updating post block status:', error);
        }
    };

    if (loading) {
        return <div>Loading...</div>;
    }

    return (
        <div className="post-management">
            <h1 className="post-management__title">Post Management</h1>
            <table className="post-management__table">
                <thead>
                    <tr>
                        <th>Post ID</th>
                        <th>Posted User</th>
                        <th>Post Image</th>
                        <th>Post Caption</th>
                        <th>Block/Unblock</th>
                    </tr>
                </thead>
                <tbody>
                    {posts.map((post) => (
                        <tr key={post.id}>
                            <td>{post.id}</td>
                            <td>{post.momentus_user_name}</td>
                            <td>
                                <img
                                    src={post.image_url || 'https://via.placeholder.com/50'}
                                    alt="Post"
                                    className="post-management__image"
                                />
                            </td>
                            <td>{post.caption}</td>
                            <td>
                                <button 
                                    onClick={() => handleToggleBlock(post.id)}
                                    className={`post-management__toggle-button ${post.is_blocked ? 'post-management__toggle-button--blocked' : 'post-management__toggle-button--unblocked'}`}
                                >
                                    {post.is_blocked ? 'Unblock' : 'Block'}
                                </button>
                            </td>
                        </tr>
                    ))}
                </tbody>
            </table>
        </div>
    );
};

export default PostManagementPage;
