var async   = require('async');
var express = require('express');
var util    = require('util');
var pg = require('pg');

var app = express();

var port = process.env.PORT || 3000;


var pgclient;
pg.connect(process.env.DATABASE_URL||"postgres://sqgkvzosmjvier:yUqd8Z4m_4yVk_jwLq-8sQx41l@ec2-54-221-227-25.compute-1.amazonaws.com:5432/d24odihcp1223b", function(err, client) {
  pgclient=client;
});


app.get('/', function(req,res){
  pgclient.query('select * from db',function(err,res){
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
