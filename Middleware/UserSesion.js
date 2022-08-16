import UsuarioDaoMongoDb from "../DAOs/Usuarios/UsuarioDaoMongoDb.js"

const usuario = new UsuarioDaoMongoDb()

export const UserHasSesion = (req, res, next) => {
    //console.log(req)
    if (req.isAuthenticated()) {
        req.session.cookie.originalMaxAge
        next()
    } else{
        res.status(403).json({ERROR: 'Usted no a iniciado session.'})
    }
}

export const AdminCheck = async (req, res, next) => {
    if (req.isAuthenticated()){
        const id = req.session.passport.user
        const user = await usuario.getByID(id)
        if(user.ROL === 'admin'){
            next()
        } else{
            res.status(403).json({ERROR: `Usted no es admintrador. Ruta ${req.baseUrl} con el metodo ${req.method} no autorizada`})
        } 
    } else{
        res.status(403).json({ERROR: 'Usted no a iniciado session.'})
    }
}
