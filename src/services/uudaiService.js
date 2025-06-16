import axios from 'axios';

const API_BASE = 'http://localhost:3000/api/uudais'; // Đảm bảo backend khớp endpoint này

export const getAllUuDai = async () => {
  const res = await axios.get(API_BASE);
  return res.data.data; // giả định response có dạng { data: [...] }
};

export const getUuDaiById = async (mauudai) => {
  const res = await axios.get(`${API_BASE}/${mauudai}`);
  return res.data;
};

export const createUuDai = async (data) => {
  const res = await axios.post(API_BASE, data, { withCredentials: true });
  return res.data;
};

export const updateUuDai = async (mauudai, data) => {
  const res = await axios.put(`${API_BASE}/${mauudai}`, data, { withCredentials: true });
  return res.data;
};

export const deleteUuDai = async (mauudai) => {
  const res = await axios.delete(`${API_BASE}/${mauudai}`, { withCredentials: true });
  return res.data;
};
