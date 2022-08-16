import { Router } from 'express'
import UserController from '../Controllers/UserController.js'

const routerSession = new Router()

routerSession.get('/logout', UserController.Logout)
routerSession.post('/register', UserController.registroController, success)
routerSession.post('/login', UserController.loginController, success)




export default routerSession

function success(req, res){
    res.status(200).json("OK")
    }