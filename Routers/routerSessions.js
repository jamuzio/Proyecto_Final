import { Router } from 'express'
import {UserController} from '../Controllers/UserController.js'
import { AdminCheck } from '../Middleware/UserSesion.js'

const routerSession = new Router()

routerSession.post('/api/users', UserController.register)
routerSession.post('/login', UserController.login)




export default routerSession
