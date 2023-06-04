const User = require('../models/user');

const createUser = async (username, password, displayName, profilePic) => {    
    const user = User.find({ username });

    if (user.length > 0) {
        throw new Error('User already exists');
    }

    await User.create({
        username,
        password,
        displayName,
        profilePic,
    });
}