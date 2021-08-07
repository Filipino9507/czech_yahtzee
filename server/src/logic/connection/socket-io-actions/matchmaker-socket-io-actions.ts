import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import { MatchmakerTSA } from "cys/connection/to-server-actions";
import { GameTCA, MatchmakerTCA } from "cys/connection/to-client-actions";
import SocketIOActions from "./socket-io-actions";
import { generateRoomId } from "../id";
import GameInstance from "@logic/game/game-instance";

export default class MatchmakerSocketIOActions extends SocketIOActions {
    public override onAction(socket: Socket, action: DataTransferAction): boolean {
        switch (action.type) {
            /**
             * 
             * !!!!!!
             * New action:
             * RETRIEVE STATE BY ROOM ID AND PLAYER ID
             * Happens when player refreshes page, using the stored roomId and playerId
             */
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
        const roomId = generateRoomId(this.ioState);
        const gameInstance = new GameInstance(roomId);
        const playerIdx = gameInstance.addPlayer(socket, userId);
        this.ioState.setGame(roomId, gameInstance);
        socket.emit("action", {
            type: MatchmakerTCA.PROVIDE_ROOM_META,
            payload: { roomId, playerIdx },
        });
    }

    private onAddPlayerToExistingRoom(socket: Socket, roomId: string, userId?: string) {
        const gameInstance = this.ioState.getGame(roomId);
        const playerIdx = gameInstance.addPlayer(socket, userId);
        socket.emit("action", {
            type: MatchmakerTCA.PROVIDE_ROOM_META,
            payload: { roomId, playerIdx },
        });
        this.ioState.emitToRoom(roomId, {
            type: MatchmakerTCA.SET_IN_GAME_STATUS,
            payload: true,
        });
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.game,
        });
    }

    private onRemovePlayerFromExistingRoom(socket: Socket, roomId: string) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.removePlayer(socket);
        this.ioState.emitToRoom(roomId, {
            type: MatchmakerTCA.SET_IN_GAME_STATUS,
            payload: { inGame: false },
        });
    }
}
