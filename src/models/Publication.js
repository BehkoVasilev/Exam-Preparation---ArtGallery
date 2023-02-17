const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose');

const publicationSchema = new mognoose.Schema({
    title: {
        type: [String, 'Name is required!'],
        minLength: [6, 'Name must be at least 6 characters!'],
        required: true
    },
    technique: {
        type: [String, 'Picture is required!'],
        required: true,
        minLength: [6, 'Name must be at least 6 characters!'],
    },
    certifOfAuthenticity: {
        type: String,
        required: true,
        enum: ['Yes', 'No'],

    },
    picture: {
        type: [String, 'Picture is required!'],
        match: [/^(http(s)?:\/\/)/, 'Invalid Url'],
        required: true
    },
    shares: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }],
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }
});

const Publication = mognoose.model('Crypto', publicationSchema);

module.exports = Publication