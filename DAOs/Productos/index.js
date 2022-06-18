import config from '../../src/config.js'

let ProductosDao

switch (config.MODO_PERSISTENCIA) {
    case 'json':
        const { default: ProductosDaoFS } = await import('./ProductosDaoFS.js')
        ProductosDao = new ProductosDaoFS(config.fileSystem.path)
        break
    //case 'firebase':
    //    const { default: ProductosDaoFirebase } = await import('./ProductosDaoFirebase.js')
    //    ProductosDao = new ProductosDaoFirebase()
    //    break
    //case 'mongodb':
    //    const { default: ProductosDaoMongoDb } = await import('./ProductosDaoMongoDb.js')
    //    ProductosDao = new ProductosDaoMongoDb()
    //    break
    default:
        //const { default: ProductosDaoMem } = await import('./ProductosDaoMem.js')
        //ProductosDao = new ProductosDaoMem()
        break
}

export { ProductosDao }