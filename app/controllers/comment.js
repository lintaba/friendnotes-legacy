var Comment = require('../models/comment')

exports.index = function(req, res) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = '/close';
        return res.render('login');
    }

    req.params.ownid = req.user.id;
    Comment.load(req.params, function(err, items) {
        if (err) {
            console.error(err);
            return res.render('500',{error:err});
        }
        res.render('comment', {
            title: 'Comment',
            items: items,
            req: req.params
        })
    })
}

exports.save = function(req, res) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = '/close';
        return res.render('login');
    }
    req.body.ownid = req.user.id;
    Comment.save(req.body, function(err, items) {
        if (err) return res.render('500',{error:err})
        res.end("{'ok':1}");
    })
}


exports.list = function(req, res) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = '/close';
        return res.render('login');
    }
    req.params.ownid = req.user.id;
    Comment.list(req.params, function(err, items) {
        if (err) {
            console.error(err);
            return res.render('500',{error:err});
        }
        res.render('list', {
            title: 'List of comments',
            items: items
        })
    })}
