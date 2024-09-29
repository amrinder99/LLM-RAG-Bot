import React from 'react';

const QuickButtons = ({ buttons, sendMessageWrapper }) => {
    const handleClick = (message) => {
        console.log("Button clicked:", message);
        sendMessageWrapper(message);
    };

    return (
        <div className="flex flex-wrap my-4 ml-4 mt-[2rem] mr-4">
            {buttons.map((button, index) => (
                <button
                    key={index}
                    className="m-1 px-[8px] py-1 rounded-md bg-transparent border border-[#9893DA] text-slate-600 text-[12px] hover:bg-gradient-to-r from-[#5C6BCA] to-[#841DC3] hover:text-white transition duration-300 text-left"
                    onClick={() => handleClick(button)}
                >
                    {button}
                </button>
            ))}
        </div>
    );
};

export default QuickButtons;
