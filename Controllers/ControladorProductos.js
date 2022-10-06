import Api_Prod from "../APIs/API_Productos.js"


const ControladorProductos = {
    AllProd: async (req, res, next) => {
        try {
            const AllProd = await Api_Prod.allProducts()
            res.json(AllProd)
        } catch (error) {
            next(error)
        }
    },
    ProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            const ProductoBuscado = await Api_Prod.getProdById(id);
            res.json(ProductoBuscado)
        } catch (error) {
            next(error)
        }
    },
    AddNewProd: async (req, res, next) => {
        const NewProduct = req.body
        try{
            const ProductAdded = await Api_Prod.CreateNewProd(NewProduct)
            res.status(201).json(ProductAdded)
        }
        catch(error) {
            next(error)
        }
    },
    UpdateProd: async (req, res, next) => {
        const id = req.params.id
        const UpdateData = req.body
        
        try {
            const updatedProd = await Api_Prod.UpdateProd(id, UpdateData);
            console.log(updatedProd)
            res.status(202).json(updatedProd)
        } 
        catch (error) {
            next(error)
        }
    },
    DeleteProdByID: async (req, res, next) => {
        const id = req.params.id
        try {
            await Api_Prod.deleteProdById(id);
            res.status(204).json({Msg:'Producto Eliminado con exito', ProdID: id})
        } catch (error) {
            next(error)
        }
    }

}

export { ControladorProductos }