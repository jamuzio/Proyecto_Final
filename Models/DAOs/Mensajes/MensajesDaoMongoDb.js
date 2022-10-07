import Class_Mongo from "../../DB/Class_Mongo.js"
import Message from "../../Class/Message.js"
import generateID from "../../../Tools/ID_gen.js"

class MensajesDaoMongoDb extends Class_Mongo {

    constructor() {
        super('Mensajes')
    }
    async save(datos){
        try{
            const ID = generateID()
            const mensaje = new Message({id:ID, email:datos.email, texto:datos.texto})
            await super.save(mensaje.datos())
            return ID
        }
        catch(error){
            throw error
        }
    }
    async getAll(){
        try{
            const mensajes = await super.getAll()
            let arrayToReturn = []
            if(Array.isArray(mensajes)){
                arrayToReturn = mensajes.map((msg) => {
                    return{
                        id: msg._id,
                        email: msg.email,
                        fecha: msg.fecha,
                        texto: msg.texto
                    }
                })
            }
            return arrayToReturn
        }
        catch(error){
            throw error
        }
    }
    
}

export default MensajesDaoMongoDb
