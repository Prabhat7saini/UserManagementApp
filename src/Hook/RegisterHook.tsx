// import axios from 'axios';

// // Create an instance of axios with a custom configuration
// const axiosInstance = axios.create({
//   baseURL: 'https://api.example.com/',
//   timeout: 10000, // Timeout of 10 seconds
// });

// // Function to refresh token (replace with your actual implementation)
// const refreshToken = async () => {
//   // Example code to fetch a new token, you need to implement this
//   const response = await axiosInstance.post('/refresh-token', { refreshToken });
//   return response.data.accessToken; // Assuming the response structure has accessToken
// };

// let isRefreshing = false;
// let refreshSubscribers = [];

// // Axios interceptor for token refresh and retrying failed requests
// axiosInstance.interceptors.response.use(
//   (response) => {
//     return response;
//   },
//   async (error) => {
//     const originalRequest = error.config;

//     // Check if the error is due to expired token
//     if (error.response && error.response.status === 401 && !originalRequest._retry) {
//       if (isRefreshing) {
//         // Wait for token refresh and then retry the original request
//         try {
//           const token = await new Promise((resolve) => {
//             refreshSubscribers.push((newToken) => {
//               resolve(newToken);
//             });
//           });
//           originalRequest.headers['Authorization'] = `Bearer ${token}`;
//           return axiosInstance(originalRequest);
//         } catch (refreshError) {
//           return Promise.reject(refreshError);
//         }
//       }

//       originalRequest._retry = true; // Mark the request to prevent infinite loop

//       isRefreshing = true;
//       originalRequest.headers['Authorization'] = `Bearer ${await refreshToken()}`;

//       // Retry the original request with the new token
//       return axiosInstance(originalRequest).then((response) => {
//         // Replace the expired token with the new one in local storage or wherever you store it
//         isRefreshing = false;
//         refreshSubscribers.forEach((callback) => callback(response.data.accessToken));
//         refreshSubscribers = [];
//         return response;
//       }).catch((refreshError) => {
//         isRefreshing = false;
//         return Promise.reject(refreshError);
//       });
//     }
//     // If the error is not due to token expiration, just reject the promise
//     return Promise.reject(error);
//   }
// );

// export default axiosInstance;
// import React from 'react'

const RegisterHook = () => {
  return (
    <div>
      
    </div>
  )
}

export default RegisterHook
