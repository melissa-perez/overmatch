import { Request, Response, NextFunction } from 'express';
import jwt from 'jsonwebtoken';
import { Types } from 'mongoose';

interface IAuthUser {
  _id: Types.ObjectId;
  username: string;
}

interface IAuthRequest extends Request {
  user?: IAuthUser;
}

const auth = async (
  request: IAuthRequest,
  response: Response,
  next: NextFunction,
) => {
  try {
    const AUTH_HEADER = request.headers.authorization;
    if (!AUTH_HEADER || !AUTH_HEADER.startsWith('Bearer ')) {
      //throw new UnauthenticatedError("Authentication invalid");
      return response
        .status(401)
        .json({ message: 'Missing token, authorization failed.' });
    }

    const TOKEN = AUTH_HEADER.split(' ')[1];
    const JWT_SECRET = process.env.JWT_SECRET;

    if (!JWT_SECRET) {
      return response
        .status(500)
        .json({ message: 'Server error: Missing JWT secret' });
    }

    const PAYLOAD = jwt.verify(
      TOKEN,
      process.env.JWT_SECRET as string,
    ) as IAuthUser;

    request.user = {
      _id: new Types.ObjectId(PAYLOAD._id),
      username: PAYLOAD.username,
    };
    next();
  } catch (error) {
    // throw new UnauthenticatedError("Authentication invalid");
    return response
      .status(401)
      .json({ message: 'Missing token, authorization failed.' });
  }
};

export default auth;
