/* Specter : https://github.com/benvacha/specter */

//
// globals
global.__root = __dirname;

//
// declarations
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    serverConfig = require(__root+'/configs/server'),
    app = express(),
    server;

//
// initializations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//
// routes
app.use('/specter/apis', require(__root+'/controllers/api'));
app.use('/specter', express.static(__root+'/publics'));
app.use('/', function(req, res, next) {
    res.sendFile(__root+'/publics/index.html');
});

//
// start
mongoose.connection.on('connected', function() {
    console.log('Connected to', serverConfig.database);
}).on('error', function(err) {
    console.log('Error connecting to', serverConfig.database, '\n', err);
}).on('disconnected', function() {
    console.log('\nDisconnected from', serverConfig.database);
}).on('open', function() {
    console.log('Opened', serverConfig.database);
    server = app.listen(serverConfig.port, function() {
        console.log('Listening at http://%s:%s',
            server.address().address,
            server.address().port
        );
    });
});
mongoose.connect(serverConfig.database);

//
// end
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Exiting\n');
        process.exit();
    });
});
