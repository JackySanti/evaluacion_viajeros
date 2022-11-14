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
})

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