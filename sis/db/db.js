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
    validacionUsuario: async (data) =>{
        try{
            let result = await  sql_conn.request()
            .input('CORREO_CONSULTA', sql.VarChar, data.correo)
            .query(`SELECT * FROM USUARIOS WHERE correo = @CORREO_CONSULTA`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 0, mensaje: 'El correo que esté intentado registrar ya se encuentra en uso, intenta iniciar sesión.'};
            } else { 
                return { estado: 1, mensaje: ''}; 
            }
        } catch(err){
            throw err
        }
    },
    registrarUsuario: async (data) =>{
        try {
            console.log(data);
            await sql_conn.request()
                .input('NOMBRE_INSERCION', sql.VarChar, data.nombre)
                .input('PATERNO_INSERCION', sql.VarChar, data.paterno)
                .input('MATERNO_INSERCION', sql.VarChar, data.materno)
                .input('CORREO_INSERCION', sql.VarChar, data.correo)
                .input('CONTRASENA_INSERCION', sql.VarChar, data.contrasena)
                .query(`INSERT INTO USUARIOS(correo, contrasena, nombre, paterno, materno, tipo, estado) 
                VALUES(@CORREO_INSERCION, @CONTRASENA_INSERCION, @NOMBRE_INSERCION, @PATERNO_INSERCION, @MATERNO_INSERCION, 0, 1)`);
                
            return { estado: 1, mensaje: ''};
        } catch(err){
            throw err;
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
            console.log(data);
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('CONDICION', sql.Text, data.objeto)
            .input('PUNTAJE', sql.Int, data.puntaje)
            .query(`INSERT INTO CONDICIONMEDICA(id_usuario, condicion, estado, puntaje)
            VALUES(@IDUSUARIO, @CONDICION, 1, @PUNTAJE)`);

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
            .input('PUNTAJE', sql.Int, data.puntaje)
            .query(`INSERT INTO INFORMACIONCOVID(id_usuario, sintomas, estado, puntaje)
            VALUES(@IDUSUARIO, @SINTOMAS, 1, @PUNTAJE)`);

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
                .input('CONTACTO', sql.Bit, data.contacto)
                .input('DIAGNOSTICO', sql.Bit, data.diagnostico)
                .query(`INSERT INTO EXPOSICIONCOVID(id_usuario, contacto, diagnositco, estado)
                VALUES(@IDUSUARIO, @CONTACTO, @DIAGNOSTICO, 1)`);
            }
           
            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    validacionSignosRegistro: async (usuario) => {
        try{
            let result = await  sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario)
                .query(`SELECT * FROM SIGNOS WHERE id_usuario = @IDUSUARIO  AND DAY(cuando) = DAY(GETDATE()) 
                AND MONTH(cuando) = MONTH(GETDATE()) AND YEAR(cuando) = YEAR(GETDATE()) `);

            if (result.rowsAffected[0] == 1) {
                return { estado: 0, mensaje: 'Ya cargaste tu registro diario, mañana podrás registrar tus signos nuevamente.'};
            } else { 
                return { estado: 1, mensaje: '' }; 
            }
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
            .query(`INSERT INTO SIGNOS(id_usuario, temperatura, f_respiratoria, f_cardiaca, s_oxigeno, t_arterial, estado, cuando)
            VALUES(@IDUSUARIO, @TEMPERATURA, @RESPIRATORIA, @CARDIACA, @OXIGENO, @ARTERIAL, 1, GETDATE())`);
           
            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    validacionSignosRegistro2: async (usuario) => {
        try{
            let result = await  sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario)
                .query(`SELECT * FROM SIGNOS_POSTERIOR WHERE id_usuario = @IDUSUARIO  AND DAY(cuando) = DAY(GETDATE()) 
                AND MONTH(cuando) = MONTH(GETDATE()) AND YEAR(cuando) = YEAR(GETDATE()) `);

            if (result.rowsAffected[0] == 1) {
                return { estado: 0, mensaje: 'Ya cargaste tu registro diario, mañana podrás registrar tus signos nuevamente.'};
            } else { 
                return { estado: 1, mensaje: '' }; 
            }
        } catch(err){
            throw err
        }   
    },
    signosPersonal2: async (usuario, data) => {
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('TEMPERATURA', sql.NVarChar, data.temperatura)
            .input('RESPIRATORIA', sql.NVarChar, data.respiratoria)
            .input('CARDIACA', sql.NVarChar, data.cardiaca)
            .input('OXIGENO', sql.NVarChar, data.oxigeno)
            .input('ARTERIAL', sql.NVarChar, data.arterial)
            .query(`INSERT INTO SIGNOS_POSTERIOR(id_usuario, temperatura, f_respiratoria, f_cardiaca, s_oxigeno, t_arterial, estado, cuando)
            VALUES(@IDUSUARIO, @TEMPERATURA, @RESPIRATORIA, @CARDIACA, @OXIGENO, @ARTERIAL, 1, GETDATE())`);
           
            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    tablaSignosAnterior: async(usuario) => {
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM SIGNOS WHERE id_usuario = @IDUSUARIO`);
            
            return { estado: 1, mensaje: '', consulta: result.recordset};
        } catch(err){
            throw err
        }
    },
    contadorSignosAnterior: async(usuario) => {
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT COUNT(*) AS resultado FROM SIGNOS WHERE id_usuario = @IDUSUARIO`);

            let consulta = result.recordset[0];

            if(consulta.resultado == 0){
                return { estado: 0, consulta: consulta};
            } else {
                return { estado: 1, consulta: consulta};
            }
        } catch(err){
            throw err
        }
    },
    tablaSignosPosterior: async(usuario) => {
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM SIGNOS_POSTERIOR WHERE id_usuario = @IDUSUARIO`);
            
            return { estado: 1, mensaje: '', consulta: result.recordset};
        } catch(err){
            throw err
        }
    },
    contadorSignosPosterior: async(usuario) => {
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT COUNT(*) AS resultado FROM SIGNOS_POSTERIOR WHERE id_usuario = @IDUSUARIO`);
            
            let consulta = result.recordset[0];

            if(consulta.resultado == 0){
                return { estado: 0, consulta: consulta};
            } else {
                return { estado: 1, consulta: consulta};
            }

        } catch(err){
            throw err
        }
    },
    validacionFechaPartida: async(usuario) => {
        try{
            let result = await  sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario)
                .query(`SELECT* FROM INFORMACIONVIAJE WHERE id_usuario = @IDUSUARIO  AND DAY(f_partida) >= DAY(GETDATE()) 
                AND MONTH(f_partida) >= MONTH(GETDATE()) AND YEAR(f_partida) >= YEAR(GETDATE())`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        } 
        
    },
    validacionFechaLlegada: async(usuario) => {
        try{
            let result = await  sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario)
                .query(`SELECT* FROM INFORMACIONVIAJE WHERE id_usuario = @IDUSUARIO  AND DAY(f_llegada) < DAY(GETDATE()) 
                AND MONTH(f_llegada) < MONTH(GETDATE()) AND YEAR(f_llegada) < YEAR(GETDATE())`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1};
            } else { 
                return { estado: 0, mensaje: 'Tu viaje no ha finalizado, podrás realizar el registro una vez que tu viaje termine.'}; 
            }
        } catch(err){
            throw err
        } 
        
    },
    calculoPuntaje: async(usuario) => {
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM VT_CALCULO_PUNTAJE WHERE id_usuario = @IDUSUARIO`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1, mensaje: '', consulta: result.recordset[0]};
            } else{
                return { estado: 0 }
            }
            
            
        } catch(err){
            throw err
        }
    },
    resultadoInsercion:async (usuario, puntaje, data, historial, cuarentena)=>{
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('PUNTAJE', sql.Int, puntaje)
            .input('DATA', sql.NVarChar, data.pcovid)
            .input('HISTORIAL', sql.NVarChar, historial)
            .input('CUARENTENA', sql.NVarChar, cuarentena)
            .query(`INSERT INTO RESULTADOS(id_usuario, puntaje, pcovid, historial, cuarentena) VALUES(@IDUSUARIO, @PUNTAJE, @DATA, @HISTORIAL, @CUARENTENA )`);

            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    actualizarResultado: async (usuario, puntaje, historial, cuarentena) => {
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('PUNTAJE', sql.Int, puntaje)
            .input('HISTORIAL', sql.NVarChar, historial)
            .input('CUARENTENA', sql.NVarChar, cuarentena)
            .query(`UPDATE RESULTADOS SET puntaje = @PUNTAJE, historial = @HISTORIAL, cuarentena = @CUARENTENA WHERE id_usuario = @IDUSUARIO`);

            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    consultaResultados :async (usuario) => {
        try{
           let result = await sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario.idCliente)
                .query(`SELECT * FROM RESULTADOS WHERE id_Usuario = @IDUSUARIO`)
                
            if(result.rowsAffected[0] == 1){
                return { estado: 1, mensaje: '', consulta: result.recordset}
            } else {
                return { estado: 0, mensaje: '' }
            }
            

        } catch(err){
            throw err;
        }
    },
    consultaResultadosViaje: async (usuario) => {
        try{
            let result = await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM RESULTADOS WHERE id_usuario = @IDUSUARIO`);

            return {estado: 1, mensaje: '', consulta: result.recordset[0]}
        
        } catch(err){
            throw err
        }
    },
    factorARFT: async (usuario) => {
        try{
            let result = await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM FACTORESRIESGO WHERE id_factor = 'ARFT'`);

            return {estado: 1, mensaje: '', consulta: result.recordset[0]}
        
        } catch(err){
            throw err
        }
    },
    rutaPDF: async (usuario, relativa, absoluta) => {
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('ABSOLUTA', sql.Text, absoluta)
            .input('RELATIVA', sql.Text, relativa)
            .query(`UPDATE RESULTADOS SET rabsoluta = @ABSOLUTA, rrelativa = @RELATIVA WHERE id_usuario = @IDUSUARIO`);

            return {estado: 1, mensaje: absoluta}
        
        } catch(err){
            throw err
        }
    },
    comprobanteVacunacion: async (usuario, relativa, absoluta, nameFile) => {
        try{
            await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .input('ABSOLUTA', sql.Text, absoluta)
            .input('RELATIVA', sql.Text, relativa)
            .input('FILE', sql.Text, nameFile)
            .query(`INSERT INTO COMPROBANTEVACUNACION(id_usuario, r_absoluta, r_relativa, nombre) VALUES (@IDUSUARIO, @ABSOLUTA, @RELATIVA, @FILE)`);

            return {estado: 1}
        
        } catch(err){
            throw err
        }
    },
    consultaComprobante: async (usuario) => {
        try{
            let result = await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT COUNT(*) AS comprobante FROM COMPROBANTEVACUNACION WHERE id_usuario = @IDUSUARIO`);

            let consulta = result.recordset[0];

            if (consulta.comprobante == 1) {
                return {estado: 1}
            } else { 
                return { estado: 0} 
            }
        } catch(err){
            throw err
        }
    }
}

