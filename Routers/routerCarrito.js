import { Router } from 'express'
import { ControladorCarrito } from '../Controllers/ControladorCarrito.js'
import {UserHasSesion} from '../Middleware/UserSesion.js'




const routerCarrito = new Router()

routerCarrito.get('/productos', UserHasSesion,ControladorCarrito.DisplayProd)
routerCarrito.post('/', ControladorCarrito.CreateNew)
routerCarrito.post('/productos', UserHasSesion, ControladorCarrito.AddProd)
routerCarrito.delete('/', UserHasSesion, ControladorCarrito.CleanByID)
routerCarrito.delete('/productos/:id_prod', UserHasSesion, ControladorCarrito.RemoveProd)
routerCarrito.get('/comprar', UserHasSesion,ControladorCarrito.BuyChopCart)

export default routerCarrito