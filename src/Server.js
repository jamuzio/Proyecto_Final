import '../Env/dotenv_config.js'
import express from 'express'
import errorHandler from '../Middleware/Error_Handler.js'
import { passportMiddleware, passportSessionHandler } from '../Middleware/passport.js'
import session from '../Middleware/Session.js'
import Server_Router from '../Routers/Sever_Router.js'

const app = express()
//const PORT = process.env.PORT || 8080

app.use(express.urlencoded({ extended: true }))
app.use(express.json())
app.use(express.static('Public'))

app.use(session)
app.use(passportMiddleware)
app.use(passportSessionHandler)

app.use(Server_Router)

app.use(errorHandler)

export default function server(PORT){
    app.listen(PORT, () => {
    console.log(`Servidor escuchando el puerto: ${PORT}`)
})
app.on("error", error => console.log(`Error en servidor ${error}`))
}
