import { MiscTCA } from "cys/connection/to-client-actions";
import CYSocketIOError from "./cy-socket-io-error";

export default class CYSocketIOMiscError extends CYSocketIOError {
    public constructor(message: string) {
        super(message, MiscTCA.ERROR);
        Object.setPrototypeOf(this, CYSocketIOMiscError.prototype);
    }

    public override toString(): string {
        return `[MISC_ERROR] ${this.message}`;
    }
}