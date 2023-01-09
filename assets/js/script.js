let contacto = 3, diagnostico = 3, contagio = 0;

$(function () {
    $(".datePicker").datepicker({
        format: 'dd/mm/yyyy',
        language: "es",
        autoclose: true,
        orientation: "bottom auto",
        todayHighlight : true,
        clearBtn : true
    });

    $('#flexRadioDefault1').click(function(){
        contacto = 1;
    });

    $('#flexRadioDefault2').click(function(){
        contacto = 0;
    });

    $('#flexRadioDefault3').click(function(){
        diagnostico = 1;
    });

    $('#flexRadioDefault4').click(function(){
        diagnostico = 0;
        contagio = 1;
    });
});

// $('#btnexampleModal').click(function(){
//     limpiarFormulario('form_administrador')
// });

function iniciar_sesion() {
    var formSesion = getFormulario('form_login');

    if (formSesion.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    if (validacionEmail(formSesion.inputsValue["input_correo"])) {
        fetch('/iniciar_sesion', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                correo : formSesion.value[0],
                contrasena: formSesion.value[1]
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.estado == 1) {
                    sweetAlert(2, 'success', `Preparando Sesión`, '');
                    setTimeout(function () { window.location.href = '/noticias' }, 3000)
                }
                else {
                    sweetAlert(2, 'error', 'Acceso denegado', `${response.mensaje}`); 
                }
            })
            .catch(error => console.error('Error:', error))
    }
    else { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'Introduzca un correo electrónico válido'); 
    }
}

function registrar_usuario() {
    var formRegistro = getFormulario('form_registro');

    if (formRegistro.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    // if (validacionPassword(formRegistro.inputsValue['contrasena'])) { 
    //     return sweetAlert(1, 'warning', 'Tu contraseña debe contener:',
    //                 'Como mínimo 8 caracteres, letras mayúsculas, mimúsculas, al menos un número y al menos un caracter especial.'
    //             );
    // }

    if (validacionEmail(formRegistro.inputsValue["correo"])) {
        fetch('/registrar_usuario', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formRegistro.inputsValue)
        })
            .then(response => response.json())
            .then(response => {
                if (response.estado == 1) {
                    sweetAlert(2, 'success', '¡Gracias por registrarte! ', 'Tu sesión se esta iniciando...');
                    setTimeout(function () { window.location.href = '/noticias' }, 5000)
                }
                else {
                     sweetAlert(2, 'error', 'Acceso denegado', `${response.mensaje}`); 
                }
            })
            .catch(error => console.error('Error:', error))
    }
    else { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'Introduzca un correo electrónico válido'); 
    }
}

