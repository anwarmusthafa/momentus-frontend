import React, { useState, useEffect } from 'react';
import { useNavigate, useParams, useLocation } from 'react-router-dom';
import { Avatar, Button, Input, List, Modal } from 'antd';
import { HeartOutlined, HeartFilled, DeleteOutlined } from '@ant-design/icons';
import './ViewPost.css'; // Custom styles for your component
import { userAxiosInstance } from '../../services/axiosInstance';

const ViewPost = ({ onLike, onComment, onDelete }) => {
  const { postId } = useParams();
  const navigate = useNavigate();
  const location = useLocation();
  const [post, setPost] = useState(null);
  const [liked, setLiked] = useState(false);
  const [comments, setComments] = useState([]);
  const [newComment, setNewComment] = useState('');

  useEffect(() => {
    const fetchPost = async () => {
      try {
        const response = await userAxiosInstance.get(`/post-details/${postId}/`);
        setPost(response.data);
        setLiked(response.data.likedByUser);
      } catch (error) {
        console.error("Failed to fetch post", error);
      }
    };

    const fetchComments = async () => {
      try {
        const response = await userAxiosInstance.get(`/comments?post-id=${postId}`);
        setComments(response.data);
      } catch (error) {
        console.error("Failed to fetch comments", error);
      }
    };

    fetchPost();
    fetchComments();
  }, [postId]);

  const handleLike = () => {
    setLiked(!liked);
    onLike(postId, !liked);
  };

  const handleCommentSubmit = async () => {
    if (newComment.trim()) {
      try {
        const response = await userAxiosInstance.post(`/posts/${postId}/comments`, { comment: newComment });
        setComments([...comments, response.data]);
        onComment(postId, newComment); // This can update the parent component if needed
        setNewComment('');
      } catch (error) {
        console.error("Failed to submit comment", error);
      }
    }
  };

  const handleCloseModal = () => {
    const { state } = location;
    navigate(-1);
    if (state && state.scrollY !== undefined) {
      window.scrollTo(0, state.scrollY);
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
            <Avatar src={post.userProfileImage} />
            <strong className="post-username">{post.userName}</strong>
            <Button
              type="text"
              icon={<DeleteOutlined />}
              onClick={() => onDelete(postId)}
              className="post-delete-button"
            />
          </div>
          <div className="post-description">
            {post.description}
          </div>
          <div className="comments-section">
            <List
              dataSource={comments}
              renderItem={item => (
                <List.Item>
                  <strong>{item.user}:</strong> {item.comment}
                </List.Item>
              )}
            />
          </div>
          <div className="post-actions">
            <Button
              type="text"
              icon={liked ? <HeartFilled /> : <HeartOutlined />}
              onClick={handleLike}
            />
          </div>
          <div className="comment-input-container">
            <Input.TextArea
              rows={2}
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
