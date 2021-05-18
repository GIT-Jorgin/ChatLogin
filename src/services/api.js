import axios from 'axios';

const api = axios.create({
    baseURL: process.env.AXIOS_URL || 'http://192.168.1.38:3333',
})

export default api;