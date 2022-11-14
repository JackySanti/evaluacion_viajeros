// Dependencias
const path = require('path')
const hbs = require('express-hbs')
const express = require('express')
const session = require('express-session');
const app = express()
const fileUpload = require('express-fileupload')

const PORT = process.env.PORT || 3000
const configuracionSesion = require('./sis/config/server_config')

app.use(session(configuracionSesion));
app.use(fileUpload());

app.engine('hbs', hbs.express4({
    partialsDir: [`${__dirname}/sis/views_hbs/partials`, `${__dirname}/sis/views_hbs/views`],
    defaultLayout: __dirname + '/sis/views_hbs/layouts/index',
    layoutsDir: __dirname + '/sis/views_hbs/layouts'
}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/sis/views_hbs')
require('./sis/views_hbs/helpers/index')


// Archivos estaticos
app.use(express.static(path.join(__dirname, 'assets')))

//Middelware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Middleware Rutas
app.use(require('./sis/routes/index'))


app.listen(PORT, () => {
    console.log('Inicio del servidor')
})
