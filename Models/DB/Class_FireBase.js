import db from "../DataBase/FireBaseServer.js"
import crearError from "../Tools/Error_Generator.js"

class Class_FireBase {
    constructor (coleccion){
        this.coleccion = db.collection(coleccion)
    }
    async save(datos, type){
        let hoy = new Date()
        const id = Date.now()
        let NewElement
        try{
            let doc = this.coleccion.doc(`${id}`)
            if(type === 'Carrito' ){
                NewElement = {
                    TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                    PRODUCTOS: []
                    }
            } else if(type === 'Producto'){
                const listacompleta = await buscarymapear(this.coleccion)
                const Producto = listacompleta.find(p => p.NOMBRE == datos.NOMBRE)
                const Codigo = listacompleta.find(p => p.CODIGO == datos.CODIGO)
                if (!Producto && !Codigo){
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
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            await doc.create(NewElement)
            NewElement.ID = `${id}`
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
        let doc = this.coleccion.doc(`${id}`)
        try{
            if(type === 'Carrito' ){
                resultado = await doc.update({PRODUCTOS: []})            
            } else if(type === 'Producto'){
                resultado = await doc.get()
                await doc.delete() 
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            if(!resultado){
                throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
            }
        }
        catch(error){
            if(error.code === 5){
                throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
            }
            else {
                throw error
            }
        }
    }
    async getAll(){
        try{
            const AllObjects = await buscarymapear(this.coleccion)
            return AllObjects
        }
        catch(error){
            throw error
        }
    }

    async update(id, dato, type){
        let hoy = new Date()
        let resultado
        let doc = this.coleccion.doc(`${id}`)
        try{
            if(type === 'Carrito' ){
                resultado = await doc.get()
                resultado = resultado.data()
                if(!!resultado){
                    resultado.PRODUCTOS.push(dato)
                    await doc.update({
                        TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                        PRODUCTOS: resultado.PRODUCTOS
                    })                                
                }
            } else if(type === 'Producto'){
                await doc.update({
                        TIMESTAMP: `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                        NOMBRE: dato.NOMBRE,
                        DESCRIPCION: dato.DESCRIPCION,
                        CODIGO: dato.CODIGO,
                        FOTO: dato.FOTO,
                        PRECIO: dato.PRECIO,
                        STOCK: dato.STOCK
                    })                             
            } else if(type === 'CarrRmProd'){
                resultado = await doc.get()
                resultado = resultado.data()
                if(!!resultado){
                    const IndiceProdBuscado = resultado.PRODUCTOS.findIndex(p => p.ID == dato)
                    if(IndiceProdBuscado === -1){
                        throw crearError('NOT_FOUND', `El producto con id ${dato} no se encuntra en el carrito`)
                    } else{
                        resultado.PRODUCTOS.splice(IndiceProdBuscado,1)
                        await doc.update({
                            TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                            PRODUCTOS: resultado.PRODUCTOS
                        })
                    }
                    }
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
        }
        catch(error){
            if(error.code === 5){
                throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
            } else {
                throw error
            }
        }
    }
    async getByID(id){
        let doc = this.coleccion.doc(`${id}`)
        try{
            let ElementoBuscado = await doc.get()
            if (!ElementoBuscado) {
                throw crearError('NOT_FOUND')
            }
            ElementoBuscado = ElementoBuscado.data()
            return ElementoBuscado
        }
        catch(error){
            throw error
        }
    }
}

async function buscarymapear(collection){
    const resultado = await collection.get()
    let docs = resultado.docs
    const respuesta = docs.map((doc) => ({
        ID: doc.id,
        TIMESTAMP: doc.data().TIMESTAMP,
        NOMBRE: doc.data().NOMBRE,
        DESCRIPCION: doc.data().DESCRIPCION,
        CODIGO: doc.data().CODIGO,
        FOTO: doc.data().FOTO,
        PRECIO: doc.data().PRECIO,
        STOCK: doc.data().STOCK
    }))
    return respuesta
}

export default Class_FireBase