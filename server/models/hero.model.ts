import { Schema, model, Document } from 'mongoose';

interface IHero extends Document {
  name: string;
}

const HeroSchema = new Schema<IHero>({
  name: { type: String, required: true },
});

const HeroModel = model<IHero>('Hero', HeroSchema);

module.exports = HeroModel;
