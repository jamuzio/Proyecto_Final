import logger from "../Tools/logger.js"

function errorHandler(error, req, res, next) {
    let KnowError = true
    switch (error.tipo) {
        case "WRONG_DATA":
        case "WRONG_TYPE":
        case "MISSING_MESSAGE":
        case 'MISSING_DATA':
            res.status(400)
            break
        case 'AUTHE_ERROR':
            res.status(401)
            break
        case 'AUTHO_ERROR':
            res.status(403)
            break
        case 'NOT_FOUND':
            res.status(404)
            break
        case 'DUPLICATED_PRODUCT':
        case 'DUPLICATED_USER':
            res.status(409)
            break
        case "SESSION_TIMEOUT":
            res.status(498)
            break
        default:
            KnowError = false
            res.status(500)
    }
    if(KnowError){
        logger.error(`${error.tipo}: ${error.message}`)
        res.json({ msg: error.message })
    } else{
        logger.fatal(`ATENCION: A ocurrido un error sin manejo especifico. \n\t ${error.stack} `)
        res.json({ msj: "Error Interno del servidor" })
        throw error

    }
}

export default errorHandler

