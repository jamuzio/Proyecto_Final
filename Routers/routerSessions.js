import { Router } from 'express'
import {UserController} from '../Controllers/UserController.js'
import { AdminCheck } from '../Middleware/UserSesion.js'

const routerSession = new Router()

routerSession.get('/logout', UserController.Logout)
routerSession.post('/register', UserController.registroController, successRegis)
routerSession.post('/login', UserController.loginController, successLogin)
routerSession.post('/ChangeUserRol', AdminCheck, UserController.ChangeUserRol)




export default routerSession

function successLogin(req, res){
    res.status(200).json({MSG: `Usted a iniciado sesion como ${req.body?.EMAIL}`})
    }

function successRegis(req, res){
    res.status(200).json({MSG: `Usted se a regitrado con el EMAIL:${req.body?.EMAIL}`})
    }