import { Schema, model, Document, Types } from 'mongoose';

enum Role {
  TANK = 'Tank',
  DAMAGE = 'Damage',
  SUPPORT = 'Support',
}

interface IHero extends Document {
  _id: Types.ObjectId;
  name: string;
  role: string;
}

const HeroSchema = new Schema<IHero>({
  name: { type: String, required: true },
  role: { type: String, enum: Object.values(Role), required: true },
});

const HeroModel = model<IHero>('Hero', HeroSchema);

export default HeroModel;
