function validacionEmail(correo) {
    return !(/^[-\w.%+]{1,64}@(?:[A-Z0-9-]{1,63}\.){1,125}[A-Z]{2,63}$/i).exec(correo) ? false : true;
}

function ascii() {
    var letras = '';
    for (i = 33; i <= 254; i++) {
        letras += String.fromCharCode(i);
    }
    return letras;
}

function validacionPassword(password) {
    if (password.length >= 8) {
        var expReg = new RegExp('[A-Za-z0-9'+ascii()+']','g')
        return !expReg.exec(password) ? false : true;
    } else { return false; }
}

function validate(event) {
    var codeAscii = (event.which) ? event.which : event.keyCode
    return (codeAscii > 31 && (codeAscii < 48 || codeAscii > 57)) ? false : true;
}

function sweetAlert(tipo, icon, titulo, text) {
    if (tipo == 1) {
        return Swal.fire({
            icon: `${icon}`,
            title: `${titulo}`,
            text: `${text}`,
            confirmButtonColor: "#c32429"
        })
    }

    if (tipo == 2) {
        return Swal.fire({
            icon: `${icon}`,
            title: `${titulo}`,
            text: `${text}`,
            showConfirmButton: false,
            timer: 4000
        });
    }

    if (tipo == 3) {
        return Swal.fire({
            icon: `${icon}`,
            title: `${titulo}`,
            text: `${text}`,
            confirmButtonColor: "#c32429",
            confirmButtonColor: "#9c9c9c"
        })
    }
}

function getFormulario(idForm, atributos) {
    var formData = new FormData(document.getElementById(`${idForm}`));
    var _json = { estado: 0, inputsValue: {}, ignorar: [], vacio: [], value: [] }

    formData.forEach((valor, id) => {
        if (!valor) { _json.vacio.push(`${id}`); }
        else {
            _json.inputsValue[id] = valor;
            _json.value.push(`${valor}`)
        }
    })

    if (atributos) {
        _json.vacio.forEach((id) => {
            for (var i = 0; i < atributos.length; i++) {
                if (id == atributos[i]) {
                    _json.vacio = _json.vacio.filter((id) => {
                        return id !== atributos[i]
                    })
                }
            }
        })
    }

    if (!_json.vacio.length) { _json.estado = 1 }
    return _json
}

function limpiarFormulario(idForm, idAlert) {
    if (idAlert) {
        var alert = document.getElementById(`${idAlert}`);
        alert.style.display = 'none';
    }
    return document.getElementById(`${idForm}`).reset()
}
