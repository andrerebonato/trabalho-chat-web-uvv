import axios from 'axios';
import { getToken } from './authJwt';

const END_POINT = "http://localhost:3001";

//endpoints
export const eps = {
    signUp: '/user/register',
    signIn: '/user/login',
    getOldMessages: '/user/get-my-old-messages',
    getUserData: '/user/get-by-id',
    getAllMessages: '/message/list-all',
    createMessage: '/message/create'
}

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