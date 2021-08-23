import express from "express";
import http from "http";
import { Server } from "socket.io";
import cors from "cors";

import { connectIOServer } from "./util/connection-manager";
import { SERVER_PORT, CORS_CONFIG } from "./util/const";

const app = express();
const server = http.createServer(app);
const io = new Server(server, { cors: CORS_CONFIG });

app.use(cors(CORS_CONFIG));

app.get("/", (req, res) => {
    res.status(200).send("Server works...");
});

connectIOServer(io);

server.listen(SERVER_PORT, () => {
    console.log(`[RUNNING] Server is listening on port ${SERVER_PORT}...`);
});
