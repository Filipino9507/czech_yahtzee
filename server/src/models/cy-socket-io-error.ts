export default class CYSocketIOError extends Error {
    public override message: string;
    public actionType: string;

    public constructor(message: string, actionType: string) {
        super(message);
        this.message = message;
        this.actionType = actionType;
        
        Object.setPrototypeOf(this, CYSocketIOError.prototype);
    }

    public override toString(): string {
        return `CYSocketIoError: [ACTION_TYPE ${this.actionType}] ${this.message}`;
    }
}