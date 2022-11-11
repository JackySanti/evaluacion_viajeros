const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.get('/', (req, res) => {
    console.log(req.session.user)
    res.render('layouts/index')
})

router.get('/dashboard', (req, res) => {
    
})

router.get('/cerrar_sesion', (req, res) => {
    req.session.destroy((error) => {
        res.redirect('/')
    })
})


module.exports = router