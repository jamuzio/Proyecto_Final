import Class_Mongo from "../../DB/Class_Mongo.js"


class ProductosDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Productos')
    }
    async save(datos){
        try{
            await super.save({_id:datos.id, 
                            name: datos.name,
                            description: datos.description,
                            price: datos.price,
                            image: datos.image})
        }
        catch(error){
            throw error
        }
     }
     async getByName(data){
        try{
            return await super.getOne('name', data)
        }
        catch(error){
            throw error
        }
     }
     async getById(id){
        try{
            const productoBuscado = await super.getOne('_id', id)
            return {id:productoBuscado._id, 
                    name: productoBuscado.name,
                    description: productoBuscado.description,
                    price: productoBuscado.price,
                    image: productoBuscado.image}
        }
        catch(error){
            throw error
        }
     }
     async deleteById(id){
        try{
            return await super.cleanById(id)
        }
        catch(error){
            throw error
        }
     }
     async getAll(){
        try{
            const products = await super.getAll()
            let arrayToReturn = []
            if(Array.isArray(products)){
                arrayToReturn = products.map((prod) => {
                    return{
                        id:prod._id, 
                        name: prod.name,
                        description: prod.description,
                        price: prod.price,
                        image: prod.image
                    }
                })
            }
            return arrayToReturn
        }
        catch(error){
            throw error
        }
     }
     async UpdateProd(datos){
        try{
            await super.update({_id:datos.id, 
                                name: datos.name,
                                description: datos.description,
                                price: datos.price,
                                image: datos.image})
            return datos
        }
        catch(error){
            throw error
        }
     }
     async ProdExist(datos){
        const productoBuscado = await this.coleccion.find({name: `${datos.name}`}).toArray()
        if (productoBuscado.length === 0){
            return false
        } else{
            return true
        }
        
     }
}

export default ProductosDaoMongoDb
