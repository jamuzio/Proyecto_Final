import jwt from "jsonwebtoken"
import error_generator from "../Tools/Error_Generator.js"

const SECRETWORD = process.env.SECRETWORD
const adminUser = process.env.adminUser

export const UserHasSesion = (req, res, next) => {
    const authHeader = req.headers.authorization;
  
    if (!authHeader) {
      return res.status(403).json({ERROR: 'Usted no a iniciado session.'})
    }
  
    const token = authHeader.split(' ')[1];
  
    jwt.verify(token, SECRETWORD, (err, decoded) => {
      if (err) {
        if(!err.expiredAt){
          res.status(401).json({msg: "Error de Autenticacion, credenciales no validas"})
        } else{
          res.status(498).json({msg: "Sesion expirada, por favor vuelva a ingresar"})
        }
      } else{
        req.user = decoded.data;
        next();
      }
    });
}

export const AdminCheck = (req, res, next) =>{
  if(req.user?.email != adminUser){
    res.status(403).json({msg: "Error de Autorizacion, no tiene los permisos necesarios"})
  } else{
    next()
  }
}