const administrador = {
    tablaUsuarios: async () => {
        try {
            let result = await  sql_conn.request()
            .query(`SELECT DISTINCT a.* , (SELECT COUNT(*) FROM SIGNOS WHERE id_usuario = a.id_usuario ) as SIGNOS FROM USUARIOS a
            WHERE a.tipo = 0 AND a.estado = 1 `);

            let consulta = result.recordset;

            consulta.filter((elem, index) =>{
                if(elem.SIGNOS == 14){
                    consulta[index] = {
                        id_usuario: elem.id_usuario,
                        correo: elem.correo,
                        nombre: elem.nombre,
                        paterno: elem.paterno,
                        materno: elem.materno
                    }
                }
            })

            return { estado: 1, mensaje: '', consulta: consulta};
        } catch(err){
            throw err;
        }
    },
    informacionUsuario: async (usuario) => {
        try {
            let result = await sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario.idUsuario)
            .query(`SELECT * FROM VT_INFO_USUARIO WHERE id_usuario = @IDUSUARIO`)

            return { estado: 1, mensaje: '', consulta: result.recordsets};
        } catch(err){
            throw err;
        }
    },
    eliminarPasajero: async (usuario) => {
        try {
            await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario.idUsuario)
            .query(`DELETE FROM USUARIOS WHERE id_usuario = @IDUSUARIO`);

            return { estado: 1, mensaje: ''};
        } catch(err){
            throw err;
        }
    },
    consultaAdministrador: async (usuario) => {
        try{
            let result = await sql_conn.request()
                .input('IDUSUARIO', sql.Int, usuario.idAdmin)
                .query(`SELECT * FROM USUARIOS WHERE id_usuario = @IDUSUARIO`)

            return { estado: 1, mensaje: '', consulta: result.recordset[0]};

        } catch(err){
            throw err;
        }
    },
    tablaAdministradores: async () => {
        try {
            let result = await sql_conn.request()
            .query(`SELECT * FROM USUARIOS WHERE tipo = 1 ORDER BY id_usuario ASC`)

            return { estado: 1, mensaje: '', consulta: result.recordset};
        } catch(err){
            throw err;
        }
    },
    registroAdministrador: async ({nombre, paterno, materno, correo}) => {
        try {
            let result = await  sql_conn.request()
            .input('CORREO_CONSULTA', sql.VarChar, correo)
            .query(`SELECT * FROM USUARIOS WHERE correo = @CORREO_CONSULTA`);

            if (result.rowsAffected[0] == 0) {
                await sql_conn.request()
                .input('NOMBRE_INSERCION', sql.VarChar, nombre)
                .input('PATERNO_INSERCION', sql.VarChar, paterno)
                .input('MATERNO_INSERCION', sql.VarChar, materno)
                .input('CORREO_INSERCION', sql.VarChar, correo)
                .query(`INSERT INTO USUARIOS(correo, contrasena, nombre, paterno, materno, tipo, estado) 
                VALUES(@CORREO_INSERCION, '123456', @NOMBRE_INSERCION, @PATERNO_INSERCION, @MATERNO_INSERCION, 1, 0)`);
                return { estado: 1, mensaje: ''};
            } else { 
                return { estado: 0, mensaje: '' }; 
            }
        } catch(err){
            throw err;
        }
    },
    eliminarAdministrador: async (usuario) => {
        try {
            await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario.idAdmin)
            .query(`DELETE FROM USUARIOS WHERE id_usuario = @IDUSUARIO`);

            return { estado: 1, mensaje: ''};
        } catch(err){
            throw err;
        }
    },
    actualizarAdministrador: async (data) => {
        try {
            let result = await  sql_conn.request()
                .input('IDUSUARIO', sql.Int, data.idUsuario)
                .input('NOMBRE_UP', sql.VarChar, data.nombre_up)
                .input('PATERNO_UP', sql.VarChar, data.paterno_up)
                .input('MATERNO_UP', sql.VarChar, data.materno_up)
                .input('CORREO_UP', sql.VarChar, data.correo_up)
                .query(`UPDATE USUARIOS SET nombre = @NOMBRE_UP, paterno = @PATERNO_UP, materno = @MATERNO_UP, correo = @CORREO_UP
                WHERE id_usuario = @IDUSUARIO`);

                if (result.rowsAffected[0] == 1) {
                    return { estado: 1 }
                } else { 
                    return { estado: 0 } 
                }
        } catch(err){
            throw err;
        }
    },
    actualizarEstadoContra: async(data) => {
        try{
            let result = await sql_conn.request()
            .input('IDUSUARIO', sql.Int, data.idUsuario)
            .input('CONTRASENA', sql.VarChar, data.n_contrasena)
            .query(`UPDATE USUARIOS SET contrasena = @CONTRASENA, estado = 1 WHERE id_usuario =  @IDUSUARIO`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1 }
            } else { 
                return { estado: 0 } 
            }

        } catch(err){
            throw err;
        }
    },
    tablaFactoresRiesgo: async () => {
        try {
            let result = await sql_conn.request()
            .query(`SELECT * FROM FACTORESRIESGO WHERE id_factor = 'ARFT'`)

            return { estado: 1, mensaje: '', consulta: result.recordset};
        } catch(err){
            throw err;
        }
    },
    tablaFactoresRiesgo2: async () => {
        try {
            let result = await sql_conn.request()
            .query(`SELECT * FROM FACTORESRIESGO WHERE id_factor != 'ARFT'`)

            return { estado: 1, mensaje: '', consulta: result.recordset};
        } catch(err){
            throw err;
        }
    },
    consultaRiesgo: async (riesgo) => {
        try{
            let result = await sql_conn.request()
                .input('NUMERO', sql.Int, riesgo.numero)
                .input('IDFACTOR', sql.NVarChar, riesgo.id_factor)
                .query(`SELECT * FROM FACTORESRIESGO WHERE numero = @NUMERO AND id_factor = @IDFACTOR`)
                
            return { estado: 1, mensaje: '', consulta: result.recordset[0]};

        } catch(err){
            throw err;
        }
    },
    actualizarRiesgo: async (riesgo) => {
        try{
           await sql_conn.request()
                .input('NUMERO', sql.Int, riesgo.numero)
                .input('DESCRIPCION', sql.NVarChar, riesgo.descripcion)
                .input('PALTO', sql.NVarChar, riesgo.p_alto)
                .input('PMEDIO', sql.NVarChar, riesgo.p_medio)
                .input('PBAJO', sql.NVarChar, riesgo.p_bajo)
                .input('EALTO', sql.NVarChar, riesgo.e_alto)
                .input('EMEDIO', sql.NVarChar, riesgo.e_medio)
                .input('EBAJO', sql.NVarChar, riesgo.e_bajo)
                .query(`UPDATE FACTORESRIESGO SET descripcion = @DESCRIPCION, p_alto = @PALTO, p_medio = @PMEDIO,
                p_bajo = @PBAJO, e_alto = @EALTO, e_medio = @EMEDIO, e_bajo = @EBAJO WHERE numero = @NUMERO`)
                
            return { estado: 1, mensaje: ''};

        } catch(err){
            throw err;
        }
    },
    permisoFormularios: async() => {
        try {
            let result = await sql_conn.request()
                .query(`SELECT * FROM FORMULARIOSEDITAR`);
            
            return { estado: 1,  data : result.recordset};
        } catch(err){
            throw err;
        }
    },
    actualizarPermisosFormularios: async(data) => {
        try {
            await  sql_conn.request()
                .input('idpasj', sql.Bit, (data[0] == '0') ? false : true )
                .input('conper', sql.Bit, (data[1] == '0') ? false : true )
                .input('infvij', sql.Bit, (data[2] == '0') ? false : true )
                .input('conmed', sql.Bit, (data[3] == '0') ? false : true )
                .input('inmrcv', sql.Bit, (data[4] == '0') ? false : true )
                .input('expdcp', sql.Bit, (data[5] == '0') ? false : true )
                .query(`UPDATE FORMULARIOSEDITAR SET IDPASJ = @idpasj, CONPER = @conper, INFVIJ = @infvij, 
                CONMED = @conmed, INMRCV = @inmrcv, EXPDPC = @expdcp`);
                
            return { estado: 1, mensaje: ''};

        } catch(err){
            throw err;
        }
    }
}

