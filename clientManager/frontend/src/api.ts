import axios from 'axios';
import { Client, NewClient } from './types';

const API_URL = 'http://localhost:3000/clients';

export const getClients = async (): Promise<Client[]> => {
  const response = await axios.get(API_URL);
  return response.data;
};

export const getClient = async (id: number): Promise<Client> => {
  const response = await axios.get(`${API_URL}/${id}`);
  return response.data;
};

export const createClient = async (client: NewClient): Promise<Client> => {
  const response = await axios.post(API_URL, client);
  return response.data;
};

export const updateClient = async (id: number, client: Client): Promise<Client> => {
  const response = await axios.put(`${API_URL}/${id}`, client);
  return response.data;
};

export const deleteClient = async (id: number): Promise<void> => {
  await axios.delete(`${API_URL}/${id}`);
};