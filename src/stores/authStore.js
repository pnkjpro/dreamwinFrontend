import { defineStore } from 'pinia';
import { ref, reactive } from 'vue';
import axios from 'axios';
import api from '@/plugins/axios';
import { useToast } from 'vue-toastification';
import { useRouter } from 'vue-router';


export const useAuthStore = defineStore('auth', () => {
  const user = ref(null);
  const loading = ref(false);
  const toast = useToast();
  const verifyEmail = ref('');
  const verificationLabel = ref('');
  const router = useRouter();
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
      verifyEmail.value = response.data.data.email;
      verificationLabel.value = 'verify_email';
      // user.value = response.data.data.user;
      // token.value = response.data.data.token;
      // localStorage.setItem('authToken', response.data.data.token);
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
      if(response.data.data?.user?.email_verified_at == null){
        verificationLabel.value = 'verify_email';
        const result = await sendOtp({email: response.data.data.user.email, label: verificationLabel.value});
        if(!result.success){
          toast.error(result.message);
          return;
        }
      } else {
        user.value = response.data.data.user;
        token.value = response.data.data.token;
        localStorage.setItem('authToken', response.data.data.token);
      }
      loading.value = false;
      return {
          success: response.data.success,
          message: response.data.message,
          isVerified: response.data.data?.user?.email_verified_at == null ? false : true
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
      user.value = response.data.user;
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

  async function sendOtp(body){
    try{
      loading.value = true;
      const response = await api.post('/users/otp/send', body);
      verifyEmail.value = body.email;
      loading.value = false;
      return {
        success: response.data.success,
        message: response.data.message
      }
    } catch (error) {
        loading.value = false;
        console.error("Error sending OTP:", error);
        const errorMessage = error.response?.data?.message || "Error sending OTP";

        return { success: false, message: errorMessage };
    }
  }

  async function verifyOtp(body){
    try{
      loading.value = true;
      const response = await api.post('/users/otp/verify', body);
      if(response.data.success){
        user.value = response.data.data.user;
        token.value = response.data.data.token;
        localStorage.setItem('authToken', response.data.data.token);
      }
      loading.value = false;
      return {
        success: response.data.success,
        message: response.data.message
      }
    } catch (error) {
        loading.value = false;
        console.error("Error sending OTP:", error);
        const errorMessage = error.response?.data?.message || "Error sending OTP";

        return { success: false, message: errorMessage };
    }
  }

  async function resetPassword(body){
    try{
      loading.value = true;
      const response = await api.post('/users/password/reset', body);
      loading.value = false;
      return {
        success: response.data.success,
        message: response.data.message
      }
    } catch (error) {
        loading.value = false;
        console.error("Error sending OTP:", error);
        const errorMessage = error.response?.data?.message || "Error sending OTP";

        return { success: false, message: errorMessage };
    }
  }

  return { 
    user, 
    loading, 
    error, 
    token,
    verifyEmail,
    verificationLabel,
    register,
    sendOtp,
    verifyOtp, 
    resetPassword,
    login, 
    logout, 
    fetchUser,
    updateUpiId
  };
});