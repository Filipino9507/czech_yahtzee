import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import CYSocketIOMatchmakerError from "@models/error/cy-socket-io-mathcmaker-error";
import { Room } from "./rooms";
import GameInstance from "@logic/game/game-instance";

export default class SocketIOState {
    private sockets: Socket[];

    // roomId -> GameDTO
    private gameMap: Map<string, GameInstance>;
    // roomId -> Room
    private roomMap: Map<string, Room>;

    public constructor(roomMap: Map<string, Room>) {
        this.sockets = [];
        // this.playerMap = new Map();
        this.gameMap = new Map();
        this.roomMap = roomMap;
    }

    public emitToRoom(roomId: string, action: DataTransferAction): boolean {
        const room = this.roomMap.get(roomId);
        if (!room) {
            return false;
        }
        room.forEach((socketId) => {
            const socket = this.sockets.find((socket) => socket.id === socketId);
            if (socket) {
                socket.emit("action", action);
            }
        });
        return true;
    }

    public connect(socket: Socket): void {
        this.sockets.push(socket);
    }

    public disconnect(socket: Socket): void {
        this.sockets.splice(this.sockets.indexOf(socket), 1);
    }

    public getGame(roomId: string): GameInstance {
        const game = this.gameMap.get(roomId);
        if (!game) {
            throw new CYSocketIOMatchmakerError(`No game with ID \"${roomId}\" currently exists.`);
        }
        return game;
    }

    public getRoom(roomId: string): Room {
        const room = this.roomMap.get(roomId);
        if (!room) {
            throw new CYSocketIOMatchmakerError(`No room with ID \"${roomId}\" currently exists.`);
        }
        return room;
    }

    public hasGame(roomId: string): boolean {
        return this.gameMap.has(roomId) && this.roomMap.has(roomId);
    }

    public hasRoom(roomId: string): boolean {
        return this.roomMap.has(roomId);
    }

    public setGame(roomId: string, game: GameInstance): void {
        if (!this.roomMap.has(roomId)) {
            throw new CYSocketIOMatchmakerError(
                `Cannot set a game for id \"${roomId}\" as there is no room to match it.`
            );
        }
        this.gameMap.set(roomId, game);
    }

    /**
     * @testing
     */
    public toString() {
        const mapToString = (map: Map<string, Object>) => {
            let result = "";
            map.forEach((value, key) => {
                result += `${key}: ${JSON.stringify(value, null, 4)}\n`;
            });
            return result;
        };
        return `[GAMES]:\n${mapToString(this.gameMap)}\[ROOMS]:\n${mapToString(this.roomMap)}`;
    }
}
