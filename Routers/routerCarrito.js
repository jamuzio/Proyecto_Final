import { Router } from 'express'
import { ControladorCarrito } from '../Controllers/ControladorCarrito.js'
import {UserHasSesion} from '../Middleware/UserSesion.js'




const routerCarrito = new Router()

routerCarrito.get('/', UserHasSesion,ControladorCarrito.DisplayProd)
routerCarrito.post('/', UserHasSesion, ControladorCarrito.AddProd)
routerCarrito.delete('/:id_prod', UserHasSesion, ControladorCarrito.RemoveProd)
routerCarrito.get('/comprar', UserHasSesion,ControladorCarrito.BuyChopCart)

export default routerCarrito