import axios from 'axios';

const axiosInstance = axios.create({
    baseURL: 'http://localhost:5000', // Flask server
    headers: {
        'Content-Type': 'application/json'
    },
    timeout: 10000
});

export default axiosInstance;