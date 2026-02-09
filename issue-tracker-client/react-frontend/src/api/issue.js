import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

//get the token
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
    }
});

export const createIssue = (data)=>{
     return axios.post (`${API_URL}/isssue`,data, getAuthHeaders());
}

export const updateIssue = (data,id)=>{
     return axios.put (`${API_URL}/isssue/${id}`,data, getAuthHeaders());
}

export const getIssues = (search, page, limit)=>{
     return axios.get(`${API_URL}/isssue`,{
        params: { search, page, limit },
        ...getAuthHeaders()
    });
}

export const getIssueById = (id)=>{
     return axios.get(`${API_URL}/isssue/${id}`, getAuthHeaders());
}

export const updateIssueStatus = (id, status)=>{
     return axios.patch(`${API_URL}/isssue/${id}/status`, { status }, getAuthHeaders());
}

export const login = (data)=>{
    return axios.post(`${API_URL}/auth/login`,data)
}

export const users = ()=>{
     return axios.get(`${API_URL}/user/list`, getAuthHeaders());
}
