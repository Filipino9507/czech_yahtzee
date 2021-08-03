import { Server, Socket } from "socket.io";
import Player from "cys/models/game/player";
import { Room } from "./rooms";
import CYSocketIOError from "@models/cy-socket-io-error";
import { MatchmakerTCA, MiscTCA } from "cys/connection/to-client-actions";
import DataTransferAction from "cys/models/misc/data-transfer-action";

import SocketIOActions from "./socket-io-actions/socket-io-actions";
import MatchmakerSocketIOActions from "./socket-io-actions/matchmaker-socket-io-actions";
import GameSocketIOActions from "./socket-io-actions/game-socket-io-actions";
import SocketIOState from "./socket-io-state";

export default class SocketIOConnection {
    private io: Server;
    private socketIOState: SocketIOState;
    private socketIOActionsList: SocketIOActions[];

    public constructor(io: Server) {
        this.io = io;
        this.socketIOState = new SocketIOState(this.io.sockets.adapter.rooms);
        this.socketIOActionsList = [
            new MatchmakerSocketIOActions(this.socketIOState),
            new GameSocketIOActions(this.socketIOState),
        ];
    }

    private onAction(socket: Socket, action: DataTransferAction): void {
        for (const socketIOActions of this.socketIOActionsList) {
            if (socketIOActions.onAction(socket, action)) {
                break;
            }
        }
        throw new CYSocketIOError(`Socket action ${action.type} not implemented.`, MiscTCA.ERROR);
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
            this.socketIOState.connect(socket);
            socket.on("disconnect", () => this.socketIOState.disconnect(socket));

            socket.on("action", (action: DataTransferAction) => {
                try {
                    this.onAction(socket, action);
                } catch (error) {
                    this.onError(socket, error);
                }
                console.log(this.socketIOState.roomMap);
            });
        });
    }
}
