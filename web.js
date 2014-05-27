
var pg = require('pg');

var port = process.env.PORT || 3000;


var pgclient;
var params = { host: 'ec2-54-221-227-25.compute-1.amazonaws.com',port:5432,user: 'sqgkvzosmjvier',password: 'yUqd8Z4m_4yVk_jwLq-8sQx41l',database: 'd24odihcp1223b',ssl: true };
var client = new pg.Client(params);
client.connect();
console.log(client);

require("http").createServer(function(req,res){res.write(JSON.stringify(client));res.end("hi");}).listen(port);
console.log("listening on ",port);

/*
app.get('/', function(req,res){
  client.query('select * from db',function(err,res){
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
