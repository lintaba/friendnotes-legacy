exports.index = function(req, res) {
    res.render('index', {
        title: 'Commenter',
        req: req,

    })
}
exports.stats=function(req,res){
    require("../models/comment").totalCount(null,function(err,data){
		res.render('stats',{
			title:'Stats',
			stats:data
		});
    });
}
