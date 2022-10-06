import error_generator from "../../Tools/Error_Generator.js"

export default class ShopCart{
    #id
    #prodList

    constructor ({id, prodList=[]}){
        this.id = id
        this.prodList = prodList
    }

    set id(id) {
        if (!id) throw error_generator.MISSING_DATA('"id" es un campo requerido para crear el carrito')
        this.#id = id
    }

    set prodList(prodList){
        if(!Array.isArray(prodList)) throw error_generator.WRONG_TYPE("La lista de productos debe ser un arreglo")
        if(prodList.length>0){
            for(let product of prodList){
                if(!product.hasOwnProperty("prodID")) throw error_generator.MISSING_DATA('"prodID" es un campo requerido')
                if(!product.hasOwnProperty("qty")) throw error_generator.MISSING_DATA('"qty" es un campo requerido')
                if(isNaN(product.qty)) throw error_generator.WRONG_TYPE('La cantidad debe ser numérica')
                if(product.qty < 0) throw error_generator.WRONG_DATA('La cantidad debe ser positiva')
            }
        }
        this.#prodList = prodList
    }

    addProduct(product_ID, qty){
        if(!product_ID) throw error_generator.MISSING_DATA('"prodID" es un campo requerido')
        if(!qty) throw error_generator.MISSING_DATA('"qty" es un campo requerido')
        if(isNaN(qty)) throw error_generator.WRONG_TYPE('La cantidad debe ser numérica')
        if(qty < 0) throw error_generator.WRONG_DATA('La cantidad debe ser positiva')
        const indiceBuscado = this.#prodList.findIndex(p => p.prodID == product_ID)
        if(indiceBuscado === -1){
            const prodToAdd = {prodID: product_ID, qty: qty}
            this.#prodList.push(prodToAdd)
        } else {
            this.#prodList[indiceBuscado].qty += qty 
        }
    }

    removeProduct(product_ID, qty){
        if(!product_ID) throw error_generator.MISSING_DATA('"prodID" es un campo requerido')
        if(!qty) throw error_generator.MISSING_DATA('"qty" es un campo requerido')
        if(isNaN(qty)) throw error_generator.WRONG_TYPE('La cantidad debe ser numérica')
        if(qty < 0) throw error_generator.WRONG_DATA('La cantidad debe ser positiva')
        const indiceBuscado = this.#prodList.findIndex(p => p.prodID == product_ID)
        if(indiceBuscado === -1){
            throw error_generator.NOT_FOUND("El producto indicado no se encuntra en el carrito")
        } else {
            this.#prodList[indiceBuscado].qty -= qty
            if(this.#prodList[indiceBuscado].qty <= 0){
                this.#prodList.splice(indiceBuscado,1)
            }
        }
    }

    clearProductOf_SC(product_ID){
        if(!product_ID) throw error_generator.MISSING_DATA('"prodID" es un campo requerido')
        const indiceBuscado = this.#prodList.findIndex(p => p.prodID == product_ID)
        if(indiceBuscado === -1){
            throw error_generator.NOT_FOUND("El producto indicado no se encuntra en el carrito")
        } else {
            this.#prodList.splice(indiceBuscado,1)
        }
    }

    getProdList(){
        return Object.freeze(JSON.parse(JSON.stringify( this.#prodList )))
    }
    
    datos(){
        return Object.freeze(JSON.parse(JSON.stringify({ 
            id: this.#id,
            prodList: this.#prodList
        })))
    }

}