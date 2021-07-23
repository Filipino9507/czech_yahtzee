import express from "express";
import http from "http";
import { Server as IOServer } from "socket.io";
import cors from "cors";
import { SERVER_PORT, CORS_CONFIG } from "./util/const";

const app = express();
const server = http.createServer(app);
const io = new IOServer(server, { cors: CORS_CONFIG });

app.use(cors(CORS_CONFIG));

app.get("/", (req, res) => {
    res.status(200).send("Server works...");
});

io.on("connection", (socket) => {
    console.log("[NEW_USER] A new user connected...");
    // socket.on()
});

server.listen(SERVER_PORT, () => {
    console.log(`[RUNNING] Server is listening on port ${SERVER_PORT}...`);
});
