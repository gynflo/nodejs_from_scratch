import { Request, Response, NextFunction, RequestHandler } from 'express';
import token from '@/utils/token';
import UserModel from '@/resources/user/user.model';
import Token from '@/utils/interfaces/token.interface';
import HttpException from '@/utils/exceptions/http.exception';
import Jwt from 'jsonwebtoken';

async function authenticatedMiddleware(
    req: Request,
    res: Response,
    next: NextFunction
): Promise<Response | void> {
    const bearer = req.headers.authorization;

    if (!bearer || !bearer.startsWith('Bearer ')) {
        return next(new HttpException(404, 'Unauthorized !'));
    }
    const accessToken = bearer?.split('Bearer ')[1].trim();

    try {
        const payload: Token | Jwt.JsonWebTokenError = await token.verifyToken(
            accessToken
        );

        if (payload instanceof Jwt.JsonWebTokenError) {
            return next(new HttpException(404, 'Unauthorized !'));
        }
        const user = await UserModel.findById(payload.id)
            .select('-password')
            .exec();

        if (!user) {
            return next(new HttpException(404, 'Unauthorized !'));
        } else {
            req.user = user;
            next();
        }
    } catch (error) {
        next(new HttpException(404, 'Unauthorized'));
    }
}

export default authenticatedMiddleware;
