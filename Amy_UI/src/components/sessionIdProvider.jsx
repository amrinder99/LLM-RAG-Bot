import React, { createContext, useContext, useState, useEffect } from 'react';

export const SessionIdContext = createContext();

const SessionIdProvider = ({ children }) => {
    const [sessionId, setSessionId] = useState(null);

    useEffect(() => {
        const generatedSessionId = generateSessionId();
        setSessionId(generatedSessionId);
    }, []);

    const generateSessionId = () => {
        return Math.random().toString(36).substr(2, 9);
    };

    return (
        <SessionIdContext.Provider value={sessionId}>
            {children}
        </SessionIdContext.Provider>
    );
};

export default SessionIdProvider;
