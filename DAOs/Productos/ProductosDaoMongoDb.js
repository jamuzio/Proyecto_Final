import Class_Mongo from "../../Class/Class_Mongo.js"
import { ObjectId } from "mongodb"

class ProductosDaoMongoDb extends Class_Mongo {

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
     async changeStock(id, cant){
        let resultado
        try{
            if(id.length != 24){
                throw crearError('MISSING_DATA', 'El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(id)
            resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                {$inc:{"STOCK":cant}
            })
        }
        catch(error){
            throw error
        }
        return resultado
     }

}

export default ProductosDaoMongoDb
