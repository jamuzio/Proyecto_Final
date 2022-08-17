import passport from 'passport'
import UsuarioDaoMongoDb from '../DAOs/Usuarios/UsuarioDaoMongoDb.js'
import logger from '../Tools/logger.js'

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
    }


}

export {UserController, usuario}



