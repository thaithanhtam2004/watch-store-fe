// utils/axiosPublic.js
import axios from 'axios';

const axiosPublic = axios.create({
  baseURL: 'http://localhost:3000/api',
  withCredentials: false, // ✅ Không gửi cookie cho API public
});

export default axiosPublic;
