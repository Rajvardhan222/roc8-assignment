import axios from 'axios';

// Create an instance of axios
export const apiClient = axios.create({
  baseURL: process.env.NODE_ENV == 'production' ? process.env.NEXT_PUBLIC_URL :'http://localhost:3001/api', 
  timeout: 10000, withCredentials: true,
  headers: {
    'Content-Type': 'application/json',
  },
});

apiClient.interceptors.response.use(
  response => response,
  error => {
    // Handle the error
    if (error.response && error.response.data) {
      return Promise.reject(error.response.data);
    }
    return Promise.reject(error);
  }
);

