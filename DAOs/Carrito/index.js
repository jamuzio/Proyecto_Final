
const PATH = process.env.FS_PATH

let CarritoDao

switch (process.env.MODO_PERSISTENCIA) {
    case 'json':
        const { default: CarritoDaoFS } = await import('./CarritoDaoFS.js')
        CarritoDao = new CarritoDaoFS(PATH)
        break
    case 'firebase':
        const { default: CarritoDaoFirebase } = await import('./CarritoDaoFirebase.js')
        CarritoDao = new CarritoDaoFirebase()
        break
    case 'mongodb':
        const { default: CarritoDaoMongoDb } = await import('./CarritoDaoMongoDb.js')
        CarritoDao = new CarritoDaoMongoDb()
        break
    default:
        const { default: CarritoDaoMem } = await import('./CarritoDaoMem.js')
        CarritoDao = new CarritoDaoMem()
        break
}

export { CarritoDao }