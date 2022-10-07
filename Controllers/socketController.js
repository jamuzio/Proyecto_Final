import { MensajesDao as Mensajes } from '../Models/DAOs/Mensajes/index.js'
import logger from '../Tools/logger.js'


async function eventCnx(socket, io) {
    logger.info("Nueva conexion iniciada")
    await Msj_emit(io)
    socket.on('mensaje', mensaje => eventoMensajeController(socket, io, mensaje))
}

async function eventoMensajeController(socket, io, mensaje) {
    try{
        console.log(mensaje)
        await Mensajes.save(mensaje)
        socket.emit('Msj_res', "")
    }
    catch(error){
        if (error.tipo === 'MISSING_DATA'){
            logger.error("(SOCKET) MISSING_DATA: Debe ingresar correctamente los datos de autor para usar el chat")
            socket.emit('Msj_res', "Debe ingresar correctamente los datos de autor para usar el chat")
        }else if (error.tipo === 'MISSING_MESSAGE'){
            logger.error("(SOCKET) MISSING_MESSAGE: Debe ingresar un mensaje")
            socket.emit('Msj_res', "Debe ingresar un mensaje")
        }
        else {
            logger.error(`ATENCION: A ocurrido un error desconocido en el socket. \n\t ${error.stack} `)
            socket.emit('Msj_res', "Error en servidor, por favor intente nuevamente")
        }
    }

    await Msj_emit(io)
}

async function Msj_emit(io) {
    const mensajes_all = await Mensajes.getAll()
    io.sockets.emit('mensajes', mensajes_all)
}

export default eventCnx
