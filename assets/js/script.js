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
                if (response.estado === 1) {
                    sweetAlert(2, 'success', `Bienvenido ${response.nombre}`, 'Preparando Sesión');
                    // setTimeout(function () { window.location.href = '/' }, 3000)
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