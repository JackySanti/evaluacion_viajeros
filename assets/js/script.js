$(function () {
    $(".datePicker").datepicker({
        format: 'dd/mm/yyyy',
        language: "es",
        autoclose: true,
        orientation: "bottom auto",
        todayHighlight : true,
        clearBtn : true
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
                 sweetAlert(2, 'error', 'Acceso denegado', `${response.mensaje}`); 
            }
        })
        .catch(error => console.error('Error:', error))
}