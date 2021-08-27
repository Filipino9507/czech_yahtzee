import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import { MatchmakerTSA } from "cys/connection/to-server-actions";
import { GameTCA, MatchmakerTCA, MiscTCA } from "cys/connection/to-client-actions";
import SocketIOActions from "./socket-io-actions";
import { generateRoomId } from "../id";
import GameInstance from "@logic/game/game-instance";
import { logError, logInfo } from "@util/logger";

export default class MatchmakerSocketIOActions extends SocketIOActions {
    public override onAction(socket: Socket, action: DataTransferAction): boolean {
        switch (action.type) {
            case MatchmakerTSA.REQUEST_STORED_GAME: {
                const { roomId, playerId } = action.payload;
                this.onRequestStoredGame(socket, roomId, playerId);
                return true;
            }
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
            case MatchmakerTSA.START_GAME: {
                const { roomId } = action.payload;
                this.onStartGame(socket, roomId);
                return true;
            }
            case MatchmakerTSA.REMOVE_PLAYER_FROM_EXISTING_ROOM: {
                const { roomId } = action.payload;
                this.onRemovePlayerFromExistingRoom(socket, roomId);
                return true;
            }
            case MatchmakerTSA.SET_PLAYER_COUNT: {
                const { roomId, newPlayerCount } = action.payload;
                this.onSetPlayerCount(socket, roomId, newPlayerCount);
                return true;
            }
            default:
                return false;
        }
    }

    private onRequestStoredGame(socket: Socket, roomId: string, playerId: string) {
        try {
            const gameInstance = this.ioState.getGame(roomId);
            const hasPlayer = gameInstance.reincludePlayer(socket, playerId);
            if (hasPlayer) {
                logInfo("GAME_RETRIEVED", "Successfully retrieved game.");
                socket.emit("action", {
                    type: MatchmakerTCA.PROVIDE_IN_GAME_STATUS,
                    payload: true,
                });
                socket.emit("action", {
                    type: GameTCA.PROVIDE_GAME_STATE,
                    payload: gameInstance.gameData,
                });
            } else {
                throw "";
            }
        } catch (error) {
            logError(
                "CANNOT_RETRIEVE_GAME",
                `Could not retrieve stored game. Player ${playerId} in room ${roomId} does not exist.`
            );
        }
    }

    private onAddPlayerToNewRoom(socket: Socket, userId?: string) {
        const roomId = generateRoomId(this.ioState);
        const gameInstance = new GameInstance(roomId);
        const playerIdx = gameInstance.addPlayer(socket, userId);
        this.ioState.setGame(roomId, gameInstance);
        socket.emit("action", {
            type: MatchmakerTCA.PROVIDE_PLAYER_DATA,
            payload: { playerIdx, isHost: true },
        });
        const { playerCount, currentPlayerCount } = gameInstance;
        this.ioState.emitToRoom(roomId, {
            type: MatchmakerTCA.PROVIDE_ROOM_DATA,
            payload: { roomId, playerCount, currentPlayerCount },
        });
    }

    private onAddPlayerToExistingRoom(socket: Socket, roomId: string, userId?: string) {
        const gameInstance = this.ioState.getGame(roomId);
        if (gameInstance.currentPlayerCount === gameInstance.playerCount) {
            socket.emit("action", {
                type: MatchmakerTCA.ERROR,
                payload: "The game is full!"
            });
            return;
        }
        const playerIdx = gameInstance.addPlayer(socket, userId);
        gameInstance.giveStartingRolls();
        socket.emit("action", {
            type: MatchmakerTCA.PROVIDE_PLAYER_DATA,
            payload: { playerIdx, isHost: false },
        });
        const { playerCount, currentPlayerCount } = gameInstance;
        this.ioState.emitToRoom(roomId, {
            type: MatchmakerTCA.PROVIDE_ROOM_DATA,
            payload: { roomId, playerCount, currentPlayerCount },
        });
    }

    private onStartGame(socket: Socket, roomId: string) {
        const gameInstance = this.ioState.getGame(roomId);
        const { currentPlayerCount, playerCount } = gameInstance;
        if (currentPlayerCount !== playerCount) {
            socket.emit("action", {
                type: MatchmakerTCA.ERROR,
                payload: `Need to have ${playerCount} players, but only ${currentPlayerCount} are present.`,
            });
            return;
        }
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.gameData,
        });
        this.ioState.emitToRoom(roomId, {
            type: MatchmakerTCA.PROVIDE_IN_GAME_STATUS,
            payload: true,
        });
    }

    private onRemovePlayerFromExistingRoom(socket: Socket, roomId: string) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.removePlayer(socket);
        this.ioState.emitToRoom(roomId, {
            type: MatchmakerTCA.PROVIDE_IN_GAME_STATUS,
            payload: false,
        });
        /**
         * Later will emit to the only player,
         * but first need to figure out what will happen
         * to their points, and also need to reassign
         * and reemit new playerIdx's for the remaining
         * players, change playerCount and change currentPlayerCount.
         */
        // socket.emit("action", {
        //     type: MatchmakerTCA.PROVIDE_IN_GAME_STATUS,
        //     payload: false,
        // });
    }

    private onSetPlayerCount(socket: Socket, roomId: string, newPlayerCount: number) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.playerCount = newPlayerCount;
        this.ioState.emitToRoom(roomId, {
            type: MatchmakerTCA.PROVIDE_ROOM_DATA,
            payload: {
                roomId,
                playerCount: newPlayerCount,
                currentPlayerCount: gameInstance.currentPlayerCount,
            },
        });
    }
}
