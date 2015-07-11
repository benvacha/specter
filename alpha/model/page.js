//
// requires

var mongoose = require('mongoose');

//
// helpers



//
// schema

var schema = new mongoose.Schema({
    path: {
        type: String,
        unique: true
    },
    markdown: {
        type: String
    },
    created: {
        type: Date,
        default: Date.now
    },
    updated: {
        type: Date,
        default: Date.now
    }
});

//
// validators

schema.path('path')
    .validate(function(val) {
        return val.search(/\S+/) >= 0;
    }, 'path is required');
    //.validate(function(val, next) {
    //    mongoose.models['Page'].findOne({path: val}, function(err, result) {
    //        if(err || result) return next(false);
    //        return next();
    //    });
    //}, 'path must be unique');

schema.path('markdown')
    .validate(function(val) {
        return val.search(/\S+/) >= 0;
    }, 'markdown is required');

//
// middleware

schema.pre('save', function(next) {
    this.updated = Date.now();
    return next();
});

//
// methods



//
// exports

module.exports = mongoose.model('Page', schema);