const informacion = {
    cambioEstado: async(usuario, tabla) =>{
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`UPDATE ${tabla} SET estado = 0 WHERE id_usuario = @IDUSUARIO`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        }
    },
    identificacionPasajero: async (usuario) =>{
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT id_dato, p_nacimiento, edad, CONVERT(varchar,f_nacimiento,101) as f_nacimiento,
            pasaporte, p_validacion, CONVERT(varchar,f_expiracion,101) as f_expiracion, ocupacion
            FROM DATOSPERSONALES WHERE id_usuario = @IDUSUARIO`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1, consulta: result.recordset};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        }
    },
    contactoPersonal: async (usuario) =>{
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM CONTACTOPERSONAL WHERE id_usuario = @IDUSUARIO AND estado = 1`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1, consulta: result.recordset};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        }
    },
    informacionViaje: async (usuario) =>{
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT id_viaje, CONVERT(varchar,f_llegada,101) as f_llegada, CONVERT(varchar,f_partida,101) as f_partida,
            cd_entrada, cd_salida, m_viaje, n_asiento, n_acomanantes, n_estancia, calle, numero, colonia, cp, provincia,
            pais, mtv_viaje, l_paises
            FROM  INFORMACIONVIAJE WHERE id_usuario = @IDUSUARIO AND estado = 1`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1, consulta: result.recordset};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        }
    },
    condicionMedica: async (usuario) =>{
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM CONDICIONMEDICA WHERE id_usuario = @IDUSUARIO AND estado = 1`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1, consulta: result.recordset};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        }
    },
    sintomasRelacionados: async (usuario) =>{
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT * FROM INFORMACIONCOVID WHERE id_usuario = @IDUSUARIO AND estado = 1`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1, consulta: result.recordset};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        }
    },
    exposicionCovid: async (usuario) =>{
        try{
            let result = await  sql_conn.request()
            .input('IDUSUARIO', sql.Int, usuario)
            .query(`SELECT id_exposicion, contacto, diagnositco, CONVERT(varchar,fecha,101) as fecha, estado FROM EXPOSICIONCOVID WHERE id_usuario = @IDUSUARIO AND estado = 1`);

            if (result.rowsAffected[0] == 1) {
                return { estado: 1, consulta: result.recordset};
            } else { 
                return { estado: 0}; 
            }
        } catch(err){
            throw err
        }
    }
}

module.exports = {
    usuario,
    administrador,
    informacion
}