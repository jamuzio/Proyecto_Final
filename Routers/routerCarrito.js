import { Router } from 'express'
import { ControladorCarrito } from '../Controllers/ControladorCarrito.js'




const routerCarrito = new Router()

routerCarrito.get('/:id/productos', ControladorCarrito.DisplayProd)
routerCarrito.post('/', ControladorCarrito.CreateNew)
routerCarrito.post('/:id/productos', ControladorCarrito.AddProd)
routerCarrito.delete('/:id/', ControladorCarrito.CleanByID)
routerCarrito.delete('/:id/productos/:id_prod', ControladorCarrito.RemoveProd)

export default routerCarrito