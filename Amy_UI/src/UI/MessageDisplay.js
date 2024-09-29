import React, { useState, useEffect } from 'react';
import { AiOutlineLike, AiOutlineDislike, AiOutlineCopy } from 'react-icons/ai';
import { sendFeedback } from '../utils/api';

const MessageDisplay = ({ messages, clearMessages }) => {
    const [likedMessages, setLikedMessages] = useState([]);
    const [dislikedMessages, setDislikedMessages] = useState([]);
    const [copyClicked, setCopyClicked] = useState(false);
    const [clearContent, setClearContent] = useState(false);

    const handleLike = (replyId) => {
        console.log("replyid:", replyId);
        console.log("feedbackValue: like");
        sendFeedback(replyId, 1);
        if (!likedMessages.includes(replyId)) {
            setLikedMessages([...likedMessages, replyId]);
            if (dislikedMessages.includes(replyId)) {
                setDislikedMessages(dislikedMessages.filter(item => item !== replyId));
            }
        } else {
            setLikedMessages(likedMessages.filter(item => item !== replyId));
        }
    };

    const handleDislike = (replyId) => {
        sendFeedback(replyId, 0);
        if (!dislikedMessages.includes(replyId)) {
            setDislikedMessages([...dislikedMessages, replyId]);
            if (likedMessages.includes(replyId)) {
                setLikedMessages(likedMessages.filter(item => item !== replyId));
            }
        } else {
            setDislikedMessages(dislikedMessages.filter(item => item !== replyId));
        }
    };

    const handleCopy = (message) => {
        navigator.clipboard.writeText(message);
        setCopyClicked(true);
    };

    const handleClearMessages = () => {
        // Call the clearMessages function passed from the parent
        clearMessages();
    };
    return (
        <div className="flex-1 overflow-y-auto px-4 py-2 overflow-x-hidden" id="messageContent">
            {messages.map((message, index) => (
                <div key={index} className={`flex justify-${message.sender === 'bot' ? 'start' : 'end'} my-2`}>
                    <div className="message-container">
                        <div className={`max-w-80p ${message.sender === 'bot' ? 'mr-11 mt-1 mb-1 bg-gradient-to-r from-[#5C6BCA] to-[#5C6BCA] rounded-tl-[12px] rounded-br-[12px] rounded-tr-[12px] text-[14px] text-white' : 'ml-11 mt-1 mb-1 bg-[#841DC3] rounded-tr-[12px] rounded-tl-[12px]  rounded-bl-[12px] text-[14px] text-white'}`}>
                            {message.text.split('\n').map((line, index) => (
                                <div key={index} className="px-4 py-2">{line}</div>
                            ))}
                        </div>
                        {message.source && (
                                <div className="py-1 text-[11px] text-blue-600">
                                Source: <a href={message.source + "#page=" + (message.page+1)} target="_blank" rel="noopener noreferrer">{message.source.replace("data/", "")}</a>
                            </div>
                            )}
                        {message.sender === 'bot' && (
                            <div className="feedback-icons mt-1">
                                <button className="feedback-icon px-1" style={{ color: 'gray' }} onClick={() => handleCopy(message.text)}>
                                    <AiOutlineCopy />
                                </button>
                                <button className="feedback-icon px-1" onClick={() => handleLike(message.reply_id)} style={{ borderColor: 'black' }}>
                                    <AiOutlineLike fill={likedMessages.includes(message.reply_id) ? '#841DC3' : 'gray'} />
                                </button>
                                <button className="feedback-icon px-1" onClick={() => handleDislike(message.reply_id)} style={{ borderColor: 'black' }}>
                                    <AiOutlineDislike fill={dislikedMessages.includes(message.reply_id) ? '#841DC3' : 'gray'} />
                                </button>
                            </div>
                        )}
                    </div>
                </div>
            ))}
        </div>
    );
};

export default MessageDisplay;

