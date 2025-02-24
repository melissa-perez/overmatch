import { Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';
import { IAuthUser, IAuthRequest } from '../types/auth.types';

const auth = async (
  request: IAuthRequest,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      response
        .status(401)
        .json({ message: 'Missing token, authorization failed.' });
      return;
    }

    const token = authHeader.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      response
        .status(500)
        .json({ message: 'Server error: Missing JWT secret' });
      return;
    }

    const payload = jwt.verify(token, JWT_SECRET) as IAuthUser;

    request.user = {
      _id: new Types.ObjectId(payload._id),
      username: payload.username,
    };
    next();
  } catch (error) {
    response
      .status(401)
      .json({ message: 'Missing token, authorization failed.' });
    return;
  }
};

export default auth;
