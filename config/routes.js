var async = require('async'),
    users = require('../app/models/users');


module.exports = function(app, passport) {

    app.get('/', require('../app/controllers/site').index)

    app.get('/login', function(req, res) {
        res.redirect("/auth/facebook")
    });
    app.get('/auth/facebook', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }), users.signin)
    app.get('/auth/facebook/callback', passport.authenticate('facebook', {
        failureRedirect: '/login'
    }), users.authCallback)

    var comment = require('../app/controllers/comment');
    app.get('/comment/:uid', comment.index)
    app.post('/save', comment.save)


    app.get('/session', function(req, res) {
        res.json({
            session: req.session,
            user: req.user,
            passport: req.passport
        });
    });
}
