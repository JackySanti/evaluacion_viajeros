// Dependencias
const path = require('path')
const hbs = require('express-hbs')
const express = require('express')
const app = express()

const PORT = process.env.PORT || 3000

//PUG
//JSX
//HBS
app.engine('hbs', hbs.express4({
    partialsDir: [`${__dirname}/server/views_hbs/partials`, `${__dirname}/server/views_hbs/views`],
    defaultLayout: __dirname + '/server/views_hbs/layouts/index',
    layoutsDir: __dirname + '/server/views_hbs/layouts'
}))

app.set('view engine', 'hbs')
app.set('views', __dirname + '/server/views_hbs')
require('./server/views_hbs/helpers/index')


// Archivos estaticos
app.use(express.static(path.join(__dirname, 'assets')))

//Middelware
app.use(express.urlencoded({extended: false}))
app.use(express.json())

//Middleware Rutas
app.use(require('./server/routes/index'))


app.listen(PORT, () => {
    console.log('Inicio del servidor')
})
