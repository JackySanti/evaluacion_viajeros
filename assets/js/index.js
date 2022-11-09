var deleteID, actualizarID

function nProducto(event) {
    const $cambio = document.getElementById('aCambios')
    event.preventDefault()
    const nombre = document.getElementById('nomArticulo')
    const marca = document.getElementById('marca')
    const precio = document.getElementById('precio')
    const unidad = document.getElementById('unidad')
    const existencia = document.getElementById('existencia')
    fetch('/nuevo_articulo',{
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            Nombre: nombre.value,
            Marca: marca.value,
            Precio: precio.value,
            Unidad: unidad.value,
            Existencia: existencia.value,
        })
    })
    .then(response => response.json())
    .then(response => {
        $cambio.innerHTML = response.html
    })
    .catch(error => console.error('Error:', error))

}

function limpiar(event){}

// innetText

function btnUpdate(id, nombre, marca, precio, unidad, existencia){
    actualizarID = id
    document.getElementById('mArticulo').value = nombre
    document.getElementById('mMarca').value = marca
    document.getElementById('mPrecio').value = precio
    document.getElementById('mUnidad').value = unidad
    document.getElementById('mExistencia').value = existencia
}

function actualizar(){
    const $cambio = document.getElementById('aCambios')
    let $nombre = document.getElementById('mArticulo').value
    let $marca = document.getElementById('mMarca').value
    let $precio = document.getElementById('mPrecio').value
    let $unidad = document.getElementById('mUnidad').value
    let $existencia = document.getElementById('mExistencia').value
    
    fetch('/actualizar_articulo',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            Id: actualizarID,
            Nombre: $nombre,
            Marca: $marca,
            Precio: $precio,
            Unidad: $unidad,
            Existencia: $existencia 
        })
    })
    .then(response => response.json())
    .then(response =>{
        console.log(response)
        $cambio.innerHTML = response.html
    })
    .catch(error => console.error('Error:', error))

}

function btnDelete(id) { 
    deleteID = id
}

function borrar(){
    const $cambio = document.getElementById('aCambios')
    fetch('/eliminar_articulo',{
        method: 'PUT',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify({
            Id: deleteID
        })
    })
    .then(response => response.json())
    .then(response => {
        $cambio.innerHTML = response.html
    })
    .catch(error => console.error('Error:', error))
}

