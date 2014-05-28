//source: https://github.com/madhums/node-express-mongoose-demo
//license: MIT
var express = require('express')
  , fs = require('fs')
  , passport = require('passport')
  , pg = require('pg');

var env = process.env.NODE_ENV || 'development'
  , config = require('./config/config')[env]

// Bootstrap db connection
// Connect to mongodb
var client;
var connect = function () {
  client = new pg.Client(config.db);
  client.connect();
}
connect()

// Error handler
client.on('error', function (err) {
  console.log(err)
})


// Bootstrap models
var models_path = __dirname + '/app/models'
fs.readdirSync(models_path).forEach(function (file) {
  if (~file.indexOf('.js')) require(models_path + '/' + file)
})

// bootstrap passport config
require('./config/passport')(passport, config)

var app = express()
// express settings
require('./config/express')(app, config, passport)

// Bootstrap routes
require('./config/routes')(app, passport)

// Start the app by listening on <port>
var port = process.env.PORT || 3000
app.listen(port)
console.log('Express app started on port '+port)

// expose app
exports = module.exports = app



/*


var url = require('url');
var express=require('express');
var app=express();
var port = process.env.PORT || 3000;
app.listen(port,function(){console.log("listening on "+port);});


app.use(function(req, res, next){
  console.log('%s %s', req.method, req.url);
  next();
});
app.use(express.static(__dirname+'/static'));

app.get('/data.js',function(req,res){
	res.send("hi");
	console.log(req.query);

});


/*
require("http").createServer(function(req, res) {
  var url_parts = url.parse(req.url, true);
  var query = url_parts.query;
  if (query.ownid > 0 && query.uid > 0 && !query.text) {
    client.query("select * from mydata where ownid=" + query.ownid | 0 + " and uid=" + query.uid | 0, function(err, res) {
        if (err) {
          res.end("{error:'sql hiba'}");
        } else {
          res.end(JSON.stringify(result.rows[0]));
      }
    });
    res.write("loading:"+query.ownid+", "+query.uid+"\n");
  }else if(query.ownid > 0 && query.uid > 0 && query.text){
    res.end("saveing...");
  }else{
    res.end("hi");
  }
})

console.log("listening on ", port);

/*
app.get('/', function(req,res){
  client.query('select mydata from db',function(err,res){
    if(err){
      res.end("hiba");
    }else{
      res.end("siker: "+JSON.stringify(result.rows));
    }
  });
});
app.post('/save', function(req,res){res.write(req.param("uid"));res.end("eol");});
app.get('/save', function(req,res){res.write(req.param("uid"));res.end("eol");});



app.listen(port, function() {
  console.log("Listening on " + port);
});
*/
/*create table mydata (
ownid integer,
uid varchar(120),
textfield text,
updated date
);*/
