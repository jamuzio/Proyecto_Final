import server from './src/Server.js'
import CreateCluster from './src/Cluster.js'

const PORT = process.env.PORT || 8080
const modo = process.env.SERV_MODE || 'fork'

switch(modo){
    case 'f':
    case 'fork':
        server(PORT)
        break
    case 'c':
    case 'cluster':
        CreateCluster(PORT)
        break
    default:
        const error = new Error("Parametro MODO pasado con parametro incorrecto. Usar fork o cluster")
        throw error
}