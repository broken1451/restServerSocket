// const nombre = 'adrian jose bravo viloria';
// console.log('mi nombre es ' + nombre);

import Server from './classes/server';
// import { router } from './routes/router';
import  router  from './routes/router';
import bodyParser from 'body-parser';
import cors from 'cors';


// const server =  new Server();

//patron singleton
const server =  Server.instance;

// Body-parser
server.app.use(bodyParser.urlencoded({extended: true}));
server.app.use(bodyParser.json());

// Cors
server.app.use(cors({origin: true, credentials:true}))

server.app.use('/', router);


server.startServer(()=>{
    console.log(`Servidor up en el puerto ${server.port}`)
});