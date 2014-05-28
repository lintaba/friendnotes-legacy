
/**
 * Module dependencies.
 */

var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , utils = require('../../lib/utils')

module.exports = {

  load:function load(data,callback){
  	client.query("SELECT `comment` FROM `comments` WHERE `uid`='$1' and `ownid`=$2",[data.uid,data.ownid], function(err, result) {
    if(err) return callback(err);
	    if(result.row[0]){
	    	callback(0,result.row[0]||{});
	    }
  	});
    //callback(0,"work in progress, but id was "+data.uid+".");
  }
  save:function save(data,callback){
  	load(data,function(err,res){
  		if(err)return callback(err);
  		var q;
  		if(res.uid==data.uid){
  			q="update comments set comment='$3',updated=NOW() where uid='$2' and ownid='$1'";
  		}else{
  			q="insert into comments values ($1,$2,$3,NOW())";
  		}
  		client.query(q,[data.ownid,data.uid,data.comment,function(err,res){
  			if(err)return callback(err);
  			load(data,callback);
  		})
  	})
  }
}
