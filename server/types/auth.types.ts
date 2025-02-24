import { Types } from 'mongoose';
import { Request } from 'express';

interface IAuthUser {
  _id: Types.ObjectId;
  username: string;
}

interface IAuthRequest extends Request {
  user?: IAuthUser;
}

export { IAuthUser, IAuthRequest };
