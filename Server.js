const express = require('express')
const routerProductos = require('./Routers/routerProductos')
const routerCarrito = require('./Routers/routerCarrito')
const { AdminController } = require('./Controllers/AdminController')

const app = express()
const PORT = 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.get('/login', AdminController.setAdmin)
app.get('/logout', AdminController.setStdUser)
app.all('*', (req, res) => {
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto: ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))