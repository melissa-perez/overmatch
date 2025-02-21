import { Schema, model, Document, Types } from 'mongoose';

interface IUser extends Document {
  _id: Types.ObjectId;
  username: string;
  email: string;
  password: string;
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

const UserModel = model<IUser>('User', UserSchema);

export { UserModel, IUser };
