
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL
export const createIssue = (data)=>{
     return axios.post (`${API_URL}/isssue`,data);
}

export const updateIssue = (data,id)=>{
     return axios.post (`${API_URL}/isssue/${id}`,data);
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