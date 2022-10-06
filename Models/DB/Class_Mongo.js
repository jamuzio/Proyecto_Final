import dbDesafio9 from "../../DataBase/MongoServer.js"
import error_generator from "../../Tools/Error_Generator.js"


class Class_Mongo {
    constructor (coleccion){
        this.coleccion = dbDesafio9.collection(coleccion)
    }
    async save(NewElement){
        try{
            console.log(NewElement)
            return await this.coleccion.insertOne(NewElement)
        }
        catch(error){
            throw error
        }
    }
    async getOne(field, data){
        let ElementoBuscado
        try{
            const objetoBusqueda = new Object()
            objetoBusqueda[`${field}`] = data
            ElementoBuscado = await this.coleccion.findOne(objetoBusqueda)
            if (!ElementoBuscado) {
                throw error_generator.NOT_FOUND()
            }
            return ElementoBuscado
        }
        catch(error){
            throw error         
        }
    }


    async cleanById(id){
        let resultado
        try{
            resultado = await this.coleccion.findOneAndDelete({_id: id})
            if(!resultado.value){
                throw error_generator.NOT_FOUND(`El elemento con id ${id} no fue encotrado`)
            }
            return true
        }
        catch(error){
            throw error
        }
    }
    async getAll(field = 0, data = 0){
        try{
            const objetoBusqueda = new Object()
            if(field != 0) objetoBusqueda[`${field}`] = data
            const AllObjects = await this.coleccion.find(objetoBusqueda).toArray()
            if (!AllObjects) {
                throw error_generator.NOT_FOUND()
            }
            return AllObjects
        }
        catch(error){
            throw error
        }
    }

    async update(updateData){
        const id = updateData._id
        let resultado
        try{
            resultado = await this.coleccion.findOneAndUpdate({_id: id}, 
                {$set: updateData })
            if(!resultado){
                throw error_generator.NOT_FOUND(`El elemento con id ${id} no fue encotrado`)
            }
            return resultado.value
        }
        catch(error){
            throw error
        }
    }
}

export default Class_Mongo
