
let AdminPermission = false

const AdminController = {
    AdminCheck: (req, res, next) => {
        if (AdminPermission) {
            next()
        } else {
            res.status(403).json({ERROR: `Usted no es admintrador. Ruta ${req.baseUrl} con el metodo ${req.method} no autorizada`})
        }
    },
    
    setAdmin: (req, res) => {
        AdminPermission = true
        res.status(200).send('Usted es admin ahora!')
    },
    
    setStdUser: (req, res) => {
        AdminPermission = false
        res.status(200).send('Usted ya no es admin ahora!')
    }
}


export { AdminController }