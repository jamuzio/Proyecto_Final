import error_generator from "../../Tools/Error_Generator.js"

export default class Product {
    #id
    #name
    #description
    #price
    #image
  
    constructor({ id, name, description, price, image}) {
      this.id = id
      this.name = name
      this.description = description
      this.price = price
      this.image = image
    }
  
    set id(id) {
        if (!id) throw error_generator.MISSING_DATA('"id" es un campo requerido')
      this.#id = id
    }
  
    set name(name) {
      if (!name) throw error_generator.MISSING_DATA('"NAME" es un campo requerido')
      if(name.length < 2) throw error_generator.WRONG_DATA('El nombre debe contener mas de dos caracteres')
      if(name.length >= 50) throw error_generator.WRONG_DATA('El nombre debe contener menos de 50 caracteres')
      this.#name = name
    }

    set description(description) {
      if (!description) throw error_generator.MISSING_DATA('"DESCRIPTION" es un campo requerido')
      if(description.length < 10) throw error_generator.WRONG_DATA('La descripcion debe contener mas de 10 caracteres')
      if(description.length >= 150) throw error_generator.WRONG_DATA('La descripcion debe contener menos de 150 caracteres')
      this.#description = description
    }

  
    set price(price) {
      if (!price) throw error_generator.MISSING_DATA('"PRICE" es un campo requerido')
      if (isNaN(price)) throw error_generator.WRONG_TYPE('El precio debe ser numérico')
      if (price < 0) throw error_generator.WRONG_DATA('El precio debe ser positivo')
      this.#price = price
    }

    set image(image){
      if (!image) throw error_generator.MISSING_DATA('"image" es un campo requerido')
      this.#image = image
    }

    updateName(newName) {
      if (!newName) throw error_generator.MISSING_DATA('"NAME" es un campo requerido')
      if(newName.length < 2) throw error_generator.WRONG_DATA('El nombre debe contener mas de dos caracteres')
      if(newName.length >= 50) throw error_generator.WRONG_DATA('El nombre debe contener menos de 50 caracteres')
      this.#name = newName
    }
    
    
    updateDescription(newDescription){
      if (!newDescription) throw error_generator.MISSING_DATA('"DESCRIPTION" es un campo requerido')
      if(newDescription.length < 10) throw error_generator.WRONG_DATA('La descripcion debe contener mas de 10 caracteres')
      if(newDescription.length >= 150) throw error_generator.WRONG_DATA('La descripcion debe contener menos de 150 caracteres')
      this.#description = newDescription
    }

    updateImage(newimage){
      if (!newimage) throw error_generator.MISSING_DATA('Ingrese la nueva direccion de imagen')
      this.#image = newimage
    }
  
    updatePrice(newPrice){
      if (!newPrice) throw error_generator.MISSING_DATA('Ingrese el nuevo precio')
      if (isNaN(newPrice)) throw error_generator.WRONG_TYPE('El precio debe ser numérico')
      if (newPrice < 0) throw error_generator.WRONG_DATA('El nuevo precio debe ser positivo')
      this.#price = newPrice
    }

    datos() {
      return Object.freeze(JSON.parse(JSON.stringify({
        id: this.#id,
        name: this.#name,
        description: this.#description,
        price: this.#price,
        image: this.#image
      })))
    }

  }
  