const mognoose = require('mongoose');
const bcrypt = require('bcrypt')

const userSchema = new mognoose.Schema({
    username: {
        type: String,
        required: [true, 'Username is required'],
        minLength: [4, 'Username must be at least 4 characters.']
    },
    password: {
        type: String,
        required: [true, 'Password is required'],
        minLength: [3, 'Password must be at least 3 characters.']
    },
    address: {
        type: String,
        required: [true, 'Address is required'],
        minLength: [20, 'Addres must be at least 20 characters.']
    },
    publications: {
        type: mognoose.Types.ObjectId,
        ref: 'Publication'
    }

})

userSchema.pre('save', function (next) {
    bcrypt.hash(this.password, 10)
        .then(hash => {
            this.password = hash;

            next();
        });
});

userSchema.method('validatePassword', function (password) {
    return bcrypt.compare(password, this.password);
})

const User = mognoose.model('User', userSchema);

module.exports = User;
