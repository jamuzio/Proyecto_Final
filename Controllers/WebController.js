import os from 'os'

const WebController = {
    chat: async (req, res) => {
        res.render('mensajes')
    },
    serverInfo:async (req, res) => {
        const Sysinfo = {
            Argumentos_de_entrada: process.argv.slice(2),
            Nombre_de_la_plataforma: process.platform,
            Version_de_node: process.version,
            Memoria_total_reservada: process.memoryUsage().rss,
            Path_de_ejecucion: process.execPath,
            Process_id: process.pid,
            Carpeta_del_proyecto: process.cwd(),
            Cantidad_de_Procesadores: os.cpus().length
        }
        res.render('info', Sysinfo)
    }
}

export { WebController }