import NotificationController from '../Controllers/NotificationController.js'
import error_generator from '../Tools/Error_Generator.js'
import { ordenDeCompraDao } from '../Models/DAOs/Ordenes/index.js'
import generateID from '../Tools/ID_gen.js'
import API_Carrito from './API_Carrito.js'
import API_usuario from './API_Usuarios.js'

const adminEmail = process.env.Notif_Email

class OrdenAPI {
    constructor(){
        this.ordenes = ordenDeCompraDao

    }
    async getOrders(id_user){
        try{
            return await this.ordenes.getByClient(id_user)
        }
        catch(error){
            throw error
        }
    }

    async BuyChopCart(id){
        try{
            const user = await API_usuario.getUserByID(id)
            
            const prodList = await API_Carrito.DisplayProd(id)
            

            const asuntoAdmin = `Nuevo pedido de ${user.lastname}, ${user.name}: ${user.email}`
            const asuntoCliente = "Pedido realizado con exito"
            const talonMailCliente = `<p>Su pedido esta siendo procesado recibira un mail para coordinar el envio</p>
                                        <p>IMPORTANTE: Si algun dato no es correcto favor de reportarlo a ${adminEmail}</p>`

            const htmlMail = await generarHTML_Email(prodList, user)

            await NotificationController.SendMail(htmlMail,adminEmail, asuntoAdmin)
            await NotificationController.SendMail(htmlMail+talonMailCliente, user.email, asuntoCliente)
            
            await API_Carrito.CleanByID(id)
            const ID_orden = generateID()
            const fecha = Getdate()
            await this.ordenes.save(ID_orden, fecha, id, prodList )
            return ID_orden
        }
        catch(error){
            throw error
        }
    }
}

const API_Ordenes = new OrdenAPI()

export default API_Ordenes

async function generarHTML_Email(prodList, user) {
    let htmlMail = "<h1>Productos Solicitados:</h1><ul>"
    for (let producto of prodList) {
        htmlMail += `<li>${producto.name} 
                            Cant: ${producto.qty} 
                            Precio Unit: $${producto.price}
                            Precio Total: ${producto.price * producto.qty}
                            </li>`
    }
    htmlMail += `</ul>
                <p>Telefono de contacto: ${user.phone}</p>`
    return htmlMail
}

function Getdate() {
    const hoy = new Date();
    const fecha = hoy.getDate() + '-' + ( hoy.getMonth() + 1 ) + '-' + hoy.getFullYear()
    const hora = hoy.getHours() + ':' + hoy.getMinutes() + ':' + hoy.getSeconds();
    return fecha + ' ' + hora
}