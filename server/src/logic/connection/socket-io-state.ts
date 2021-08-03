import { Socket } from "socket.io";
import Player from "cys/models/game/player";
import GameDTO from "cys/models/game/game-dto";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import CYSocketIOError from "@models/cy-socket-io-error";
import { MatchmakerTCA } from "cys/connection/to-client-actions";
import { Room } from "./rooms";

export default class SocketIOState {
    private sockets: Socket[];

    // socketId -> Player
    public playerMap: Map<string, Player>;
    // roomId -> GameDTO
    public gameMap: Map<string, GameDTO>;
    // roomId -> Room
    public roomMap: Map<string, Room>;

    public constructor(roomMap: Map<string, Room>) {
        this.sockets = [];
        this.playerMap = new Map();
        this.gameMap = new Map();
        this.roomMap = roomMap;
    }

    public emitToRoom(roomId: string, action: DataTransferAction) {
        const room = this.roomMap.get(roomId);
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

    public connect(socket: Socket): void {
        this.sockets.push(socket);
    }

    public disconnect(socket: Socket): void {
        this.playerMap.delete(socket.id);
        this.sockets.splice(this.sockets.indexOf(socket), 1);
    }

    public getPlayersByRoomId(roomId: string): Player[] | null {
        const socketIds = this.roomMap.get(roomId);
        if (!socketIds) {
            return null;
        }
        const result = [] as Player[];
        socketIds.forEach((socketId, i) => {
            const player = this.playerMap.get(socketId);
            if (player) {
                result.push(player);
            }
        });
        return result;
    }
}