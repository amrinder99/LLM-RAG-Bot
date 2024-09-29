import React, { useState, useRef } from 'react';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMicrophone } from '@fortawesome/free-solid-svg-icons';


const SpeechToText = ({ onTranscript }) => {
    const [isListening, setIsListening] = useState(false);
    const recognition = useRef(null);

    const handleStartListening = () => {
        if (!('webkitSpeechRecognition' in window)) {
            alert("Speech recognition is not supported in your browser.");
            return;
        }

        recognition.current = new window.webkitSpeechRecognition();
        recognition.current.continuous = true;
        recognition.current.interimResults = true;
        recognition.current.lang = 'en-US';

        recognition.current.onstart = () => {
            setIsListening(true);
        };

        recognition.current.onresult = (event) => {
            const transcript = event.results[event.results.length - 1][0].transcript;
            console.log('Transcript:', transcript);
            onTranscript(transcript);
        };

        recognition.current.onerror = (event) => {
            console.error('Speech recognition error:', event.error);
            setIsListening(false);
        };

        recognition.current.onend = () => {
            setIsListening(false);
        };

        recognition.current.start();
    };

    const handleStopListening = () => {
        if (recognition.current) {
            recognition.current.stop();
            setIsListening(false);
        }
    };

    return (
        <button
        className={`bg-white text-[#841DC3] py-2 px-3 focus:outline-none`}
            onMouseDown={handleStartListening}
            onMouseUp={handleStopListening}
            onMouseLeave={handleStopListening}
        >
            <FontAwesomeIcon icon={faMicrophone} size="lg" className={`${isListening ? 'text-[#30C5D2]' : 'text-[#841DC3]'}`} />
        </button>
    );
};

export default SpeechToText;
