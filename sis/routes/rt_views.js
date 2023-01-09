const express = require('express')
const router = express.Router()
const db = require('../db/db')

const { mdwViewsSession, mdwReturnNoticias, mdwPasajero, validacionResultados, mdwAdministrador } = require('../middleware/index')

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
router.get('/identificacion', [mdwViewsSession, mdwPasajero], async (req, res) => {
    try{
        let contulta = await db.administrador.permisoFormularios();
        let permiso = contulta.data[0].IDPASJ;

        let sesion = req.session.user;
        let usuario = req.session.user.idCliente;
        let informacion = await db.informacion.identificacionPasajero(usuario);

        res.render('views/identificacion_pasajero', {
            layout: '',
            inicio: true,
            permiso: permiso,
            registro: informacion.estado,
            data: informacion.consulta,
            nombre: sesion.name,
            paterno: sesion.paterno,
            materno: sesion.materno
        });
    } catch(err){
        throw err;
    }
})

router.get('/contacto-personal', [mdwViewsSession, mdwPasajero], async (req, res) => {
    try {
        let contulta = await db.administrador.permisoFormularios();
        let permiso = contulta.data[0].CONPER;

        let usuario = req.session.user.idCliente;
        let informacion = await db.informacion.contactoPersonal(usuario);

        res.render('views/contacto_personal', {
            layout: '',
            inicio: true,
            permiso: permiso,
            registro: informacion.estado,
            data: informacion.consulta
        });
    } catch(err){
        throw err;
    }
})

router.get('/identificacion-del-viaje', [mdwViewsSession, mdwPasajero], async (req, res) => {
    try{
        let contulta = await db.administrador.permisoFormularios();
        let permiso = contulta.data[0].INFVIJ;

        let usuario = req.session.user.idCliente;
        let informacion = await db.informacion.informacionViaje(usuario);

        res.render('views/informacion_viaje', {
            layout: '',
            inicio: true,
            permiso: permiso,
            registro: informacion.estado,
            data: informacion.consulta
        });
    } catch(err){
        throw err;
    }
})

router.get('/condicion-medica', [mdwViewsSession, mdwPasajero], async (req, res) => {
    try {
        let contulta = await db.administrador.permisoFormularios();
        let permiso = contulta.data[0].CONMED;

        let usuario = req.session.user.idCliente;
        let informacion = await db.informacion.condicionMedica(usuario);
        let datos = informacion.consulta[0];
        let objeto;

        if(informacion.estado == 1){
            objeto = JSON.parse(datos.condicion) 
        }

        res.render('views/condicion_medica', {
            layout: '',
            inicio: true,
            permiso: permiso,
            registro: informacion.estado,
            data: [objeto]
        });
    } catch (err) {
        throw err;
    }
})

router.get('/informacion-medica', [mdwViewsSession, mdwPasajero], async (req, res) => {
    try {
        let contulta = await db.administrador.permisoFormularios();
        let permiso = contulta.data[0].INMRCV;

        let usuario = req.session.user.idCliente;
        let informacion = await db.informacion.sintomasRelacionados(usuario);
        let datos = informacion.consulta[0];
        let objeto;

        if(informacion.estado == 1){
            objeto = JSON.parse(datos.sintomas) 
        }

        res.render('views/informacion_medica', {
            layout: '',
            inicio: true,
            permiso: permiso,
            registro: informacion.estado,
            data: [objeto]
        });
    } catch (err) {
        throw err;
    }
})

router.get('/exposicion-directa', [mdwViewsSession, mdwPasajero], async (req, res) => {
    try {
        let contulta = await db.administrador.permisoFormularios();
        let permiso = contulta.data[0].EXPDPC;

        let usuario = req.session.user.idCliente;
        let informacion = await db.informacion.exposicionCovid(usuario);

        res.render('views/exposcion_paciente', {
            layout: '',
            inicio: true,
            permiso: permiso,
            registro: informacion.estado,
            data: informacion.consulta
        });
    } catch (err) {
        throw err;
    }
})

router.get('/signos', [mdwViewsSession, mdwPasajero], async(req, res) => {
    try{
        let usuario = req.session.user.idCliente;

        let signos = await db.usuario.contadorSignosAnterior(usuario);
        let signos2 = await db.usuario.contadorSignosPosterior(usuario);
        let signo, signo2;

        if(signos.estado == 1){
            signo = await db.usuario.tablaSignosAnterior(usuario);
            
            signo.consulta.filter((elem, index) => {
                elem.id_signo = index + 1;
            });
        }

        if(signos2.estado == 1){
            signo2 = await db.usuario.tablaSignosPosterior(usuario);

            signo2.consulta.filter((elem, index) => {
                elem.id_signo = index + 1;
            });
        }

        res.render('views/signos', {
            layout: '',
            inicio: true,
            signo: (signos.estado == 1) ? true: false,
            signo2: (signos2.estado == 1) ? true: false,
            data: (signos.estado == 1) ? signo.consulta : '',
            data2: (signos2.estado == 1) ? signo2.consulta : '',
        });

    }catch (err){
        throw err;
    }
})

router.get('/autores', [mdwViewsSession, mdwPasajero], (req, res) => {
    res.render('views/autores', {
        layout: '',
        inicio: true
    });
})

router.get('/comprobante-de-vacunacion', [mdwViewsSession, mdwPasajero], async (req, res) => {
    try {
        let usuario = req.session.user.idCliente;
        let comprobante = await db.usuario.consultaComprobante(usuario);
        
        if(comprobante.estado == 1){
            res.render('views/comprobante_vacunacion', {
                layout: '',
                inicio: true,
                comprobante: false,
            });
        } else {
            res.render('views/comprobante_vacunacion', {
                layout: '',
                inicio: true,
                comprobante: true
            });
        }
        

    } catch (err){
        throw err;
    }
})

router.get('/resultados', [mdwViewsSession, mdwPasajero, validacionResultados], async (req, res) => {
    try {
        let usuario = req.session.user;
        let pasajeros = await db.usuario.consultaResultados(usuario);

        if(pasajeros.estado == 1){
            res.render('views/resultados', {
                layout: '',
                inicio: true,
                pdf: true 
            });
        } else {
            res.render('views/resultados', {
                layout: '',
                inicio: true,
                pdf: false 
            });
        }
        

    } catch (err){
        throw err;
    }
   
})

router.get('/downloadpdf/:pdf', [mdwViewsSession, mdwPasajero, validacionResultados], (req, res) => {
    const opcion = req.params.pdf;
    res.download(__dirname + `/pdf/${opcion}`, function (err) {
        if(err){
            console.log(err);
        }
    })
})

// VISTA PARA ADMINISTRADORES
router.get('/pasajeros', [mdwViewsSession, mdwAdministrador], async (req, res) => {
    try {
        let pasajeros = await db.administrador.tablaUsuarios();

        res.render('views/tabla_usuarios', {
            layout: '',
            inicio: false,
            pasajeros: (pasajeros.consulta.length > 0) ? true : false,
            data : pasajeros.consulta,
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
        let factores = await db.administrador.tablaFactoresRiesgo2();

        res.render('views/categorias', {
            layout: '',
            inicio: false,
            data: riesgo.consulta,
            factor: factores.consulta 
        });

    } catch (err){
        throw err;
    }
})

router.get('/formularios', [mdwViewsSession, mdwAdministrador], async (req, res) => {
    try {
        let formulario = await db.administrador.permisoFormularios();
        
        res.render('views/permiso_formularios', {
            layout: '',
            inicio: false,
            data: formulario.data
        });

    } catch (err){
        throw err;
    }
})

module.exports = router