import fs from 'fs'
import crearError from '../../Tools/Error_Generator.js'

class Class_FS {
    constructor (File){
        this.File = File
        this.Objects = []
        try{
            let FileData = fs.readFileSync(this.File, 'utf-8')
            this.Objects = JSON.parse(FileData)
        }
        catch(error){
            if (error.code === 'ENOENT') {  //si es la primera ejecucion y no existe el archivo lo creo
                try{
                    fs.writeFileSync(this.File, '[]')
                }
                catch{
                    throw error
                }
               } else {
                    throw error
               }
        }
    }
    async save(datos, type){
        let hoy = new Date()
        const id = Date.now()
        let NewElement
        if(type === 'Carrito' ){
            NewElement = {
                ID: `${id}`,
                TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                PRODUCTOS: []
                }
        } else if(type === 'Producto'){
            if (!this.Objects.find(p => p.NOMBRE == datos.NOMBRE) &&
            !this.Objects.find(p => p.CODIGO == datos.CODIGO)){
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
        this.Objects.push(NewElement)
        let ObjectJSON = JSON.stringify(this.Objects)
        try{
            await fs.promises.writeFile(this.File, ObjectJSON)
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
        let BKArry = this.Objects.splice()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
        } else {
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].PRODUCTOS = []              
            } else if(type === 'Producto'){
                this.Objects.splice(indiceBuscado,1)
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            let ObjectJSON = JSON.stringify(this.Objects)

            try{
                await fs.promises.writeFile(this.File, ObjectJSON)
            }
            catch(error){
                this.Objects = BKArry
                throw error
            }
        }
    }
    async getAll(){
        try{
            let FileData = await fs.promises.readFile(this.File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            return this.Objects
        }
        catch(error){
            throw error
        }
    }

    async update(id, dato, type){
        let BKArry = this.Objects.splice()
        let hoy = new Date()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            throw crearError('NOT_FOUND', `El ${type} con id ${id} no fue encotrado`)
        } else {
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].PRODUCTOS.push(dato)                               
            } else if(type === 'Producto'){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].NOMBRE = dato.NOMBRE
                this.Objects[indiceBuscado].DESCRIPCION = dato.DESCRIPCION
                this.Objects[indiceBuscado].CODIGO = dato.CODIGO
                this.Objects[indiceBuscado].FOTO = dato.FOTO
                this.Objects[indiceBuscado].PRECIO = dato.PRECIO
                this.Objects[indiceBuscado].STOCK = dato.STOCK 
            } else if(type === 'CarrRmProd'){
                const IndiceProdBuscado = this.Objects[indiceBuscado].PRODUCTOS.findIndex(p => p.ID == dato)
                if(IndiceProdBuscado === -1){
                    throw crearError('NOT_FOUND', `El producto con id ${dato} no se encuntra en el carrito`)
                } else{
                    this.Objects[indiceBuscado].PRODUCTOS.splice(IndiceProdBuscado,1)
                }
            } else {
                throw crearError('UNKNOWN_TYPE', `Tipo ${type} desconocido`)
            }
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(this.File, ObjectJSON)
            }
            catch(error){
                this.Objects = BKArry
                throw error
            }
        }
    }
    async getByID(id){
        try{
            let FileData = await fs.promises.readFile(this.File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            const ElementoBuscado = this.Objects.find(p => p.ID == id)
            if (!ElementoBuscado) {
                throw crearError('NOT_FOUND')
            }
            return ElementoBuscado
        }
        catch(error){
            throw error
        }
    }
}

export default Class_FS