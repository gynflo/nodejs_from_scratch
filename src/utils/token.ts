import jwt from 'jsonwebtoken';
import User from '@/resources/user/user.interface';
import Token from '@/utils/interfaces/token.interface';
import { resolve } from 'path';

export const createToken = (user: User): string => {
    return jwt.sign({ id: user._id }, process.env.JWT_SECRET as jwt.Secret, {
        expiresIn: '1d',
    });
};

export const verifyToken = async (
    token: string
): Promise<Token | jwt.VerifyErrors> => {
    return new Promise((resolve, reject) => {
        jwt.verify(
            token,
            process.env.JWT_SECRET as jwt.Secret,
            (err, payload) => {
                if (err) return reject;
                resolve(payload as Token);
            }
        );
    });
};

export default { createToken, verifyToken };