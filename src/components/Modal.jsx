import React from 'react';
import './Modal.css'; 
import IconButton from '@mui/material/IconButton'; 
import CloseIcon from '@mui/icons-material/Close';

const Modal = ({ isOpen, onClose, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
            <IconButton 
                    onClick={onClose} 
                    className="close-button"
                    aria-label="close"
                >
                    <CloseIcon />
                </IconButton>
                {children}
            </div>
        </div>
    );
};

export default Modal;
