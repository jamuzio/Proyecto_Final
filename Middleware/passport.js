import passport from 'passport'
import { Strategy } from 'passport-local'
import UsuarioDaoMongoDb from '../DAOs/Usuarios/UsuarioDaoMongoDb.js'
import logger from '../Tools/logger.js'
import NotificationController from '../Controllers/NotificationController.js'

const usuario = new UsuarioDaoMongoDb()
const Notif_Email = process.env.Notif_Email

passport.use('registro', new Strategy({
    passReqToCallback: true,
    usernameField: 'EMAIL',
    passwordField: 'PWD',
},
    async (req, username, password, done) => {
        try {
            const datosUsuario = req.body
            const user = await usuario.save(datosUsuario)
            NotificationController.SendMail(EmailMaker(user.EMAIL), Notif_Email, 'Nuevo Usuario Regitrado' )
            done(null, user)
        } catch (error) {
            if (error.tipo === 'DUPLICATED_USER' || error.tipo === 'MISSING_DATA' ){
                logger.error(error)
                done(null, false)
            } else{
                logger.fatal(error)
                done(error)
            }
        }
    }))

passport.use('login', new Strategy({
    usernameField: 'EMAIL',
    passwordField: 'PWD',
},
    async (username, password, done) => {
        try {
            const user = await usuario.autenticar(username, password)
            done(null, user)
        } catch (error) {
            logger.error(error)
            done(null, false)
        }
    }))

export const passportMiddleware = passport.initialize()

// opcional =====================================================

passport.serializeUser((user, done) => {
    done(null, user.ID)
})

passport.deserializeUser( async (ID, done) => {
    try {
        const user = await usuario.getByID(ID)
        done(null, user)
    } catch (error) {
        logger.error(error)
        done(error)
    }
})

export const passportSessionHandler = passport.session()

function EmailMaker(userEmail){
    return `<div style= "background-color: rgb(235, 237, 239);">
    <h1 style="color: rgb(44, 62, 80);">
    Se a regitrado un nuevo usuario con el e-mail:
    </h1>
    <h2 style="color: rgb(211, 84, 0);">${userEmail}</h2>
    </div>`
}