
let ordenDeCompraDao

switch (process.env.MODO_PERSISTENCIA) {
    case 'mongodb':
        const { default: OrdenesDaoMongoDb } = await import('./ordenesDaoMongo.js')
        ordenDeCompraDao = new OrdenesDaoMongoDb()
        break
    default:
        const { default: ordenDeCompraDaoMem } = await import('./ordenDeCompraDaoMem.js')
        ordenDeCompraDao = new ordenDeCompraDaoMem()
        break
}

export { ordenDeCompraDao }