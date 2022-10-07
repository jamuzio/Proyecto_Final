import { Router } from 'express'
import { ControladorDeOrdenes } from '../Controllers/ControladorDeOrdenes.js'
import {UserHasSesion} from '../Middleware/UserSesion.js'




const routerOrdenes = new Router()

routerOrdenes.get('/', UserHasSesion, ControladorDeOrdenes.getOrders)
routerOrdenes.post('/', UserHasSesion, ControladorDeOrdenes.BuyChopCart)

export default routerOrdenes