// FUNCIONES DE LOS USUARIOS
function identificacion_pasajero() {
    var formIdentifiacion = getFormulario('form_identificacion');

    if (formIdentifiacion.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    fetch('/identificacion_pasajero', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formIdentifiacion.inputsValue)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}

function contacto_personal() {
    var formContacto = getFormulario('form_contacto');

    if (formContacto.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    if (validacionEmail(formContacto.value[7]) != true) {
        return sweetAlert(1, 'warning', 'Información incompleta', 'Introduzca un correo electrónico válido'); 
    }

    if (validacionEmail(formContacto.value[8]) != true) {
        return sweetAlert(1, 'warning', 'Información incompleta', 'Introduzca un correo electrónico válido'); 
    }

    if ((formContacto.value[7] == formContacto.value[8]) != true) {
        return sweetAlert(1, 'warning', 'Información incompleta', 'Verifica que los campos de correo electrónico coincidan.'); 
    }

    fetch('/contacto_personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formContacto.inputsValue)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}

function identificacion_viaje() {
    var formViaje = getFormulario('form_identificacion', ['numero_asiento', 'numero_acompanantes', 'lista_paises']);

    if (formViaje.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    fetch('/identificacion_viaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formViaje.inputsValue)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))

}

function condicion_medica() {
    let contador = 0;

    var data = {
        diabetes : $('#diabetes').prop('checked'),
        hipertension : $('#hipertension').prop('checked'),
        tabaquismo : $('#tabaquismo').prop('checked'),
        alcholismo : $('#alcoholismo').prop('checked'),
        obseidad : $('#obesiada').prop('checked'),
        vacunacion : $('#vacunacion').prop('checked'),
        e_cardiaca : $('#cardiaca').prop('checked'),
        nefropatia : $('#renal').prop('checked'),
        hepatopatia : $('#hepatica').prop('checked'),
        e_pulmonar : $('#pulmonar').prop('checked'),
        e_inmune : $('#inmune').prop('checked'),
        cancer : $('#cancer').prop('checked'),
        otra: $("#otra").val()
    };

    (data.diabetes == 1) ? contador++ : '';
    (data.hipertension == 1) ? contador++ : '';
    (data.tabaquismo == 1) ? contador++ : '';
    (data.alcholismo == 1) ? contador++ : '';
    (data.obseidad == 1) ? contador++ : '';
    (data.vacunacion == 1) ? contador++ : '';
    (data.e_cardiaca == 1) ? contador++ : '';
    (data.nefropatia == 1) ? contador++ : '';
    (data.hepatopatia == 1) ? contador++ : '';
    (data.e_pulmonar == 1) ? contador++ : '';
    (data.e_inmune == 1) ? contador++ : '';
    (data.cancer == 1) ? contador++ : '';
    (data.otra != '') ? contador++ : '';

    var objeto = JSON.stringify(data); 

    fetch('/condicion_medica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            objeto : objeto,
            puntaje: contador
        })
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}

function informacion_medica() {
    let contador = 0;

    var data = {
        fiebre : $('#fiebre').prop('checked'),
        tos: $('#tos').prop('checked'),
        d_respirar: $('#respirar').prop('checked'),
        d_garganta: $('#garganta').prop('checked'),
        e_nasal: $('#escurrimiento').prop('checked') ,
        escalofrios: $('#escurrimiento').prop('checked'),
        d_toracico: $('#toracico').prop('checked'),
        m_general: $('#general').prop('checked'),
        d_muscular: $('#muscular').prop('checked'),
        d_articular: $('#articular').prop('checked'),
        diarrea: $('#diarrea').prop('checked'),
        anosmia: $('#anosmia').prop('checked'),
        disguesia: $('#disguesia').prop('checked') 
    };

    (data.fiebre == 1) ? contador++ : '';
    (data.tos == 1) ? contador++ : '';
    (data.d_respirar == 1) ? contador++ : '';
    (data.d_garganta == 1) ? contador++ : '';
    (data.e_nasal == 1) ? contador++ : '';
    (data.escalofrios == 1) ? contador++ : '';
    (data.d_toracico == 1) ? contador++ : '';
    (data.m_general == 1) ? contador++ : '';
    (data.d_muscular == 1) ? contador++ : '';
    (data.d_articular == 1) ? contador++ : '';
    (data.diarrea == 1) ? contador++ : '';
    (data.anosmia == 1) ? contador++ : '';
    (data.disguesia == 1) ? contador++ : '';

    console.log(contador);
    var objeto = JSON.stringify(data); 

    fetch('/informacion_medica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            objeto : objeto,
            puntaje: contador
        })
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}

function exposicion_directa(){
    var formExposicion = getFormulario('form_exposicion');

    if(contacto == 3 || diagnostico == 3){
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    } 

    if(diagnostico == 1 ){
        if (formExposicion.estado == 0) { 
            return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
        }
    } 
    
    fetch('/exposicion_directa', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            contacto: contacto,
            diagnostico: diagnostico,
            fecha: (formExposicion.value[2]) ? formExposicion.value[2] : ''
        })
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}

function signos() {
    var formSignos = getFormulario('form_signos');

    if (formSignos.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    fetch('/signos_personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formSignos.inputsValue)
    })
        .then(response => response.json())
        .then(response => { 
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
                $("#exampleModal").modal('hide');
                document.getElementById('tabla_signos').innerHTML = response.html;
            }
            else {
                if(response.mensaje){
                    sweetAlert(2, 'error', 'Acceso denegado', `${response.mensaje}`); 
                } else {
                    sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
                }
            }
        })
        .catch(error => console.error('Error:', error))

}

function resultado_prueba() {
    var formResultado = getFormulario('form_resultados');

    if (formResultado.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }
    console.log(formResultado);

    fetch('/resultados_pasaje', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formResultado.inputsValue)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                $("#btnresult").removeAttr('disabled');
                sweetAlert(2, 'success', 'Proceso Completado', 'Ya puedes generar tu PDF.');
            }
            else {
                sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}

function generar_pdf() {
    let pdf = 1;

    fetch('/generar_pdf', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ pdf })
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'PDF Generado', 'Recuerde imprimir el pdf con los resultados antes de abordar.');
                descargarPDF(response.mensaje)
                //setTimeout(function () { window.location.href = '/downloadpdf' }, 5000)
            } else {
                sweetAlert(2, 'error', 'No cumples con los requisitos', `${response.mensaje}`); 
            }
        })
        .catch(error => console.error('Error:', error))
}

