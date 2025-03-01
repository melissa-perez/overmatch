import { Schema, model, Document, Types } from 'mongoose';

enum Outcome {
  VICTORY = 'Victory',
  LOSS = 'Loss',
  DRAW = 'Draw',
  ABANDONED = 'Abandoned',
}

enum Mode {
  CONTROL = 'Control',
  ESCORT = 'Escort',
  FLASHPOINT = 'Flashpoint',
  HYBRID = 'Hybrid',
  PUSH = 'Push',
  CLASH = 'Clash',
}

interface IMatch extends Document {
  mode: string;
  outcome: string;
  finalScore: number;
  gameLength: string;
  date: Date;
  replayCode: string;
  createdBy: Types.ObjectId;
}

const MatchSchema = new Schema<IMatch>(
  {
    mode: { type: String, enum: Object.values(Mode), required: true },
    outcome: { type: String, enum: Object.values(Outcome), required: true },
    finalScore: { type: Number, required: false },
    gameLength: { type: String, required: false },
    date: { type: Date, required: false, default: Date.now },
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
