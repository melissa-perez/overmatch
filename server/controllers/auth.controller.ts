import { UserModel } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

const register = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const USER = await UserModel.create({ ...request.body });
    const TOKEN = USER.createJWT();

    response.status(201).json({
      user: { username: USER.username },
      token: TOKEN,
    });
  } catch (error) {
    next(error);
  }
};

export { register };
