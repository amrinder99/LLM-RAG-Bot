import React from 'react'
import logoImage from '../assets/images/logoImage.svg';
function logo() {
    return (
        <div className='flex flex-row items-center justify-center'>
            <div className="flex-auto">
                <img src={logoImage} alt="logo" className='w-10'/>
            </div>
            <div className="flex-auto">
                <h2 className="text-lg font-semibold">Ask Amy</h2>
            </div>
        </div>
    )
}

export default logo