import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import GameDTO from "cys/models/game/game-dto";
import { GameTSA } from "cys/connection/to-server-actions";
import { GameTCA } from "cys/connection/to-client-actions";
import SocketIOActions from "./socket-io-actions";
import SocketIOConnectionManager from "../socket-io-connection-manager";

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
