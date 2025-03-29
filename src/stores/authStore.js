import { defineStore } from 'pinia';
import { ref, inject } from 'vue';
import axios from 'axios';


export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const token = ref(localStorage.getItem('authToken'));
  const config = inject("config");

  const api = axios.create({
    baseURL: config.API_URL,
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });

  // Actions as functions
  async function init() {
    loading.value = true
    const storedToken = localStorage.getItem('authToken');
    
    if (storedToken) {
      token.value = storedToken
      try {
        await fetchUser()
      } catch (error) {
        clearAuth()
      }
    }
    
    loading.value = false
  }

  async function register(userData) {
    loading.value = true;
    try {
      const response = await api.post('/users/create', userData.value);
      user.value = response.data.user;
      token.value = response.data.token;
      localStorage.setItem('authToken', response.data.token);
      console.log("login returned user data", user.value);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Registration failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function login(credentials) {
    loading.value = true;
    try {
      // Get CSRF cookie
      await axios.get(`${config.BASE_URL}/sanctum/csrf-cookie`);
      // Attempt login
      const response = await api.post('/users/login', credentials);
      user.value = response.data.user;
      token.value = response.data.token;
      localStorage.setItem('authToken', response.data.token);
      console.log("login returned user data", user.value);
      console.log("login return with token:", token.value);
      return response.data;
    } catch (err) {
      error.value = err.response?.data?.message || 'Login failed';
      throw err;
    } finally {
      loading.value = false;
    }
  }

  async function logout() {
    loading.value = true;
    
    try {
      await api.post('/logout');
      isAuth.value = false;
      user.value = null;
    } catch (err) {
      error.value = err.response?.data?.message || 'Logout failed';
    } finally {
      loading.value = false;
    }
  }

  async function fetchUser() {
    loading.value = true;
    console.log("fetching user.. ");
    try {
      const response = await api.get('/users/user');
      console.log(response.data.user);
      user.value = response.data.user;
      console.log("fetched user data", user.value);
      return user.value;
    } catch (err) {
      user.value = null;
      error.value = 'User not authenticated';
    } finally {
    }
  }

  async function updateUpiId(newUpiId){
    try{
      loading.value = true;
      const response = await api.post('/users/update/upi', {
        upi_id: newUpiId
      });
      fetchUser();
      loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Updating Upi:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
  }

  return { 
    user, 
    loading, 
    error, 
    token,
    register, 
    login, 
    logout, 
    fetchUser,
    updateUpiId
  };
});