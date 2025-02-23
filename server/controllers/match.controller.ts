import MatchModel from '../models/match.model';
import { Request, Response, NextFunction } from 'express';
import { IUser } from '../models/user.model';

interface IAuthRequest extends Request {
  user?: IUser;
}

const getAllMatches = async (
  request: IAuthRequest,
  response: Response,
): Promise<void> => {
  if (!request.user) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const matches = await MatchModel.find({ createdBy: request.user._id }).sort(
    'createdAt',
  );

  response.status(200).json({ matches });
};

const getMatch = async (
  request: IAuthRequest,
  response: Response,
): Promise<void> => {
  if (!request.user) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }

  const { _id: userId } = request.user;
  const { id: matchId } = request.params;

  const match = await MatchModel.findOne({
    _id: matchId,
    createdBy: userId,
  });

  if (!match) {
    response.status(404).json({ error: `No match with id ${matchId}` });
    return;
  }

  response.status(200).json({ match });
  return;
};

const createMatch = () => {};

const deleteMatch = () => {};

const updateMatch = () => {};

export { getAllMatches, getMatch, createMatch, deleteMatch, updateMatch };
