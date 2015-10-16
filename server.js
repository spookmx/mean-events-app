// Initial Server Setup
var express  = require('express');
var app      = express(); 	
var mongoose = require('mongoose');
var port  	 = process.env.PORT || 8080; 
var database = require('./config/database');
var morgan   = require('morgan');
var bodyParser = require('body-parser');
var methodOverride = require('method-override');

// General configuration
mongoose.connect(database.url);

app.use(express.static(__dirname + '/public'));
app.use('/bower_components',  express.static(__dirname + '/bower_components'));
app.use(morgan('dev'));
app.use(bodyParser.urlencoded({'extended':'true'})); 
app.use(bodyParser.json());
app.use(bodyParser.json({ type: 'application/vnd.api+json' }));
app.use(methodOverride('X-HTTP-Method-Override'));


// Establish supported routes on the server 
require('./app/routes.js')(app);

// Init listen for requests on the specified port
app.listen(port);
console.log("Server running on port: " + port);
