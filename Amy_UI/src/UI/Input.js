// Input.js
import React, { useState } from 'react';
import SpeechToText from '../components/SpeechToText'; 
import { FiSend } from 'react-icons/fi';
import { MdLanguage } from 'react-icons/md'; 
import { IoLanguage } from "react-icons/io5";

const Input = ({ messageInput, setMessageInput, sendMessage,selectedLanguage, handleLanguageChange }) => {
    const [showLanguageList, setShowLanguageList] = useState(false);
    const handleTranscript = (transcript) => {
        setMessageInput(transcript); 
    };
    
    const handleLanguageSelect = (language) => {
        handleLanguageChange(language); 
        setShowLanguageList(false);
    };
    return (
        <div className="flex items-center border-t border-x-0-gray-300">
            <input
                type="text"
                placeholder="Start a conversation"
                className="flex-1 border-none px-4 py-2 focus:outline-none"
                value={messageInput}
                onChange={(e) => setMessageInput(e.target.value)}
                onKeyPress={(e) => {
                    if (e.key === 'Enter') sendMessage(messageInput, selectedLanguage);
                }}
            />
            <button className="cursor-pointer text-2xl bg-[#ffffff] px-2 py-2 text-[#841DC3]"
            onClick={() => setShowLanguageList(!showLanguageList)}>
            <IoLanguage />
            </button>
            <button className="border-l-2 color-[#841DC3]">
                <SpeechToText onTranscript={handleTranscript} />
            </button>
            <button
                className="bg-[#30C5D2] text-white p-3 focus:outline-none"
                onClick={() => sendMessage(messageInput, selectedLanguage)}
            >
                <FiSend /> 
            </button>

            {showLanguageList && (
                <div className="absolute bottom-[42px] right-[5px] mt-10 bg-white border border-gray-300 rounded shadow-md py-1 px-2 z-10">
                    <div
                        className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                        onClick={() => handleLanguageSelect('English')}
                    >
                        <MdLanguage className="text-blue-500 mr-2" /> English
                    </div>
                    <div
                        className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                        onClick={() => handleLanguageSelect('French')}
                    >
                        <MdLanguage className="text-blue-500 mr-2" /> French
                    </div>
                    <div
                        className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                        onClick={() => handleLanguageSelect('Thai')}
                    >
                        <MdLanguage className="text-blue-500 mr-2" /> Thai
                    </div>
                    <div
                        className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                        onClick={() => handleLanguageSelect('Dutch')}
                    >
                        <MdLanguage className="text-blue-500 mr-2" />Flemish/Dutch
                    </div>
                </div>
            )}
        </div>
    );
};

export default Input;
