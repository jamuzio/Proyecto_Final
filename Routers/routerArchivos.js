import { Router } from 'express'
import postArchivoController from '../Controllers/archivosControllers.js'
import middlewareImageUpload from '../middleware/manejoDeArchivos.js'


const archivosRouter = new Router()

archivosRouter.post('/', middlewareImageUpload, postArchivoController)

export default archivosRouter
