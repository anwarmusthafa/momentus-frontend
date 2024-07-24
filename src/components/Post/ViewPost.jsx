import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Avatar, Button, Input, List, Modal } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';
import './ViewPost.css'; // Custom styles for your component
import { userAxiosInstance } from '../../services/axiosInstance';
import { useSelector } from 'react-redux';
import { message } from 'antd';
import { Link } from 'react-router-dom';

const ViewPost = ({ onLike, onComment }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [likeCount, setLikeCount] = useState(0); // New state for like count
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  const user = useSelector((state) => state.profile.profile);

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await userAxiosInstance.get(`/post-details/${postId}/`);
        console.log("Post fetched successfully:", response.data);
        setPost(response.data);
        setLiked(response.data.likedByUser);
        setLikeCount(response.data.like_count); // Set initial like count
      } catch (error) {
        console.error("Failed to fetch post", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await userAxiosInstance.get(`/comments/${postId}/`);
        setComments(response.data);
        console.log("Comments fetched successfully:", response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleLike = async () => {
    try {
      let response;
      if (liked) {
        response = await userAxiosInstance.post(`/unlike-post/${post.id}/`);
        setLiked(false);
        setLikeCount(likeCount - 1);
        message.success('Post unliked successfully');
      } else {
        response = await userAxiosInstance.post(`/like-post/${post.id}/`);
        setLiked(true);
        setLikeCount(likeCount + 1);
        message.success('Post liked successfully');
      }
    } catch (error) {
      console.error('Error liking/unliking post', error);
    }
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response = await userAxiosInstance.post(`/comments/${postId}/`, { comment: newComment });
        console.log("Comment submitted successfully:", response.data);
        setComments([...comments, response.data]);
        setNewComment('');
      } catch (error) {
        console.error("Failed to submit comment", error);
      }
    }
  };

  const onDelete = async (postId) => {
    try {
      const response = await userAxiosInstance.delete(`/delete-post/${postId}/`);
      if (response.status === 204) {
        console.log("Post deleted successfully");
        message.success('Post deleted successfully');
        navigate(-1); // Navigate back to the previous page
      }
    } catch (error) {
      console.error("Error deleting the post:", error);
      message.error('Failed to delete the post');
    }
  };

  const handleCloseModal = () => {
    const { state } = location;
    navigate(-1); // Navigate back to the previous page
    if (state && state.scrollY !== undefined) {
      window.scrollTo(0, state.scrollY); // Restore scroll position
    }
  };

  if (!post) {
    return <div>Loading...</div>;
  }

  return (
    <Modal
      visible={true}
      onCancel={handleCloseModal}
      footer={null}
      className="view-post-modal"
      width={800}
    >
      <div className="post-content">
        <div className="post-image-container">
          <img src={post.image_url} alt={post.description} className="post-image" />
        </div>
        <div className="post-details">
          <div className="post-header">
            <Avatar src={post.user_profile_picture} />
            <Link to={`/profile/${post.momentus_user_name}`} className="no-link-styles">
              <strong className="post-username">{post.momentus_user_name}</strong>
            </Link>

            {post.user === user.id && (
              <Button
                type="text"
                icon={<DeleteOutlined />}
                onClick={() => onDelete(postId)}
                className="post-delete-button"
              />
            )}
          </div>
          <div className="post-description">
            {post.description}
          </div>
          

          <div className="comments-section">
            <List
              dataSource={comments}
              renderItem={item => (
                <List.Item>
                  <List.Item.Meta
                    avatar={<Avatar src={item.profile_picture} />}
                    title={
                      <Link to={`/profile/${item.momentus_user_name}`} className="no-link-styles">
                        {item.momentus_user_name}
                      </Link>
                    }
                    description={item.comment}
                  />
                </List.Item>
              )}
            />
          </div>
          
          <div className="post-actions">
            <Button
              type="text"
              icon={liked ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleLike}
              className="like-button"
            />
            <span className="like-count">{likeCount} {likeCount === 1 ? 'Like' : 'Likes'}</span>
          </div>

          <div className="comment-input-container">
            <Input.TextArea
              rows={3}
              value={newComment}
              onChange={(e) => setNewComment(e.target.value)}
              placeholder="Add a comment..."
            />
            <Button type="primary" onClick={handleCommentSubmit} className="comment-submit-button">
              Post
            </Button>
          </div>
        </div>
      </div>
    </Modal>
  );
};

export default ViewPost;
