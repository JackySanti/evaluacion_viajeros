const express = require('express')
const router = express.Router()
const db = require('../db/db')

router.post('/nuevo_articulo', async (req, res) => {
    try {
        let articulo = req.body
        await db.test.nuevoProducto(articulo)
        let params = await db.test.obtenerProductos()
        res.render('partials/articulos', { layout: '', articulos: params.recordset }, (err, html) => {
            console.log('Error:'+ err,'HTML:'+ html)
            if (err) {
                return res.json({ estado: 0 })
            }
            res.json({ estado: 1, html })
        })
    }
    catch (err) {
        console.log(err)
        res.json({ estado: 0 })
    }
})

router.put('/actualizar_articulo', async (req, res) => {
    try {
        let articulo = req.body
        await db.test.actualizarProducto(articulo)
        let params = await db.test.obtenerProductos()
        res.render('partials/articulos', { layout: '', articulos: params.recordset }, (err, html) => {
            console.log('Error:'+ err,'HTML:'+ html)
            if (err) {
                return res.json({ estado: 0 })
            }
            res.json({ estado: 1, html })
        })
    }
    catch (err) {
        console.log(err)
        res.json({ estado: 0 })
    }
})

router.put('/eliminar_articulo', async (req, res) => {
    try {
        let articulo = req.body
        await db.test.eliminarProducto(articulo)
        let params = await db.test.obtenerProductos()
        console.log(params)
        res.render('partials/articulos', { layout: '', articulos:params.recordset }, (err, html) => {
            console.log('Error:'+ err,'HTML:'+ html)
            if (err) {
                return res.json({ estado: 0 })
            }
            res.json({ estado: 1, html })
        })
    }
    catch (err) {
        console.log(err)
        res.json({ estado: 0 })
    }
})

module.exports = router