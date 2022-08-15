import dbCoderhouse from "../DataBase/MongoServer.js"
import crearError from "../Tools/Error_Generator.js"


class Class_Mongo {
    constructor (coleccion){
        this.coleccion = dbCoderhouse.collection(coleccion)
    }
    async save(datos, type){
        let hoy = new Date()
        const id = Date.now()
        let NewElement
        try{
            if(type === 'Carrito' ){
                NewElement = {
                    ID: `${id}`,
                    TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                    PRODUCTOS: []
                    }
            } else if(type === 'Producto'){
                const Producto = await this.coleccion.find({NOMBRE: `${datos.NOMBRE}`}).toArray()
                const Codigo = await this.coleccion.find({CODIGO: `${datos.CODIGO}`}).toArray()
                if (Producto.length === 0 && Codigo.length === 0){
                    NewElement = {
                        ID: `${id}`,
                        TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                        NOMBRE: datos.NOMBRE,
                        DESCRIPCION: datos.DESCRIPCION,
                        CODIGO: datos.CODIGO,
                        FOTO: datos.FOTO,
                        PRECIO: datos.PRECIO,
                        STOCK: datos.STOCK
                    }
                } else {
                    throw crearError('DUPLICATED_PRODUCT')
                }
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            await this.coleccion.insertOne(NewElement)
            if(type === 'Carrito') {
                return id
            }
            else if( type === 'Producto') {
                return NewElement
            }
        }
        catch(error){
            throw error
        }
    }
    async cleanById(id, type){
        let resultado
        try{
            if(type === 'Carrito' ){
                resultado = await this.coleccion.findOneAndUpdate({ID: `${id}`}, {$set: {PRODUCTOS: []}})            
            } else if(type === 'Producto'){
                resultado = await this.coleccion.findOneAndDelete({ID: `${id}`}) 
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            if(!resultado.value){
                throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
            }
        }
        catch(error){
            throw error
        }
    }
    async getAll(){
        
        try{
            const AllObjects = await this.coleccion.find().toArray()
            return AllObjects
        }
        catch(error){
            throw error
        }
    }

    async update(id, dato, type){
        let hoy = new Date()
        let resultado

        try{
            if(type === 'Carrito' ){
                resultado = await this.coleccion.findOne({ID: `${id}`}, { projection: { PRODUCTOS: 1 }})
                if(!!resultado){
                    resultado.PRODUCTOS.push(dato)
                    await this.coleccion.findOneAndUpdate({ID: `${id}`}, 
                        {$set: {
                            TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                            PRODUCTOS: resultado.PRODUCTOS
                        }})                                 
                }
            } else if(type === 'Producto'){
                resultado = await this.coleccion.findOneAndUpdate({ID: `${id}`}, 
                    {$set: {
                        TIMESTAMP: `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                        NOMBRE: dato.NOMBRE,
                        DESCRIPCION: dato.DESCRIPCION,
                        CODIGO: dato.CODIGO,
                        FOTO: dato.FOTO,
                        PRECIO: dato.PRECIO,
                        STOCK: dato.STOCK
                    }})
                resultado = resultado.value                               
            } else if(type === 'CarrRmProd'){
                resultado = await this.coleccion.findOne({ID: `${id}`}, { projection: { PRODUCTOS: 1 }})
                
                const IndiceProdBuscado = resultado.PRODUCTOS.findIndex(p => p.ID == dato)

                if(IndiceProdBuscado === -1){

                    throw crearError('NOT_FOUND', `El producto con id ${dato} no se encuntra en el carrito`)
                
                } else{
                    resultado.PRODUCTOS.splice(IndiceProdBuscado,1)
                    await this.coleccion.findOneAndUpdate({ID: `${id}`}, 
                        {$set: {
                            TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                            PRODUCTOS: resultado.PRODUCTOS
                        }})
                }
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            if(!resultado){
                throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
            }
        }
        catch(error){
            throw error
        }
    }
    async getByID(id){
        
        try{
            const ElementoBuscado = await this.coleccion.findOne({ID: `${id}`})
            if (!ElementoBuscado) {
                throw crearError('NOT_FOUND', `El elemento con id ${id} no fue encotrado`)
            }
            return ElementoBuscado
        }
        catch(error){
            throw error
        }
    }
}

export default Class_Mongo