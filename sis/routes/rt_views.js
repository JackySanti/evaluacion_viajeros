const express = require('express')
const router = express.Router()
const db = require('../db/db')

const { mdwViewsSession, mdwReturnNoticias } = require('../middleware/index')

router.get('/', (req, res) => {
    res.render('layouts/index')
})

router.get('/noticias', (req, res) => {
    res.render('views/noticias', {
        layout: '',
        inicio: false,
    });
})

router.get('/cerrar_sesion', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})

// VISTA PARA USUARIOS
router.get('/identificacion', (req, res) => {
    res.render('views/identificacion_pasajero', {
        layout: '',
        inicio: true
    });
})

router.get('/contacto-personal', (req, res) => {
    res.render('views/contacto_personal', {
        layout: '',
        inicio: true
    });
})

router.get('/identificacion-del-viaje', (req, res) => {
    res.render('views/informacion_viaje', {
        layout: '',
        inicio: true
    });
})

router.get('/condicion-medica', (req, res) => {
    res.render('views/condicion_medica', {
        layout: '',
        inicio: true
    });
})

router.get('/informacion-medica', (req, res) => {
    res.render('views/informacion_medica', {
        layout: '',
        inicio: true
    });
})

router.get('/exposicion-directa', (req, res) => {
    res.render('views/exposcion_paciente', {
        layout: '',
        inicio: true
    });
})

router.get('/signos', (req, res) => {
    res.render('views/signos', {
        layout: '',
        inicio: true
    });
})

router.get('/comprobante-de-vacunacion', (req, res) => {
    res.render('views/comprobante_vacunacion', {
        layout: '',
        inicio: true
    });
})

// VISTA PARA ADMINISTRADORES
router.get('/pasajeros', async (req, res) => {
    try {
        let pasajeros = await db.administrador.tablaUsuarios();

        res.render('views/tabla_usuarios', {
            layout: '',
            inicio: true,
            data : pasajeros.consulta
        });

    } catch (err){

    }
})

module.exports = router