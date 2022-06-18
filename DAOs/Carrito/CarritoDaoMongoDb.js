import Class_Mongo from "../../Class/Class_Mongo.js"

class CarritoDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Carritos')
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

export default CarritoDaoMongoDb
