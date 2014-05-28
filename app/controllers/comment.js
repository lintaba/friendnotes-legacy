
var utils = require('../../lib/utils')
  , extend = require('util')._extend
  , Comment=require('../models/comment')

/**
 * Load
 */

exports.load = function(req, res, next, id){
  //var User = mongoose.model('User')

  Comment.load(id, function (err, item) {
    if (err) return next(err)
    if (!item) return next(new Error('not found'))
    req.item = item
    next()
  })
}

exports.index = function(req, res){
  var uid = req.uid;
  var perPage = 30

  Comment.load(uid, function(err, items) {
    if (err) return res.render('500')
    res.render('comment', {
      title: 'Comment',
      items: items
    })
  })
}
