const { Router } = require('express')
const { ControladorProductos } = require('../Controllers/ControladorProductos.js')
const { AdminController } = require('../Controllers/AdminController')



const routerProductos = new Router()

routerProductos.get('/', ControladorProductos.AllProd)
routerProductos.get('/:id', ControladorProductos.ProdByID)
routerProductos.post('/', AdminController.AdminCheck, ControladorProductos.AddNewProd)
routerProductos.put('/:id', AdminController.AdminCheck, ControladorProductos.UpdateProd)
routerProductos.delete('/:id', AdminController.AdminCheck, ControladorProductos.DeleteProdByID)


module.exports = routerProductos