import Player from "models/player";
import { Server, Socket } from "socket.io";

const GAME_ID_CHARACTER_SET = "ABCDEFGHIJKLMNOPQRSTUVWXYZ0123456789";
const GAME_ID_CHARACTER_SET_SIZE = GAME_ID_CHARACTER_SET.length;
const GAME_ID_LENGTH = 4;

let ioRef: Server;
let sockets: Socket[] = [];
let players: Record<string, Player> = {};

const onDisconnect = (socket: Socket) => {
    delete players[socket.id];
    sockets.splice(sockets.indexOf(socket), 1);
}

const onAddPlayerToNewRoom = (socket: Socket, player: Player) => {
    players[socket.id] = player;
    const roomId = generateRoomId();
    socket.join(roomId);
    player.inGame = true;
    socket.emit("PROVIDE_ROOM_ID", roomId);
}

const onAddPlayerToExistingRoom = (socket: Socket, player: Player, roomId: string) => {
    const room = getRooms().get(roomId);
    if (!room) {
        throw new Error(`No room with ID ${roomId} currently exists.`);
    }
    if (room.size !== 1) {
        throw new Error(`Room with ID ${roomId} must have exactly one player.`);
    }
    players[socket.id] = player;
    socket.join(roomId);
    player.inGame = true;
}

const onRemovePlayerFromExistingRoom = (socket: Socket, roomId: string) => {
    const player = players[socket.id];
    const room = getRooms().get(roomId);
    if (!room) {
        throw new Error(`No room with ID ${roomId} currently exists.`);
    }
    if (!player.inGame) {
        throw new Error("Player is not currently in any room.");
    }
    socket.leave(roomId);
}

const generateRoomId = () => {
    let roomId;
    do {
        roomId = "";
        for (let i = 0; i < GAME_ID_LENGTH; ++i) {
            roomId += GAME_ID_CHARACTER_SET.charAt(
                Math.floor(Math.random() * GAME_ID_CHARACTER_SET_SIZE)
            );
        }
    } while (getRooms().has(roomId));
    return roomId;
}

const getRooms = () => ioRef.sockets.adapter.rooms;

export const connectIOServer = (io: Server) => {
    ioRef = io;
    io.on("connection", (socket) => {
        sockets.push(socket);

        io.on("disconnect", () => onDisconnect(socket));
        io.on("server/addPlayerToNewRoom", (player: Player) =>
            onAddPlayerToNewRoom(socket, player)
        );
        io.on("server/addPlayerToExistingRoom", (player: Player, roomId: string) =>
            onAddPlayerToExistingRoom(socket, player, roomId)
        );
        io.on("server/removePlayerFromExistingRoom", (roomId: string) =>
            onRemovePlayerFromExistingRoom(socket, roomId)
        );
    });
};
