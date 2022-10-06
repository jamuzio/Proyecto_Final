import API_usuario from '../APIs/API_Usuarios.js'
import jwt from "jsonwebtoken"

const SECRETWORD = process.env.SECRETWORD

const UserController = {
    login: async (req, res, next) => {
        try{
            const { email, password } = req.body
            const usuario = await API_usuario.autenticar(email, password)
            const access_token = generateToken(usuario)
            res.json({ access_token })
        }
        catch(error){
            next(error)
        }
    },
    register: async (req, res, next) => {
        try{
            const datosDeUsuario = req.body
            const usuario = await API_usuario.createNewUser(datosDeUsuario)
            const access_token = generateToken(usuario)
            res.json({ access_token })
        }
        catch(error){
            next(error)
        }
      }
}

export {UserController}

function generateToken(user) {
    const token = jwt.sign({ data: user }, SECRETWORD, { expiresIn: '1h' });
    return token;
  }


