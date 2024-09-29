import React from 'react';

import logoImage from '../assets/images/logoImage.svg';

const ChatBotIcon = ({ onClick }) => {
    return (
        <div className="fixed right-[-15px] bottom-[-22px]">
            <button onClick={onClick} className=' w-24'>
                
            <img src={logoImage} alt="chatbotIcon" />
            </button>
        </div>
    );
};

export default ChatBotIcon;
