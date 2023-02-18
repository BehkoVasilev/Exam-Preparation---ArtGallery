const jwt = require('../lib/jwt');

const User = require('../models/User');
const { SECRET } = require('../constants');



exports.getUserByUsername = (username) => User.findOne({ username });
exports.getUserById = (userId) => User.findOne({ userId });

exports.register = async (username, password, address) => {

    await User.create({ username, password, address });


    const token = await this.login(username, password);

    return token
}

exports.login = async (username, password) => {
    const user = await this.getUserByUsername(username)

    if (user === null) {
        throw new Error('Invalid email or password!');
    };

    const isValid = await user.validatePassword(password);

    if (!isValid) {
        throw new Error('Invalid email or password!');
    }

    const payload = { _id: user._id, username: user.username, address: user.address};
    const options = { expiresIn: '4h' };

    const token = await jwt.sign(payload, SECRET, options);


    return token
}