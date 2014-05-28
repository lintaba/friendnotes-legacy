
/**
 * Module dependencies.
 */

var env = process.env.NODE_ENV || 'development'
  , config = require('../../config/config')[env]
  , utils = require('../../lib/utils')

module.exports = {

  load:function(uid,callback){
    callback(0,"work in progress, but id was ",uid);
  }

}
