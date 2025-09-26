import axios from "axios";
import { API_CONFIG, STORAGE_KEYS, HTTP_STATUS } from "../constants";

// Cấu hình base URL từ constants
const API_BASE_URL = API_CONFIG.BASE_URL;
const API_TIMEOUT = API_CONFIG.TIMEOUT;

// Tạo instance axios với cấu hình mặc định
const apiClient = axios.create({
  baseURL: API_BASE_URL,
  timeout: API_TIMEOUT,
  headers: {
    "Content-Type": "application/json",
  },
});

// Interceptor để thêm token vào header (nếu có)
apiClient.interceptors.request.use(
  (config) => {
    const token = localStorage.getItem(STORAGE_KEYS.TOKEN);
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
    if (error.response?.status === HTTP_STATUS.UNAUTHORIZED) {
      // Token hết hạn, redirect về login
      localStorage.removeItem(STORAGE_KEYS.TOKEN);
      window.location.href = "/login";
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
          "Content-Type": "multipart/form-data",
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
  getAll: () => apiService.get(API_CONFIG.ENDPOINTS.CONTACTS),
  getById: (id) => apiService.get(API_CONFIG.ENDPOINTS.CONTACT_BY_ID(id)),
  create: (data) => apiService.post(API_CONFIG.ENDPOINTS.CONTACTS, data),
  update: (id, data) =>
    apiService.put(API_CONFIG.ENDPOINTS.CONTACT_BY_ID(id), data),
  delete: (id) => apiService.delete(API_CONFIG.ENDPOINTS.CONTACT_BY_ID(id)),
};

export const projectAPI = {
  getAll: () => apiService.get(API_CONFIG.ENDPOINTS.PROJECTS),
  getById: (id) => apiService.get(API_CONFIG.ENDPOINTS.PROJECT_BY_ID(id)),
  create: (data) => apiService.post(API_CONFIG.ENDPOINTS.PROJECTS, data),
  update: (id, data) =>
    apiService.put(API_CONFIG.ENDPOINTS.PROJECT_BY_ID(id), data),
  delete: (id) => apiService.delete(API_CONFIG.ENDPOINTS.PROJECT_BY_ID(id)),
};

export const serviceAPI = {
  getAll: () => apiService.get(API_CONFIG.ENDPOINTS.SERVICES),
  getById: (id) => apiService.get(API_CONFIG.ENDPOINTS.SERVICE_BY_ID(id)),
  create: (data) => apiService.post(API_CONFIG.ENDPOINTS.SERVICES, data),
  update: (id, data) =>
    apiService.put(API_CONFIG.ENDPOINTS.SERVICE_BY_ID(id), data),
  delete: (id) => apiService.delete(API_CONFIG.ENDPOINTS.SERVICE_BY_ID(id)),
};

export const blogAPI = {
  getAll: () => apiService.get(API_CONFIG.ENDPOINTS.BLOGS),
  getById: (id) => apiService.get(API_CONFIG.ENDPOINTS.BLOG_BY_ID(id)),
  getBySlug: (slug) => apiService.get(API_CONFIG.ENDPOINTS.BLOG_BY_SLUG(slug)),
  getCategories: () => apiService.get(API_CONFIG.ENDPOINTS.BLOG_CATEGORIES),
  create: (data) => apiService.post(API_CONFIG.ENDPOINTS.BLOGS, data),
  update: (id, data) =>
    apiService.put(API_CONFIG.ENDPOINTS.BLOG_BY_ID(id), data),
  delete: (id) => apiService.delete(API_CONFIG.ENDPOINTS.BLOG_BY_ID(id)),
};

export const chatAPI = {
  ask: (query, maxResults = 5) =>
    apiService.post(API_CONFIG.ENDPOINTS.CHAT_ASK, {
      query,
      maxResults,
    }),
};

export default apiService;
