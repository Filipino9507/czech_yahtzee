import Player from "cys/models/game/player";
import DataTransferAction from "cys/models/misc/data-transfer-action";
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

const onAddPlayerToNewRoom = (socket: Socket, userId?: string) => {
    players[socket.id] = new Player(userId);
    const roomId = generateRoomId();
    socket.join(roomId);
    // player.inGame = true;
    socket.emit("provideRoomId", roomId);
}

const onAddPlayerToExistingRoom = (socket: Socket, roomId: string, userId?: string) => {
    const room = getRooms().get(roomId);
    if (!room) {
        throw new Error(`No room with ID ${roomId} currently exists.`);
    }
    if (room.size !== 1) {
        throw new Error(`Room with ID ${roomId} must have exactly one player.`);
    }
    players[socket.id] = new Player(userId);
    socket.join(roomId);
    // player.inGame = true;
}

const onRemovePlayerFromExistingRoom = (socket: Socket, roomId: string) => {
    const player = players[socket.id];
    const room = getRooms().get(roomId);
    if (!room) {
        throw new Error(`No room with ID ${roomId} currently exists.`);
    }
    // if (!player.inGame) {
    //     throw new Error("Player is not currently in any room.");
    // }
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

        socket.on("disconnect", () => onDisconnect(socket))
        socket.on("action", (action: DataTransferAction) => {
            switch(action.type) {
                case "server/addPlayerToNewRoom": {
                    const { userId } = action.data;
                    onAddPlayerToNewRoom(socket, userId);
                    break;
                }  
                case "server/addPlayerToExistingRoom": {
                    const { roomId, userId } = action.data;
                    onAddPlayerToExistingRoom(socket, roomId, userId);
                }
                case "server/removePlayerFromExistingRoom": {
                    const { roomId } = action.data;
                    onRemovePlayerFromExistingRoom(socket, roomId);
                }
                default:
                    throw new Error("Socket action not implemented.");
            }
        });
        
    });
};
