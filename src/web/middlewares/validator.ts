import { ValidateFunction } from "ajv";
import { NextFunction, Request, Response } from "express";

class ValidateSchemaMiddleware {
    public static valid(validator: ValidateFunction, usiing: 'body' | 'query' = 'body') {
        return (req: Request, res: Response, next: NextFunction) => {
            const body = usiing === 'body' ? req.body : req.query;

            if (!body) {
                return res.status(400).json({
                    error: 'Um JSON era esperado',
                });
            }

            if (validator(body)) {
                return next();
            }


            return res.status(422).json({
                errors: validator.errors,
            })
        }
    }
}

export default ValidateSchemaMiddleware;
