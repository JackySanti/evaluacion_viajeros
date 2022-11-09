const sql = require('mssql')
const sql_config = {
    user: 'sa',
    password: 'bae140117',
    database: 'BASE_CARMASTER',
    server: 'localhost',
    pool: {
        max: 10,
        min: 0,
        idleTimeoutMillis: 30000
    },
    options: {
        encrypt: true, // for azure
        trustServerCertificate: true // change to true for local dev / self-signed certs
    }
}

let sql_conn = new sql.ConnectionPool(sql_config, (err) => {
    let date = new Date()
    if(err){
        console.log('No se pudo conectar a la BD, reintentando...', date);
        connectSQL();
    }else{
        console.log('Conectado a la BD', date);
    }
})

let connectSQL = () => {
    sql_conn.connect()
        .then(() => {
            console.log('Conectado a la BD');
        })
        .catch((err) => {
            if (err) {
                let date = new Date()
                console.log('No se pudo conectar a la BD, reintentando...', date, err);
                setTimeout(() => {
                    connectSQL();
                }, 2500)
            }
        })
}

module.exports = {
    sql_conn
}
