import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import { GameTSA } from "cys/connection/to-server-actions";
import { GameTCA } from "cys/connection/to-client-actions";
import SocketIOActions from "./socket-io-actions";

export default class GameSocketIOActions extends SocketIOActions {
    public override onAction(socket: Socket, action: DataTransferAction): boolean {
        switch (action.type) {
            case GameTSA.ROLL_DICE: {
                const { roomId } = action.payload;
                this.onRollDice(roomId);
                return true;
            }
            case GameTSA.TOGGLE_SELECT_DICE: {
                const { roomId, diceId } = action.payload;
                this.onToggleSelectDice(roomId, diceId);
                return true;
            }
            case GameTSA.LOCK_IN_DICE: {
                const { roomId, lockedIn } = action.payload;
                this.onLockInDice(roomId, lockedIn);
                return true;
            }
            case GameTSA.FINISH_TURN: {
                const { roomId } = action.payload;
                this.onFinishTurn(roomId);
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

    private onToggleSelectDice(roomId: string, diceId: number) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.toggleSelectDice(diceId);
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.game,
        });
    }

    private onLockInDice(roomId: string, lockedIn: boolean) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.lockInDice(lockedIn);
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.game,
        });
    }

    private onFinishTurn(roomId: string) {
        const gameInstance = this.ioState.getGame(roomId);
        gameInstance.endTurn();
        this.ioState.emitToRoom(roomId, {
            type: GameTCA.PROVIDE_GAME_STATE,
            payload: gameInstance.game,
        });
    }
}
