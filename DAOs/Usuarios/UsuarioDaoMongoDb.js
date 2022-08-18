import Class_Mongo from "../../Class/Class_Mongo.js"
import bCrypt from "bcrypt"
import crearError from "../../Tools/Error_Generator.js"
import { FuncionsCarrito } from "../../Controllers/ControladorCarrito.js"
import { ObjectId } from "mongodb"

class UsuarioDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Usuarios')
    }
    async save(datos){
        try{
            if(!ValidUser(datos)){
                    throw crearError('MISSING_DATA')
                }
            datos.PWD = createHash(datos.PWD)
            datos.ROL = 'customer'
            datos.CARR = await FuncionsCarrito.CreateNew()
            datos.FOTO = 'No_Profile_Image.jpg'
            const newuser = await super.save(datos, 'Usuario')
            return {EMAIL:newuser.EMAIL, ID:newuser.ID}
        }
        catch(error){
            throw error
        }
     }
    async deleteById(id){
         await super.cleanById(id, 'Usuario')
     }
    async update(id, datos){
        return await super.update(id, datos, 'Usuario')
     }
    async autenticar(username, password) {
        let usuarioBuscado
        try {
            usuarioBuscado = await this.getByName(username)
        } catch (error) {
            if(error.tipo === 'NOT_FOUND'){
                throw crearError('AUTHE_ERROR')
            } else{
                throw error
            }
        }
        if (bCrypt.compareSync(password, usuarioBuscado.PWD)) {
            return usuarioBuscado
        }else throw crearError('AUTHE_ERROR')
        
    }
    async getByName(Name){
        const ElementoBuscado = await super.getByName(Name, 'Usuario')
        return {ID: ElementoBuscado._id.toString() ,EMAIL: ElementoBuscado.EMAIL, PWD: ElementoBuscado.PWD}
    }
    async getByID(Name){
        const ElementoBuscado = await super.getByID(Name, 'Usuario')
        ElementoBuscado.ID = ElementoBuscado._id.toString()
        return ElementoBuscado
    }
    
    async ChangeUserlROL(UserId, NewROL){
        try{
            if(UserId.length != 24){
                throw crearError('MISSING_DATA', 'El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(UserId)
            const resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                {$set: {
                    ROL: NewROL
                }
            })
            if(!resultado){
                throw crearError('NOT_FOUND', `El usuario con id ${id} no fue encotrado`)
            }
        }
        catch(error){
            throw error
        }

    }
    async ChangeUserImage(UserId, extension){
        try{
            if(UserId.length != 24){
                throw crearError('MISSING_DATA', 'El id debe contener 24 caracteres')
            }
            const MongoID = ObjectId(UserId)
            const resultado = await this.coleccion.findOneAndUpdate({_id: MongoID}, 
                {$set: {
                    FOTO: `${UserId}.${extension}`
                }
            })
            if(!resultado){
                throw crearError('NOT_FOUND', `El usuario con id ${id} no fue encotrado`)
            }
        }
        catch(error){
            throw error
        }

        }

}

export default UsuarioDaoMongoDb

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}

function ValidUser(datos){
    if(datos.EMAIL?.length === 0 || 
        !emailRegex.test(datos.EMAIL) ||
        datos.PWD?.length === 0 ||
        datos.NOMBRE?.length === 0 ||
        datos.DIRECCION?.length === 0 ||
        datos.EDAD?.length === 0 ||
        datos.TELEFONO?.length === 0
        ){
        return false
    } else{
        return true
    }
    

}

const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
