import express from 'express'
import { sequelizeConexion } from './src/database/conexion.js'
import router from './src/routes/router.js'
import cors from 'cors';
import { Server } from 'socket.io';
import http from 'http'






const app = express();
const httpServer =http.createServer(app)
const socketIo = new Server(httpServer,{
         cors: {
          origin: "http://localhost", // o la URL del frontend
          methods: ["GET", "POST"]  
         }     
})


const port= 3050;

// configuraciones de ruta
app.use(express.urlencoded({ extended: false }));
app.use(express.json());
app.use(cors());


app.use('/api/v1/',router)

socketIo.on('connect', ()=>{
    console.log('se conecto un cliente ');
})

  httpServer.listen(port, async () => {
    try {
        await sequelizeConexion.authenticate();
        console.log('Connection has been established successfully.');
    } catch (error) {
        console.error('Unable to connect to the database:', error);
    }
});
