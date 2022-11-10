const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.post('/iniciar_sesion', async (req, res) => {
    try{
        let data = req.body;
        let result = await db.usuario.iniciarSesion(data);

        return res.json(result);
        
    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

module.exports = router