const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.post('/iniciar_sesion', async (req, res) => {
    try{
        let data = req.body;

        let result = db.usuario.iniciarSesion();

        console.log(result);

        return res.json({ estado: 1 });

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

module.exports = router