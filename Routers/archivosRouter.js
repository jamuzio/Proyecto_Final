import { Router } from 'express'
import middlewareImageUpload from '../middleware/manejoDeArchivos.js'
import { UserHasSesion } from '../Middleware/UserSesion.js'


const archivosRouter = new Router()

archivosRouter.post('/ProfileImage', UserHasSesion, middlewareImageUpload)

export default archivosRouter
