import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import { GameTSA } from "cys/connection/to-server-actions";
import SocketIOActions from "./socket-io-actions";

export default class GameSocketIOActions extends SocketIOActions {
    public override onAction(socket: Socket, action: DataTransferAction): boolean {
        switch (action.type) {
            case GameTSA.ROLL_DICE: {
                this.onRollDice(socket);
                return true;
            }
            case GameTSA.LOCK_IN_DICE: {
                const { diceIds } = action.payload;
                this.onLockInDice(socket, diceIds);
                return true;
            }
            case GameTSA.FINISH_TURN: {
                this.onFinishTurn(socket);
                return true;
            }
            default:
                return false;
        }
    }

    private onRollDice(socket: Socket) {}

    private onLockInDice(socket: Socket, diceIds: number[]) {}

    private onFinishTurn(socket: Socket) {}
}
