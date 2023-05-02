import axios from 'axios';
const API_BASE = process.env.REACT_APP_API_BASE;

export const axiosInstance = axios.create({
    baseURL : API_BASE,
    headers : {
        'Content-Type' : 'application/json',
        authorization : `Bearer ${localStorage.getItem('token')}`
        }
});