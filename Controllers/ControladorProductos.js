import { ProductosDao } from '../DAOs/Productos/index.js'
import crearError from '../Tools/Error_Generator.js'
import logger from '../Tools/logger.js'


const ControladorProductos = {
    AllProd: async (req, res, next) => {
        let AllProd = await ProductosDao.getAll()
        res.send(AllProd)
    },
    ProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            const ProductoBuscado = await ProductosDao.getByID(id);
            res.json(ProductoBuscado)
        } catch (error) {
            next(error)
        }
    },
    AddNewProd: async (req, res, next) => {
        let NewProduct = req.body
        try {
            if (itValidProd(NewProduct)){
                   NewProduct =  await ProductosDao.save(NewProduct)
            } else {
                throw crearError('MISSING_DATA')
            }
            logger.info(`Se creo el producto ${NewProduct}`)
            res.status(201).json(NewProduct)
        } catch (error) {
            next(error)

        }
    },
    UpdateProd: async (req, res, next) => {
        const id = req.params.id
        const UpdateData = req.body
        try {
            if (itValidProd(UpdateData)){
                    await ProductosDao.update(id, UpdateData)
            } else {
                throw crearError('MISSING_DATA')
            }
            logger.info(`Se actualizó el producto ${id} con los datos: ${UpdateData}`)
            res.status(202).json(UpdateData)
        } catch (error) {
            next(error)

        }
    },
    DeleteProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            await ProductosDao.deleteById(id);
            logger.info(`Se actualizó elimino producto ${id}`)
            res.status(202).json('Producto Eliminado con exito')
        } catch (error) {
            next(error)
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
    },
    DecreseStock: async (id) => {
        try {
            const ProductoBuscado = await ProductosDao.changeStock(id, -1);
            return ProductoBuscado
        } catch (error) {
            throw error
        }
    }
}

export { ControladorProductos , ProdFuncionCtrl }