import { Schema, model, Document } from 'mongoose';

interface IMode extends Document {
  name: string;
}

const ModeSchema = new Schema<IMode>({
  name: { type: String, required: true },
});

const ModeModel = model<IMode>('Mode', ModeSchema);

export default ModeModel;
