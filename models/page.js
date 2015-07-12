/* Specter : https://github.com/benvacha/specter */

//
// declarations
var mongoose = require('mongoose');

//
// schema
var schema = new mongoose.Schema({
    path: {type: String, unique: true},
    markdown: {type: String, default: ''},
    created: {type: Date, default: Date.now},
    updated: {type: Date, default: Date.now}
});

//
// validators
schema.path('path')
    .validate(function(val) {
        return val.search(/\S+/) >= 0;
    }, 'path is required')
    .validate(function(val) {
        return val.search(/\//) == 0;
    }, 'path must begin with forward slash')
    .validate(function(val, next) {
        if(!this.isModified('path')) return next();
        mongoose.models['Page'].findOne({path:val}, function(err, page) {
            if(err || page) return next(false);
            return next();
        });
    }, 'path must be unique');

//
// middleware
schema.pre('save', function(next) {
    this.updated = Date.now();
    return next();
})

//
// exports
module.exports = mongoose.model('Page', schema);
