var async=require('async')
  , auth = require('./middlewares/authorization')


module.exports = function (app, passport) {
  app.get('/auth/facebook',
    passport.authenticate('facebook', {
      scope: [ 'email', 'user_about_me'],
      failureRedirect: '/login'
    }), users.signin)
  app.get('/auth/facebook/callback',
    passport.authenticate('facebook', {
      failureRedirect: '/login'
    }), users.authCallback)
    // home route
  var tags = require('../app/controllers/site');
  app.get('/', site.index)

  var tags = require('../app/controllers/comment');

  app.get('/comment/:uid', comment.index)
}
