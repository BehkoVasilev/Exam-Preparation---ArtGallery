const { default: mongoose } = require('mongoose');
const mognoose = require('mongoose');

const dataUri = 'mongodb://127.0.0.1:27017/art-gallery';

async function initDatabase () {
    mongoose.set('strictQuery', false);
    mognoose.connect(dataUri);

    console.log('DB is connected');
};

module.exports = initDatabase

