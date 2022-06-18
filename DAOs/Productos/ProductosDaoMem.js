import Class_MEM from "../../Class/Class_MEM.js"

class ProductosDaoMem extends Class_MEM {
    save(datos){
        return super.save(datos, 'Producto')
     }
    deleteById(id){
        super.cleanById(id, 'Producto')
     }
    update(id, datos){
         super.update(id, datos, 'Producto')
     }
}

export default ProductosDaoMem
