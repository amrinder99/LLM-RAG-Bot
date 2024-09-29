import React, { useState } from 'react';
import $ from 'jquery';
import {getSessionId, newSessionId } from '../utils/api';
import { clearMessageContent } from '../UI/messageUtils';

let sessionFeedbackId=null;
if (!sessionFeedbackId) {
    sessionFeedbackId = updateSessionId();
}
function updateSessionId(){
    let feedbackId = getSessionId();
    return feedbackId;
}

const SessionFeedback = ({ onClose }) => {
  const [selectedEmoji, setSelectedEmoji] = useState(null);
  const emojis = [
    { value: 1, emoji: '😡' },
    { value: 2, emoji: '😞' },
    { value: 3, emoji: '😐' },
    { value: 4, emoji: '🙂' },
    { value: 5, emoji: '😀' }
  ];

  const handleEmojiClick = (value) => {
    setSelectedEmoji(value);
    console.log('Session feedback value:',value);
    console.log('Session feedback ID:',sessionFeedbackId);
    clearMessageContent();
    setTimeout(() => {
      onClose();
    }, 2500); 
    $.ajax({
      type: 'POST',
      url: process.env.REACT_APP_SESSION_FEEDBACK_URL,
      data: JSON.stringify({ session_id: sessionFeedbackId, feedback: value }),
      contentType: 'application/json',
      success: function(response) {
        sessionFeedbackId=updateSessionId();
        console.log('Feedback sent successfully:', response);
      },
      error: function(error) {
        console.log('URl:',process.env.REACT_APP_SESSION_FEEDBACK_URL );
        console.error('Error sending feedback:', error);
      }
    });
  };

  return (
    <div className="session-feedback-container m-auto" style={{ textAlign: 'center' }}>
      <p className="text-[#841DC3]" style={{ fontSize: '20px' }}>How would you rate this conversation?</p>
      <div style={{ fontSize: '40px' }}>
        {emojis.map((emojiData) => (
          <button key={emojiData.value} onClick={() => handleEmojiClick(emojiData.value)}>
            {emojiData.emoji}
          </button>
        ))}
      </div>
      {selectedEmoji && <p className="text-[#841DC3]" style={{ position: 'absolute', left: '50%', transform: 'translateX(-50%)' }}>Thanks for the feedback!</p>}
    </div>
  );
};

export default SessionFeedback;
