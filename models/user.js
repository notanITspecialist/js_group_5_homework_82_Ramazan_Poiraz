const nanoid = require('nanoid');
const bcrypt = require('bcrypt');

const SALT_FACTOR = 10;

const mongoose = require('mongoose');

const UserSchema = new mongoose.Schema({
   username: {
       type: String,
       required: true,
       unique: true
   },
    password: {
        type: String,
        required: true
    },
    token: {
        type: String,
        required: true
    },
    role: {
       type: String,
        required: true,
        enum: ['user', 'admin'],
        default: 'user',
    },
    displayName: {
       type: String,
        required: true
    },
    avatar: String,
    facebookId: String
});

UserSchema.pre('save', async function (next) {
    if(!this.isModified('password')) return next();

    const salt = await bcrypt.genSalt(SALT_FACTOR);

    this.password = await bcrypt.hash(this.password, salt);
    next();
});

UserSchema.set('toJSON', {
   transform: (doc, ret) => {
       delete ret.password;
       return ret;
   }
});

UserSchema.methods.addToken = function () {
    this.token = nanoid();
};

const User = mongoose.model('User', UserSchema);

module.exports = User;