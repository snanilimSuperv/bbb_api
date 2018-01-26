const crypto = require('crypto'); // maybe its default.... bcoz i dont need to load it on package
const bcrypt = require('bcryptjs');
const mongoose = require('mongoose');

const schemaOptions = {
    timestamps: true,
    toObject: {
        virtuals: true
    }
    ,toJSON: {
        virtuals: true
    }
}


const userSchema = new mongoose.Schema({
    name: String,
    email: { type: String, unique: true},
    password: String,
    passwordResetToken: String,
    passwordResetExpires: Date,
    gender: String,
    location: String,
    website: String,
    picture: String,
    facebook: String,
    google: String,
}, schemaOptions);


var User = mongoose.model('User', userSchema);

module.exports = User;