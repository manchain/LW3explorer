import axios from 'axios';

const api = axios.create({
  baseURL: 'http://64.227.185.193:3009',
  headers: {
    'Accept': 'application/json',
    'Content-Type': 'application/json',
  },
});

export default api; 