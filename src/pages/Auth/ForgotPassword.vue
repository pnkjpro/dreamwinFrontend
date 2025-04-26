<template>
    <div class="min-h-screen bg-gradient-to-b from-gray-100 to-gray-800 flex flex-col items-center relative overflow-hidden">
      <!-- Background pattern -->
      <div class="relative inset-0 opacity-10">
        <div v-for="i in 20" :key="i" class="absolute" :style="{
          left: `${Math.random() * 100}%`,
          top: `${Math.random() * 100}%`,
          transform: `rotate(${Math.random() * 360}deg)`
        }">
          <div class="text-4xl text-gray-500">
            {{ ['⬠', '⬡', '◯', '◫', '◪', '△', '▽', '◇', '❖', '✧', '✦'][Math.floor(Math.random() * 11)] }}
          </div>
        </div>
      </div>
  
      <!-- Logo Area -->
      <div class="mt-16 mb-8">
        <div class="flex items-center">
          <div class="text-6xl font-bold">
            <span class="text-orange-500">H</span><span class="text-purple-700">IMP</span><span class="text-blue-700">RI</span>
          </div>
        </div>
        <div class="text-gray-600 italic text-center mt-1">LET THE GAME BEGIN</div>
      </div>
  
      <!-- Forgot Password Form -->
      <div class="bg-white rounded-3xl p-8 w-11/12 max-w-md shadow-lg">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-2">Forgot Password</h1>
        <p class="text-xl text-center text-gray-700 mb-8">Enter your email to reset your password</p>
        
        <form @submit.prevent="handleSubmit">
          <div class="mb-6 relative">
            <input 
              type="email" 
              placeholder="Email Address" 
              class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
              v-model="email"
              :disabled="authStore.loading"
              required
            />
            <p v-if="error" class="text-red-500 text-sm mt-2">{{ error }}</p>
            <p v-if="successMessage" class="text-green-500 text-sm mt-2">{{ successMessage }}</p>
          </div>
          
          <button 
            type="submit" 
            :class="['w-full bg-orange-400 hover:bg-orange-500 text-white py-4 px-6 rounded-full text-xl font-bold transition duration-300', 
                  { 'opacity-75 cursor-not-allowed': authStore.loading }]"
            :disabled="authStore.loading"
          >
            <div v-if="authStore.loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Submitting...
            </div>
            <span v-else>Send OTP</span>
          </button>
        </form>
      </div>
      
      <!-- Back to Login Option -->
      <div @click="goToLogin" class="mt-8 mb-12 text-white text-lg cursor-pointer">
        <span class="text-orange-400 font-bold">← Back to Login</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useRouter } from 'vue-router';
  import { useAuthStore } from '@/stores/authStore';
  import { useToast } from 'vue-toastification';
  import { storeToRefs } from 'pinia';
  
  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore();
  const { verificationLabel } = storeToRefs(authStore);
  
  const email = ref('');
  
  // Handle form submission
  const handleSubmit = async () => {
      if (!email.value) {
        toast.error('Please enter your email address');
        return;
      }
      
      // Email validation
      const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
      if (!emailRegex.test(email.value)) {
        toast.error('Please enter a valid email address');
        return;
      }
      verificationLabel.value = 'reset_password';
      const result = await authStore.sendOtp({email: email.value, label: verificationLabel.value});
      if(!result.success){
        toast.error(result.message);
        return;
      }
      toast.success('Password reset OTP sent to your email');
      
      // Optionally redirect to verification page after a delay
      setTimeout(() => {
        router.push({ 
          name: 'OtpVerify'
        });
      }, 2000);
  };
  
  // Navigate to login page
  const goToLogin = () => {
    router.push({ name: 'Login' });
  };
  </script>