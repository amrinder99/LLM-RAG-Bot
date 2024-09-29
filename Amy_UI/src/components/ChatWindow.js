// ChatWindow.js
import React, { useState, useRef, useEffect } from 'react';
import Header from '../UI/Header';
import  quickButtonMessages_array  from './config';
import Input from '../UI/Input';
import { sendMessage } from '../utils/api';
// import ImageSlider from './imageSlider';
import GreetingMessage from './greetingMessage';
import QuickButtons from './quickButtons';
import SessionFeedback from '../components/SessionFeedback';
import MessageDisplay from '../UI/MessageDisplay';

const ChatWindow = ({ isOpen, onClose, selectedLanguage= 'English', handleLanguageChange, user }) => {
    const [messages, setMessages] = useState([]);
    const [messageInput, setMessageInput] = useState('');
    const inputRef = useRef(null);
    const [showFeedback, setShowFeedback] = useState(false);
    const clearMessages = () => {
        setMessages([]);
    };


    useEffect(() => {
        if (inputRef.current) {
            inputRef.current.scrollIntoView({ behavior: 'smooth', block: 'end' });
        }
    }, [messages]);

    const sendMessageWrapper = (message) => {
        sendMessage(message, setMessages, setMessageInput, user, selectedLanguage);
    };

    const handleFeedbackSubmit = (feedbackEmoji) => {
        setShowFeedback(false); 
    };

    
    const quickButtonMessages = quickButtonMessages_array[selectedLanguage] || [];


    return (
        <div className={`fixed right-[59px] bottom-[56px] rounded-lg ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`} style={{ width: '430px', height: '540px', transition: 'opacity 0.5s' }}>
            <div className="bg-[#F6F3F7] rounded-lg shadow-lg h-full flex flex-col">
                {showFeedback ? (
                    <SessionFeedback onClose={() => setShowFeedback(false)} onFeedbackSubmit={handleFeedbackSubmit}/>
                ) : (
                    <>
                        <Header onClose={onClose} onFeedbackTrigger={() => setShowFeedback(true)} clearMessages={clearMessages}/>
                        <div className="overflow-auto overflow-x-hidden flex-grow">
                            <GreetingMessage />
                            {/* <ImageSlider /> */}
                            <QuickButtons buttons={quickButtonMessages} sendMessageWrapper={sendMessageWrapper} />
                            <MessageDisplay messages={messages} clearMessages={clearMessages}/>
                            <div ref={inputRef}></div>
                        </div>
                        <Input
                            messageInput={messageInput}
                            setMessageInput={setMessageInput}
                            sendMessage={sendMessageWrapper}
                            selectedLanguage={selectedLanguage}
                            handleLanguageChange={handleLanguageChange}
                        />
                    </>
                )}
            </div>
        </div>
    );
};

export default ChatWindow;
