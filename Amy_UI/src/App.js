import React, { useState } from 'react';
import ChatBotIcon from './components/ChatBotIcon';
import ChatWindow from './components/ChatWindow';
import { generateUserId } from './utils/userId';

function App() {
  const [isChatOpen, setIsChatOpen] = useState(false);
  const [isFeedbackOpen, setIsFeedbackOpen] = useState(false); // State for session feedback window
  const [selectedLanguage, setSelectedLanguage] = useState('English');

  

  const handleLanguageChange = (language) => {
    setSelectedLanguage(language);
};

  const handleChatIconClick = () => {
    setIsChatOpen(!isChatOpen);
  };
  

  const user = generateUserId(10);

  const handleCloseChat = () => {
    setIsChatOpen(false);
  };


  return (
    <div className="app">
      
    <div className="flex justify-end items-end h-screen bg-gray-100">
      <ChatBotIcon onClick={handleChatIconClick} />
      <ChatWindow isOpen={isChatOpen} onClose={() => setIsFeedbackOpen(false)} selectedLanguage={selectedLanguage} onClose={handleCloseChat} user={user} handleLanguageChange={handleLanguageChange}/>
      {/* {isFeedbackOpen && <SessionFeedback onClose={handleCloseFeedback} sessionId="your-session-id" />} */}
  
    </div>
      </div>
  );
}

export default App;
