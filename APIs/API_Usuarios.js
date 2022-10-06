import generateID from "../Tools/ID_gen.js"
import error_generator from "../Tools/Error_Generator.js"
import User from "../Models/Class/User.js"
import { UsuarioDao } from "../Models/DAOs/Usuarios/index.js"
import API_Carrito from "./API_Carrito.js"


class UsuariosAPI {

    constructor() {
        this.usuarios = UsuarioDao
    }
    async createNewUser(datos){
        try{
            if (await this.usuarios.UserExist(datos)){
                throw error_generator.DUPLICATED_USER()
            } else {
                const ID = generateID()
                datos.id = ID
                const usuario = new User(datos)
                await this.usuarios.save(usuario.datosCompletos())
                await API_Carrito.CreateNew(ID)
                return usuario.datos()
            }
        }
        catch(error){
            throw error
        }
     }

    async deleteUserById(id){
        try{
            await this.usuarios.deleteById(id)
        }
        catch(error){
            throw error
        }
     }

    async autenticar(username, password) {
        try {
            const datosDeUsuario = await this.usuarios.getByName(username)
            const usuario = new User(datosDeUsuario) 
            if(usuario.authenticate(password)){
                return usuario.datos()
            } else{
                error_generator.AUTHE_ERROR()
            }
        } catch (error) {
            if(error.tipo === 'NOT_FOUND'){
                throw error_generator.AUTHE_ERROR()
            } else{
                throw error
            }
        }
    }

    async getUserByID(id){
        let usuarioBuscado = await this.usuarios.getById(id)
        const usuario = new User(usuarioBuscado) 
        return usuario.datos()
    }
}

const API_usuario = new UsuariosAPI

export default API_usuario