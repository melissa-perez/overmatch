import express, { Router } from 'express';
import { getAllMatches, getMatch, createMatch, deleteMatch, updateMatch } from '../controllers/match.controller';

const matchRouter: Router = express.Router();

matchRouter.route('/').post(createMatch).get(getAllMatches);
matchRouter.route('/:id').get(getMatch).delete(deleteMatch).patch(updateMatch);

export default matchRouter;
