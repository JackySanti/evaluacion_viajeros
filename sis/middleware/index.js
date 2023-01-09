const db = require('../db/db');

const mdwViewsSession = (req, res, next) => {
    if(req.session.user){
        return next();
    }
    else
        return res.redirect('/')
}

const mdwPasajero= (req, res, next) => {
    let usuario = req.session.user;

    if(usuario.tipo == 0){
        return next();
    }
    else
        return res.redirect('/noticias')
}

const validacionResultados = async (req, res, next) => {
    try{
        let usuario = req.session.user.idCliente;   
        let resultado = await db.usuario.validacionFechaPartida(usuario);

        if(resultado.estado == 1){
            return next();
        }
        else
            return res.redirect('/noticias')

    } catch(err){
        throw err;
    }
}

const mdwAdministrador = (req, res, next) => {
    let usuario = req.session.user;

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
    mdwPasajero,
    validacionResultados
}