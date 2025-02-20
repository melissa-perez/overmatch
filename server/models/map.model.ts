import { Schema, model, Document, Types } from 'mongoose';

interface IMap extends Document {
  name: string;
  mode: Types.ObjectId;
}

const MapSchema = new Schema<IMap>({
  name: { type: String, required: true },
  mode: { type: Schema.Types.ObjectId, ref: 'Mode', required: true },
});

const MapModel = model<IMap>('Map', MapSchema);

module.exports = MapModel;
