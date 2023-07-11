import axios from 'axios';
import queryString from 'query-string';
import { GameModeInterface, GameModeGetQueryInterface } from 'interfaces/game-mode';
import { GetQueryInterface } from '../../interfaces';

export const getGameModes = async (query?: GameModeGetQueryInterface) => {
  const response = await axios.get(`/api/game-modes${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createGameMode = async (gameMode: GameModeInterface) => {
  const response = await axios.post('/api/game-modes', gameMode);
  return response.data;
};

export const updateGameModeById = async (id: string, gameMode: GameModeInterface) => {
  const response = await axios.put(`/api/game-modes/${id}`, gameMode);
  return response.data;
};

export const getGameModeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/game-modes/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteGameModeById = async (id: string) => {
  const response = await axios.delete(`/api/game-modes/${id}`);
  return response.data;
};
