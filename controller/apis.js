/* Specter : A Solo Wiki Platform */

// create a router
var express = require('express'),
    jsonwebtoken = require('jsonwebtoken'),
    User = require('../model/user'),
    Page = require('../model/page'),
    router = express.Router();

// export the router
module.exports = router;

// default route
router.get('/', function(req, res) {
    res.send('<h1>Hello Specter API</h1>');
});

//
// users
router.get('/users', function(req, res) {
    User.find({}, function(err, users) {
        if(err) return res.status(500).json({});
        return res.status(200).json({
            data: users
        });
    });
});
router.post('/users', function(req, res) {
    User({
        email: req.body.email,
        password: req.body.password
    }).save(function(err, user) {
        if(err && err.name === 'ValidationError') {
            return res.status(400).json({
                errors: err.errors
            });
        }
        if(err || !user) {
            return res.status(500).json({
                errors: err.errors
            });
        }
        return res.status(201).json({
            data: {
                id: user.id,
                email: user.email
            }
        });
    });
});
router.post('/users/authenticate', function(req, res) {
    User.findOne({email: req.body.email}, function(err, user) {
        if(err)
            return res.status(500).json({});
        if(!user)
            return res.status(404).json({error: {type: 'email', message: 'unknown email'}});
        if(!user.isPassword(req.body.password))
            return res.status(404).json({error: {type: 'password', message: 'incorrect password'}});
        return res.status(200).json({
            data: {
                token: jsonwebtoken.sign(user, 'superBigSecret')
            }
        });
    })
})

//
// TODO protect paths
// req.headers.authorization.split(' ')[1]

//
// pages
router.get('/pages', function(req, res) {
    Page.find({}, function(err, pages) {
        if(err) return res.status(500).json({});
        return res.status(200).json({
            data: pages
        });
    })
});
router.get('/pages/:path', function(req, res) {
    Page.findOne({path: req.params.path}, function(err, page) {
        if(err) return res.status(500).json({});
        if(!page) return res.status(404).json({error: 'unknown path'});
        return res.status(200).json(page);
    })
});
router.post('/pages', function(req, res) {
    Page({
        path: req.body.path,
        markdown: req.body.markdown
    }).save(function(err, page) {
        if(err && err.name==='ValidationError') return res.status(400).json(err.errors);
        if(err || !page) return res.status(500).json({});
        return res.status(201).json(page);
    });
});
router.put('/pages/:path', function(req, res) {
    Page.findOne({path: req.params.path}, function(err, page) {
        if(err) return res.status(500).json({});
        if(!page) return res.status(404).json({});
        page.markdown = req.body.markdown;
        page.save(function(err, page) {
            if(err && err.name==='ValidationError') return res.status(400).json(err.errors);
            if(err || !page) return res.status(500).json({});
            return res.status(201).json(page);
        });
    })
})
