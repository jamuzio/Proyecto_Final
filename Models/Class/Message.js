import error_generator from "../../Tools/Error_Generator.js"

export default class Message {
    #email
    #date
    #text
  
    constructor({email, text}) {
      this.id = id
      this.email = email
      this.#date = `${Getdate()}`
      this.text = text
    }
  
    set email(email) {
      if(!email) throw error_generator.MISSING_DATA('"Email" es un campo requerido')
      if(!emailRegex.test(email)) throw error_generator.WRONG_DATA('Ingrese un Email valido')
      this.#email = email
    }
  
    set text(text) {
      if (!text) throw error_generator.MISSING_MESSAGE('Debe incluir un mensaje')
      this.#text = text
    }
  
    datos() {
      return Object.freeze(JSON.parse(JSON.stringify({
        email: this.#email,
        date: this.#date,
        text: this.#text
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
