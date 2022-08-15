import express from 'express'
import routerProductos from './Routers/routerProductos.js'
import routerCarrito from './Routers/routerCarrito.js'
import { AdminController } from './Controllers/AdminController.js'
import errorHandler from './Middleware/Error_Handler.js'

const app = express()
const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())

app.use('/api/productos', routerProductos)
app.use('/api/carrito', routerCarrito)
app.get('/login', AdminController.setAdmin)
app.get('/logout', AdminController.setStdUser)
app.all('*', (req, res) => {
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})
app.use(errorHandler)

const server = app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto: ${server.address().port}`)
})
server.on("error", error => console.log(`Error en servidor ${error}`))