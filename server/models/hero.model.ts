import { Schema, model, Document, Types } from 'mongoose';

interface IHero extends Document {
  _id: Types.ObjectId;
  name: string;
}

const HeroSchema = new Schema<IHero>({
  name: { type: String, required: true },
});

const HeroModel = model<IHero>('Hero', HeroSchema);

export default HeroModel;
