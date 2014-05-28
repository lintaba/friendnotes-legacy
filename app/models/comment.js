
/**
 * Module dependencies.
 */

var env = process.env.NODE_ENV || 'development'
 , config = require('../../config/config')[env]
  , utils = require('../../lib/utils')

function s(t){return t&&t.replace?t.replace(/['\\]/g,""):"";}


var cache={};

 var load=function load(data,callback){
    if(cache[data.ownid+":"+data.uid]){
      return callback(0,cache[data.ownid+":"+data.uid]);
    }
  	client.query("SELECT comment,uid FROM comments WHERE uid='"+s(data.uid)+"' and ownid='"+s(data.ownid)+"'", function(err, result) {
  	  if(err){console.log("0",err); return callback(err);}
	    	callback(0,result.rows[0]||{});
        if(result.rows[0]){
          cache[data.ownid+":"+data.uid]=result.rows[0];
        }
  	});
  }
var save=  function save(data,callback){
  	load(data,function(err,res){
  		if(err)return callback(err);
  		var q;
  		if(res.uid==data.uid){
  			q="update comments set comment='"+s(data.comment)+"',updated=NOW() where uid='"+s(data.uid)+"' and ownid='"+s(data.ownid)+"'";
  		}else{
  			q="insert into comments values ('"+s(data.ownid)+"','"+s(data.uid)+"','"+s(data.comment)+"',NOW())";
  		}
      if(cache[data.ownid+":"+data.uid]) delete cache[data.ownid+":"+data.uid];
  		client.query(q,function(err,res){
  			if(err)return callback(err);
  			load(data,callback);
  		})
  	})
  }
return module.exports = {load:load,save:save}
