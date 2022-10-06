import API_Carrito from '../APIs/API_Carrito.js'



const ControladorCarrito = {
    CleanByID: async (req, res, next) => {
        const id = req.user.id
        try {
            await API_Carrito.CleanByID(id)
            res.status(202).json({Msg:'El carrito se a vaciado con exito'})
        } catch (error) {
            next(error)
        }
    },
    AddProd: async (req, res, next) =>{
        const id = req.user.id
        const prodID = req.body.productId
        const cant = 1
        try{
            await API_Carrito.AddProd(id, prodID, cant)
            res.status(200).json({Msg: `Se agrego el producto`, Prod: prodID, Cantidad: cant})
        }
        catch(error){
            next(error)
        }
    },
    DisplayProd: async (req, res, next) =>{
        const id = req.user.id
        try{
            const ListaProductos = await API_Carrito.DisplayProd(id)
            res.status(200).json(ListaProductos)
        }
        catch(error){
            next(error)
        }
    },
    RemoveProd: async (req, res, next) =>{
        const id = req.user.id
        const prodID = req.params.id_prod
        try{
            await API_Carrito.RemoveProd(id, prodID, 1)
            res.status(200).json({Msg: `Se quito el producto`, Prod: prodID})
        }
        catch(error){
            next(error)
        }
    },
    BuyChopCart: async(req, res, next) =>{
        const id = req.user.id
        try{
            await API_Carrito.BuyChopCart(id)
            res.status(200).json({Msg: "Pedido realizado con exito"})
        }
        catch(error){
            next(error)
        }
    }

}


export { ControladorCarrito}