import { Router } from 'express'
import { WebController } from '../Controllers/WebController.js'



const webRouter = new Router()

webRouter.get('/info', WebController.serverInfo)
webRouter.get('/chat', WebController.chat)

export default webRouter