/* Specter : A Solo Wiki Platform */

//
// declarations
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    config = require('./config'),
    app = express(),
    server;

//
// initializations
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

//
// routes
app.use(function(req, res) {
    res.send('Hello Specter!');
});

//
// start
mongoose.connection.on('connected', function() {
    console.log('Connected to', config.databaseString);
}).on('error', function(err) {
    console.log('Error connecting to', config.databaseString, '\n', err);
}).on('disconnected', function() {
    console.log('\nDisconnected from', config.databaseString);
}).on('open', function() {
    console.log('Opened', config.databaseString);
    server = app.listen(config.serverPort, function() {
        console.log('Listening at http://%s:%s',
            server.address().address,
            server.address().port
        );
    });
});
mongoose.connect(config.databaseString);

//
// end
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Exiting\n');
        process.exit();
    });
});
