import { Router } from 'express'
import { ControladorProductos } from '../Controllers/ControladorProductos.js'
import { AdminCheck, UserHasSesion } from '../Middleware/UserSesion.js'


const routerProductos = new Router()

routerProductos.get('/', ControladorProductos.AllProd)
routerProductos.get('/:id', ControladorProductos.ProdByID)
routerProductos.post('/', UserHasSesion, AdminCheck, ControladorProductos.AddNewProd)
routerProductos.put('/:id', UserHasSesion, AdminCheck, ControladorProductos.UpdateProd)
routerProductos.delete('/:id', UserHasSesion, AdminCheck, ControladorProductos.DeleteProdByID)

export default routerProductos