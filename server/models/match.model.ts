import { Schema, model, Document, Types } from 'mongoose';

enum Outcome {
  VICTORY = 'victory',
  LOSS = 'loss',
  DRAW = 'draw',
  ABANDONED = 'abandoned',
}

interface IMatch extends Document {
  map: Types.ObjectId;
  outcome: string;
  finalScore: number;
  gameLength: string;
  date: Date;
  replayCode: string;
  heroesPlayed: Array<Types.ObjectId>;
}

const MatchSchema = new Schema<IMatch>({
  map: { type: Schema.Types.ObjectId, ref: 'Map', required: true },
  outcome: { type: String, enum: Object.values(Outcome), required: true },
  finalScore: { type: Number, required: true },
  gameLength: { type: String, required: true },
  date: { type: Date, required: true },
  replayCode: {
    type: String,
    required: false,
    minlength: 6,
    maxlength: 6,
    match: /^[A-Z0-9]{6}$/,
  },
  heroesPlayed: [{ type: Schema.Types.ObjectId, ref: 'Hero', required: true }],
});

const MatchModel = model<IMatch>('Match', MatchSchema);

export default MatchModel;
