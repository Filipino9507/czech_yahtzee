import Player from "cys/models/game/player";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import { MatchmakerTSA } from "cys/connection/to-server-actions";
import { MatchmakerTCA, MiscTCA } from "cys/connection/to-client-actions";
import { Server, Socket } from "socket.io";

import CYSocketIOError from "@models/cy-socket-io-error";
import { generateRoomId } from "./rooms";

let ioRef: Server;
const getRooms = () => ioRef.sockets.adapter.rooms;
const sockets: Socket[] = [];
const players: Record<string, Player> = {};

/**
 * @deprecated
 */
const onDisconnect = (socket: Socket) => {
    delete players[socket.id];
    sockets.splice(sockets.indexOf(socket), 1);
};

/**
 * @deprecated
 */
const onAddPlayerToNewRoom = (socket: Socket, userId?: string) => {
    players[socket.id] = new Player(userId);
    const roomId = generateRoomId(getRooms());
    socket.join(roomId);
    // player.inGame = true;
    socket.emit("action", { type: MatchmakerTCA.PROVIDE_ROOM_ID, payload: roomId });
};

/**
 * @deprecated
 */
const onAddPlayerToExistingRoom = (socket: Socket, roomId: string, userId?: string) => {
    const room = getRooms().get(roomId);
    if (!room) {
        throw new CYSocketIOError(
            `No room with ID ${roomId} currently exists.`,
            MatchmakerTCA.ERROR
        );
    }
    if (room.size !== 1) {
        throw new CYSocketIOError(
            `Room with ID ${roomId} must have exactly one player.`,
            MatchmakerTCA.ERROR
        );
    }
    players[socket.id] = new Player(userId);
    socket.join(roomId);

    room.forEach((socketId) => {
        /**
         * For each socket, emit START_GAME
         */
    });
    socket.emit("action", { type: MatchmakerTCA.START_GAME, payload: {} });
    // player.inGame = true;
};

/**
 * @deprecated
 */
const onRemovePlayerFromExistingRoom = (socket: Socket, roomId: string) => {
    const player = players[socket.id];
    const room = getRooms().get(roomId);
    if (!room) {
        throw new CYSocketIOError(
            `No room with ID ${roomId} currently exists.`,
            MatchmakerTCA.ERROR
        );
    }
    // if (!player.inGame) {
    //     throw new Error("Player is not currently in any room.");
    // }
    socket.leave(roomId);
};

/**
 * @deprecated
 */
const onAction = (socket: Socket, action: DataTransferAction) => {
    switch (action.type) {
        case MatchmakerTSA.ADD_PLAYER_TO_NEW_ROOM: {
            const { userId } = action.payload;
            onAddPlayerToNewRoom(socket, userId);
            break;
        }
        case MatchmakerTSA.ADD_PLAYER_TO_EXISTING_ROOM: {
            const { roomId, userId } = action.payload;
            onAddPlayerToExistingRoom(socket, roomId, userId);
            break;
        }
        case MatchmakerTSA.REMOVE_PLAYER_FROM_EXISTING_ROOM: {
            const { roomId } = action.payload;
            onRemovePlayerFromExistingRoom(socket, roomId);
            break;
        }
        default:
            /**
             * Errors like this need to be ALL handled with
             * try / catch, since Socket.io has no built-in
             * error handling
             */
            throw new CYSocketIOError(
                `Socket action ${action.type} not implemented.`,
                MiscTCA.ERROR
            );
    }
};

/**
 * @deprecated
 */
export const connectIOServer = (io: Server) => {
    ioRef = io;
    io.on("connection", (socket) => {
        sockets.push(socket);
        socket.on("disconnect", () => onDisconnect(socket));
        socket.on("action", (action: DataTransferAction) => {
            try {
                onAction(socket, action);
            } catch (err) {
                if (err instanceof CYSocketIOError) {
                    socket.emit("action", { type: err.actionType, payload: err.message });
                } else {
                    console.log("!!! UNKNOWN ERROR !!!");
                    console.log(err.message);
                    socket.emit("action", {
                        type: MiscTCA.ERROR,
                        payload: "An unknown error occured.",
                    });
                }
            }
        });
    });
};
