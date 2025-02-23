import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ question, answer, onClose }) => {
    const [flipped, setFlipped] = useState(false);

    const handleFlip = () => {
        setFlipped(!flipped);
    };

    return (
        <div className={`flashcard ${flipped ? 'flipped' : ''}`} onClick={handleFlip}>
            <div className="card front">
              
                <p>{question}</p>
            </div>
            <div className="card back">
             
                <p>{answer}</p>
            </div>
        </div>
    );
};

export default Flashcard;
