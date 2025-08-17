import axios from 'axios';

const API = axios.create({ baseURL: import.meta.env.VITE_API_URL, withCredentials: true});

export const fetchBlogs = () => API.get('/blogs');
export const fetchBlog = (id) => API.get(`/blogs/${id}`);
export const createBlog = (data) => API.post('/blogs', data);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);

export default API;