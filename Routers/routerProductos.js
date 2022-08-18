import { Router } from 'express'
import { ControladorProductos } from '../Controllers/ControladorProductos.js'
import { AdminCheck } from '../Middleware/UserSesion.js'



const routerProductos = new Router()

routerProductos.get('/', ControladorProductos.AllProd)
routerProductos.get('/:id', ControladorProductos.ProdByID)
routerProductos.post('/', AdminCheck, ControladorProductos.AddNewProd)
routerProductos.put('/:id', AdminCheck, ControladorProductos.UpdateProd)
routerProductos.delete('/:id', AdminCheck, ControladorProductos.DeleteProdByID)

export default routerProductos