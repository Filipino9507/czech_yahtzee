import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import Player from "cys/models/game/player";
import { MatchmakerTSA } from "cys/connection/to-server-actions";
import { MatchmakerTCA, MiscTCA } from "cys/connection/to-client-actions";
import SocketIOActions from "./socket-io-actions";
import { generateRoomId } from "./rooms";
import CYSocketIOError from "@models/cy-socket-io-error";

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
        this.connectionManager.setPlayer(socket.id, new Player(userId));
        const roomId = generateRoomId(this.connectionManager.rooms);
        socket.join(roomId);
        // player.inGame = true;
        socket.emit("action", { type: MatchmakerTCA.PROVIDE_ROOM_ID, payload: roomId });
    }

    private onAddPlayerToExistingRoom(socket: Socket, roomId: string, userId?: string) {
        const room = this.connectionManager.getRoom(roomId);
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
        this.connectionManager.setPlayer(socket.id, new Player(userId));
        socket.join(roomId);
        this.connectionManager.emitToRoom(roomId, {
            type: MatchmakerTCA.START_GAME,
            payload: {}
        });
    }

    private onRemovePlayerFromExistingRoom(socket: Socket, roomId: string) {
        const room = this.connectionManager.getRoom(roomId);
        if (!room) {
            throw new CYSocketIOError(
                `No room with ID ${roomId} currently exists.`,
                MatchmakerTCA.ERROR
            );
        }
        socket.leave(roomId);
    }
}
