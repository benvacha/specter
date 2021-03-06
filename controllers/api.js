/* Specter : https://github.com/benvacha/specter */

//
// declarations
var express = require('express'),
    jsonwebtoken = require('jsonwebtoken'),
    config = require(__root+'/configs/user'),
    Page = require(__root+'/models/page'),
    router = express.Router();

//
// exports
module.exports = router;

//
// public
router.post('/tokens', function(req, res) {
    if(!req.body.username) return res.status(400).json({desc:'username required'});
    if(!req.body.password) return res.status(400).json({desc:'password required'});
    if(req.body.username !== config.username) return res.status(400).json({desc:'invalid credentials'});
    if(req.body.password !== config.password) return res.status(400).json({desc:'invalid credentials'});
    return res.status(200).json({token: jsonwebtoken.sign({}, config.username+config.password)});
});

//
// security
router.use('/', function(req, res, next) {
    var token = req.headers['x-access-token'] || req.query['access_token'];
    if(!token) return res.status(401).json({desc:'access token required'});
    jsonwebtoken.verify(token, config.username+config.password, function(err, decoded) {
        if(err) return res.status(401).json({desc:'invalid access token'});
        next();
    });
});

//
// private
router.get('/pages/:path', function(req, res) {
    Page.findOne({path:req.params.path}, function(err, page) {
        if(err) return res.status(500).json({desc:'internal server error'});
        return res.status(200).json({
            path: (page && page.path) ? page.path : req.params.path,
            markdown: (page && page.markdown) ? page.markdown : '',
            created: (page && page.created) ? page.created : Date.now(),
            updated: (page && page.updated) ? page.updated : Date.now()
        });
    });
});
router.put('/pages/:path', function(req, res) {
    Page.findOne({path:req.params.path}, function(err, page) {
        if(err) return res.status(500).json({desc:'internal server error'});
        if(page) {
            page.markdown = req.body.markdown ? req.body.markdown : '';
            page.save(function(err, page) {
                if(err && err.name==='ValidationError') {
                    return res.status(400).json({param:'path', desc:err.errors.path.message});
                } else if(err) {
                    return res.status(500).json({desc:'internal server error'});
                }
                return res.status(200).json(page);
            });
        } else {
            Page({
                path: req.params.path,
                markdown: req.body.markdown ? req.body.markdown : ''
            }).save(function(err, page) {
                if(err && err.name==='ValidationError') {
                    return res.status(400).json({param:'path', desc:err.errors.path.message});
                } else if(err) {
                    return res.status(500).json({desc:'internal server error'});
                }
                return res.status(200).json(page);
            });
        }
    });
});
