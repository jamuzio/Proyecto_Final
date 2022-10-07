import API_Ordenes from "../APIs/API_Ordenes.js"


const ControladorDeOrdenes = {
    getOrders: async (req, res, next) => {
        const id = req.user.id
        try {
            const ordenes = await API_Ordenes.getOrders(id)
            res.json(ordenes)
        } catch (error) {
            next(error)
        }
    },
    BuyChopCart: async (req, res, next) => {
        const id = req.user.id
        try {
            const id_ODC = await API_Ordenes.BuyChopCart(id)
            res.status(200).json({
                                Msg: "Pedido realizado con exito",
                                ID_ODC: id_ODC
                            })
        } catch (error) {
            next(error)
        }
    }
}

export { ControladorDeOrdenes }