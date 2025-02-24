import MatchModel from '../models/match.model';
import { Request, Response, NextFunction } from 'express';
import { Types } from 'mongoose';
import { IAuthUser, IAuthRequest } from '../types/auth.types';

const getAllMatches = async (
  request: IAuthRequest,
  response: Response,
): Promise<void> => {
  if (!request.user) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const { _id: userId } = request.user;
  console.log(request.user);

  const matches = await MatchModel.find({ createdBy: userId }).sort(
    'createdAt',
  );

  response.status(200).json({ matches });
  return;
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

const createMatch = async (
  request: IAuthRequest,
  response: Response,
): Promise<void> => {
  if (!request.user) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const { _id: userId } = request.user;

  request.body.createdBy = userId;
  const match = await MatchModel.create(request.body);
  response.status(201).json(match);
  return;
};

const deleteMatch = async (
  request: IAuthRequest,
  response: Response,
): Promise<void> => {
  if (!request.user) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const { _id: userId } = request.user;
  const { id: matchId } = request.params;

  const match = await MatchModel.findByIdAndDelete({
    _id: matchId,
    createdBy: userId,
  });

  if (!match) {
    throw new Error(`No match with id ${matchId}`);
  }

  response.status(200).json({ msg: 'The entry was deleted.', match });
  return;
};

const updateMatch = async (
  request: IAuthRequest,
  response: Response,
): Promise<void> => {
  if (!request.user) {
    response.status(401).json({ error: 'Unauthorized' });
    return;
  }
  const { _id: userId } = request.user;
  const { id: matchId } = request.params;
  const {
    map,
    outcome,
    finalScore,
    gameLength,
    date,
    replayCode,
    heroesPlayed,
  } = request.body;

  console.log(request.body);
  if (outcome === '') {
    throw new Error('Outcome cannot be empty.');
  }
  if (!map) {
    throw new Error('Map cannot be empty.');
  }
  if (!finalScore) {
    throw new Error('Final score cannot be empty.');
  }

  const match = await MatchModel.findByIdAndUpdate(
    { _id: matchId, createdBy: userId },
    request.body,
    { new: true, runValidators: true },
  );
  if (!match) {
    throw new Error(`No match with id: ${matchId}`);
  }
  response.status(200).json({ match });
  return;
};

export { getAllMatches, getMatch, createMatch, deleteMatch, updateMatch };
