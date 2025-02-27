import { Schema, model, Document, Types } from 'mongoose';

enum Outcome {
  VICTORY = 'Victory',
  LOSS = 'Loss',
  DRAW = 'Draw',
  ABANDONED = 'Abandoned',
}

/*enum Mode {
  CONTROL = "control",
  ESCORT = "escort",
  FLASHPOINT = "flashpoint",
  HYBRID = "hybrid",
  PUSH = "push",
  CLASH = "clash"
}*/

interface IMatch extends Document {
  map: Types.ObjectId;
  outcome: string;
  finalScore: number;
  gameLength: string;
  date: Date;
  replayCode: string;
  heroesPlayed: Array<Types.ObjectId>;
  createdBy: Types.ObjectId;
}

const MatchSchema = new Schema<IMatch>(
  {
    map: { type: Schema.Types.ObjectId, ref: 'Map', required: true },
    outcome: { type: String, enum: Object.values(Outcome), required: true },
    finalScore: { type: Number, required: false },
    gameLength: { type: String, required: false },
    date: { type: Date, required: false, default: Date.now },
    replayCode: {
      type: String,
      required: false,
      minlength: 6,
      maxlength: 6,
      match: /^[A-Z0-9]{6}$/,
    },
    heroesPlayed: [
      { type: Schema.Types.ObjectId, ref: 'Hero', required: false },
    ],
    createdBy: {
      type: Schema.Types.ObjectId,
      ref: 'User',
      required: [true, 'Please provide user'],
    },
  },
  { timestamps: true },
);

const MatchModel = model<IMatch>('Match', MatchSchema);

export default MatchModel;
