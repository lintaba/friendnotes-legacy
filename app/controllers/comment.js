var Comment = require('../models/comment')

exports.index = function(req, res) {
    if (!req.isAuthenticated()) {
        req.session.returnTo = '/close';
        return res.render('login');
    }

    req.params.ownid = req.user.id;
    Comment.load(req.params, function(err, items) {
        if (err) {
            console.log(err);
            return res.render('500');
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
    req.params.ownid = req.user.id;
    if (req.params.ownid != req.user.id) {
        return res.redirect('/comment/' + req.params.uid);
    }
    Comment.save(req.body, function(err, items) {
        if (err) return res.render('500')
        res.end("{'ok':1}");
    })
}
