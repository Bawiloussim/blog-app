import axios from 'axios';

const API = axios.create({ baseURL: 'http://localhost:5000/api' });

export const fetchBlogs = () => API.get('/blogs');
export const fetchBlog = (id) => API.get(`/blogs/${id}`);
export const createBlog = (data) => API.post('/blogs', data);
export const updateBlog = (id, data) => API.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => API.delete(`/blogs/${id}`);