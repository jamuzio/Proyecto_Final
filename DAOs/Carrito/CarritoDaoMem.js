import Class_MEM from "../../Class/Class_MEM.js"

class CarritoDaoMem extends Class_MEM {
    create(datos){
        return super.save(datos, 'Carrito')
     }
    cleanById(id){
        super.cleanById(id, 'Carrito')
     }
    AddProd(id, id_prod){
        super.update(id, id_prod, 'Carrito')
     }
    removeProd(id, id_prod){
        super.update(id, id_prod, 'CarrRmProd')
     }
}

export default CarritoDaoMem
