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
  
      <!-- Login Form -->
      <div class="bg-white rounded-3xl p-8 w-11/12 max-w-md shadow-lg">
        <h1 class="text-4xl font-bold text-center text-gray-800 mb-2">Welcome Back!</h1>
        <p class="text-xl text-center text-gray-700 mb-8">Please log in with your details</p>
        
        <form @submit.prevent="handleLogin">
          <div class="mb-4 relative">
            <input 
              type="text" 
              placeholder="Enter your email or username" 
              class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
              v-model="email"
            />
          </div>
          
          <div class="mb-4 relative">
            <input 
              :type="showPassword ? 'text' : 'password'" 
              placeholder="Password" 
              class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
              v-model="password"
            />
            <button 
              type="button" 
              @click="togglePassword" 
              class="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
            >
              <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
            </button>
          </div>
          
          <div class="flex justify-between items-center mb-8">
            <div>
              <label class="flex items-center cursor-pointer">
                <input type="checkbox" class="w-5 h-5 border-2 border-gray-300 rounded" v-model="stayLoggedIn">
                <span class="ml-2 text-gray-700">Stay Logged In</span>
              </label>
            </div>
            <div @click="navigateTo('/auth/password/forgot')" class="text-purple-500 hover:underline">Forgot Password?</div>
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
              Logging...
            </div>
            <span v-else>Log In</span>
          </button>
        </form>
      </div>
      
      <!-- Alternative Login Options -->
      <!-- <div class="mt-8 w-11/12 max-w-md">
        <div class="text-white text-center mb-4 text-lg">Or continue with</div>
        
        <div class="space-y-4">
          <button class="w-full bg-white text-orange-400 py-4 px-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-300">
            <font-awesome-icon :icon="['fab', 'google']" class="mr-2 text-xl" />
            <span class="text-lg">Login with Google</span>
          </button>
          
          <button class="w-full bg-white text-orange-400 py-4 px-6 rounded-full flex items-center justify-center hover:bg-gray-100 transition duration-300">
            <font-awesome-icon :icon="['fab', 'facebook']" class="mr-2 text-xl" />
            <span class="text-lg">login with Facebook</span>
          </button>
        </div>
      </div> -->
      
      <!-- Register Option -->
      <div @click="navigateTo('/auth/register')" class="mt-8 mb-12 text-white text-lg">
        Don't you have an account? <span class="text-orange-400 font-bold">Register Now</span>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/authStore';
  import { useRouter } from 'vue-router';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
  import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
  import { useToast } from 'vue-toastification';
  
  // Add icons to the library
  library.add(faEye, faEyeSlash, faGoogle, faFacebook);
  
  // Reactive state
  const email = ref('');
  const password = ref('');
  const showPassword = ref(false);
  const stayLoggedIn = ref(false);
  const router = useRouter();
  const toast = useToast();

  const authStore = useAuthStore();
  const { verificationLabel } = storeToRefs(authStore);
  
  // Methods
  const togglePassword = () => {
    showPassword.value = !showPassword.value;
  };
  
  const handleLogin = async() => {
    const result = await authStore.login({login: email.value, password: password.value})
    if(!result.success){
      toast.error(result.message);
    } else {
      if(result.isVerified){
        navigateTo('/home');
      } else {
         verificationLabel.value = 'verify_email';
        navigateTo('/auth/otp/verify');
      }
    }
  };

  const navigateTo = (path) => {
    router.push(path);
  }
  </script>