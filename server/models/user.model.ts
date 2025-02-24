import { Schema, model, Document, Types } from 'mongoose';
import bcrypt from 'bcryptjs';
import jwt, { SignOptions } from 'jsonwebtoken';

interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
  createJWT(): string;
  comparePassword(candidatePassword: string): Promise<boolean>;
}

const UserSchema = new Schema<IUser>({
  username: {
    type: String,
    required: [true, 'Please provide a username.'],
    minlength: 5,
    maxlength: 30,
  },
  email: {
    type: String,
    required: [true, 'Please provide an email.'],
    unique: true,
    match: [
      /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/,
      'Please provide valid email.',
    ],
  },
  password: {
    type: String,
    required: [true, 'Please provide a password.'],
    minlength: 6,
    maxlength: 30,
  },
});

UserSchema.pre('save', async function () {
  const ROUNDS = 10;
  const salt = await bcrypt.genSalt(ROUNDS);
  this.password = await bcrypt.hash(this.password, salt);
});

UserSchema.methods.createJWT = function () {
  const JWT_SECRET = process.env.JWT_SECRET as string;
  const JWT_LIFETIME = process.env.JWT_LIFETIME as string | number;

  if (!JWT_SECRET) {
    throw new Error('Server error: Missing JWT secret');
  }

  if (!JWT_LIFETIME) {
    throw new Error('Server error: Missing JWT lifetime');
  }
  const signOptions: SignOptions = {
    expiresIn: JWT_LIFETIME as jwt.SignOptions['expiresIn'],
  };

  return jwt.sign(
    { _id: this._id, username: this.username },
    JWT_SECRET,
    signOptions,
  );
};

UserSchema.methods.comparePassword = async function (
  candidatePassword: string,
) {
  const isMatch = await bcrypt.compare(candidatePassword, this.password);
  console.log(isMatch);
  return isMatch;
};

const UserModel = model<IUser>('User', UserSchema);

export { UserModel, IUser };
