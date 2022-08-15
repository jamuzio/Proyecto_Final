export default {
    fileSystem: {
        path: './DataBase'
    },
    mongodb: {
        cnxStr: 'mongodb+srv://root:MongoPWDRoot@cluster0.l053v.mongodb.net/CoderHouse?retryWrites=true&w=majority',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            serverSelectionTimeoutMS: 5000
        }
    },
    firebase: {

    },
    MODO_PERSISTENCIA: 'mongodb'
}
