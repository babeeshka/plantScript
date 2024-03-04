// axiosInstance.ts
import axios from 'axios';

export const axiosInstance = axios.create({
  baseURL: 'http://localhost:3000', // Adjust the baseURL according to your server configuration
});
