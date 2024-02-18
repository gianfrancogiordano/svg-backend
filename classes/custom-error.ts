export class CustomError extends Error {
    message!: string;
    status!: number;
    console!: any;
    additionalInfo!: any;

    constructor(message: string, status: number = 500, console: any = {}, additionalInfo: any = {}) {

        super(message);

        this.message = message;
        this.status = status;
        this.console = console;
        this.additionalInfo = additionalInfo
    }
}