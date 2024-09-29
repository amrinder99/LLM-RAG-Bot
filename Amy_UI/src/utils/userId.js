function generateUserId(length) {
    const characters = 'abcdefghijklmnopqrstuvwxyzABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789';
    let user = '';
    for (let i = 0; i < length; i++) {
        user += characters.charAt(Math.floor(Math.random() * characters.length));
    }
    return user;
}

export { generateUserId };