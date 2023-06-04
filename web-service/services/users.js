const User = require('../models/user');
const UserPass = require('../models/userPass');
const UserPassName = require('../models/userPassName');

const createUser = async (username, password, displayName, profilePic) => {    
    const user = User.find({ username });

    if (user.length > 0) {
        throw new Error('User already exists');
    }

    await User.create({
        username,
        displayName,
        profilePic,
    });

    await UserPass.create({
        username,
        password,
    });

    await UserPassName.create({
        username,
        password,
        displayName,
        profilePic,
    });
}