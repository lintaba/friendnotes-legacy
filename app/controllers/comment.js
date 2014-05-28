
var utils = require('../../lib/utils')
  , extend = require('util')._extend
  , Comment=require('../models/comment')


exports.index = function(req, res){
  Comment.load(req.params, function(err, items) {
    if (err) return res.render('500')
    res.render('comment', {
      title: 'Comment',
      items: items,
      req:req.params
    })
  })
}

exports.save = function(req, res){
  Comment.save(req.body, function(err, items) {
    if (err) return res.render('500')
    res.end("{'ok':1}");
  })
}
