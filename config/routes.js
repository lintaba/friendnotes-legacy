var async = require('async')
  , users = require('../app/models/users')
  , site  = require('../app/controllers/site')

module.exports = function(app, passport) {

    app.get('/', site.index)
    app.get('/stats', site.stats)

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
    app.get('/list', comment.list)


    app.get('/session', function(req, res) {
        res.json({
            session: req.session,
            user: req.user,
            passport: req.passport
        });
    });
    app.get('/close',function(req,res){res.end('<script>window.close();</script><a href="javascript:window.close();">close</a>');});
    app.get('/logout',function(req,res){req.logout();res.redirect("/");});
}
