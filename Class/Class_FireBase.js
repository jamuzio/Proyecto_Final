import db from "../DataBase/FireBaseServer.js"


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
                    const error = new Error('Producto Duplicado')
                    error.tipo = 'duplicated product'
                    throw error
                }
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            await doc.create(NewElement)
            NewElement.ID = `${id}`
            console.log(`Nuevo ${type} creado`)
            if(type === 'Carrito') {
                return id
            }
            else if( type === 'Producto') {
                return NewElement
            }
        }
        catch(error){
            console.log(`No se pudo crear un nuevo ${type}.`)
            throw error
        }
    }
    async cleanById(id, type){
        let accion
        let resultado
        let doc = this.coleccion.doc(`${id}`)
        try{
            if(type === 'Carrito' ){
                resultado = await doc.update({PRODUCTOS: []})
                accion = 'vaciado'               
            } else if(type === 'Producto'){
                resultado = await doc.get()
                if(!resultado){
                    const error = new Error(`El ${type} con id ${id} no fue encotrado`)
                    error.tipo = 'db not found'
                    throw error
                }
                await doc.delete()
                accion = 'borrado'   
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            console.log(`El ${type} se a ${accion} exitosamente!`)
        }
        catch(error){
            if(error.code === 5){
                error = new Error(`El ${type} con id ${id} no fue encotrado`)
                error.tipo = 'db not found'
                throw error
            }
            else if(error.tipo != 'db not found' && error.tipo != 'unknown type' ){
                console.log(`El ${type} no pudo ser ${accion}`)
            }
            throw error
        }
    }
    async getAll(){
        try{
            const AllObjects = await buscarymapear(this.coleccion)
            return AllObjects
        }
        catch(error){
            console.log('No se pudo leer la base')
            throw error
        }
    }

    async update(id, dato, type){
        let hoy = new Date()
        let resultado
        let accion
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
                accion = 'agrego el producto al carrito!'                                  
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
                accion = 'actualizo el producto!'                                  
            } else if(type === 'CarrRmProd'){
                resultado = await doc.get()
                resultado = resultado.data()
                if(!!resultado){
                    const IndiceProdBuscado = resultado.PRODUCTOS.findIndex(p => p.ID == dato)
                    if(IndiceProdBuscado === -1){
                        const error = new Error(`El producto con id ${dato} no se encuntra en el carrito`)
                        error.tipo = 'db not found'
                        throw error
                    } else{
                        resultado.PRODUCTOS.splice(IndiceProdBuscado,1)
                        await doc.update({
                            TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                            PRODUCTOS: resultado.PRODUCTOS
                        })
                    }
                    accion = 'quito el producto del carrito!'
                    }
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            console.log(`Se ${accion}`)
        }
        catch(error){
            if(error.code === 5){
                error = new Error(`El ${type} con id ${id} no fue encotrado`)
                error.tipo = 'db not found'
                throw error
            } else if(error.tipo != 'db not found' && error.tipo != 'unknown type' ){
                console.log(`No se pudo ${accion}`)
            }
            throw error
        }
    }
    async getByID(id){
        let doc = this.coleccion.doc(`${id}`)
        try{
            let ElementoBuscado = await doc.get()
            if (!ElementoBuscado) {
                const error = new Error('No existe el elemento buscado')
                error.tipo = 'db not found'
                throw error
            }
            ElementoBuscado = ElementoBuscado.data()
            return ElementoBuscado
        }
        catch(error){
            if(error.tipo === 'db not found'){
                throw error
            } else{
                console.log('No se pudo leer el archivo. :(')
                console.log(error)
                throw error
            }
          
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