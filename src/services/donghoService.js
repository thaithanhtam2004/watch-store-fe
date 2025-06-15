import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/watchs';

export const getAllDongHo = async () => {
  const response = await axios.get(API_BASE);
  return response.data.data; 
};

export const getDongHoById = async (madongho) => {
  const response = await axios.get(`${API_BASE}/${madongho}`);
  return response.data;
};

export const createDongHo = async (dongHoData) => {
  const response = await axios.post(API_BASE, dongHoData, { withCredentials: true });
  return response.data;
};

export const updateDongHo = async (madongho, dongHoData) => {
  const response = await axios.put(`${API_BASE}/${madongho}`, dongHoData, { withCredentials: true });
  return response.data;
};

export const deleteDongHo = async (madongho) => {
  const response = await axios.delete(`${API_BASE}/${madongho}`, { withCredentials: true });
  return response.data;
};
