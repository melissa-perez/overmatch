import express, { Router } from 'express';
import { register } from '../controllers/auth.controller';

const authRouter: Router = express.Router();

authRouter.post('/register', register);
//router.post('/login');

export default authRouter;
