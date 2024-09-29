// LanguageSelector.js
import React from 'react';
import { MdLanguage } from 'react-icons/md';

const LanguageSelector = ({ handleLanguageSelect }) => {
    return (
        <div className="absolute bottom-[42px] right-[5px] mt-10 bg-white border border-gray-300 rounded shadow-md py-1 px-2 z-10">
            <div
                className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                onClick={() => handleLanguageSelect('english')}
            >
                <MdLanguage className="text-blue-500 mr-2" /> English
            </div>
            <div
                className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                onClick={() => handleLanguageSelect('french')}
            >
                <MdLanguage className="text-blue-500 mr-2" /> French
            </div>
            <div
                className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                onClick={() => handleLanguageSelect('thai')}
            >
                <MdLanguage className="text-blue-500 mr-2" /> Thai
            </div>
            <div
                className="flex items-center cursor-pointer py-1 px-2 hover:bg-gray-100"
                onClick={() => handleLanguageSelect('dutch')}
            >
                <MdLanguage className="text-blue-500 mr-2" /> Dutch
            </div>
        </div>
    );
};

export default LanguageSelector;
