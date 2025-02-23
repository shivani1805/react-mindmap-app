import React, { useEffect } from 'react';
import './Modal.css';
import IconButton from '@mui/material/IconButton';
import CloseIcon from '@mui/icons-material/Close';
import Button from '@mui/material/Button';
import MicIcon from '@mui/icons-material/Mic';

const Modal = ({ isOpen, onClose, onSpeak, children }) => {
    if (!isOpen) return null;

    return (
        <div className="modal-overlay">
            <div className="modal-content">
                <div className="modal-header">
                    {/* Close Button */}
                    <IconButton 
                        onClick={onClose} 
                        className="close-button"
                        aria-label="close"
                    >
                        <CloseIcon />
                    </IconButton>

                    {/* Speak Button */}
                    <Button 
                        className="speak-button" 
                        variant="contained" 
                        color="primary"
                        startIcon={<MicIcon />}
                        onClick={onSpeak} 
                    >
                        Speak
                    </Button>
                </div>
                
                {/* Modal Content */}
                <div className="modal-body">
                    {children}
                </div>
            </div>
        </div>
    );
};

export default Modal;
