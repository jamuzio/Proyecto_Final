import fs from 'fs'

const File = './DataBase/DB_Prod.json'

class Product_Class {
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
                    console.log('Se creo el archivo')
                }
                catch{
                    console.log('No se pudo crear el archivo.')
                    throw error
                }
               } else {
                    console.log('No se pudo leer el archivo.')
                    throw error
               }
        }
    }
    async save(datos){
        let hoy = new Date()
        if (!this.Objects.find(p => p.NOMBRE == datos.NOMBRE) &&
            !this.Objects.find(p => p.CODIGO == datos.CODIGO)){
            const NuevoProd = {
                ID: `${Date.now()}`,
                TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                NOMBRE: datos.NOMBRE,
                DESCRIPCION: datos.DESCRIPCION,
                CODIGO: datos.CODIGO,
                FOTO: datos.FOTO,
                PRECIO: datos.PRECIO,
                STOCK: datos.STOCK
               }
            this.Objects.push(NuevoProd)
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('Se agrego el producto exitosamente!')
                return NuevoProd
            }
            catch(error){
                console.log('No se pudo agregar el producto al archivo.')
                throw error
            }
        } else {
            const error = new Error('Producto Duplicado')
            error.tipo = 'duplicated product'
            throw error
        }
    }

    async getById(id){
        try{
            let FileData = await fs.promises.readFile(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            const ProductoBuscado = this.Objects.find(p => p.ID == id)
            if (!ProductoBuscado) {
                const error = new Error('No existe el producto buscado')
                error.tipo = 'db not found'
                throw error
            }
            return ProductoBuscado
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
    async getAll(){
        try{
            let FileData = await fs.promises.readFile(File, 'utf-8')
            this.Objects = JSON.parse(FileData)
            return this.Objects
        }
        catch(error){
            console.log('No se pudo leer el archivo. :(')
            throw error
        }
    }
    async deleteById(id){
        let BKArry = this.Objects.splice()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error('El producto no fue encotrado')
            error.tipo = 'db not found'
            throw error
        } else {
            this.Objects.splice(indiceBuscado,1)
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('El producto se a eliminado exitosamente!')
            }
            catch(error){
                console.log('El producto no pudo ser eliminado. :(')
                this.Objects = BKArry
                throw error
            }
        }
    }
    async deleteAll(){
        try{
            await fs.promises.writeFile(File, '[]')
            console.log('La lista se a limpiado con exito!')
            this.Objects = [];
        }
        catch(error){
            console.log('No se limpiar la lista. :(')
            throw error
        }
    }
    async UpdateProd(id, datos){
        let BKArry = this.Objects.splice()
        let hoy = new Date()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error('El producto no fue encotrado')
            error.tipo = 'db not found'
            throw error
        } else {
            this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
            this.Objects[indiceBuscado].NOMBRE = datos.NOMBRE
            this.Objects[indiceBuscado].DESCRIPCION = datos.DESCRIPCION
            this.Objects[indiceBuscado].CODIGO = datos.CODIGO
            this.Objects[indiceBuscado].FOTO = datos.FOTO
            this.Objects[indiceBuscado].PRECIO = datos.PRECIO
            this.Objects[indiceBuscado].STOCK = datos.STOCK
            let ObjectJSON = JSON.stringify(this.Objects)
            try{
                await fs.promises.writeFile(File, ObjectJSON)
                console.log('El producto actualizado exitosamente!')
            }
            catch(error){
                console.log('El producto no pudo ser Actulizado. :(')
                this.Objects = BKArry
                throw error
            }
        }
    }

    length(){
        return this.Objects.length
    }

}


export default Product_Class