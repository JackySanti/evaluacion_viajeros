const sql = require('mssql')
const {sql_conn} = require('./config')

const test = {
    obtenerProductos: async () => {
        try{
            let result = await sql_conn.request()
            .query(`SELECT * FROM ARTICULOS WHERE ESTATUS = 1 ORDER BY ID DESC`)
            return(result)
        }catch(err){
            throw err
        }
    } ,
    nuevoProducto: async ({Nombre, Marca, Precio, Unidad, Existencia}) => {
        console.log(Nombre)
        try{
            const status = 1;
            let query = `
            INSERT INTO ARTICULOS(NOMBRE, MARCA, PRECIO, UNIDAD, EXISTENCIA,ESTATUS) VALUES ('${Nombre}', '${Marca}', ${Precio}, '${Unidad}', ${Existencia}, ${status})
            `
            console.log(query)
            let result = await sql_conn.request()
            .query(query)
            return(result)
        }catch(err){
            throw err
        }
    },
    actualizarProducto: async({Id,Nombre, Marca, Precio, Unidad, Existencia}) =>{
        try{
            let result = await sql_conn.request()
            .query(`
            UPDATE ARTICULOS SET NOMBRE = '${Nombre}', MARCA = '${Marca}', PRECIO = ${Precio},  UNIDAD = '${Unidad}', EXISTENCIA = ${Existencia} WHERE ID = ${Id}
            `)
            return(result)
        }catch(err){
            throw err
        }

    },
    eliminarProducto: async({Id}) =>{
        try{
            let result = await sql_conn.request()
            .query(`UPDATE ARTICULOS SET ESTATUS = 0 WHERE ID = ${Id}`)
            return(result)
        }catch(err){
            throw err
        }

    }
}

module.exports = {
    test
}