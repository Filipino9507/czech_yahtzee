import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import { GameTSA } from "cys/connection/to-server-actions";
import { GameTCA, MatchmakerTCA } from "cys/connection/to-client-actions";
import { ScoreboardDataKey } from "cys/models/game/score";
import SocketIOActions from "./socket-io-actions";
import GameStatus from "cys/models/game/game-status";

export default class GameSocketIOActions extends SocketIOActions {
    public override onAction(socket: Socket, action: DataTransferAction): boolean {
        switch (action.type) {
            case GameTSA.ROLL_DICE: {
                const { roomId } = action.payload;
                this.onRollDice(socket, roomId);
                return true;
            }
            case GameTSA.TOGGLE_LOCK_IN_DICE: {
                const { roomId, diceId } = action.payload;
                this.onToggleLockInDice(socket, roomId, diceId);
                return true;
            }
            case GameTSA.FINISH_TURN: {
                const { roomId, scoringRuleName } = action.payload;
                this.onFinishTurn(socket, roomId, scoringRuleName);
                return true;
            }
            default:
                return false;
        }
    }

    private onRollDice(socket: Socket, roomId: string) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.rollDice();
        this.ioState.emitToRoom(socket, roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.gameData,
        });
    }

    private onToggleLockInDice(socket: Socket, roomId: string, diceId: number) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.toggleLockInDice(diceId);
        this.ioState.emitToRoom(socket, roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.gameData,
        });
    }

    private onFinishTurn(socket: Socket, roomId: string, scoringRuleName: ScoreboardDataKey) {
        const gameInstance = this.ioState.getGame(roomId);
        if (gameInstance.endTurn(scoringRuleName)) {
            this.ioState.emitToRoom(socket, roomId, {
                type: MatchmakerTCA.PROVIDE_GAME_STATUS,
                payload: "IN_RESULTS" as GameStatus,
            });
            this.ioState.deleteGame(roomId);
        }
        this.ioState.emitToRoom(socket, roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.gameData,
        });
    }
}
