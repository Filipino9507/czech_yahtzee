import express, { Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { connectIOServer } from "@util/socket-io-connection/connection-manager";

import SocketIOConnectionManager from "@util/socket-io-connection/socket-io-connection-manager";
import { SERVER_PORT, CORS_CONFIG } from "@util/const";
import CYExpressError from "@models/cy-express-error";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: CORS_CONFIG });

app.use(cors(CORS_CONFIG));

app.get("/", (req, res) => {
    res.status(200).send("Server works...");
});

app.use((err: CYExpressError, req: any, res: Response, next: any) => {
    res.status(err.status).send(err.message);
});

const connectionManager = new SocketIOConnectionManager(io);
connectionManager.connect();
// connectIOServer(io);

server.listen(SERVER_PORT, () => {
    console.log(`[RUNNING] Server is listening on port ${SERVER_PORT}...`);
});
