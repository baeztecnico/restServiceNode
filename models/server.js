const express = require('express')
const cors = require('cors');
const { dbConnection } = require('../database/config');
class Server {

        constructor(){
            this.port = process.env.PORT;
            this.routePath = '/api/usuarios';
            this.app =  express();

            // conectar la base de datos    
            this.conectarDB();

             //Middlewares
            this.middlewares();    


            this.routes();    


           
        }

        async conectarDB(){
          await dbConnection();      
        }
        middlewares(){
            this.app.use(cors());           

             //parseo y lectura del body

             this.app.use(express.json());

            this.app.use(express.static('public'))
        }
        routes(){
            this.app.use(this.routePath,require('../routers/users'));
        }

        listen(){
            this.app.listen(this.port,()=>{
                console.log('Servidor corriendo en puerto',this.port);
            });
        }
}

module.exports = Server;