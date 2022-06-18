import { CarritoDao } from '../DAOs/Carrito/index.js'
import { ProdFuncionCtrl } from './ControladorProductos.js'


const ControladorCarrito = {
    CleanByID: async (req, res) => {
        const id = req.params.id
        try {
            await CarritoDao.cleanById(id);
            res.status(202).send('El carrito se a vaciado con exito')
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    CreateNew: async (req, res) => {
        try {
            const NewId = await CarritoDao.create()
            res.status(201).json({NewId})
        } catch (error) {
            res.status(500).json({ error: error.message })
            }
    },
    AddProd: async (req, res) =>{
        const id = req.params.id
        const ProdID = req.body
        try{
            await ProdFuncionCtrl.ProdByID(ProdID.ID)
            await CarritoDao.AddProd(id, ProdID)
            res.sendStatus(200)
        }
        catch(error){
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    DisplayProd: async (req, res) =>{
        const id = req.params.id
        try{
            const carrito = await CarritoDao.getByID(id)
            let ListaProductos = []
            for (let Producto of carrito.PRODUCTOS){
                ListaProductos.push(await ProdFuncionCtrl.ProdByID(Producto.ID))
            }
            res.status(200).json(ListaProductos)
        }
        catch(error){
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    RemoveProd: async (req, res) =>{
        const id = req.params.id
        const id_prod = req.params.id_prod
        try{
            await CarritoDao.removeProd(id, id_prod)
            res.sendStatus(200)
        }
        catch(error){
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    }

}

export { ControladorCarrito }