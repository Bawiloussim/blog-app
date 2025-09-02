import axios from 'axios';

// const API_URL = 'http://localhost:5000/api'; // local API_URL
const API_URL = import.meta.env.VITE_API_BASE_URL; // Production API_URL

const api = axios.create({
    baseURL: API_URL,
});

// Ajout du token si présent
api.interceptors.request.use(
    (config) => {
        const token = localStorage.getItem('token');
        if (token) {
            config.headers.Authorization = `Bearer ${token}`;
        }
        return config;
    },
    (error) => Promise.reject(error)
);

// Gestion des erreurs
api.interceptors.response.use(
    (response) => response,
    (error) => {
        if (error.response?.status === 401) {
            localStorage.removeItem('token');
            window.location.href = '/login';
        }
        return Promise.reject(error);
    }
);

// Fonctions API
export const fetchBlogs = () => api.get('/blogs');
export const fetchBlog = (id) => api.get(`/blogs/${id}`);
export const createBlog = (data) => api.post('/blogs', data);
export const updateBlog = (id, data) => api.put(`/blogs/${id}`, data);
export const deleteBlog = (id) => api.delete(`/blogs/${id}`);

export default api;
