const User = require('../models/user');
const UserPass = require('../models/userPass');

const createUser = async (username, password, displayName, profilePic) => { 
    const user = await User.findOne({ username });

    if (user !== null) {
        throw new Error('User already exists');
    }

    await User.create({
        username,
        displayName,
        profilePic,
        androidToken: "",
    });

    await UserPass.create({
        username,
        password,
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