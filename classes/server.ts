// env
import dotenv from 'dotenv';

dotenv.config();

import express from 'express';
import cors from 'cors';

// Bases de datos
import { mongoConnection } from '../db/mongodb';

// Sockets
import { Server as socketIO } from "socket.io";
import * as socket from '../sockets/socket';

// HTTP SERVER
import http from 'http';

// Routes
import dashboardRoutes from '../components/dashboard/dashboard.routes';
import userRoutes from '../components/usuarios/usuarios.routes';
import loginRoutes from '../components/login/login.routes';
import roleRoutes from '../components/roles/roles.routes';
import fileuploadRoutes from '../components/upload/upload.routes';
import telasRoutes from '../components/telas/telas.routes';

export default class Server {

    private static _instance: Server;

    private app: express.Application;
    private port: string;

    public io: socketIO;
    private httpServer: http.Server;

    private apiPaths = {
        dashboard: '/api/v1/dashboard',
        usuarios: '/api/v1/usuarios',
        login: '/api/v1/login',
        role: '/api/v1/role',
        fileupload: '/api/v1/fileupload',
        telas: '/api/v1/telas',
    }

    private constructor() {

        // Iniciamos Express
        this.app = express();

        this.port = process.env.PORT || '8000';

        // Sockets
        this.httpServer = new http.Server(this.app);
        this.io = new socketIO(this.httpServer, { cors: { origin: '*' } });

        this.listenSockets();

        // Whatsapp Web
        this.initWhatsappWeb();

        // DB's Mongo
        this.dbConnection();

        // Middlewares
        this.middlewares();

        // Definir las rutas
        this.routes();

    }

    // Singleton
    public static get instance() {
        return this._instance || (this._instance = new this());
    }

    private initWhatsappWeb() {
        // const number = '573012375663';
        // const ws = new WsTransporter(number);
    }

    private listenSockets() {

        console.log(`[Sockets - Listening]`);

        this.io.on('connection', (cliente: any) => {

            // Actualizamos clientes
            socket.actualizar(cliente, this.io);

            // Desconectar 
            socket.desconectar(cliente, this.io);

            // Pedidos whatsapp
            socket.nuevoPedidoWhatsapp(cliente, this.io);

            // Ingresamos el pedido en la lista
            socket.ingresarPedidoLista(cliente, this.io);

            // Lista de clientes viendo el market
            socket.ingresarUsuarioActivo(cliente, this.io);

            // Actualizamos la lista de usuarios activos en coneccion con dashboard
            socket.getUsuariosActivos(cliente, this.io);

            // Todos los usuarios activos en Clickstore
            socket.getAllUsuariosActivos(cliente, this.io);

        });

    }

    private middlewares() {

        // CORS
        this.app.use(cors());

        // Lectura del body
        this.app.use(express.json({ limit: '50mb' }));

        // Carpeta publica
        this.app.use(express.static('public'));

    }

    private async dbConnection() {

        try {

            // MongoDB
            mongoConnection();

        } catch (error) {
            console.log(error);
        }
    }

    private routes() {
        this.app.use(this.apiPaths.dashboard, dashboardRoutes);
        this.app.use(this.apiPaths.usuarios, userRoutes);
        this.app.use(this.apiPaths.login, loginRoutes);
        this.app.use(this.apiPaths.role, roleRoutes);
        this.app.use(this.apiPaths.fileupload, fileuploadRoutes);
        this.app.use(this.apiPaths.telas, telasRoutes);
    }

    listen() {
        this.httpServer.listen(this.port, () => {
            console.log(`[Server - ${this.port}]`);
        });
    }

}

