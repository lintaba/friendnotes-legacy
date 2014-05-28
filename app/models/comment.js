
/**
 * Module dependencies.
 */

var env = process.env.NODE_ENV || 'development'
 , config = require('../../config/config')[env]
  , utils = require('../../lib/utils')

function s(t){return t.replace(/['\\]/g,"");}

module.exports = {

 load:function load(data,callback){
  	client.query("SELECT comment FROM comments WHERE uid='"+s(data.uid)+"' and ownid='"+s(data.ownid)+"'", function(err, result) {
    if(err){console.log("0",err); return callback(err);}
	    	callback(0,result.rows[0]||{});
  	});
    //callback(0,"work in progress, but id was "+data.uid+".");
  },
  save:function save(data,callback){
  	load(data,function(err,res){
  		if(err)return callback(err);
  		var q;
  		if(res.uid==data.uid){
  			q="update comments set comment='"+s(data.comment)+"',updated=NOW() where uid='"+s(data.uid)+"' and ownid='"+s(data.ownid)+"'";
  		}else{
  			q="insert into comments values ('"+s(data.ownid)+"','"+s(data.uid)+"','"+s(data.comment)+"',NOW())";
  		}
  		client.query(q,function(err,res){
  			if(err)return callback(err);
  			load(data,callback);
  		})
  	})
  }
}
