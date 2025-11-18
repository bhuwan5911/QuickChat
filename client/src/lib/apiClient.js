// File: client/src/lib/apiClient.js
import axios from 'axios';

// Ek naya axios instance banayein
const apiClient = axios.create({
  // Aapke server ka base URL
  baseURL: 'http://localhost:5000/api'
});

// YEH SABSE IMPORTANT HISSA HAI (Request Interceptor)
apiClient.interceptors.request.use(
  (config) => {
    // Har request bhejme se pehle, localStorage se token uthao
    const token = localStorage.getItem('chat-token'); // <-- Check karein ki aapne token isi naam se save kiya hai

    if (token) {
      // Agar token hai, toh usse header mein 'Bearer' ke saath attach kar do
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

export default apiClient;