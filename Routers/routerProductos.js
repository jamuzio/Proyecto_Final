import { Router } from 'express'
import { ControladorProductos } from '../Controllers/ControladorProductos.js'
import { AdminController } from '../Controllers/AdminController.js'



const routerProductos = new Router()

routerProductos.get('/', ControladorProductos.AllProd)
routerProductos.get('/:id', ControladorProductos.ProdByID)
routerProductos.post('/', AdminController.AdminCheck, ControladorProductos.AddNewProd)
routerProductos.put('/:id', AdminController.AdminCheck, ControladorProductos.UpdateProd)
routerProductos.delete('/:id', AdminController.AdminCheck, ControladorProductos.DeleteProdByID)

export default routerProductos