const crearSession = {
    cookie: {
        path: '/', 
        httpOnly: true, 
        secure: false,   
        maxAge: 60000,
        overwrite: false
    },
    secret:'3456776543',
    resave: true,
    saveUninitialized: true
}

module.exports = crearSession