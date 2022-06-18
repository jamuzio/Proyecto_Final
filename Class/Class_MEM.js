


class Class_MEM {
    constructor (){
        this.Objects = []
        
    }
    save(datos, type){
        let hoy = new Date()
        const id = Date.now()
        let NewElement
        if(type === 'Carrito' ){
            NewElement = {
                ID: `${id}`,
                TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                PRODUCTOS: []
                }
        } else if(type === 'Producto'){
            if (!this.Objects.find(p => p.NOMBRE == datos.NOMBRE) &&
            !this.Objects.find(p => p.CODIGO == datos.CODIGO)){
                NewElement = {
                    ID: `${id}`,
                    TIMESTAMP: `${hoy.toDateString() +' '+  hoy.toLocaleTimeString()}`,
                    NOMBRE: datos.NOMBRE,
                    DESCRIPCION: datos.DESCRIPCION,
                    CODIGO: datos.CODIGO,
                    FOTO: datos.FOTO,
                    PRECIO: datos.PRECIO,
                    STOCK: datos.STOCK
                }
            } else {
                const error = new Error('Producto Duplicado')
                error.tipo = 'duplicated product'
                throw error
            }
        } else {
            const error = new Error(`Typo ${type} desconocido `)
            error.tipo = 'unknown type'
            throw error
        }
        this.Objects.push(NewElement)
        console.log(`Nuevo ${type} creado`)
        if(type === 'Carrito') {
            return id
        }
        else if( type === 'Producto') {
            return NewElement
        }
    }
    cleanById(id, type){
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El ${type} con id ${id} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            let accion
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].PRODUCTOS = [] 
                accion = 'vaciado'               
            } else if(type === 'Producto'){
                this.Objects.splice(indiceBuscado,1)
                accion = 'borrado'   
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
        }
        console.log(`El ${type} se a ${accion} exitosamente!`)
    }
    getAll(){
        return this.Objects
    }

    update(id, dato, type){
        let hoy = new Date()
        const indiceBuscado = this.Objects.findIndex(p => p.ID == id)
        if(indiceBuscado === -1){
            const error = new Error(`El ${type} no fue encotrado`)
            error.tipo = 'db not found'
            throw error
        } else {
            let accion
            if(type === 'Carrito' ){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].PRODUCTOS.push(dato)  
                accion = 'agrego el producto al carrito!'                             
            } else if(type === 'Producto'){
                this.Objects[indiceBuscado].TIMESTAMP = `${hoy.toDateString() +' '+ hoy.toLocaleTimeString()}`,
                this.Objects[indiceBuscado].NOMBRE = dato.NOMBRE
                this.Objects[indiceBuscado].DESCRIPCION = dato.DESCRIPCION
                this.Objects[indiceBuscado].CODIGO = dato.CODIGO
                this.Objects[indiceBuscado].FOTO = dato.FOTO
                this.Objects[indiceBuscado].PRECIO = dato.PRECIO
                this.Objects[indiceBuscado].STOCK = dato.STOCK 
                accion = 'actualizo el producto!'
            } else if(type === 'CarrRmProd'){
                const IndiceProdBuscado = this.Objects[indiceBuscado].PRODUCTOS.findIndex(p => p.ID == dato)
                if(IndiceProdBuscado === -1){
                    const error = new Error(`El producto con id ${dato} no se encuntra en el carrito`)
                    error.tipo = 'db not found'
                    throw error
                } else{
                    this.Objects[indiceBuscado].PRODUCTOS.splice(IndiceProdBuscado,1)
                }
                accion = 'quito el producto del carrito!'
            } else {
                const error = new Error(`Typo ${type} desconocido `)
                error.tipo = 'unknown type'
                throw error
            }
            console.log(`Se ${accion}`)
        }
    }
    getByID(id){
        const ElementoBuscado = this.Objects.find(p => p.ID == id)
        if (!ElementoBuscado) {
            const error = new Error('No existe el elemento buscado')
            error.tipo = 'db not found'
            throw error
        }
        return ElementoBuscado
    }
}

export default Class_MEM