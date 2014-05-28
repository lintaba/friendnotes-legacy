//source: https://github.com/madhums/node-express-mongoose-demo
//license: MIT
var express  = require('express')
  , fs 		 = require('fs')
  , passport = require('passport')
  , pg 		 = require('pg')
  , env 	 = process.env.NODE_ENV || 'development'
  , config 	 = require('./config/config')[env]
  , app 	 = express()
  , client   = new pg.Client(config.db)

client.on('error', function (err) {console.log(err)})
client.connect()
GLOBAL.client=client;

var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

require('./config/passport')(passport, config)			// bootstrap passport config
require('./config/express')(app, config, passport)		// express settings
require('./config/routes')(app, passport)				// Bootstrap routes

var port = process.env.PORT || 3001
app.listen(port,function(){console.log('Express app started on port '+port)});

exports = module.exports = app							// expose app

/*
drop table comments;
create table comments (
ownid varchar(120),
uid varchar(120),
comment text,
updated date
);

*/
