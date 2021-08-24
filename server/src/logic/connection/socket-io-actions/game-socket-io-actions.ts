import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import { GameTSA } from "cys/connection/to-server-actions";
import { GameTCA } from "cys/connection/to-client-actions";
import { ScoreboardDataKey } from "cys/models/game/score";
import SocketIOActions from "./socket-io-actions";

export default class GameSocketIOActions extends SocketIOActions {
    public override onAction(socket: Socket, action: DataTransferAction): boolean {
        switch (action.type) {
            case GameTSA.ROLL_DICE: {
                const { roomId } = action.payload;
                this.onRollDice(roomId);
                return true;
            }
            case GameTSA.TOGGLE_LOCK_IN_DICE: {
                const { roomId, diceId } = action.payload;
                this.onToggleLockInDice(roomId, diceId);
                return true;
            }
            case GameTSA.FINISH_TURN: {
                const { roomId, scoringRuleName } = action.payload;
                this.onFinishTurn(roomId, scoringRuleName);
                return true;
            }
            default:
                return false;
        }
    }

    private onRollDice(roomId: string) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.rollDice();
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.game,
        });
    }

    private onToggleLockInDice(roomId: string, diceId: number) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.toggleLockInDice(diceId);
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.game,
        });
    }

    private onFinishTurn(roomId: string, scoringRuleName: ScoreboardDataKey) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.endTurn(scoringRuleName);
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.game,
        });
    }
}
