import { Request, Response } from "express";
import { CustomError } from "../classes/custom-error";
import { error } from "../routes/response";

export const errorHandler = (req: Request, res: Response, err: CustomError | Error | any ) => {

    if (err instanceof CustomError) {
        error(req, res, err.message, err.status, err.console, err.additionalInfo );
        return;
    }

    console.log('not custom error');
    error(req, res, 'Internal server Error', 500, err );
}
