import { NextFunction, Request, Response } from 'express';


class ErrorMiddleware {
    public static async execute(
        err: any,
        req: Request,
        res: Response,
        next: NextFunction
    ) {
        console.error(err.stack);
        res.status(500).send('Something where wrong...');
      }
}