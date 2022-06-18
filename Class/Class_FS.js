import fs from 'fs'

//const File = './DataBase/DB_ShopCar.json'

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
                    console.log(`Se creo el archivo ${this.File}`)
                }
                catch{
                    console.log(`No se pudo crear el archivo ${this.File}`)
                    throw error
                }
               } else {
                    console.log(`No se pudo leer el archivo ${this.File}`)
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
                const error = new Error('Producto Duplicado')
                error.tipo = 'duplicated product'
                throw error
            }
        } else {
            const error = new Error(`Typo ${type} desconocido `)
            error.tipo = 'unknown type'
            throw error
        }
        this.Objects.push(NewElement)
        let ObjectJSON = JSON.stringify(this.Objects)
        try{
            await fs.promises.writeFile(this.File, ObjectJSON)
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
        let BKArry = this.Objects.splice()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El ${type} con id ${id} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            let accion
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].PRODUCTOS = [] 
                accion = 'vaciado'               
            } else if(type === 'Producto'){
                this.Objects.splice(indiceBuscado,1)
                accion = 'borrado'   
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(this.File, ObjectJSON)
                console.log(`El ${type} se a ${accion} exitosamente!`)
            }
            catch(error){
                console.log(`El ${type} no pudo ser ${accion}`)
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
            console.log('No se pudo leer el archivo. :(')
            throw error
        }
    }

    async update(id, dato, type){
        let BKArry = this.Objects.splice()
        let hoy = new Date()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El ${type} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            let accion
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].PRODUCTOS.push(dato)  
                accion = 'agrego el producto al carrito!'                             
            } else if(type === 'Producto'){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].NOMBRE = dato.NOMBRE
                this.Objects[indiceBuscado].DESCRIPCION = dato.DESCRIPCION
                this.Objects[indiceBuscado].CODIGO = dato.CODIGO
                this.Objects[indiceBuscado].FOTO = dato.FOTO
                this.Objects[indiceBuscado].PRECIO = dato.PRECIO
                this.Objects[indiceBuscado].STOCK = dato.STOCK 
                accion = 'actualizo el producto!'
            } else if(type === 'CarrRmProd'){
                const IndiceProdBuscado = this.Objects[indiceBuscado].PRODUCTOS.findIndex(p => p.ID == dato)
                if(IndiceProdBuscado === -1){
                    const error = new Error(`El producto con id ${dato} no se encuntra en el carrito`)
                    error.tipo = 'db not found'
                    throw error
                } else{
                    this.Objects[indiceBuscado].PRODUCTOS.splice(IndiceProdBuscado,1)
                }
                accion = 'quito el producto del carrito!'
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(this.File, ObjectJSON)
                console.log(`Se ${accion}`)
            }
            catch(error){
                console.log(`No se pudo ${accion}`)
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

export default Class_FS