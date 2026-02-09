
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL
export const registerUser = (data)=>{
     return axios.post (`${API_URL}/user`,data);
}

export const login = (data)=>{
    return axios.post(`${API_URL}/auth/login`,data)
}

export const users = ()=>{

     const token = localStorage.getItem('token');

    return axios.get(`${API_URL}/user/list`,{
        headers: {
            Authorization: `Bearer ${token}` 
        }
    });
}