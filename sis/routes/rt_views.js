const express = require('express')
const router = express.Router()
const db = require('../db/db')

const { mdwViewsSession, mdwReturnNoticias, mdwPasajero, mdwAdministrador } = require('../middleware/index')

router.get('/', [mdwReturnNoticias], (req, res) => {
    res.render('layouts/index')
})

router.get('/cerrar_sesion', [mdwViewsSession], (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})

router.get('/noticias', [mdwViewsSession], (req, res) => {
    let usuario = req.session.user;
    
    if(usuario.tipo == 0){
        res.render('views/noticias', {
            layout: '',
            inicio: true,
        });
    } else {

        if(usuario.estado == 0){
            res.render('views/noticias', {
                layout: '',
                inicio: false,
                activo: true,
                usuario: usuario.idCliente,
                email: usuario.email
            });
        } else {
            res.render('views/noticias', {
                layout: '',
                inicio: false,
                activo: false,
                usuario: usuario.idCliente,
                email: usuario.email
            });
        }
        
    }
   
})

// VISTA PARA USUARIOS
router.get('/identificacion', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/identificacion_pasajero', {
        layout: '',
        inicio: true
    });
})

router.get('/contacto-personal', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/contacto_personal', {
        layout: '',
        inicio: true
    });
})

router.get('/identificacion-del-viaje', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/informacion_viaje', {
        layout: '',
        inicio: true
    });
})

router.get('/condicion-medica', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/condicion_medica', {
        layout: '',
        inicio: true
    });
})

router.get('/informacion-medica', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/informacion_medica', {
        layout: '',
        inicio: true
    });
})

router.get('/exposicion-directa', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/exposcion_paciente', {
        layout: '',
        inicio: true
    });
})

router.get('/signos', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/signos', {
        layout: '',
        inicio: true
    });
})

router.get('/comprobante-de-vacunacion', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/comprobante_vacunacion', {
        layout: '',
        inicio: true
    });
})

router.get('/resultados', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/comprobante_vacunacion', {
        layout: '',
        inicio: true
    });
})

// VISTA PARA ADMINISTRADORES
router.get('/pasajeros', [mdwViewsSession, mdwAdministrador], async (req, res) => {
    try {
        let pasajeros = await db.administrador.tablaUsuarios();

        res.render('views/tabla_usuarios', {
            layout: '',
            inicio: false,
            data : pasajeros.consulta
        });

    } catch (err){
        throw err;
    }
})

router.get('/administradores', [mdwViewsSession, mdwAdministrador], async (req, res) => {
    try {
        let pasajeros = await db.administrador.tablaAdministradores();

        res.render('views/administradores', {
            layout: '',
            inicio: false,
            data : pasajeros.consulta
        });

    } catch (err){
        throw err;
    }
})

router.get('/categorias', [mdwViewsSession, mdwAdministrador], async (req, res) => {
    try {
        let riesgo = await db.administrador.tablaFactoresRiesgo();

        res.render('views/categorias', {
            layout: '',
            inicio: false,
            data : riesgo.consulta
        });

    } catch (err){
        throw err;
    }
})

module.exports = router