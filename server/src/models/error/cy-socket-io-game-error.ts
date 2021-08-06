import { GameTCA } from "cys/connection/to-client-actions";
import CYSocketIOError from "./cy-socket-io-error";

export default class CYSocketIOGameError extends CYSocketIOError {
    public constructor(message: string) {
        super(message, GameTCA.ERROR);
        Object.setPrototypeOf(this, CYSocketIOGameError.prototype);
    }

    public override toString(): string {
        return `[GAME_ERROR] ${this.message}`;
    }
}