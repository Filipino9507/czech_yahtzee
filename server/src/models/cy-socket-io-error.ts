export default class CYSocketIoError extends Error {
    public message: string;
    public actionType: string;

    public constructor(message: string, actionType: string) {
        super(message);
        this.message = message;
        this.actionType = actionType;
        
        Object.setPrototypeOf(this, CYSocketIoError.prototype);
    }

    public toString(): string {
        return `CYSocketIoError: [ACTION_TYPE ${this.actionType}] ${this.message}`;
    }
}