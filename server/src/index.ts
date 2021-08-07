import express, { Response } from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import SocketIOConnection from "@logic/connection/socket-io-connection";
import { SERVER_PORT, CORS_CONFIG } from "@logic/const";
import CYExpressError from "@models/error/cy-express-error";
import { logInfo } from "@util/logger";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: CORS_CONFIG });

app.use(cors(CORS_CONFIG));

app.get("/", (req, res) => {
    res.status(200).send("Shhh... this is the server for Czech Yahtzee");
});

app.use((err: CYExpressError, req: any, res: Response, next: any) => {
    res.status(err.status).send(err.message);
});

const ioConnection = new SocketIOConnection(io);
ioConnection.connect();
// connectIOServer(io);

server.listen(SERVER_PORT, () => {
    logInfo("RUNNING", `Server is listening on port ${SERVER_PORT}...`);
});
