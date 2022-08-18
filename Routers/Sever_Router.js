import express from 'express'
import routerProductos from './routerProductos.js'
import routerSession from './routerSessions.js'
import routerCarrito from './routerCarrito.js'
import logger from '../Tools/logger.js'
import archivosRouter from './archivosRouter.js'



const Server_Router = express()

Server_Router.use('/api/productos', routerProductos)
Server_Router.use('/api/session', routerSession)
Server_Router.use('/api/carrito', routerCarrito)
Server_Router.use('/api/upload', archivosRouter)
Server_Router.all('*', (req, res) => {
    logger.warn(`Ruta ${req.url} con el metodo ${req.method} no implementada!`)
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})

export default Server_Router
