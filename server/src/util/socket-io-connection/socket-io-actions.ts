import { Socket } from "socket.io";
import DataTransferAction from "cys/models/misc/data-transfer-action";
import SocketIOConnectionManager from "./socket-io-connection-manager";

export default abstract class SocketIOActions {
    protected connectionManager: SocketIOConnectionManager;

    public constructor(connectionManager: SocketIOConnectionManager) {
        this.connectionManager = connectionManager;
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
