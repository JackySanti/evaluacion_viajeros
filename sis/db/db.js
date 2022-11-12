const sql = require('mssql')
const {sql_conn} = require('./config')

const usuario = {
    iniciarSesion: async ({correo, contrasena}) =>{
        try{
            let result = await  sql_conn.request()
            .input('CORREO_CONSULTA', sql.VarChar, correo)
            .query(`SELECT contrasena FROM USUARIOS WHERE correo = @CORREO_CONSULTA`);


            if (result.rowsAffected[0] == 1) {
                if (contrasena === result.recordset[0].contrasena) {
                    let consulta = await sql_conn.request()
                        .input('CORREO_CONSULTA', sql.VarChar, correo)
                        .query(`SELECT * FROM USUARIOS WHERE correo = @CORREO_CONSULTA`);
                    return { estado: 1, mensaje: 'Preparando Sesión.', consulta: consulta.recordset[0]};
                } else { 
                    return { estado: 0 , mensaje: 'Tu contraseña es incorrecta intenta de nuevo.'};
                }
            } else { 
                return { estado: 0, mensaje: 'No se encontró  al usuario con las credenciales ingresadas.' }; 
            }
        } catch(err){
            throw err
        }
    },
    datosPersonales: async (usuario, data) => {
        try{
            let f_nacimiento = data.f_nacimiento.split('/').reverse().join('-');
            let f_expiracion = data.f_expiracion.split('/').reverse().join('-');

            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('PNACIMIENTO', sql.NVarChar, data.pais_nacimiento)
            .input('EDAD', sql.Int, data.edad)
            .input('FNACIMIENTO', sql.SmallDateTime, f_nacimiento)
            .input('PASAPORTE', sql.NVarChar, data.pasaporte)
            .input('PVALIDACION', sql.NVarChar, data.pais_validacion)
            .input('FEXPIRACION', sql.SmallDateTime, f_expiracion)
            .input('OCUPACION', sql.NVarChar, data.ocupacion)
            .query(`INSERT INTO DATOSPERSONALES(id_usuario, p_nacimiento, edad, f_nacimiento, pasaporte, p_validacion, f_expiracion, ocupacion, estado)
            VALUES(@IDUSUARIO, @PNACIMIENTO, @EDAD, @FNACIMIENTO, @PASAPORTE, @PVALIDACION, @FEXPIRACION, @OCUPACION, 1)`);
            return {estado: 1}
        
        } catch(err){
            throw err
        }
    }
}

module.exports = {
    usuario
}