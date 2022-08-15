
let ProductosDao
const PATH = process.env.FS_PATH

switch (process.env.MODO_PERSISTENCIA) {
    case 'json':
        const { default: ProductosDaoFS } = await import('./ProductosDaoFS.js')
        ProductosDao = new ProductosDaoFS(PATH)
        break
    case 'firebase':
        const { default: ProductosDaoFirebase } = await import('./ProductosDaoFirebase.js')
        ProductosDao = new ProductosDaoFirebase()
        break
    case 'mongodb':
        const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
        ProductosDao = new ProductosDaoMongoDb()
        break
    default:
        const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        ProductosDao = new ProductosDaoMem()
        break
}

export { ProductosDao }