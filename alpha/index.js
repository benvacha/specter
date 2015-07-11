/* Specter : A Solo Wiki Platform */

// runtime configurations
var config = {
    port: process.env.PORT || 3000,
    database: process.env.MONGOLAB_URI || 'mongodb://localhost/specter'
};
// declare variables
var express = require('express'),
    bodyParser = require('body-parser'),
    mongoose = require('mongoose'),
    app = express(),
    server;
// use body-parser
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({extended: true}));

// serve api requests
app.use('/specter/api', require(__dirname+'/controller/apis'));
// serve resource requests
app.use('/specter', express.static(__dirname+'/public'));
// serve wiki page requests
app.use('/', function(req, res, next) {
    res.sendFile(__dirname+'/public/index.html');
});
// serve node errors
// TODO: remove for production
app.use(function(err, req, res, next) {
    res.status(500).send(err);
});

// listen, log, and start database connection
// start listening for requests when database is connected
mongoose.connection.on('connected', function() {
    console.log('Connected to', config.database);
}).on('error', function(err) {
    console.log('Error connecting to', config.database, '\n', err);
}).on('disconnected', function() {
    console.log('Disconnected from', config.database);
}).on('open', function() {
    console.log('Opened', config.database);
    server = app.listen(config.port, function() {
        console.log('Listening at http://%s:%s',
            server.address().address,
            server.address().port
        );
    });
});
mongoose.connect(config.database);

// close database connection when application closes
process.on('SIGINT', function() {
    mongoose.connection.close(function() {
        console.log('Exiting');
        process.exit();
    });
});
