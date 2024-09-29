const clearMessageContent = () => {
    const messageContent = document.getElementById('messageContent');
    if (messageContent) {
        messageContent.innerHTML = ''; 
    } else {
        console.error('Element with ID "messageContent" not found.');
    }
};

export { clearMessageContent };