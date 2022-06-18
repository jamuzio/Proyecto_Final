import dbCoderhouse from "../DataBase/MongoServer.js"


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
                const error = new Error('Producto Duplicado')
                error.tipo = 'duplicated product'
                throw error
            }
        } else {
            const error = new Error(`Typo ${type} desconocido `)
            error.tipo = 'unknown type'
            throw error
        }
        await this.coleccion.insertOne(NewElement)
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
        try{
            if(type === 'Carrito' ){
                resultado = await this.coleccion.findOneAndUpdate({ID: `${id}`}, {$set: {PRODUCTOS: []}})
                accion = 'vaciado'               
            } else if(type === 'Producto'){
                resultado = await this.coleccion.findOneAndDelete({ID: `${id}`})
                accion = 'borrado'   
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            if(!resultado.value){
                const error = new Error(`El ${type} con id ${id} no fue encotrado`)
                error.tipo = 'db not found'
                throw error
            } else {
                console.log(`El ${type} se a ${accion} exitosamente!`)
            }
        }
        catch(error){
            if(error.tipo != 'db not found' && error.tipo != 'unknown type' ){
                console.log(`El ${type} no pudo ser ${accion}`)
            }
            throw error
        }
    }
    async getAll(){
        
        try{
            const AllObjects = await this.coleccion.find().toArray()
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
                accion = 'agrego el producto al carrito!'                                  
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
                accion = 'actualizo el producto!'                                  
            } else if(type === 'CarrRmProd'){
                resultado = await this.coleccion.findOne({ID: `${id}`}, { projection: { PRODUCTOS: 1 }})
                const IndiceProdBuscado = resultado.PRODUCTOS.findIndex(p => p.ID == dato)
                if(IndiceProdBuscado === -1){
                    const error = new Error(`El producto con id ${dato} no se encuntra en el carrito`)
                    error.tipo = 'db not found'
                    throw error
                } else{
                    resultado.PRODUCTOS.splice(IndiceProdBuscado,1)
                    await this.coleccion.findOneAndUpdate({ID: `${id}`}, 
                        {$set: {
                            TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                            PRODUCTOS: resultado.PRODUCTOS
                        }})
                }
                accion = 'quito el producto del carrito!'
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            if(!resultado){
                const error = new Error(`El ${type} con id ${id} no fue encotrado`)
                error.tipo = 'db not found'
                throw error
            } else {
                console.log(`Se ${accion}`)
            }
        }
        catch(error){
            if(error.tipo != 'db not found' && error.tipo != 'unknown type' ){
                console.log(`No se pudo ${accion}`)
            }
            throw error
        }
    }
    async getByID(id){
        
        try{
            const ElementoBuscado = await this.coleccion.findOne({ID: `${id}`})
            if (!ElementoBuscado) {
                const error = new Error('No existe el elemento buscado')
                error.tipo = 'db not found'
                throw error
            }
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

export default Class_Mongo