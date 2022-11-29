let contacto = 3, diagnostico = 3;

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
    });
});

$('#btnexampleModal').click(function(){
    limpiarFormulario('form_administrador')
});

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
        ota: $("#otra").val()
    };

    var objeto = JSON.stringify(data); 

    fetch('/condicion_medica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            objeto : objeto
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

    var objeto = JSON.stringify(data); 

    fetch('/informacion_medica', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify({
            objeto : objeto
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

    if(contacto == 1 || diagnostico == 1){
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
            }
            else {
                 sweetAlert(2, 'error', 'Acceso denegado', `Error interno del servidor, por favor contactese con el desarrollador.`); 
            }
        })
        .catch(error => console.error('Error:', error))

}

// FUNCIONES DE LOS ADMINISTRADORES
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