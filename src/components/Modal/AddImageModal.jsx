import React, { useState, useEffect, useRef } from 'react';
import './AddImageModal.css';
import { FaTimes, FaImage, FaUpload } from 'react-icons/fa';

const Modal = ({ isOpen, onClose }) => {
    const [selectedImage, setSelectedImage] = useState(null);
    const [caption, setCaption] = useState('');
    const textareaRef = useRef(null);

    useEffect(() => {
        if (textareaRef.current) {
            textareaRef.current.style.height = 'auto'; // Reset height
            textareaRef.current.style.height = `${textareaRef.current.scrollHeight}px`; // Set height to fit content
        }
    }, [caption]);

    const handleImageChange = (event) => {
        if (event.target.files && event.target.files[0]) {
            setSelectedImage(URL.createObjectURL(event.target.files[0]));
        }
    };

    if (!isOpen) return null;

    const handleClose = (e) => {
        e.stopPropagation();
        setSelectedImage(null);
        onClose();
    };

    const handleCaptionChange = (e) => {
        setCaption(e.target.value);
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
                            <img src={selectedImage} alt="Selected Preview" />
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
                <button className="modal-submit">
                    <FaUpload /> Submit
                </button>
            </div>
        </div>
    );
};

export default Modal;
