import { NextFunction, Request, Response } from "express";
import { getAuthAdapter } from "../../adapters/auth";

class AuthMiddleware {
    public static verify(allowedProfiles: string[] | null = null) {
        return async (req: Request, res: Response, next: NextFunction) => {
            const headers = req.headers;

            if (!headers.authorization) {
                return res.status(401).json({
                    error: 'Envie um header Authorization',
                });
            };

            const authorization = headers.authorization.split(' ');

            if (authorization.length !== 2 || authorization[0].toLocaleLowerCase() !== 'bearer') {
                return res.status(401).json({
                    error: 'Header authorization mal formado',
                });
            }

            const idp = getAuthAdapter();

            const [ response, status ] = await idp.audToken(authorization[1]);

            if (status !== 200) {
                return res.status(401).json(response);
            };

            req.userData = {...response};

            if (allowedProfiles && allowedProfiles.indexOf(req.userData?.space ?? '') === -1) {
                return res.status(403).json({
                    error: 'Não autorizado',
                });
            }

            return next();
        }
    }
}

export default AuthMiddleware;
