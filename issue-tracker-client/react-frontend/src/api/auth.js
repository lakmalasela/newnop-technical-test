
import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

//get the token
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
    }
});
export const registerUser = (data)=>{
     return axios.post (`${API_URL}/user`,data);
}

export const login = (data)=>{
    return axios.post(`${API_URL}/auth/login`,data)
}

export const users = (search, page, limit) =>{

    return axios.get(`${API_URL}/user/list`,{
        params: { search, page, limit },
        ...getAuthHeaders()
    });
}
