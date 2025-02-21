import express from 'express';
import cors from 'cors';
import dotenv from 'dotenv';
import helmet from 'helmet';
import xss from 'xss-clean';
import rateLimit from 'express-rate-limit';
import auth from '../middleware/authentication';

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

app.get('/', (req, res) => {
  res.send('Server is running!');
});

const start = async () => {
  try {
    app.listen(PORT, () => {
      console.log(`Server running on http://localhost:${PORT}`);
    });
  } catch (error) {
    console.error(error);
  }
};

start();
