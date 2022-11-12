const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.get('/', (req, res) => {
    console.log(req.session.user)
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

router.get('/cerrar_sesion', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})


module.exports = router