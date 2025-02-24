import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import rateLimit from 'express-rate-limit';
import authRouter from '../routes/auth.routes';
import matchRouter from '../routes/match.routes';
import auth from '../middleware/auth.middleware';
import connectDB from '../config/connect.config';

const xss = require('xss-clean');

dotenv.config();

const app = express();
const PORT = process.env.PORT || 5000;

const ISPRODUCTIONENV = app.get('env') === 'production';
if (ISPRODUCTIONENV) {
  app.set('trust proxy', 1);
  app.use(cors());
}

app.use(
  rateLimit({
    windowMs: 15 * 60 * 1000,
    max: 100,
  }),
);
app.use(express.json());
app.use(helmet());
app.use(xss());

app.use('/api/v1/auth', authRouter);
app.use('/api/v1/match', auth, matchRouter);

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const start = async () => {
  try {
    const MONGO_URI = process.env.MONGO_URI;

    if (!MONGO_URI) {
      throw new Error('Missing MONGO_URI');
    }

    await connectDB(process.env.MONGO_URI as string);
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
