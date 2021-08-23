import { Server, Socket } from "socket.io";
import CYSocketIOError from "@models/error/cy-socket-io-error";
import { MiscTCA } from "cys/connection/to-client-actions";
import DataTransferAction from "cys/models/misc/data-transfer-action";

import SocketIOActions from "./socket-io-actions/socket-io-actions";
import MatchmakerSocketIOActions from "./socket-io-actions/matchmaker-socket-io-actions";
import GameSocketIOActions from "./socket-io-actions/game-socket-io-actions";
import SocketIOState from "./socket-io-state";
import CYSocketIOMiscError from "@models/error/cy-socket-io-misc-error";

export default class SocketIOConnection {
    private io: Server;
    private ioState: SocketIOState;
    private ioActionsList: SocketIOActions[];

    public constructor(io: Server) {
        this.io = io;
        this.ioState = new SocketIOState(this.io.sockets.adapter.rooms);
        this.ioActionsList = [
            new MatchmakerSocketIOActions(this.ioState),
            new GameSocketIOActions(this.ioState),
        ];
    }

    private onAction(socket: Socket, action: DataTransferAction): void {
        for (const socketIOActions of this.ioActionsList) {
            const matched = socketIOActions.onAction(socket, action);
            if (matched) {
                return;
            }
        }
        throw new CYSocketIOMiscError(`Socket action ${action.type} not implemented.`);
    }

    private onError(socket: Socket, error: Error): void {
        if (error instanceof CYSocketIOError) {
            socket.emit("action", { type: error.actionType, payload: error.message });
        } else {
            console.log("!!! UNKNOWN ERROR !!!");
            console.log(error.message);
            socket.emit("action", {
                type: MiscTCA.ERROR,
                payload: "An unknown error occured.",
            });
        }
    }

    public connect() {
        this.io.on("connection", (socket) => {
            this.ioState.connect(socket);
            socket.on("disconnect", () => this.ioState.disconnect(socket));

            socket.on("action", (action: DataTransferAction) => {
                try {
                    this.onAction(socket, action);
                } catch (error) {
                    this.onError(socket, error);
                }
            });
        });
    }
}
