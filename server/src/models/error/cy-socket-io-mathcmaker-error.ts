import { MatchmakerTCA } from "cys/connection/to-client-actions";
import CYSocketIOError from "./cy-socket-io-error";

export default class CYSocketIOMatchmakerError extends CYSocketIOError {
    public constructor(message: string) {
        super(message, MatchmakerTCA.ERROR);
        Object.setPrototypeOf(this, CYSocketIOMatchmakerError.prototype);
    }

    public override toString(): string {
        return `[MATCHMAKER_ERROR] ${this.message}`;
    }
}