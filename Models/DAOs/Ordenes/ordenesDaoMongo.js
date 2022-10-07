import Class_Mongo from "../../DB/Class_Mongo.js"
import error_generator from "../../../Tools/Error_Generator.js"

class OrdenesDaoMongoDb extends Class_Mongo {

    constructor() {
        super('OrdenesDeCompra')
    }
    async save(ID_orden, fecha, id, listaDeProductos){
        let listaEstructurada = listaDeProductos.map((prod) =>{
            return {
                prod: {
                    id: prod.id,
                    name: prod.name,
                    description: prod.description,
                    price: prod.price,
                    image: prod.image,
                  },
                  cant: prod.qty
            }
        })
       return await super.save({_id: ID_orden,
                                 fecha: fecha,
                                 idCliente: id,
                                 prods: listaEstructurada
                                })
    }
    async cleanById(){
        throw error_generator.NOT_IMPLEMENTED()
    }
    async update(){
        throw error_generator.NOT_IMPLEMENTED()
    }
    async getByClient(ID_cliente){
        try{
            const ordenes = await super.getAll("idCliente", ID_cliente)
            let arrayToReturn = []
            if(Array.isArray(ordenes)){
                arrayToReturn = ordenes.map((odc) => {
                    return {
                        id: odc._id,
                        fecha: odc.fecha,
                        idCliente: odc.idCliente,
                        prods: odc.prods
                    }
                })
            }
            return arrayToReturn
        }
        catch(error){
            throw error
        }
    }
    async getOne(){
        throw error_generator.NOT_IMPLEMENTED()
    }
}

export default OrdenesDaoMongoDb
