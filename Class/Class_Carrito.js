const fs = require('fs')

const File = './DataBase/DB_ShopCart.json'

class ShopCart_Class {
    constructor (){
        this.Objects = []
        try{
            let FileData = fs.readFileSync(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
        }
        catch(error){
            if (error.code === 'ENOENT') {  //si es la primera ejecucion y no existe Productos.txt lo creo
                try{
                    fs.writeFileSync(File, '[]')
                    console.log(`Se creo el archivo ${File}`)
                }
                catch{
                    console.log(`No se pudo crear el archivo ${File}`)
                    throw error
                }
               } else {
                    console.log(`No se pudo leer el archivo ${File}`)
                    throw error
               }
        }
    }
    async create(){
        let hoy = new Date()
        const id = Date.now()
        this.Objects.push({
            ID: `${id}`,
            TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
            PRODUCTOS: []
            })
        let ObjectJSON = JSON.stringify(this.Objects)
        try{
            await fs.promises.writeFile(File, ObjectJSON)
            console.log('Se creo un nuevo Carrito!')
            return id
        }
        catch(error){
            console.log('No se pudo crear un nuevp carrito.')
            throw error
        }
    }
    async cleanById(id){
        let BKArry = this.Objects.splice()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El carrito con id ${id} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            this.Objects[indiceBuscado].PRODUCTOS = []
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('El carrito se a vaciado exitosamente!')
            }
            catch(error){
                console.log('El carrito no pudo ser vaciado')
                this.Objects = BKArry
                throw error
            }
        }
    }
    async AddProd(id, ProdID){
        let BKArry = this.Objects.splice()
        let hoy = new Date()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error('El carrito no fue encotrado')
            error.tipo = 'db not found'
            throw error
        } else {
            this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
            this.Objects[indiceBuscado].PRODUCTOS.push(ProdID)
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('Se agrego el producto al carrito!')
            }
            catch(error){
                console.log('No se pudo cargar el producto al carrito')
                this.Objects = BKArry
                throw error
            }
        }
    }
    getByID(id){
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El carrito con id ${id} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            return this.Objects[indiceBuscado]
        }
    }
    async removeProd(id, id_prod){
        let BKArry = this.Objects.splice()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El carrito con id ${id} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            const IndiceProdBuscado = this.Objects[indiceBuscado].PRODUCTOS.findIndex(p => p.ID == id_prod)
            if(IndiceProdBuscado === -1){
                const error = new Error(`El producto con id ${id_prod} no se encuntra en el carrito`)
                error.tipo = 'db not found'
                throw error
            } else{
                this.Objects[indiceBuscado].PRODUCTOS.splice(IndiceProdBuscado,1)
                let ObjectJSON = JSON.stringify(this.Objects)
                try{
                    await fs.promises.writeFile(File, ObjectJSON)
                    console.log('El producto se quitado exitosamente del carrito')
                }
                catch(error){
                    console.log('El producto no pudo ser quitado del carrito')
                    this.Objects = BKArry
                    throw error
                }
            }
        }
    }
}

module.exports = ShopCart_Class