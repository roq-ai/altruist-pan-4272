import axios from 'axios';
import queryString from 'query-string';
import { PowerUpInterface, PowerUpGetQueryInterface } from 'interfaces/power-up';
import { GetQueryInterface } from '../../interfaces';

export const getPowerUps = async (query?: PowerUpGetQueryInterface) => {
  const response = await axios.get(`/api/power-ups${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createPowerUp = async (powerUp: PowerUpInterface) => {
  const response = await axios.post('/api/power-ups', powerUp);
  return response.data;
};

export const updatePowerUpById = async (id: string, powerUp: PowerUpInterface) => {
  const response = await axios.put(`/api/power-ups/${id}`, powerUp);
  return response.data;
};

export const getPowerUpById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/power-ups/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deletePowerUpById = async (id: string) => {
  const response = await axios.delete(`/api/power-ups/${id}`);
  return response.data;
};
