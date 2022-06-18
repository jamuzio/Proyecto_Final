export default {
    fileSystem: {
        path: './DataBase'
    },
    mongodb: {
        cnxStr: '"mongodb+srv://cluster0.l053v.mongodb.net/CoderHouse" --username root',
        options: {
            useNewUrlParser: true,
            useUnifiedTopology: true,
            useCreateIndex: true,
            serverSelectionTimeoutMS: 5000,
        }
    },
    firebase: {

    },
    MODO_PERSISTENCIA: 'jmemoria'
}
