import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import Player from "cys/models/game/player";
import { MatchmakerTSA } from "cys/connection/to-server-actions";
import { GameTCA, MatchmakerTCA } from "cys/connection/to-client-actions";
import SocketIOActions from "./socket-io-actions";
import { generateRoomId } from "../rooms";
import CYSocketIOError from "@models/cy-socket-io-error";
import GameDTO from "cys/models/game/game-dto";

export default class MatchmakerSocketIOActions extends SocketIOActions {
    public override onAction(socket: Socket, action: DataTransferAction): boolean {
        switch (action.type) {
            case MatchmakerTSA.ADD_PLAYER_TO_NEW_ROOM: {
                const { userId } = action.payload;
                this.onAddPlayerToNewRoom(socket, userId);
                return true;
            }
            case MatchmakerTSA.ADD_PLAYER_TO_EXISTING_ROOM: {
                const { roomId, userId } = action.payload;
                this.onAddPlayerToExistingRoom(socket, roomId, userId);
                return true;
            }
            case MatchmakerTSA.REMOVE_PLAYER_FROM_EXISTING_ROOM: {
                const { roomId } = action.payload;
                this.onRemovePlayerFromExistingRoom(socket, roomId);
                return true;
            }
            default:
                return false;
        }
    }

    private onAddPlayerToNewRoom(socket: Socket, userId?: string) {
        const roomId = generateRoomId(this.socketIOState.roomMap);
        this.socketIOState.playerMap.set(socket.id, new Player(roomId, userId));
        socket.join(roomId);
        // player.inGame = true;
        socket.emit("action", { type: MatchmakerTCA.PROVIDE_ROOM_ID, payload: roomId });
    }

    private onAddPlayerToExistingRoom(socket: Socket, roomId: string, userId?: string) {
        const room = this.socketIOState.roomMap.get(roomId);
        const players = this.socketIOState.getPlayersByRoomId(roomId);
        if (!room || !players) {
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
        this.socketIOState.playerMap.set(socket.id, new Player(roomId, userId));
        socket.join(roomId);

        const game = new GameDTO(players);
        this.socketIOState.gameMap.set(roomId, game);
        this.socketIOState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: game,
        });
        this.socketIOState.emitToRoom(roomId, {
            type: MatchmakerTCA.SET_IN_GAME_STATUS,
            payload: { inGame: true }
        });
    }

    private onRemovePlayerFromExistingRoom(socket: Socket, roomId: string) {
        const room = this.socketIOState.roomMap.get(roomId);
        if (!room) {
            throw new CYSocketIOError(
                `No room with ID ${roomId} currently exists.`,
                MatchmakerTCA.ERROR
            );
        }
        socket.leave(roomId);
        this.socketIOState.emitToRoom(roomId, {
            type: MatchmakerTCA.SET_IN_GAME_STATUS,
            payload: { inGame: false }
        });
    }
}
