import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import SocketIOState from "../socket-io-state";

export default abstract class SocketIOActions {
    protected ioState: SocketIOState;

    public constructor(ioState: SocketIOState) {
        this.ioState = ioState;
    }

    /**
     * 
     * @param socket Socket which received the action
     * @param action Action content
     * 
     * @returns whether the action was matched with these actions
     */
    public abstract onAction(socket: Socket, action: DataTransferAction): boolean;
}
