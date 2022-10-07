import { CarritoDao } from '../Models/DAOs/Carrito/index.js'
import ShopCart from '../Models/Class/Carrito.js'
import logger from '../Tools/logger.js'
import Api_Prod from './API_Productos.js'


class CarritoAPI {
    constructor(){
        this.carritos = CarritoDao
    }
    async CleanByID(id){
        try {
            const carrito = new ShopCart({id: id})
            await this.carritos.upDate(carrito.datos())
            logger.info(`El carrito ${id} se a vaciado con exito`)
        } catch (error) {
            throw error
        }
    }
    async CreateNew(id){
        try {
            const carrito = new ShopCart({id: id})
            await this.carritos.create(carrito.datos())
        } catch (error) {
            throw error
            }
    }
    async AddProd(ID_Carr, ID_Prod, qty){
        try{
            await Api_Prod.getProdById(ID_Prod)
            const datos = await this.carritos.getByID(ID_Carr)
            const carrito = new ShopCart(datos)
            carrito.addProduct(ID_Prod, qty)
            await this.carritos.upDate(carrito.datos())
            logger.info(`Se agrego el producto ${ID_Prod} al carrito ${ID_Carr}`)
        }
        catch(error){
            throw error
        }
    }
    async DisplayProd(id){
        try{
            const carrito = await this.carritos.getByID(id)
            let ListaProductos = []
            for (let producto of carrito.prodList){
                let datosDeProd = await Api_Prod.getProdById(producto.prodID)
                datosDeProd.qty = producto.qty
                ListaProductos.push(datosDeProd)
            }
           return ListaProductos
        }
        catch(error){
            throw error
        }
    }
    async RemoveProd(ID_Carr, ID_Prod, qty){
        try{
            const datos = await this.carritos.getByID(ID_Carr)
            const carrito = new ShopCart(datos)
            carrito.removeProduct(ID_Prod, qty)
            await this.carritos.upDate(carrito.datos())
            logger.info(`Se quitó el producto ${ID_Prod} al carrito ${ID_Carr}`)
        }
        catch(error){
            throw error
        }
    }

    async removeDeleteProd(ID_Prod){
        try{
            const carritosEncontrados = await this.carritos.getByProd(ID_Prod)
            for(let dato of carritosEncontrados){
                const carrito = new ShopCart(dato)
                carrito.clearProductOf_SC(ID_Prod)
                await this.carritos.upDate(carrito.datos())
            }
        }
        catch(error){
            throw error
        }
    }
}

const API_Carrito = new CarritoAPI()

export default API_Carrito