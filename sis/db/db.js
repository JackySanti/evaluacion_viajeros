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
    },
    contactoPersonal: async (usuario, data) => {
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('RESIDENCIA', sql.NVarChar, data.nombre_residencia)
            .input('CALLE', sql.NVarChar, data.calle)
            .input('NUMERO', sql.NVarChar, data.numero)
            .input('COLONIA', sql.NVarChar, data.colonia)
            .input('CP', sql.NVarChar, data.codigo_postal)
            .input('PROVINCIA', sql.NVarChar, data.provincia)
            .input('PAIS', sql.NVarChar, data.pais)
            .input('CORREO', sql.NVarChar, data.email)
            .input('TPRIMARIO', sql.NVarChar, data.telefono_primario)
            .input('TSECUNDARIO', sql.NVarChar, data.telefono_secundario)
            .input('TFAMILIAR', sql.NVarChar, data.telefono_familiar)
            .query(`INSERT INTO CONTACTOPERSONAL(id_usuario, residencia, calle, numero, colonia, cp, provincia, pais, correo, tl_primario, tl_secundario, tl_familiar, estado)
            VALUES(@IDUSUARIO, @RESIDENCIA, @CALLE, @NUMERO, @COLONIA, @CP, @PROVINCIA, @PAIS, @CORREO, @TPRIMARIO, @TSECUNDARIO, @TFAMILIAR, 1)`);
           
            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    condicionMedica:async (usuario, data)=>{
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('CONDICION', sql.Text, data.objeto)
            .query(`INSERT INTO CONDICIONMEDICA(id_usuario, condicion, estado)
            VALUES(@IDUSUARIO, @CONDICION, 1)`);

            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    identificacionViaje:async (usuario, data)=>{
        try{
            let f_llegada = data.f_llegada.split('/').reverse().join('-');
            let f_partida = data.f_partida.split('/').reverse().join('-');

            let nasiento = (data.numero_asiento) ? data.numero_asiento : '';
            let nacompanantes = (data.numero_acompanantes) ? data.numero_acompanantes : '';
            let lpais = (data.lista_paises) ? data.lista_paises : '';

            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('FLLEGADA', sql.SmallDateTime, f_llegada)
            .input('FPARTIDA', sql.SmallDateTime, f_partida)
            .input('UENTRADA', sql.NVarChar, data.ultima_entrada)
            .input('USALIDA', sql.NVarChar, data.ultima_salida)
            .input('MVIAJE', sql.NVarChar, data.modo_viaje)
            .input('NASIENTO', sql.NVarChar, nasiento)
            .input('NACOMPANANTES', sql.NVarChar, nacompanantes)
            .input('ESTANCIA', sql.NVarChar, data.estancia)
            .input('CALLE', sql.NVarChar, data.calle)
            .input('NUMERO', sql.NVarChar, data.numero)
            .input('COLONIA', sql.NVarChar, data.colonia)
            .input('CP', sql.NVarChar, data.codigo_postal)
            .input('PROVINCIA', sql.NVarChar, data.provincia)
            .input('PAIS', sql.NVarChar, data.pais)
            .input('MOTIVO', sql.NVarChar, data.motivo)
            .input('LPAIS', sql.Text, lpais)
            .query(`INSERT INTO INFORMACIONVIAJE(id_usuario, f_llegada, f_partida, cd_entrada, cd_salida, m_viaje, 
            n_asiento, n_acomanantes, n_estancia, calle, numero, colonia, cp, provincia, pais, mtv_viaje, l_paises, estado)
            VALUES(@IDUSUARIO, @FLLEGADA, @FPARTIDA, @UENTRADA, @USALIDA, @MVIAJE,
            @NASIENTO, @NACOMPANANTES, @ESTANCIA, @CALLE, @NUMERO, @COLONIA, @CP, @PROVINCIA, @PAIS, @MOTIVO, @LPAIS, 1)`);

            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    informacionMedica:async (usuario, data)=>{
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('SINTOMAS', sql.Text, data.objeto)
            .query(`INSERT INTO INFORMACIONCOVID(id_usuario, sintomas, estado)
            VALUES(@IDUSUARIO, @SINTOMAS, 1)`);

            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    exposicionDirecta: async (usuario, data) => {
        try{
            let fecha = data.fecha.split('/').reverse().join('-');
            
            if(data.contacto == 1 && data.diagnostico == 1){
                await sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario)
                .input('CONTACTO', sql.Bit, data.contacto)
                .input('DIAGNOSTICO', sql.Bit, data.diagnostico)
                .input('FECHA', sql.SmallDateTime, fecha)
                .query(`INSERT INTO EXPOSICIONCOVID(id_usuario, contacto, diagnositco, fecha, estado)
                VALUES(@IDUSUARIO, @CONTACTO, @DIAGNOSTICO, @FECHA, 1)`);
            } else {
                await sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario)
                .input('CONTACTO', sql.Bit, data.temperatura)
                .input('DIAGNOSTICO', sql.Bit, data.respiratoria)
                .query(`INSERT INTO EXPOSICIONCOVID(id_usuario, contacto, diagnositco, estado)
                VALUES(@IDUSUARIO, 0, 0, 1)`);
            }
           
            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    signosPersonal: async (usuario, data) => {
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('TEMPERATURA', sql.NVarChar, data.temperatura)
            .input('RESPIRATORIA', sql.NVarChar, data.respiratoria)
            .input('CARDIACA', sql.NVarChar, data.cardiaca)
            .input('OXIGENO', sql.NVarChar, data.oxigeno)
            .input('ARTERIAL', sql.NVarChar, data.arterial)
            .query(`INSERT INTO SIGNOS(id_usuario, temperatura, f_respiratoria, f_cardiaca, s_oxigeno, t_arterial, estado)
            VALUES(@IDUSUARIO, @TEMPERATURA, @RESPIRATORIA, @CARDIACA, @OXIGENO, @ARTERIAL, 1)`);
           
            return {estado: 1}
        
        } catch(err){
            throw err
        }
    }
}

module.exports = {
    usuario
}