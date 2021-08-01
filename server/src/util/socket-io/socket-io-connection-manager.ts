import { Server, Socket } from "socket.io";
import Player from "cys/models/game/player";
import { Rooms, Room } from "./rooms";
import CYSocketIOError from "@models/cy-socket-io-error";
import { MatchmakerTCA, MiscTCA } from "cys/connection/to-client-actions";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import GameDTO from "cys/models/game/game-dto";

import SocketIOActions from "./actions/socket-io-actions";
import MatchmakerSocketIOActions from "./actions/matchmaker-socket-io-actions";
import GameSocketIOActions from "./actions/game-socket-io-actions";

export default class SocketIOConnectionManager {
    private io: Server;
    private socketIOActionsList: SocketIOActions[];
    private sockets: Socket[];
    private players: Record<string, Player>;

    /**
     * This shit needs to be sorted out...
     * The SocketIOConnectionManager now has WAY too many responsibilities
     * Plus there is a circular dependency between
     * SocketIOConnectionManager and each of the SocketIOActions
     * subclasses.
     */
    private games: Record<string, GameDTO> = {}; // Must not be here

    public constructor(io: Server) {
        this.io = io;
        this.socketIOActionsList = [
            new MatchmakerSocketIOActions(this),
            new GameSocketIOActions(this),
        ];
        this.sockets = [];
        this.players = {};
    }

    private onDisconnect(socket: Socket) {
        delete this.players[socket.id];
        this.sockets.splice(this.sockets.indexOf(socket), 1);
    }

    public connect() {
        this.io.on("connection", (socket) => {
            this.sockets.push(socket);
            socket.on("disconnect", () => this.onDisconnect(socket));

            socket.on("action", (action: DataTransferAction) => {
                try {
                    for (const socketIOActions of this.socketIOActionsList) {
                        if (socketIOActions.onAction(socket, action)) {
                            // console.log(this.rooms)
                            break;
                        }
                    }
                    throw new CYSocketIOError(
                        `Socket action ${action.type} not implemented.`,
                        MiscTCA.ERROR
                    );
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
    }

    public emitToRoom(roomId: string, action: DataTransferAction) {
        const room = this.rooms.get(roomId);
        if (!room) {
            throw new CYSocketIOError(
                `No room with ID ${roomId} currently exists.`,
                MatchmakerTCA.ERROR
            );
        }
        room.forEach((socketId) => {
            const socket = this.sockets.find((socket) => socket.id === socketId);
            if (socket) {
                socket.emit("action", action);
            }
        });
    }

    public get rooms(): Rooms {
        return this.io.sockets.adapter.rooms;
    }

    public getRoom(roomId: string): Room | null {
        return this.io.sockets.adapter.rooms.get(roomId) as Room | null;
    }

    public setPlayer(socketId: string, player: Player): void {
        this.players[socketId] = player;
    }
}
