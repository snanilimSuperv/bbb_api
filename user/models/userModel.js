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


userSchema.pre('save', function(next){
    var user = this;
    if (!user.isModified('password')) { return next(); }
    bcrypt.genSalt(10, function(err, salt) {
        bcrypt.hash(user.password, salt, function(err, hash) {
            user.password = hash;
            next();
        });
    });

})

userSchema.methods.comparePassword = function(password, cb) {
    bcrypt.compare(password, this.password, function(err, isMatch) {
        cb(err, isMatch);
    });
};

userSchema.virtual('gravatar').get(function() {
    if (!this.get('email')) {
      return 'https://gravatar.com/avatar/?s=200&d=retro';
    }
    var md5 = crypto.createHash('md5').update(this.get('email')).digest('hex');
    return 'https://gravatar.com/avatar/' + md5 + '?s=200&d=retro';
});
  
// userSchema.options.toJSON = {
//     transform: function(doc, ret, options) {
//         delete ret.password;
//         delete ret.passwordResetToken;
//         delete ret.passwordResetExpires;
//     }
// };


var User = mongoose.model('User', userSchema);

module.exports = User;