const express = require('express')
const router = express.Router()
const db = require('../db/db')

const { mdwViewsSession, mdwReturnNoticias } = require('../middleware/index')

router.get('/', (req, res) => {
    res.render('layouts/index')
})

router.get('/noticias', (req, res) => {
    res.render('views/noticias', {
        layout: ''
    });
})

router.get('/identificacion', (req, res) => {
    res.render('views/identificacion_pasajero', {
        layout: ''
    });
})

router.get('/contacto-personal', (req, res) => {
    res.render('views/contacto_personal', {
        layout: ''
    });
})

router.get('/identificacion-del-viaje', (req, res) => {
    res.render('views/informacion_viaje', {
        layout: ''
    });
})

router.get('/condicion-medica', (req, res) => {
    res.render('views/condicion_medica', {
        layout: ''
    });
})

router.get('/informacion-medica', (req, res) => {
    res.render('views/informacion_medica', {
        layout: ''
    });
})

router.get('/exposicion-directa', (req, res) => {
    res.render('views/exposcion_paciente', {
        layout: ''
    });
})

router.get('/signos', (req, res) => {
    res.render('views/signos', {
        layout: ''
    });
})

router.get('/cerrar_sesion', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})


module.exports = router