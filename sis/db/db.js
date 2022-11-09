const sql = require('mssql')
const {sql_conn} = require('./config')

const test = {
    // obtenerProductos: async () => {
    //     try{
    //         let result = await sql_conn.request()
    //         .query(`SELECT * FROM ARTICULOS WHERE ESTATUS = 1 ORDER BY ID DESC`)
    //         return(result)
    //     }catch(err){
    //         throw err
    //     }
    // } 
}

module.exports = {
    test
}