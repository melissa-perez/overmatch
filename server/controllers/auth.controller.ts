import { UserModel } from '../models/user.model';
import { Request, Response, NextFunction } from 'express';

const register = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const user = await UserModel.create({ ...request.body });
    const token = user.createJWT();

    response.status(201).json({
      user: { username: user.username },
      token: token,
    });
  } catch (error) {
    next(error);
  }
};

const login = async (
  request: Request,
  response: Response,
  next: NextFunction,
): Promise<void> => {
  try {
    const { email, password } = request.body;

    if (!email || !password) {
      throw new Error('Please provide email and password.');
    }

    const user = await UserModel.findOne({ email });

    if (!user) {
      throw new Error('Invalid credentials.');
    }

    const isPasswordCorrect = await user.comparePassword(password);
    if (!isPasswordCorrect) {
      throw new Error('Invalid credentials.');
    }

    const token = user.createJWT();
    response.status(200).json({ user: { username: user.username }, token });
  } catch (error) {
    next(error);
  }
};

export { register, login };
