import Class_FireBase from "../../Class/Class_FireBase.js"

class ProductosDaoFirebase extends Class_FireBase {

    constructor() {
        super('Productos')
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

export default ProductosDaoFirebase
