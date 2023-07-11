import axios from 'axios';
import queryString from 'query-string';
import { AchievementInterface, AchievementGetQueryInterface } from 'interfaces/achievement';
import { GetQueryInterface } from '../../interfaces';

export const getAchievements = async (query?: AchievementGetQueryInterface) => {
  const response = await axios.get(`/api/achievements${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createAchievement = async (achievement: AchievementInterface) => {
  const response = await axios.post('/api/achievements', achievement);
  return response.data;
};

export const updateAchievementById = async (id: string, achievement: AchievementInterface) => {
  const response = await axios.put(`/api/achievements/${id}`, achievement);
  return response.data;
};

export const getAchievementById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/achievements/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteAchievementById = async (id: string) => {
  const response = await axios.delete(`/api/achievements/${id}`);
  return response.data;
};
