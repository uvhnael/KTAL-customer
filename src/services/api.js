import axios from 'axios';

// Cấu hình base URL từ environment variables
const API_BASE_URL = process.env.REACT_APP_API_BASE_URL;
const API_TIMEOUT = process.env.REACT_APP_API_TIMEOUT || 10000;

// Tạo instance axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Interceptor để thêm token vào header (nếu có)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem('token');
    if (token) {
      config.headers.Authorization = `Bearer ${token}`;
    }
    return config;
  },
  (error) => {
    return Promise.reject(error);
  }
);

// Interceptor để xử lý response và error
apiClient.interceptors.response.use(
  (response) => response,
  (error) => {
    if (error.response?.status === 401) {
      // Token hết hạn, redirect về login
      localStorage.removeItem('token');
      window.location.href = '/login';
    }
    return Promise.reject(error);
  }
);

// API Services
export const apiService = {
  // GET request
  get: async (endpoint) => {
    try {
      const response = await apiClient.get(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // POST request
  post: async (endpoint, data) => {
    try {
      const response = await apiClient.post(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // PUT request
  put: async (endpoint, data) => {
    try {
      const response = await apiClient.put(endpoint, data);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // DELETE request
  delete: async (endpoint) => {
    try {
      const response = await apiClient.delete(endpoint);
      return response.data;
    } catch (error) {
      throw error;
    }
  },

  // Upload file
  uploadFile: async (endpoint, formData) => {
    try {
      const response = await apiClient.post(endpoint, formData, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });
      return response.data;
    } catch (error) {
      throw error;
    }
  },
};

// Specific API calls cho các entity
export const contactAPI = {
  getAll: () => apiService.get('/contacts'),
  getById: (id) => apiService.get(`/contacts/${id}`),
  create: (data) => apiService.post('/contacts', data),
  update: (id, data) => apiService.put(`/contacts/${id}`, data),
  delete: (id) => apiService.delete(`/contacts/${id}`),
};

export const projectAPI = {
  getAll: () => apiService.get('/projects'),
  getById: (id) => apiService.get(`/projects/${id}`),
  create: (data) => apiService.post('/projects', data),
  update: (id, data) => apiService.put(`/projects/${id}`, data),
  delete: (id) => apiService.delete(`/projects/${id}`),
};

export const serviceAPI = {
  getAll: () => apiService.get('/services'),
  getById: (id) => apiService.get(`/services/${id}`),
  create: (data) => apiService.post('/services', data),
  update: (id, data) => apiService.put(`/services/${id}`, data),
  delete: (id) => apiService.delete(`/services/${id}`),
};

export default apiService;
