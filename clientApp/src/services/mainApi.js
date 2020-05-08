import axios from 'axios';
import { getToken } from './authJwt';

const END_POINT = "https://localhost:3001";

const mainApi = axios.create({
    baseURL: END_POINT
});

mainApi.interceptors.request.use(
    async config => {
        const token = getToken();

        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }

        return config;
    },
    error => Promise.reject(error)
);

export default mainApi;