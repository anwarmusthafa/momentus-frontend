import React, { useState, useEffect } from 'react';
import './Explore.css'; // Import custom CSS file
import { userAxiosInstance } from '../../services/axiosInstance';
import { useNavigate } from 'react-router-dom';
// import ViewPostModal from '../Modal/ViewPostModal'; // Uncomment when adding modal functionality

const ExplorePosts = () => {
    const [posts, setPosts] = useState([]);
    const [error, setError] = useState('');
    const [selectedPost, setSelectedPost] = useState(null); // State to manage selected post
    const navigate = useNavigate();

    useEffect(() => {
        const fetchPosts = async () => {
            try {
                const response = await userAxiosInstance.get('/explore/');
                setPosts(response.data);
            } catch (error) {
                setError('Error fetching posts');
            }
        };

        fetchPosts();
    }, []);

    const handlePostClick = (post) => {
        navigate(`/post/${post.id}`);
    };

    const handleCloseModal = () => {
        setSelectedPost(null);
    };

    return (
        <div className="explore-container">
           
            <div className="content">
                <h2 className="title">Explore</h2>
                {error && <p className="error">{error}</p>}
                <div className="posts-grid">
                    {posts.map(post => (
                        <div key={post.id} className="post-card" onClick={() => handlePostClick(post)}>
                            <img src={post.image_url} alt="Post" className="post-image" />
                        </div>
                    ))}
                </div>
                {/* {selectedPost && <ViewPostModal post={selectedPost} onClose={handleCloseModal} />} */}
            </div>
        </div>
    );
};

export default ExplorePosts;
