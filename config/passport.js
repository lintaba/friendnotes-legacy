var FacebookStrategy = require('passport-facebook').Strategy


module.exports = function(passport, config) {
    // require('./initializer')

    // serialize sessions

    passport.serializeUser(function(user, done) {
        done(null, user.id)
    })

    passport.deserializeUser(function(id, done) {
        done(null, {
            id: id
        });
    })

    // use local strategy

    // use facebook strategy
    passport.use(new FacebookStrategy({
            clientID: config.facebook.clientID,
            clientSecret: config.facebook.clientSecret,
            callbackURL: config.facebook.callbackURL
        },
        function(accessToken, refreshToken, profile, done) {
            done(null, {
                id: profile.id
            });
            /*
      User.findOne({ 'facebook.id': profile.id }, function (err, user) {
        if (err) { return done(err) }
        if (!user) {
          user = new User({
            name: profile.displayName,
            email: profile.emails[0].value,
            username: profile.username,
            provider: 'facebook',
            facebook: profile._json
          })
          user.save(function (err) {
            if (err) console.log(err)
            return done(err, user)
          })
        }
        else {
          return done(err, user)
        }
      })*/
        }
    ))

}
