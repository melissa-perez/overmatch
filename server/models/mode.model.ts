import { Schema, model, Document, Types } from 'mongoose';

interface IMode extends Document {
  _id: Types.ObjectId;
  name: string;
}

const ModeSchema = new Schema<IMode>({
  name: { type: String, required: true },
});

const ModeModel = model<IMode>('Mode', ModeSchema);

export default ModeModel;
