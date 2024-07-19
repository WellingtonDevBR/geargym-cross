import axios from 'axios';

const API_URL = 'https://yourapiurl.com'; // Replace with your API URL

export const login = async (email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/login`, { email, password });
    return response.data;
  } catch (error) {
    throw new Error('Login failed');
  }
};

export const register = async (name: string, email: string, password: string) => {
  try {
    const response = await axios.post(`${API_URL}/register`, { name, email, password });
    return response.data;
  } catch (error) {
    throw new Error('Registration failed');
  }
};