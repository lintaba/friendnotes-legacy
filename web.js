var pg = require('pg');
var url = require('url');

var port = process.env.PORT || 3000;


var params = {
  host: 'ec2-54-221-227-25.compute-1.amazonaws.com',
  port: 5432,
  user: 'sqgkvzosmjvier',
  password: 'yUqd8Z4m_4yVk_jwLq-8sQx41l',
  database: 'd24odihcp1223b',
  ssl: true
};
var client = new pg.Client(params);
client.connect();

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

}).listen(port);
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