function descargarPDF(pdf) {
    window.location.href = `/downloadpdf/${pdf}`
}

// ACTUALIZA LA INFORMACION DE LOS USUARIOS
function update_contacto_personal() {
    var formContacto = getFormulario('form_contacto');

    if (formContacto.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    if (validacionEmail(formContacto.value[7]) != true) {
        return sweetAlert(1, 'warning', 'Información incompleta', 'Introduzca un correo electrónico válido'); 
    }

    if (validacionEmail(formContacto.value[8]) != true) {
        return sweetAlert(1, 'warning', 'Información incompleta', 'Introduzca un correo electrónico válido'); 
    }

    if ((formContacto.value[7] == formContacto.value[8]) != true) {
        return sweetAlert(1, 'warning', 'Información incompleta', 'Verifica que los campos de correo electrónico coincidan.'); 
    }

    fetch('/update_contacto_personal', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formContacto.inputsValue)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se actualizó con éxito.');
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}


// FUNCIONES DE LOS ADMINISTRADORES
function consultar_usuario(idUsuario){
    fetch('/consultar_usuario', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idUsuario })
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                let usuario = response.consulta;
               

                console.log(usuario);
                // $('#idUsuario').val(admin.id_usuario);
                // $('#nombre_up').val(admin.nombre);
                // $('#paterno_up').val(admin.paterno);
                // $('#materno_up').val(admin.materno);
                // $('#correo_up').val(admin.correo);
                // $('#estado').val((admin.estado == true) ? 'Activo' : 'Inactivo');

                
                // $('#idUsuario').hide();
               
                // $('#consultaAdmin').modal('show');
            }
        })
        .catch(error => console.error('Error:', error))
}

