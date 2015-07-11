//
// requires

var mongoose = require('mongoose'),
    crypto = require('crypto');

//
// helpers

function getHash(password, salt) {
    return crypto.createHash('sha1').update(password + salt).digest('hex');
};

//
// schema

var schema = new mongoose.Schema({
    email: {
        type: String,
        unique: true
    },
    password: {
        type: String
    }
});

//
// validators

schema.path('email')
    .validate(function(val) {
        return val.search(/\S+/) >= 0;
    }, 'email address is required')
    .validate(function(val) {
        return val.search(/\S+@\S+\.\S+/) >= 0;
    }, 'invalid email address')
    .validate(function(val, next) {
        mongoose.models['User'].findOne({email: val}, function(err, result) {
            if(err || result) return next(false);
            return next();
        });
    }, 'email address must be unique');

schema.path('password')
    .validate(function(val) {
        return val.search(/\S+/) >= 0;
    }, 'password is required');

//
// middleware

schema.pre('save', function(next) {
    if(this.isModified('password')) {
        this.password = getHash(this.password, this.email);
    }
    return next();
});

//
// methods

schema.methods.isPassword = function(password) {
    if(this.password === getHash(password, this.email)) {
        return true;
    }
    return false;
};

//
// exports

module.exports = mongoose.model('User', schema);