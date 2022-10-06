import Class_FireBase from "../../Class/Class_FireBase.js"

class CarritoDaoFirebase extends Class_FireBase {

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

export default CarritoDaoFirebase
