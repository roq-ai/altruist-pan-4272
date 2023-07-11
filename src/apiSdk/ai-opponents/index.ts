import axios from 'axios';
import queryString from 'query-string';
import { AiOpponentInterface, AiOpponentGetQueryInterface } from 'interfaces/ai-opponent';
import { GetQueryInterface } from '../../interfaces';

export const getAiOpponents = async (query?: AiOpponentGetQueryInterface) => {
  const response = await axios.get(`/api/ai-opponents${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAiOpponent = async (aiOpponent: AiOpponentInterface) => {
  const response = await axios.post('/api/ai-opponents', aiOpponent);
  return response.data;
};

export const updateAiOpponentById = async (id: string, aiOpponent: AiOpponentInterface) => {
  const response = await axios.put(`/api/ai-opponents/${id}`, aiOpponent);
  return response.data;
};

export const getAiOpponentById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/ai-opponents/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAiOpponentById = async (id: string) => {
  const response = await axios.delete(`/api/ai-opponents/${id}`);
  return response.data;
};
