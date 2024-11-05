// src/api.js
import axios from 'axios';

const api = axios.create({
  baseURL: 'https://isro.vercel.app/api',
});

export const getSpacecrafts = () => api.get('/spacecrafts');
export const getLaunchers = () => api.get('/launchers');
export const getCustomerSatellites = () => api.get('/customer_satellites');
export const getCentres = () => api.get('/centres');
