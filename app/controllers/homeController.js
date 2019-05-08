module.exports.index = function(application, req, res){
    
    if(req.session.usuario){
        res.render('home');
    } else {
        res.redirect('/logout');
    }
    
}