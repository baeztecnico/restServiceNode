const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
const fileUpload =  require('express-fileupload');
class Server {

    constructor() {
        this.port = process.env.PORT;

        this.paths = {
            auth: '/api/auth',
            buscar: '/api/buscar',
            categorias: '/api/categorias',
            productos: '/api/productos',
            uploads: '/api/uploads',
            usuarios: '/api/usuarios',
        }


        this.app = express();

        // conectar la base de datos    
        this.conectarDB();

        //Middlewares
        this.middlewares();


        this.routes();



    }

    async conectarDB() {
        await dbConnection();
    }
    middlewares() {
        this.app.use(cors());

        //parseo y lectura del body

        this.app.use(express.json());

        this.app.use(express.static('public'))

        ///cargar archivos
        this.app.use(fileUpload({
            useTempFiles : true,
            tempFileDir : '/tmp/',
            createParentPath:true
        }));
    }
    routes() {
        this.app.use(this.paths.auth, require('../routers/auth'));
        this.app.use(this.paths.buscar, require('../routers/buscar'));
        this.app.use(this.paths.usuarios, require('../routers/users'));
        this.app.use(this.paths.uploads, require('../routers/uploads'));
        this.app.use(this.paths.categorias, require('../routers/categorias'));
        this.app.use(this.paths.productos, require('../routers/productos'));
    }

    listen() {
        this.app.listen(this.port, () => {
            console.log('Servidor corriendo en puerto', this.port);
        });
    }
}

module.exports = Server;