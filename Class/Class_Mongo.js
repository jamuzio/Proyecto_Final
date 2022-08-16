import dbCoderhouse from "../DataBase/MongoServer.js"
import crearError from "../Tools/Error_Generator.js"
import { ObjectId } from "mongodb"


class Class_Mongo {
    constructor (coleccion){
        this.coleccion = dbCoderhouse.collection(coleccion)
    }
    async save(datos, type){
        let hoy = new Date()
        let NewElement
        try{
            switch(type){
                case 'Carrito':
                    NewElement = {
                        TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                        PRODUCTOS: []
                        }
                    break
                case 'Producto':
                    const Producto = await this.coleccion.find({NOMBRE: `${datos.NOMBRE}`}).toArray()
                    const Codigo = await this.coleccion.find({CODIGO: `${datos.CODIGO}`}).toArray()
                    if (Producto.length === 0 && Codigo.length === 0){
                        NewElement = {
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
                    break
                case 'Usuario':
                    const usuario = await this.coleccion.find({EMAIL: `${datos.EMAIL}`}).toArray()
                    if (usuario.length === 0){
                        NewElement = {
                            EMAIL: datos.EMAIL,
                            NOMBRE: datos.NOMBRE,
                            PWD: datos.PWD,
                            DIRECCION: datos.DIRECCION,
                            EDAD: datos.EDAD,
                            FOTO: datos.FOTO,
                            TELEFONO: datos.TELEFONO,
                            ROL: datos.ROL,
                            CARRITO: datos.CARR
                        }
                    } else {
                        throw crearError('DUPLICATED_USER')
                    }
                    break
                default:
                    throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            const MongoID =  await this.coleccion.insertOne(NewElement)
            NewElement.ID = MongoID.insertedId
            if(type === 'Carrito') {
                return MongoID.insertedId
            }
            else if(type === 'Producto' || type === 'Usuario') {
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
            if(id.length != 24){
                throw crearError('MISSING_DATA', 'El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(`${id}`)
            switch(type){
                case 'Carrito':
                    resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, {$set: {PRODUCTOS: []}})
                    break
                case 'Producto':
                case 'Usuario':
                    resultado = await this.coleccion.findOneAndDelete({_id: MongoID})
                    break
                default:
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
            if(id.length != 24){
                throw crearError('MISSING_DATA', 'El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(id)
            switch(type){
                case 'Carrito':
                    resultado = await this.coleccion.findOne({_id: MongoID}, { projection: { PRODUCTOS: 1 }})
                    if(!!resultado){
                        resultado.PRODUCTOS.push(dato)
                        await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                            {$set: {
                                TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                                PRODUCTOS: resultado.PRODUCTOS
                            }})                                 
                    }
                    break
                case 'Producto':
                    resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, 
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
                    break
                case 'CarrRmProd':
                    resultado = await this.coleccion.findOne({_id: MongoID}, { projection: { PRODUCTOS: 1 }})
                    const IndiceProdBuscado = resultado.PRODUCTOS.findIndex(p => p.ID == dato)
                    if(IndiceProdBuscado === -1){
                        throw crearError('NOT_FOUND', `El producto con id ${dato} no se encuntra en el carrito`)
                    } else{
                        resultado.PRODUCTOS.splice(IndiceProdBuscado,1)
                        await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                            {$set: {
                                TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                                PRODUCTOS: resultado.PRODUCTOS
                            }})
                    }
                    break
                case 'Usuario':
                    resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                        {$set: {
                            EMAIL: dato.EMAIL,
                            NOMBRE: dato.NOMBRE,
                            PWD: dato.PWD,
                            DIRECCION: dato.DIRECCION,
                            EDAD: dato.EDAD,
                            FOTO: dato.FOTO,
                            TELEFONO: dato.TELEFONO,
                            ROL: dato.ROL
                        }})
                    resultado = resultado.value
                    break
                default:
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
            if(id.length != 24){
                throw crearError('MISSING_DATA', 'El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(id)
            const ElementoBuscado = await this.coleccion.findOne({_id: MongoID})
            if (!ElementoBuscado) {
                throw crearError('NOT_FOUND', `El elemento con id ${id} no fue encotrado`)
            }
            return ElementoBuscado
        }
        catch(error){
            throw error
        }
    }

    async getByName(dato, type){
        let ElementoBuscado
        try{
            switch (type) {
                case 'Usuario': 
                    ElementoBuscado = await this.coleccion.findOne({EMAIL: `${dato}`})
                    break
                case 'Producto':
                    ElementoBuscado = await this.coleccion.findOne({TITLE: `${dato}`})
                    break
                default:
                    throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            if (!ElementoBuscado) {
                throw crearError('NOT_FOUND')
            }
            return ElementoBuscado
        }
        catch(error){
            if(error.tipo === 'NOT_FOUND' || error.tipo === 'UNKNOWN_TYPE'){
                throw error
            } else{
                throw error
            }
          
        }
    }
}

export default Class_Mongo