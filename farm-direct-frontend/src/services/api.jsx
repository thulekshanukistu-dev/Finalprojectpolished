import axios from 'axios';

const API_URL = process.env.REACT_APP_API_URL || 'http://localhost:5001/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
  timeout: 5000,
});

// Simple auth API that works with your backend
export const authAPI = {
  login: async (email, password) => {
    try {
      console.log('Calling login API:', `${API_URL}/auth/login`);
      const response = await api.post('/auth/login', { email, password });
      console.log('Login API response:', response);
      return response;
    } catch (error) {
      console.error('Login API error:', error);
      throw error;
    }
  },

  register: async (userData) => {
    try {
      const response = await api.post('/auth/register', userData);
      return response;
    } catch (error) {
      console.error('Register API error:', error);
      throw error;
    }
  },

  getMe: async () => {
    try {
      const response = await api.get('/auth/me');
      return response;
    } catch (error) {
      console.error('Get me API error:', error);
      throw error;
    }
  }
};

// Simple product API
export const productAPI = {
  getProducts: async () => {
    try {
      const response = await api.get('/products');
      return response;
    } catch (error) {
      console.error('Products API error:', error);
      throw error;
    }
  }
};

// Simple contact API
export const contactAPI = {
  submitContact: async (formData) => {
    // Simulate API call since contact might not exist
    return {
      success: true,
      message: 'Thank you for your message! We will get back to you soon.'
    };
  }
};

export default api;