exports.signin = function(req, res) {}

exports.login = function(req, res) {
    res.render('users/login', {
        title: 'Login',
        message: req.flash('error')
    })
}

exports.authCallback =
    exports.session =
    function(req, res) {
        var redirectTo = req.session.returnTo ? req.session.returnTo : '/'
        delete req.session.returnTo
        res.redirect(redirectTo)
}
