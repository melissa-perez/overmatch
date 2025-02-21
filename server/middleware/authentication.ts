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
    const authHeader = request.headers.authorization;
    if (!authHeader || !authHeader.startsWith('Bearer ')) {
      //throw new UnauthenticatedError("Authentication invalid");
      return response
        .status(401)
        .json({ message: 'Missing token, authorization failed.' });
    }

    const token = authHeader.split(' ')[1];
    const jwtSecret = process.env.JWT_SECRET;

    if (!jwtSecret) {
      return response
        .status(500)
        .json({ message: 'Server error: Missing JWT secret' });
    }

    const payload = jwt.verify(
      token,
      process.env.JWT_SECRET as string,
    ) as IAuthUser;

    request.user = {
      _id: new Types.ObjectId(payload._id),
      username: payload.username,
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
