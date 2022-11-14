const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.post('/iniciar_sesion', async (req, res) => {
    try{
        let data = req.body;
        let result = await db.usuario.iniciarSesion(data);

        if (result.estado == 1) {
            req.session.user = {
                idCliente: result.consulta.id_usuario,
                email: result.consulta.correo,
                name: result.consulta.nombre,
                paterno: result.consulta.paterno,
                materno: result.consulta.materno,
                tipo: (result.consulta.tipo) ? 1  : 0
            }
        }

        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/identificacion_pasajero', async (req, res) => {
    try{
        let data = req.body;
        let usuario = 1;

        let result = await db.usuario.datosPersonales(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/contacto_personal', async (req, res) => {
    try{
        let data = req.body;
        let usuario = 1;

        let result = await db.usuario.contactoPersonal(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/identificacion_viaje', async (req, res) => {
    try{
        let data = req.body;
        let usuario = 1;

        let result = await db.usuario.identificacionViaje(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/condicion_medica', async (req, res) => {
    try{
        let data = req.body;
        let usuario = 1;

        let result = await db.usuario.condicionMedica(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/informacion_medica', async (req, res) => {
    try{
        let data = req.body;
        let usuario = 1;

        let result = await db.usuario.informacionMedica(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/exposicion_directa', async (req, res) => {
    try{
        let data = req.body;
        let usuario = 1;

        let result = await db.usuario.exposicionDirecta(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/signos_personal', async (req, res) => {
    try{
        let data = req.body;
        let usuario = 1;

        let result = await db.usuario.signosPersonal(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

module.exports = router