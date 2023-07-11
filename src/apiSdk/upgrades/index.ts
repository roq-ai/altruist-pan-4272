import axios from 'axios';
import queryString from 'query-string';
import { UpgradeInterface, UpgradeGetQueryInterface } from 'interfaces/upgrade';
import { GetQueryInterface } from '../../interfaces';

export const getUpgrades = async (query?: UpgradeGetQueryInterface) => {
  const response = await axios.get(`/api/upgrades${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const createUpgrade = async (upgrade: UpgradeInterface) => {
  const response = await axios.post('/api/upgrades', upgrade);
  return response.data;
};

export const updateUpgradeById = async (id: string, upgrade: UpgradeInterface) => {
  const response = await axios.put(`/api/upgrades/${id}`, upgrade);
  return response.data;
};

export const getUpgradeById = async (id: string, query?: GetQueryInterface) => {
  const response = await axios.get(`/api/upgrades/${id}${query ? `?${queryString.stringify(query)}` : ''}`);
  return response.data;
};

export const deleteUpgradeById = async (id: string) => {
  const response = await axios.delete(`/api/upgrades/${id}`);
  return response.data;
};
