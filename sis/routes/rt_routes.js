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
                tipo: (result.consulta.tipo) ? 1  : 0,
                estado: result.estado
            }
        }

        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/registrar_usuario', async (req, res) => {
    try{
        let data = req.body;
        let result = await db.usuario.validacionUsuario(data);

        if (result.estado == 1) {
            let insercion = await db.usuario.registrarUsuario(data);

            console.log(insercion);

            let correo = data.correo;
            let contrasena = data.contrasena;

            let sesion = await db.usuario.iniciarSesion({correo, contrasena});

            req.session.user = {
                idCliente: sesion.consulta.id_usuario,
                email: sesion.consulta.correo,
                name: sesion.consulta.nombre,
                paterno: sesion.consulta.paterno,
                materno: sesion.consulta.materno,
                tipo: (sesion.consulta.tipo) ? 1  : 0
            }
        }

        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

// RUTAS PARA EL USUARIO
router.post('/identificacion_pasajero', async (req, res) => {
    try{
        let data = req.body;
        let usuario = req.session.user.idCliente;

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
        let usuario = req.session.user.idCliente;

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
        let usuario = req.session.user.idCliente;

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
        let usuario = req.session.user.idCliente;

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
        let usuario = req.session.user.idCliente;

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
        let usuario = req.session.user.idCliente;

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
        let usuario = req.session.user.idCliente;

        let result = await db.usuario.signosPersonal(usuario, data)
        return res.json(result);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/resultados_pasaje', async (req, res) => {
    try{
        let data = req.body;
        let usuario = req.session.user.idCliente;

        let result = await db.usuario.consultaSignosUsuario(usuario);
        let signos = result.consulta['signos'];

        if(signos != 0){
            let registro = await db.usuario.resultadoInsercion(usuario, 0, data, 'Si', 'Si');
            return res.json(registro);

        } else {
            let registro = await db.usuario.resultadoInsercion(usuario, 0, data, 'No', 'No');
            return res.json(registro);
        }

        

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

// RUTAS PARA EL ADMINISTRADOR
router.post('/nuevo_administrador', async (req, res) => {
    try{
        let data = req.body;

        let result = await db.administrador.registroAdministrador(data)

        if(result.estado == 1){
            let pasajeros = await db.administrador.tablaAdministradores();

            res.render('partials/tabla_administradores', {
                layout: '',
                data : pasajeros.consulta
            }, (err, html) => {
                if (err) {
                    console.log(err)
                    return res.json({ estado: 0 })
                }
                return res.json({
                    estado: 1,
                    data : pasajeros.consulta,
                    html
                })
            })

        } else {
            return res.json(result);
        }

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.put('/eliminar_administrador', async (req, res) => {
    try {
        let data = req.body;
        let result = await db.administrador.eliminarAdministrador(data);

        if(result.estado == 1){
            let pasajeros = await db.administrador.tablaAdministradores();

            res.render('partials/tabla_administradores', {
                layout: '',
                data : pasajeros.consulta
            }, (err, html) => {
                if (err) {
                    console.log(err)
                    return res.json({ estado: 0 })
                }
                return res.json({
                    estado: 1,
                    data : pasajeros.consulta,
                    html
                })
            })

        } else {
            return res.json(result);
        }
    }
    catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.put('/editar_administrador', async (req, res) => {
    try {
        let data = req.body;
        let result = await db.administrador.actualizarAdministrador(data);

        if(result.estado == 1){
            let pasajeros = await db.administrador.tablaAdministradores();

            res.render('partials/tabla_administradores', {
                layout: '',
                data : pasajeros.consulta
            }, (err, html) => {
                if (err) {
                    console.log(err)
                    return res.json({ estado: 0 })
                }
                return res.json({
                    estado: 1,
                    data : pasajeros.consulta,
                    html
                })
            })

        } else {
            return res.json(result);
        }
    } catch (error) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.put('/administrador_activo', async(req, res) => {
    try{
        let data = req.body;
        let result = await db.administrador.actualizarEstadoContra(data);

        return res.json(result);
    } catch (error) {
        console.log(error)
        res.json({ estado: 0 });
    }
})

router.post('/consultar_administrador', async (req, res) => {
    try {
        let data = req.body;
        let result = await db.administrador.consultaAdministrador(data);

        return res.json(result);
    } catch (error) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/consultar_usuario', async (req, res) =>{
    try {
        let data = req.body;
        let result = await db.administrador.informacionUsuario(data);

        return res.json(result);
    } catch (error) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.put('/eliminar_pasajero', async (req, res) => {
    try {
        let data = req.body;
        let result = await db.administrador.eliminarPasajero(data);

        if(result.estado == 1){
            let pasajeros = await db.administrador.tablaUsuarios();

            res.render('partials/tabla_pasajeros', {
                layout: '',
                data : pasajeros.consulta
            }, (err, html) => {
                if (err) {
                    console.log(err)
                    return res.json({ estado: 0 })
                }
                return res.json({
                    estado: 1,
                    data : pasajeros.consulta,
                    html
                })
            })

        } else {
            return res.json(result);
        }
    }
    catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/consultar_riesgo', async (req, res) => {
    try {
        let data = req.body;
        let result = await db.administrador.consultaRiesgo(data);

        return res.json(result);
    } catch (error) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.put('/actualizar_riesgos', async (req, res) => {
    try {
        let data = req.body;
        let result = await db.administrador.actualizarRiesgo(data);

        if(result.estado == 1){
            let riesgos = await db.administrador.tablaFactoresRiesgo(data);

            res.render('partials/tabla_riesgos', {
                layout: '',
                data : riesgos.consulta
            }, (err, html) => {
                if (err) {
                    console.log(err)
                    return res.json({ estado: 0 })
                }
                return res.json({
                    estado: 1,
                    data : riesgos.consulta,
                    html
                })
            })

        } else {
            return res.json(result);
        }
    } catch (error) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

module.exports = router