import axios from 'axios';

const api = axios.create({
   baseURL: 'https://localhost:8090/api',
});

// Add an interceptor for all requests
api.interceptors.request.use(config => {
   // Retrieve the access token from React state or a state management system
   const accessToken = 'yourAccessToken';

   // Add the access token to the Authorization header
   config.headers.Authorization = `Bearer ${accessToken}`;

   return config;
});

export default api;