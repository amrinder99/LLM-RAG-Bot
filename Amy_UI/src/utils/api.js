import $ from 'jquery';

let url = process.env.REACT_APP_MESSAGE_URL;
let sessionId = null;
let newSessionId; 
if (!sessionId) {
    sessionId = generateSessionId();
}

function generateSessionId() {
    const min = 100000;
    const max = 10000000000;
    sessionId = Math.floor(Math.random() * (max - min + 1)) + min;
    newSessionId = sessionId; 
    return sessionId;
}

export function getSessionId()  {
    if(newSessionId !== sessionId){
        console.log("value is not updated");
        newSessionId = sessionId;
    }
    return newSessionId; 
};


const sendMessage = (messageInput, setMessages, setMessageInput,user,selectedLanguage) => {
    console.log(messageInput.trim());
    if (!messageInput.trim()) return;
    console.log(sessionId);

    console.log('msg url',process.env.REACT_APP_MESSAGE_URL);
    console.log('selected lang:', selectedLanguage)

    const newMessage = {
        text: messageInput,
        sender: 'user'
    };

    setMessages(prevMessages => [...prevMessages, newMessage]);
    setMessageInput(''); 

    $.ajax({
        type: 'POST',
        url: url,
        timeout: 0,
        contentType: 'application/json',
        data: JSON.stringify({
            "message": newMessage.text,
            "lang": selectedLanguage,
            "user_id": user,
            "session_id": sessionId
        }),
        success: (response) => {
            const botResponse = {
                text: response.response,
                sender: 'bot',
                reply_id: response.reply_id,
                source: response.source,
                page:response.page
            };
            console.log(response);
            setMessages(prevMessages => [...prevMessages, botResponse]);
        },
        error: (error) => {
            console.error('Error sending message:', error);
        }
    });
};

const sendFeedback = (replyId, feedbackValue) => {
    console.log("replyid:",replyId);
    console.log("feedbackValue:",feedbackValue);
    console.log("feedbackurl:",process.env.MESSAGE_FEEDBACK_URL);
    $.ajax({
        type: 'POST',
        url:process.env.REACT_APP_MESSAGE_FEEDBACK_URL,
        contentType: 'application/json',
        data: JSON.stringify({
            "reply_id": replyId,
            "feedback": feedbackValue
        }),
        success: (response) => {
            console.log("Feedback added");

        },
        error: (error) => {
            console.error('Error sending feedback:', error);
        }
    });

};

export { sendMessage, sendFeedback, newSessionId, generateSessionId};