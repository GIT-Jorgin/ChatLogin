import axios from 'axios';

const api = axios.create({
    baseURL: 'https://chatloginbackend.herokuapp.com',
})

export default api;