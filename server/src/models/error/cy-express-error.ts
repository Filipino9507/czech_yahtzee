export default class CYExpressError extends Error {

    public override message: string;
    public status: number;

    public constructor(message: string, status: number = 500) {
        super(message);
        this.message = message;
        this.status = status;

        Object.setPrototypeOf(this, CYExpressError.prototype);
    }

    public override toString(): string {
        return `CYExpressError: [STATUS ${this.status}] ${this.message}`;
    }
}