const db = require('../db/db');

const mdwViewsSession = (req, res, next) => {
    console.log(req.session.user);
    if(req.session.user){
        return next();
    }
    else
        return res.redirect('/')
}

const mdwPasajero= (req, res, next) => {
    let usuario = req.session.user;
    console.log(req.session.user);

    if(usuario.tipo == 0){
        return next();
    }
    else
        return res.redirect('/noticias')
}


const mdwAdministrador = (req, res, next) => {
    let usuario = req.session.user;
    console.log(req.session.user);

    if(usuario.tipo == 1){
        return next();
    }
    else
        return res.redirect('/noticias')
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
    mdwReturnNoticias,
    mdwAdministrador,
    mdwPasajero
}