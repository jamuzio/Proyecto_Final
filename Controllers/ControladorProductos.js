import { ProductosDao } from '../DAOs/Productos/index.js'


const ControladorProductos = {
    AllProd: async (req, res) => {
        let AllProd = await ProductosDao.getAll()
        res.send(AllProd)
    },
    ProdByID: async (req, res) => {
        const id = req.params.id
        try {
            const ProductoBuscado = await ProductosDao.getByID(id);
            res.json(ProductoBuscado)
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    },
    AddNewProd: async (req, res) => {
        let NewProduct = req.body
        try {
            if (itValidProd(NewProduct)){
                   NewProduct =  await ProductosDao.save(NewProduct)
            } else {
                const error = new Error('El formato no es correcto')
                error.tipo = 'bad format'
                throw error
            }
            res.status(201).json(NewProduct)
        } catch (error) {
            if (error.tipo === 'bad format'){
                res.status(406).json({ error: error.message })
            }else if (error.tipo === 'duplicated product'){
                res.status(409).json({ error: error.message })
            }else {
                res.status(500).json({ error: error.message })
            }

        }
    },
    UpdateProd: async (req, res) => {
        const id = req.params.id
        const UpdateData = req.body
        try {
            if (itValidProd(UpdateData)){
                    await ProductosDao.update(id, UpdateData)
            } else {
                const error = new Error('El formato no es correcto')
                error.tipo = 'bad format'
                throw error
            }
            res.status(202).json(UpdateData)
        } catch (error) {
            if (error.tipo === 'bad format'){
                res.status(406).json({ error: error.message })
            } else if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            }else {
                res.status(500).json({ error: error.message })
            }

        }
    },
    DeleteProdByID: async (req, res) => {
        const id = req.params.id
        try {
            await ProductosDao.deleteById(id);
            res.status(202).send('Producto Eliminado con exito')
        } catch (error) {
            if (error.tipo === 'db not found') {
                res.status(404).json({ error: error.message })
            } else {
                res.status(500).json({ error: error.message })
            }
        }
    }

}

function itValidProd(Dato){
    if (Dato.hasOwnProperty("NOMBRE") && 
        Dato.hasOwnProperty("DESCRIPCION") && 
        Dato.hasOwnProperty("CODIGO") &&
        Dato.hasOwnProperty("FOTO") &&
        Dato.hasOwnProperty("PRECIO") &&
        Dato.hasOwnProperty("STOCK")){
            if(Dato.NOMBRE.length>0 && 
            Dato.DESCRIPCION.length>0 && 
            Dato.CODIGO.length>0 &&
            Dato.FOTO.length>0){
                if(Number(Dato.PRECIO) && Number(Dato.STOCK)){
                    return true
                } else{
                    return false
                }
            } else{
                return false
            }
        } else{
            return false
        }
    
}
const ProdFuncionCtrl = {
    ProdByID: async (id) => {
        try {
            const ProductoBuscado = await ProductosDao.getByID(id);
            return ProductoBuscado
        } catch (error) {
            throw error
        }
    }
}

export { ControladorProductos , ProdFuncionCtrl }