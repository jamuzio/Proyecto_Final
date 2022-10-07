import error_generator from "../../Tools/Error_Generator.js"

export default class Message {
    #id
    #email
    #fecha
    #texto
  
    constructor({id, email, texto}) {
      this.id = id
      this.email = email
      this.#fecha = `${Getdate()}`
      this.texto = texto
    }

    set id(id) {
      if (!id) throw error_generator.MISSING_DATA('"id" es un campo requerido para crear el carrito')
      this.#id = id
  }
  
    set email(email) {
      if(!email) throw error_generator.MISSING_DATA('"Email" es un campo requerido')
      if(!emailRegex.test(email)) throw error_generator.WRONG_DATA('Ingrese un Email valido')
      this.#email = email
    }
  
    set texto(texto) {
      if (!texto) throw error_generator.MISSING_MESSAGE('Debe incluir un mensaje')
      this.#texto = texto
    }
  
    datos() {
      return Object.freeze(JSON.parse(JSON.stringify({
        _id: this.#id,
        email: this.#email,
        fecha: this.#fecha,
        texto: this.#texto
      })))
    }
  }

function Getdate() {
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return fecha + ' ' + hora
}


const emailRegex = /^(([^<>()[\]\.,;:\s@\"]+(\.[^<>()[\]\.,;:\s@\"]+)*)|(\".+\"))@(([^<>()[\]\.,;:\s@\"]+\.)+[^<>()[\]\.,;:\s@\"]{2,})$/i;
