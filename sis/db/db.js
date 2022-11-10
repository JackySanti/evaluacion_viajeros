const sql = require('mssql')
const {sql_conn} = require('./config')

const usuario = {
    // obtenerProductos: async () => {
    //     try{
    //         let result = await sql_conn.request()
    //         .query(`SELECT * FROM ARTICULOS WHERE ESTATUS = 1 ORDER BY ID DESC`)
    //         return(result)
    //     }catch(err){
    //         throw err
    //     }
    // } 
    iniciarSesion: async (data) =>{
        try{
            console.log(data);
            return(1)
        } catch(err){
            throw err
        }
    }
}

module.exports = {
    usuario
}