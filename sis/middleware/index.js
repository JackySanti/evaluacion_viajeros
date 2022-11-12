const db = require('../db/db');

const mdwViewsSession = (req, res, next) => {
    console.log(req.session.user);
    if(req.session.user){
        return next();
    }
    else
        return res.redirect('/')
}

const mdwReturnNoticias= (req, res, next) => {
    if(req.session.user){
        res.redirect('/noticias')
    }
    else 
        return next();
}


module.exports={
    mdwViewsSession,
    mdwReturnNoticias
}