import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/phuongthucs';

export const getAllPhuongThuc = async () => {
  const res = await axios.get(API_BASE);
  return res.data.data;
};

export const getPhuongThucById = async (maphuongthuc) => {
  const res = await axios.get(`${API_BASE}/${maphuongthuc}`);
  return res.data;
};

export const createPhuongThuc = async (data) => {
  const res = await axios.post(API_BASE, data, { withCredentials: true });
  return res.data;
};

export const updatePhuongThuc = async (maphuongthuc, data) => {
  const res = await axios.put(`${API_BASE}/${maphuongthuc}`, data, { withCredentials: true });
  return res.data;
};

export const deletePhuongThuc = async (maphuongthuc) => {
  const res = await axios.delete(`${API_BASE}/${maphuongthuc}`, { withCredentials: true });
  return res.data;
};
