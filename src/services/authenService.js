import axios from 'axios';

export const loginRequest = async (email, password) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/login',
   { email, matkhau: password },
    { withCredentials: true }
  );
  return response.data;
};

export const registerRequest = async (email, password) => {
  const response = await axios.post(
    'http://localhost:3000/api/users/register',
    { email, matkhau: password },
    { withCredentials: true }
  );
  return response.data;
};
