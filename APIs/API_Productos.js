import Product from "../Models/Class/Product.js"
import generateID from "../Tools/ID_gen.js"
import error_generator from "../Tools/Error_Generator.js"
import { ProductosDao } from "../Models/DAOs/Productos/index.js"
import API_Carrito from "./API_Carrito.js"
import logger from "../Tools/logger.js"

class ProductosApi {
    constructor() {
        this.productos = ProductosDao
    }
    async CreateNewProd(NewProduct){
        try{
            if (await this.productos.ProdExist(NewProduct)){
                throw error_generator.DUPLICATED_PRODUCT()
            } else {
                const ID = generateID()
                NewProduct.id = ID
                const producto = new Product(NewProduct)
                await this.productos.save(producto.datos())
                logger.info(`Se agrego el producto ${NewProduct.TITLE} con el id: ${ID}`)
                return producto.datos()
            }
        }
        catch(error){
            throw error
        }
     }
     async allProducts(){
        try{
            return Object.freeze(this.productos.getAll())
        }
        catch(error){
            throw error
        }
     }
     async getProdById(id){
        try{
            return await this.productos.getById(id)
        }
        catch(error){
            throw error
        }
     }
     async deleteProdById(id){
        try{
            await API_Carrito.removeDeleteProd(id)
            logger.info(`Se elimino el producto id: ${id}`)
            return await this.productos.deleteById(id)
        }
        catch(error){
            throw error
        }
     }
     async UpdateProd(id, datos){
        try{
            const productoBuscado = await this.productos.getById(id)
            let producto = new Product(productoBuscado)
            if(!!datos.name) producto.updateName(datos.name)
            if(!!datos.description) producto.updateDescription(datos.description)                            
            if(!!datos.image) producto.updateImage(datos.image)
            if(!!datos.price) producto.updatePrice(datos.price)
            logger.info(`Se actualizo el producto id: ${id} con los datos ${datos}`)
            return await this.productos.UpdateProd(producto.datos())
        }
        catch(error){
            throw error
        }
     }
}

const Api_Prod = new ProductosApi()


export default Api_Prod
