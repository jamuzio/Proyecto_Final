import Class_FS from "../../Class/Class_FS.js"

class ProductosDaoArchivo extends Class_FS {

    constructor(rutaDir) {
        super(`${rutaDir}/DB_Prod.json`)
    }
    async save(datos){
       return await super.save(datos, 'Producto')
    }
    async deleteById(id){
        await super.cleanById(id, 'Producto')
    }
    async update(id, datos){
        await super.update(id, datos, 'Producto')
    }
}

export default ProductosDaoArchivo
