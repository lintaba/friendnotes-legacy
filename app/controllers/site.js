exports.index = function(req, res) {
    res.render('index', {
        title: 'Commenter',
        req: req
    })
}
