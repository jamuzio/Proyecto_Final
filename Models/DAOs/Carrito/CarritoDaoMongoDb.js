import Class_Mongo from "../../DB/Class_Mongo.js"
import error_generator from "../../../Tools/Error_Generator.js"

class CarritoDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Carritos')
    }
    async create(datos){
       return await super.save({_id: datos.id, prodList: datos.prodList})
    }
    async cleanById(){
        throw error_generator.NOT_IMPLEMENTED()
    }
    async upDate(datos){
        await super.update({_id: datos.id, prodList: datos.prodList})
    }
    async getByProd(ID_Prod){
        try{
            const shopCarts = await super.getAll("prodList.prodID", ID_Prod)
            let arrayToReturn = []
            if(Array.isArray(shopCarts)){
                arrayToReturn = shopCarts.map((cart) => {
                    return{
                        id:cart._id, 
                        prodList: cart.prodList,
                    }
                })
            }
            return arrayToReturn
        }
        catch(error){
            throw error
        }
    }
    async getByID(ID){
        const ElementoBuscado = await super.getOne("_id", ID)
        return {id: ElementoBuscado._id, prodList: ElementoBuscado.prodList}
    }
}

export default CarritoDaoMongoDb
