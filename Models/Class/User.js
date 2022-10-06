import error_generator from "../../Tools/Error_Generator.js"
import bCrypt from "bcrypt"

export default class User {
    #id
    #email
    #password
    #name
    #lastname
    #phone
    #image
  
    constructor({ id, email, password, name, lastname, phone, image}) {
        this.id = id
        this.email = email
        this.password = password
        this.name = name
        this.lastname = lastname
        this.phone = phone
        this.image = image
    }
  
    get id() { return this.#id }
  
    set id(id) {
        if (!id) throw error_generator.MISSING_DATA('"id" es un campo requerido')
        this.#id = id
    }
  
    set email(email) {
        if(!email) throw error_generator.MISSING_DATA('"Email" es un campo requerido')
        if(!emailRegex.test(email)) throw error_generator.WRONG_DATA('Ingrese un Email valido')
        this.#email = email
    }

    set password(password) {
        if(!password) throw error_generator.MISSING_DATA('"Contraseña" es un campo requerido')
        if(password.length != 60){
            if(password.length > 18){
                throw error_generator.WRONG_DATA('La contraseña debe ser menor a 18 caracteres')
            } else if (password.length < 4){
                throw error_generator.WRONG_DATA('La contraseña debe tener al menos 4 caracteres')
            }
            else {
                password = createHash(password)
            }
        } 
        this.#password = password
    }

    set name(name) {
        if (!name) throw error_generator.MISSING_DATA('"Nombre"es un campo requerido')
        if (!isNaN(name)) throw error_generator.WRONG_TYPE('El nombre no puede debe ser numérico')
        this.#name = name
    }

    set lastname(lastname) {
        if (!lastname) throw error_generator.MISSING_DATA('"Apellido"es un campo requerido')
        if (!isNaN(lastname)) throw error_generator.WRONG_TYPE('El apellido no puede debe ser numérico')
        this.#lastname = lastname
    }

    set phone(phone) {
        if (!phone) throw error_generator.MISSING_DATA('"Telefono"es un campo requerido')
        this.#phone = phone
    }
    
    set image(image) {
        if (!image) throw error_generator.MISSING_DATA('"Imagen"es un campo requerido')
        this.#image = image
    }

    authenticate(password){
        if(!password) throw error_generator.MISSING_DATA('"Contraseña" es un campo requerido')
        if (bCrypt.compareSync(password, this.#password)) {
            return true
        }else {
            throw error_generator.AUTHE_ERROR()
        }
    }

    changePwd(OldPWD, NewPWD){
        if (bCrypt.compareSync(OldPWD, this.#password)) {
            NewPWD = createHash(NewPWD)
            this.#password = NewPWD
            return true
        }else {
            throw error_generator.AUTHE_ERROR()
        }
    }

    datos() {
      return Object.freeze(JSON.parse(JSON.stringify({
        id: this.#id,
        email: this.#email
      })))
    }
    datosCompletos() {
        return Object.freeze(JSON.parse(JSON.stringify({
            id: this.#id,
            email: this.#email,
            password: this.#password,
            name: this.#name,
            lastname: this.#lastname,
            phone: this.#phone,
            image: this.#image
        })))
      }
  }

function createHash(password) {
    return bCrypt.hashSync(password, bCrypt.genSaltSync(10), null);
}
  
const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;