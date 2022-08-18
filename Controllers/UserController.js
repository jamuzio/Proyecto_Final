import passport from 'passport'
import UsuarioDaoMongoDb from '../DAOs/Usuarios/UsuarioDaoMongoDb.js'
import logger from '../Tools/logger.js'
import crearError from '../Tools/Error_Generator.js'

const usuario = new UsuarioDaoMongoDb()

const UserController = {
    Logout: (req, res, next) => {
        if (req.isAuthenticated()) {
            req.logout((error) =>{
                if (error) { return next(error); }
            })
        }
        res.status(200).redirect('/login')
    },
    registroController: passport.authenticate('registro', {
        failureMessage: true
    }), 
    loginController: passport.authenticate('login', {
        failureMessage: true
    }),
    ChangeUserRol: async (req, res, next) => {
        const datos = req.body
        try{
            await usuario.ChangeUserlROL(datos.ID, datos.ROL)
            logger.info(`Usaurio ${req.session.passport.user} cambio los privilegios del usuairo ${datos.ID} a ${datos.ROL}`)
            res.status(200).json({
                Msg: "Cambio ralizado con exito",
                UserID: datos.ID,
                NuevoROl: datos.ROL
                })
        }
        catch(error){
            next(error)
        }
    },
    UpLoadUserImage:async (req, res, next) => {
        const file = req.file
        const userID = req.session.passport.user
        try{
            if (!file) {
                throw crearError('MISSING_DATA', 'Falta el archivo')
            } else {
                const typeArray = file.mimetype.split('/')
                const fileType = typeArray[1]
                await usuario.ChangeUserImage(userID, fileType)
                logger.trace(`Se a cargado la imagen de perfil al usaurio ${userID}`)
                res.status(200).json({Msg: "Su foto de perfil se cargado con exito"})
            }
        }
        catch(error){
            next(error)
        }

    }

}

export {UserController, usuario}



