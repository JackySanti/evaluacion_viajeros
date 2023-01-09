const express = require('express')
const router = express.Router()
const db = require('../db/db')
const pdf = require('pdfkit')
const fs = require('fs')
const multer = require('multer')
const mimetypes = require('mime-types')

const { mdwViewsSession, mdwReturnNoticias, mdwPasajero, validacionResultados, mdwAdministrador } = require('../middleware/index')

const storage = multer.diskStorage({
    destination: (req, file, cb) =>{
        cb(null, './sis/comprobantes')
    },
    filename: (req, file, cb) => {
        cb(null, req.session.user.idCliente + 'ID' + Date.now() + "." + mimetypes.extension(file.mimetype));
    }
});

const upload = multer({
    storage: storage
})

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
                estado: result.consulta.estado
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
        
        let signos = await db.usuario.contadorSignosAnterior(usuario);
        let signos2 = await db.usuario.contadorSignosPosterior(usuario);
        let result, signo, signo2;

        if(signos.consulta.resultado < 14){
            let validacion = await db.usuario.validacionSignosRegistro(usuario);

            if(validacion.estado == 0){ 
                return res.json(validacion) 
            }

            result = await db.usuario.signosPersonal(usuario, data);

        } else {
            let validacion = await db.usuario.validacionSignosRegistro2(usuario);

            if(validacion.estado == 0){ 
                return res.json(validacion) 
            }

            let validacion2 = await db.usuario.validacionFechaLlegada(usuario);

            if(validacion2.estado == 0){ 
                return res.json(validacion2) 
            }

            result = await db.usuario.signosPersonal2(usuario, data)
        }

        if(signos.estado == 1){
            signo = await db.usuario.tablaSignosAnterior(usuario);
        }

        if(signos2.estado == 1){
            signo2 = await db.usuario.tablaSignosPosterior(usuario);
        }

        if(result.estado == 1){
            res.render('partials/tabla_signos_anterior', {
                layout: '',
                signo: (signos.estado == 1) ? true: false,
                signo2: (signos2.estado == 1) ? true: false,
                data: (signos.estado == 1) ? signo.consulta : '',
                data2: (signos2.estado == 1) ? signo2.consulta : ''
            }, (err, html) => {
                if (err) {
                    console.log(err)
                    return res.json({ estado: 0 })
                }
                return res.json({
                    estado: 1,
                    signo: (signos.estado == 1) ? true: false,
                    signo2: (signos2.estado == 1) ? true: false,
                    data: (signos.estado == 1) ? signo.consulta : '',
                    data2: (signos2.estado == 1) ? signo2.consulta : '',
                    html
                })
            })
        }

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post("/files", upload.single('archivo'), async (req, res) => {
    try{
        let usuario = req.session.user.idCliente;

        let ruta = __dirname;
        let nameFile = req.session.user.idCliente + 'ID' + Date.now() + ".pdf"
        let r_absoluta = `${ruta}/comprobantes/${nameFile}`;
        let r_relativa = `evaluacion_viajeros-main/sis/comprobantes/${nameFile}`;
        
        await db.usuario.comprobanteVacunacion(usuario, r_absoluta, r_relativa, nameFile);
        
        return res.redirect('/comprobante-de-vacunacion')

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/resultados_pasaje', async (req, res) => {
    try{
        let data = req.body;
        let usuario = req.session.user.idCliente;
        
        let registro = await db.usuario.resultadoInsercion(usuario, 0, data, '', '');
        return res.json(registro);

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

router.post('/generar_pdf', async (req, res) => {
    try{
        let usuario = req.session.user.idCliente;
        let sesion = req.session.user;

        let signos = await db.usuario.contadorSignosAnterior(usuario);
        let puntaje = await db.usuario.calculoPuntaje(usuario);
        let factor = await db.usuario.factorARFT();
        let palto = factor.consulta.p_alto;

        let valoracion = puntaje.consulta;
       
        if(puntaje.estado == 0){
            return res.json({ 
                estado: 0 , 
                mensaje: 
                'Debes completar los formularios de Exposición medica, Información Médica relacionada con COVID-19 y Exposición directa con un paciente COVID-19 positivo.'
            });
        }

        let contacto = (valoracion.contacto == true) ? 1 : 0;
        let diagnostico = (valoracion.diagnostico == true) ? 1 : 0;

        let suma = contacto + diagnostico + valoracion.infocovid + valoracion.condicion;

        if(suma >= palto) {
            return res.json({ estado: 0 , mensaje:  `Tu puntaje objetnido es de ${suma}, por lo cual debes de realizar una cuarentena.`});
        }

        if(signos.consulta.resultado < 14){
            return res.json({ estado: 0 , mensaje: 'Debes completar el registro de los 14 días para poder generar tu pdf.'});
        }

        await db.usuario.actualizarResultado(usuario, suma, 'Si', 'Si');

        let result = await db.usuario.consultaResultadosViaje(usuario);
        let datos = result.consulta;
        let doc = new pdf();

        let ruta = __dirname;
        let namepdf = `RESULTADO${Date.now()}${sesion.idCliente}.pdf`;
        let r_absoluta = `${ruta}/pdf/${namepdf}`;
        let r_relativa = `evaluacion_viajeros-main/sis/routes/pdf/${namepdf}`;
        await db.usuario.rutaPDF(usuario, r_relativa, r_absoluta);

        doc.pipe(fs.createWriteStream( __dirname + `/pdf/${namepdf}`));

        doc.image( __dirname + '/pdf/img/logo.png',70, 15, {width: 60})

        doc.text('RESULTADOS DE SEGUIMIENTO', {
            align: 'center'
        });
        doc.moveDown();

        doc.text(`Pasajero: ${sesion.name} ${sesion.paterno} ${sesion.materno}`, {
            align: 'left'
        });
        doc.moveDown();


        doc.text('Permiso de viajar:', {
            align: 'left'
        });
        if (datos.pcovid == 'Negativo') {
            doc.text('Aprobado', {
                align: 'left'
            });
        } else{
            doc.text('Denegado', {
                align: 'left'
            });
        }
        doc.moveDown();

        doc.text('Prueba estándar de reacción en cadena de la polimerasa (PCR) para covid-19 (Al menos 48 horas antes de viajar):', {
            align: 'left'
        });
        doc.text(datos.pcovid, {
            align: 'left'
        });
        doc.moveDown();

        // doc.text('Cumplió con los 14 días de seguimiento antes y despúes del viaje (App + dispositivos portable):', {
        //     align: 'left'
        // });
        // doc.text(datos.historial, {
        //     align: 'left'
        // });
        // doc.moveDown();


        // doc.text('Cuarentena:', {
        //     align: 'left'
        // });
        // doc.text(datos.cuarentena, {
        //     align: 'left'
        // });

        doc.end();

        console.log(__dirname);

        return res.json({estado: 1, mensaje: namepdf});

    } catch (err) {
        console.log(err)
        res.json({ estado: 0 });
    }
})

// actualiza la información para el usuario 
router.post('/update_contacto_personal', async (req, res) => {
    try{
        let data = req.body;
        let usuario = req.session.user.idCliente;

        await db.informacion.cambioEstado(usuario, 'CONTACTOPERSONAL')
        let result = await db.usuario.contactoPersonal(usuario, data);
        
        return res.json(result);
        
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
            let riesgos = await db.administrador.tablaFactoresRiesgo();
            let factores = await db.administrador.tablaFactoresRiesgo2();

            res.render('partials/tabla_riesgos', {
                layout: '',
                data : riesgos.consulta,
                factor: factores.consulta 
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

router.put('/actualizar_formularios', async (req, res) => {
    try {
        let data = req.body;
        let result = await db.administrador.actualizarPermisosFormularios(data);
        
        return res.json(result);

    } catch (error) {
        console.log(err)
        res.json({ estado: 0 });
    }
})



module.exports = router