import axios from 'axios';

const API_URL = import.meta.env.VITE_BACKEND_URL

//get the token
const getAuthHeaders = () => ({
    headers: {
        Authorization: `Bearer ${localStorage.getItem('token')}` 
    }
});

//create issue
export const createIssue = (data)=>{
     return axios.post (`${API_URL}/isssue`,data, getAuthHeaders());
}

//update issue
export const updateIssue = (data,id)=>{
     return axios.put (`${API_URL}/isssue/${id}`,data, getAuthHeaders());
}

//get issue list
export const issueList = (search, page, limit)=>{
     return axios.get(`${API_URL}/isssue`,{
        params: { search, page, limit },
        ...getAuthHeaders()
    });
}

//get issue by id
export const getIssueById = (id)=>{
     return axios.get(`${API_URL}/isssue/${id}`, getAuthHeaders());
}

//update issue status
export const updateIssueStatus = (id, status)=>{
     return axios.patch(`${API_URL}/isssue/${id}/status`, { status }, getAuthHeaders());
}

