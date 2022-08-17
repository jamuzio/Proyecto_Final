import { CarritoDao } from '../DAOs/Carrito/index.js'
import { usuario } from './UserController.js'
import logger from '../Tools/logger.js'
import { ProdFuncionCtrl } from './ControladorProductos.js'
import NotificationController from './NotificationController.js'



const ControladorCarrito = {
    CleanByID: async (req, res, next) => {
        const id = req.params.id
        try {
            await CarritoDao.cleanById(id)
            logger.info(`El carrito ${id} se a vaciado con exito`)
            res.status(202).send('El carrito se a vaciado con exito')
        } catch (error) {
            next(error)
        }
    },
    CreateNew: async (req, res, next) => {
        try {
            const NewId = await CarritoDao.create()
            logger.info(`Se a creado un nuevo carrito con id: ${NewId}`)
            res.status(201).json({NewId})
        } catch (error) {
            next(error)
            }
    },
    AddProd: async (req, res, next) =>{
        const id = req.params.id
        const ProdID = req.body
        try{
            await ProdFuncionCtrl.ProdByID(ProdID.ID)
            await CarritoDao.AddProd(id, ProdID)
            logger.info(`Se agrego el producto ${ProdID.ID} al carrito ${id}`)
            res.sendStatus(200)
        }
        catch(error){
            next(error)
        }
    },
    DisplayProd: async (req, res, next) =>{
        const id = req.params.id
        try{
            const carrito = await CarritoDao.getByID(id)
            let ListaProductos = []
            for (let Producto of carrito.PRODUCTOS){
                ListaProductos.push(await ProdFuncionCtrl.ProdByID(Producto.ID))
            }
            res.status(200).json(ListaProductos)
        }
        catch(error){
            next(error)
        }
    },
    RemoveProd: async (req, res, next) =>{
        const id = req.params.id
        const id_prod = req.params.id_prod
        try{
            await CarritoDao.removeProd(id, id_prod)
            logger.info(`Se quitó el producto ${id_prod} al carrito ${id}`)
            res.sendStatus(200)
        }
        catch(error){
            next(error)
        }
    },
    BuyChopCart: async(req, res, next) =>{
        const id = req.params.id
        const User = await usuario.getByID(req.session.passport.user)
        try{
            const carrito = await CarritoDao.getByID(id)
            let texto = `Nuevo pedido de ${User.NOMBRE}: ${User.EMAIL}`
            let HtmlMail = "<h1>Productos Solicitados:</h1><ul>"
            for (let Producto of carrito.PRODUCTOS){
                let ProductoBuscado = await ProdFuncionCtrl.DecreseStock(Producto.ID)
                if(ProductoBuscado === -1){
                    throw crearError('NOT_FOUND', `El producto con id ${Producto.ID} no se encuntra`)
                }
                HtmlMail+=`<li>${ProductoBuscado.value?.NOMBRE} 
                            Cod: ${ProductoBuscado.value?.CODIGO} 
                            Precio: $${ProductoBuscado.value?.PRECIO}
                            En Stock: ${ProductoBuscado.value?.STOCK}
                            </li>`
            }
            HtmlMail+=`</ul>
                        <p>Direccion de envio: ${User.DIRECCION}</p>
                        <p>Telefono de contacto: ${User.TELEFONO}</p>`
            
            await NotificationController.SendMail(HtmlMail,process.env.Notif_Email, texto)
            await NotificationController.SendWhatsApp(texto,process.env.Notif_Number)
            await NotificationController.SendSMS("Su pedido se realizado y esta en preparacion", User.TELEFONO)
            await CarritoDao.cleanById(id)
            res.status(200).json({Msg: "Pedido realizado con exito"})
        }
        catch(error){
            next(error)
        }
    }

}

const FuncionsCarrito = {
    CreateNew: async () => {
        try {
            const NewId = await CarritoDao.create()
            logger.info(`Se a creado un nuevo carrito con id: ${NewId}`)
            return NewId.toString()
        } catch (error) {
            throw error
            }
    }
}



export { ControladorCarrito, FuncionsCarrito }