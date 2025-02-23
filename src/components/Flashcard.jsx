import React, { useState } from 'react';
import './Flashcard.css';

const Flashcard = ({ question, answer }) => {
    const [flipped, setFlipped] = useState(false);

    // Stop any ongoing speech
    const stopSpeech = () => {
        if ('speechSynthesis' in window) {
            window.speechSynthesis.cancel();
        }
    };

    // Speak text
    const speakText = (text) => {
        stopSpeech(); // Ensure previous speech stops before starting
        const msg = new SpeechSynthesisUtterance(text);
        msg.lang = 'en-US';
        msg.rate = 1;
        msg.pitch = 1;
        window.speechSynthesis.speak(msg);
    };

    // Handle card flip (only speak the answer when flipped)
    const handleFlip = () => {
        setFlipped((prevFlipped) => {
            const newFlipped = !prevFlipped;
            if (newFlipped) {
                speakText(`Answer: ${answer}`);
            } else {
                stopSpeech(); // Stop speech when flipping back
            }
            return newFlipped;
        });
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
