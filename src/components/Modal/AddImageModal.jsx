import React, { useState, useEffect, useRef } from 'react';
import './AddImageModal.css';
import { FaTimes, FaImage, FaUpload } from 'react-icons/fa';
import { userAxiosInstance } from '../../services/axiosInstance'; 
import {  message as AntdMessage } from 'antd';


const Modal = ({ isOpen, onClose, userId }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const [message , setMessage] = useState(null)
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to fit content
        }
    }, [caption]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(event.target.files[0]);
        }
    };

    if (!isOpen) return null;

    const handleClose = (e) => {
        e.stopPropagation();
        setSelectedImage(null);
        setCaption('');
        setMessage(null);
        onClose();
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
    };

    const handleSubmit = async () => {
        if (selectedImage && caption) {
            const formData = new FormData();
            formData.append('image', selectedImage);
            formData.append('caption', caption);
            
            try {
                const response = await userAxiosInstance.post('/create-post/', formData, {
                    headers: {
                        'Content-Type': 'multipart/form-data',
                    },
                });
                console.log(response);
                AntdMessage.success('Post created successfully');
                setSelectedImage(null);
                setCaption('');
                textareaRef.current.style.height = 'auto';
                textareaRef.current.value = '';

                onClose();
            } catch (error) {
                console.error(error);
            }
        }else{
            setMessage('Please select an image and enter a caption');

        }
    };

    return (
        <div className="modal-overlay" onClick={handleClose}>
            <div className="modal-content" onClick={(e) => e.stopPropagation()}>
                <button className="modal-close" onClick={handleClose}>
                    <FaTimes />
                </button>
                <h2>Create Post</h2>
                <div className="image-upload-container">
                    <label htmlFor="file-upload" className="image-upload-label">
                        <FaImage /> {selectedImage ? 'Change Image' : 'Upload Image'}
                    </label>
                    <input
                        id="file-upload"
                        type="file"
                        accept="image/*"
                        onChange={handleImageChange}
                        className="file-input"
                    />
                    {selectedImage && (
                        <div className="image-preview">
                            <img
                                src={URL.createObjectURL(selectedImage)}
                                alt="Selected Preview"
                            />
                        </div>
                    )}
                </div>
                <textarea
                    ref={textareaRef}
                    placeholder="Enter caption..."
                    value={caption}
                    onChange={handleCaptionChange}
                    maxLength={255}
                ></textarea>
                <p className='text-danger text-center' >{message}</p>
                <button className="modal-submit" onClick={handleSubmit}>
                    <FaUpload /> Submit
                </button>
            </div>
        </div>
    );
};

export default Modal;
