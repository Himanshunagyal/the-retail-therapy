import axios from 'axios';
import { getAdminToken } from './adminAuth';

const API_URL = process.env.NEXT_PUBLIC_API_URL || 'http://localhost:5000/api';

const api = axios.create({
  baseURL: API_URL,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Add auth token to requests
api.interceptors.request.use((config) => {
  const token = getAdminToken();
  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }
  return config;
});

// Products
export const getProducts = async (params = {}) => {
  const response = await api.get('/products', { params });
  return response.data;
};

export const getProductById = async (id) => {
  const response = await api.get(`/products/${id}`);
  return response.data;
};

// Orders
export const createOrder = async (orderData) => {
  const response = await api.post('/orders', orderData);
  return response.data;
};

export const getOrderById = async (id) => {
  const response = await api.get(`/orders/${id}`);
  return response.data;
};

export const updateOrderStatus = async (id, statusData) => {
  const response = await api.put(`/orders/${id}/status`, statusData);
  return response.data;
};

// Payment - Razorpay
export const createRazorpayOrder = async (paymentData) => {
  const response = await api.post('/payment/create-order', paymentData);
  return response.data;
};

export const verifyRazorpayPayment = async (paymentData) => {
  const response = await api.post('/payment/verify', paymentData);
  return response.data;
};

export default api;