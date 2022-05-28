const ShopCart_Class = require('../class/Class_Carrito.js')
const { ProdFuncionCtrl } = require('./ControladorProductos.js')

const Carritos = new ShopCart_Class()

const ControladorCarrito = {
    /*ProdByID: async (req, res) => {
        const id = req.params.id
        try {
            const ProductoBuscado = await Carritos.getById(id);
            res.json(ProductoBuscado)
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },*/
    CleanByID: async (req, res) => {
        const id = req.params.id
        try {
            await Carritos.cleanById(id);
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
            const NewId = await Carritos.create()
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
            await Carritos.AddProd(id, ProdID)
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
            const carrito = Carritos.getByID(id)
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
            await Carritos.removeProd(id, id_prod)
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


module.exports = { ControladorCarrito }