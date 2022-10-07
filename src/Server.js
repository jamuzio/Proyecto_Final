import '../Env/dotenv_config.js'
import express from 'express'
import errorHandler from '../Middleware/Error_Handler.js'
import Server_Router from '../Routers/Sever_Router.js'
import eventCnx from '../Controllers/socketController.js'
import { engine } from 'express-handlebars'
import { Server as Socketserver } from 'socket.io'
import { Server as HttpServer } from 'http'

const app = express()
const httpServer = new HttpServer(app)
const io = new Socketserver(httpServer)
//const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('Public'))

app.engine('handlebars', engine())
app.set('view engine', 'handlebars')


app.use(Server_Router)

app.use(errorHandler)
/*
export default function server(PORT){
    app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto: ${PORT}`)
})
app.on("error", error => console.log(`Error en servidor ${error}`))
}
*/
io.on('connection', socket => eventCnx(socket, io))

export default function server(PORT){
    httpServer.listen(PORT, () => {
    console.log(`Servidor escuchando al puerto ${PORT} desde el proceso ${process.pid}`)
})
return httpServer
}