import Class_Mongo from "../../DB/Class_Mongo.js"
import error_generator from "../../../Tools/Error_Generator.js"

class UsuarioDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Usuarios')
    }
    async save(NewUser){
        try{
            await super.save({_id: NewUser.id,
                email: NewUser.email,
                password: NewUser.password,
                name: NewUser.name,
                lastname: NewUser.lastname,
                phone: NewUser.phone,
                image: NewUser.image})
        }
        catch(error){
            throw error
        }
     }

    async deleteById(id){
        try{
            await super.cleanById(id)
        }
        catch(error){
            throw error
        }
     }

    async update(id, datos){
        throw error_generator.NOT_IMPLEMENTED('Metodo update no implemntado para UsuariosMongo')
     }

    async getByName(email){
        const usuarioBuscado = await super.getOne('email', email)
        return {
            id:usuarioBuscado._id, 
            email: usuarioBuscado.email,
            password:usuarioBuscado.password,
            name: usuarioBuscado.name,
            lastname: usuarioBuscado.lastname,
            phone: usuarioBuscado.phone,
            image: usuarioBuscado.image
            }
    }

    async getById(id){
        const usuarioBuscado = await super.getOne('_id', id)
        return {
            id:usuarioBuscado._id, 
            email: usuarioBuscado.emailL,
            password:usuarioBuscado.password,
            name: usuarioBuscado.name,
            lastname: usuarioBuscado.lastname,
            phone: usuarioBuscado.phone,
            image: usuarioBuscado.image
            }
    }
    async UserExist(datos){
        const productoBuscado = await this.coleccion.find({email: `${datos.email}`}).toArray()
        if (productoBuscado.length === 0){
            return false
        } else{
            return true
        }
        
     }
}

export default UsuarioDaoMongoDb