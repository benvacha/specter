/* Specter : A Solo Wiki Platform */

// create a router
var express = require('express'),
    router = express.Router();

// export the router
module.exports = router;

// default route
router.get('/', function(req, res) {
    res.send('<h1>Hello Specter API</h1>');
});
