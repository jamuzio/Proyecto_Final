import Class_FS from "../../Class/Class_FS.js"

class CarritosDaoArchivo extends Class_FS {

    constructor(rutaDir) {
        super(`${rutaDir}/DB_ShopCar.json`)
    }
    async create(datos){
       return await super.save(datos, 'Carrito')
    }
    async cleanById(id){
        await super.cleanById(id, 'Carrito')
    }
    async AddProd(id, id_prod){
        await super.update(id, id_prod, 'Carrito')
    }
    async removeProd(id, id_prod){
        await super.update(id, id_prod, 'CarrRmProd')
    }
    
}

export default CarritosDaoArchivo
