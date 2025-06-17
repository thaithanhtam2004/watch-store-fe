import axios from "axios";

export const getCartByUser = (mataikhoan) =>
  axios.get(`http://localhost:3000/api/giohang/${mataikhoan}`);

export const placeOrder = (data) =>
  axios.post("http://localhost:3000/api/checkout", data);