function eliminar_usuario(idUsuario){
    Swal.fire({
        title: 'Eliminar pasajero',
        text: `¿Desea eliminar al pasajero?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/eliminar_pasajero', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idUsuario })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.estado == 1) {
                        sweetAlert(2, 'success', 'Eliminado', 'Se ha eliminado al pasajero.');
                        document.getElementById('tabla_pasajero').innerHTML = response.html;
                    }
                })
                .catch(error => console.error('Error:', error))
        }
    })
}

function registrar_administrador(){
    var formSesion = getFormulario('form_administrador');

    if (formSesion.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios'); 
    }

    if (validacionEmail(formSesion.inputsValue["correo"])) {
        fetch('/nuevo_administrador', {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({
                nombre: formSesion.value[0],
                paterno: formSesion.value[1],
                materno: formSesion.value[2],
                correo : formSesion.value[3]
            })
        })
            .then(response => response.json())
            .then(response => {
                if (response.estado == 1) {
                    sweetAlert(2, 'success', 'Proceso Completado', 'La información se guardó con éxito.');
                    document.getElementById('tabla_administrador').innerHTML = response.html;
                    $("#exampleModal").modal('hide');
                }
                else {
                     sweetAlert(2, 'error', 'Error', 'El correo que esté intentado registrar ya se encuentra en uso.'); 
                }
            })
            .catch(error => console.error('Error:', error))
    }
    else { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'Introduzca un correo electrónico válido'); 
    }
}

function eliminar_administrador(idAdmin) {
    Swal.fire({
        title: 'Eliminar administrador',
        text: `¿Desea eliminar al administrador?`,
        icon: 'info',
        showCancelButton: true,
        confirmButtonText: 'Eliminar',
        cancelButtonText: "Cancelar"
    }).then((result) => {
        if (result.isConfirmed) {
            fetch('/eliminar_administrador', {
                method: 'PUT',
                headers: { 'Content-Type': 'application/json' },
                body: JSON.stringify({ idAdmin })
            })
                .then(response => response.json())
                .then(response => {
                    if (response.estado == 1) {
                        sweetAlert(2, 'success', 'Eliminado', 'Se ha eliminado al administrador.');
                        document.getElementById('tabla_administrador').innerHTML = response.html;
                    }
                })
                .catch(error => console.error('Error:', error))
        }
    })
}

function editar_administrador() {
    var formUpdate = getFormulario('form_update');

    if (formUpdate.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios.'); 
    }

    fetch('/editar_administrador', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formUpdate.inputsValue)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se actualizó con éxito.');
                document.getElementById('tabla_administrador').innerHTML = response.html;
                $("#consultaAdmin").modal('hide');
            }
            else {
                sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))

}

function consultar_administrador(idAdmin) {
    fetch('/consultar_administrador', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ idAdmin })
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                let admin = response.consulta;
               
                $('#idUsuario').val(admin.id_usuario);
                $('#nombre_up').val(admin.nombre);
                $('#paterno_up').val(admin.paterno);
                $('#materno_up').val(admin.materno);
                $('#correo_up').val(admin.correo);
                $('#estado').val((admin.estado == true) ? 'Activo' : 'Inactivo');

                
                $('#idUsuario').hide();
               
                $('#consultaAdmin').modal('show');
            }
        })
        .catch(error => console.error('Error:', error))
}

function consultar_puntaje(numero, id_factor) {
    fetch('/consultar_riesgo', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({ numero, id_factor })
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                let riesgo = response.consulta;

                $('#numero').val(riesgo.numero);
                $('#descripcion').val(riesgo.descripcion);
                $('#p_alto').val(riesgo.p_alto);
                $('#p_medio').val(riesgo.p_medio);
                $('#p_bajo').val(riesgo.p_bajo);
                $('#e_alto').val(riesgo.e_alto);
                $('#e_medio').val(riesgo.e_medio);
                $('#e_bajo').val(riesgo.e_bajo);

                $('#inputhide').hide();
               
                $('#exampleModal').modal('show');
            }
        })
        .catch(error => console.error('Error:', error))
}

function actualizar_riesgo() {
    var formUpdate = getFormulario('form_riesgo');

    if (formUpdate.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios.'); 
    }

    fetch('/actualizar_riesgos', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formUpdate.inputsValue)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se actualizó con éxito.');
                document.getElementById('tabla_riesgo').innerHTML = response.html;
                $("#exampleModal").modal('hide');
            }
            else {
                sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))

}

function actualizar_contrasena_admin() {
    var formPassword = getFormulario('form_contrasenaAdmin');

    if (formPassword.estado == 0) { 
        return sweetAlert(1, 'warning', 'Información incompleta', 'No se permiten campos vacios.'); 
    }

    var inputs = formPassword.inputsValue;

    if(inputs.n_contrasena === inputs.c_contrasena){
        fetch('/administrador_activo', {
            method: 'PUT',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify(formPassword.inputsValue)
        })
            .then(response => response.json())
            .then(response => {
                if (response.estado == 1) {
                    sweetAlert(2, 'success', 'Cuenta administrador activa', 'La información se actualizó con éxito.');
                    $("#contrasenaAdmin").modal('hide');
                }
                else {
                    sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
                }
            })
            .catch(error => console.error('Error:', error))

    } else {
        return sweetAlert(1, 'warning', 'Información incompleta', 'Las contraseñas no coinciden.'); 
    }
}

function actualizar_formularios() {
    var formUpdate = getFormulario('form_Permisos');

    fetch('/actualizar_formularios', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(formUpdate.value)
    })
        .then(response => response.json())
        .then(response => {
            if (response.estado == 1) {
                sweetAlert(2, 'success', 'Proceso Completado', 'La información se actualizó con éxito.');
        
                setTimeout(function () { window.location.href = '/formularios' }, 3000)
            }
            else {
                sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))
}