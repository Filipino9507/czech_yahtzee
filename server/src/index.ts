import express, { Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import SocketIOConnection from "@logic/connection/socket-io-connection";
import { SERVER_PORT, CORS_CONFIG } from "@logic/const";
import CYExpressError from "@models/error/cy-express-error";

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

const ioConnection = new SocketIOConnection(io);
ioConnection.connect();
// connectIOServer(io);

server.listen(SERVER_PORT, () => {
    console.log(`[RUNNING] Server is listening on port ${SERVER_PORT}...`);
});
