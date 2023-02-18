const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose');

const publicationSchema = new mognoose.Schema({
    title: {
        type: String,
        minLength: [6, 'Name must be at least 6 characters!'],
        required: [true, 'Name is required!']
    },
    technique: {
        type: String,
        required: [true, 'Picture is required!'],
        minLength: [6, 'Name must be at least 6 characters!'],
    },
    certificate: {
        type: String,
        required: true,
        enum: {
            values: ['Yes', 'No'],
            message: 'You have to type: Yes or No'
        }
    },
    picture: {
        type: String,
        match: [/^(http(s)?:\/\/)/, 'Invalid Url'],
        required: [true, 'Picture is required!']
    },
    author: {
        type: mongoose.Types.ObjectId,
        ref: 'User'
    },
    shares: [{
        type: mongoose.Types.ObjectId,
        ref: 'User'
    }]

});

const Publication = mognoose.model('Publication', publicationSchema);

module.exports = Publication;