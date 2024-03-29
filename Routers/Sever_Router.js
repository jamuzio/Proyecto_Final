import express from 'express'
import routerProductos from './routerProductos.js'
import routerSession from './routerSessions.js'
import routerCarrito from './routerCarrito.js'
import logger from '../Tools/logger.js'
import archivosRouter from './routerArchivos.js'
import routerOrdenes from './routerOrdenes.js'
import webRouter from './webRouter.js'



const Server_Router = express()

Server_Router.use('/api/products', routerProductos)
Server_Router.use('/api/orders', routerOrdenes)
Server_Router.use('/api/shoppingcartproducts', routerCarrito)
Server_Router.use('/api/images', archivosRouter)
Server_Router.use('/', routerSession)
Server_Router.use('/', webRouter)
Server_Router.all('*', (req, res) => {
    logger.warn(`Ruta ${req.url} con el metodo ${req.method} no implementada!`)
    res.status(404).json({ERROR: `Ruta ${req.url} con el metodo ${req.method} no implementada!`})
})

export default Server_Router
