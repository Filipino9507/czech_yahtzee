export default abstract class CYSocketIOError extends Error {
    public override message: string;
    public actionType: string;

    public constructor(message: string, actionType: string) {
        super(message);
        this.message = message;
        this.actionType = actionType;
        
        Object.setPrototypeOf(this, CYSocketIOError.prototype);
    }

    public abstract override toString(): string;
}