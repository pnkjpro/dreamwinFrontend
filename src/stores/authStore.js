import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';
import api from '@/plugins/axios';


export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const error = ref(null);
  const token = ref(localStorage.getItem('authToken'));

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
      user.value = response.data.data.user;
      token.value = response.data.data.token;
      localStorage.setItem('authToken', response.data.data.token);
      loading.value = false;
      return {
          success: response.data.success,
          message: response.data.message
      }
    } catch (error) {
        loading.value = false;
        console.error("Error login user:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    }
  }

  async function login(credentials) {
    loading.value = true;
    try {
      await axios.get(`${import.meta.env.BASE_API}/sanctum/csrf-cookie`);
      const response = await api.post('/users/login', credentials);
      user.value = response.data.data.user;
      console.log("user responses", userResponses.value);
      token.value = response.data.data.token;
      localStorage.setItem('authToken', response.data.data.token);
      loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error login user:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
  }

  async function logout() {
    loading.value = true;
    try {
      // If you have a backend logout endpoint
      if (token.value) {
        await api.post('/users/logout');
      }
  
    } catch (err) {
      console.error('Logout error:', err);
      error.value = err.response?.data?.message || 'Logout failed';

    } finally {
      loading.value = false;
      localStorage.removeItem('authToken');
      token.value = null;
      user.value = null;
      return { success: true, message: 'Logged out successfully' };
    }
  }

  async function fetchUser() {
    loading.value = true;
    console.log("fetching user.. ");
    try {
      const response = await api.get('/users/user');
      console.log(response.data.user);
      user.value = response.data.user;
      console.log("user responses:", userResponses.value);
      console.log("fetched user data", user.value);
      return user.value;
    } catch (err) {
      user.value = null;
      error.value = 'User not authenticated';
    } finally {
      loading.value = false;
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