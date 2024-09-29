import React, { useState } from 'react';
import CompanyImageLogo from '../components/companyImage';
import Logo from '../components/logo';
import { generateSessionId } from '../utils/api';
import { FaWindowMinimize } from 'react-icons/fa';
import { FaTimes } from 'react-icons/fa';

const Header = ({ onClose, onFeedbackTrigger, clearMessages }) => {
  
  const handleButtonClick = () => {
    onFeedbackTrigger(); 
    clearMessages(); 
    generateSessionId();
};

  return (
    <div className="flex justify-between items-center rounded-t-lg px-4 py-2 bg-gradient-to-r from-[#30C5D2] to-[#841DC3] text-white">
      <Logo />
      <CompanyImageLogo />
      <button onClick={onClose} className="focus:outline-none color-white">
        <FaWindowMinimize />
      </button>
      <div className='text-xl'>
                <FaTimes onClick={handleButtonClick} />
            </div>
    </div>
  );
};

export default Header;
