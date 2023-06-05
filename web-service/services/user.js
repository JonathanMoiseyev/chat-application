const User = require('../models/user');

const createUser = async (username, password, displayName, profilePic) => { 
    const user = await User.findOne({ username });

    if (user !== null) {
        throw new Error('User already exists');
    }

    await User.create({
        username,
        password,
        displayName,
        profilePic,
    });
}

const getUser = async (username) => {
    const user = await User.findOne({ username });
    
    if (user.length === 0) {
        throw new Error('User not found');
    }

    return user;
}


module.exports = { createUser, getUser };