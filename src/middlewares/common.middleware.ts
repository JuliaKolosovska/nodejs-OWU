import {NextFunction, Request, Response} from "express";
import {isObjectIdOrHexString} from "mongoose";
import {ApiError} from "../errors";
import { ObjectSchema } from "joi";

class CommonMiddleware {
    public isIdValid(field: string) {
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const id= req.params[field];

                if (!isObjectIdOrHexString(id)) {
                    throw new ApiError(`id ${field} not valid`, 400);
                }

                next();
            } catch (e) {
                next(e);
            }
        }
    }

    public isBodyValid(validator: ObjectSchema) {
        (req: Request, res: Response, next: NextFunction) => {
            try {
                const { error, value } = validator.validate(req.body);
                if (error) {
                    throw new ApiError(error.message, 400);
                }

                req.res.locals = value;

                next();
            } catch (e) {
                next(e);
            }
        }
    }
}

export const commonMiddleware = new CommonMiddleware();