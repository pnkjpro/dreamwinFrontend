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

    <!-- Reset Password Form -->
    <div class="bg-white rounded-3xl p-8 w-11/12 max-w-md shadow-lg">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-2">Reset Password</h1>
      <p class="text-xl text-center text-gray-700 mb-8">Create a new password for your account</p>
      
      <form>
        <div class="mb-4 relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="New Password" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.password"
            required
          />
          <button 
            type="button" 
            @click="togglePassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
        
        <div class="mb-6 relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Confirm Password" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.confirmPassword"
            required
          />
          <button 
            type="button" 
            @click="togglePassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
        
        
        <button 
          @click="handleResetPassword"
          :class="['w-full bg-orange-400 hover:bg-orange-500 text-white py-4 px-6 rounded-full text-xl font-bold transition duration-300', 
                 { 'opacity-75 cursor-not-allowed': authStore.loading }]"
          :disabled="authStore.loading"
        >
          <div v-if="authStore.loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Updating...
          </div>
          <span v-else>Reset Password</span>
        </button>
      </form>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { useAuthStore } from '@/stores/authStore';
import { useToast } from 'vue-toastification';

const router = useRouter();
const authStore = useAuthStore();

// Form data
const form = ref({
  password: '',
  confirmPassword: ''
});

// UI states
const showPassword = ref(false);
const toast = useToast();

// Toggle password visibility
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};

// Handle form submission
const handleResetPassword = async () => {
    // Basic validation
    console.log(form.value);
    if (!form.value.password) {
      toast.error('Please enter a new password');
      return;
    }
    
    if (form.value.password.length < 6) {
      toast.error('Password must be at least 6 characters');
      return;
    }
    
    if (!form.value.confirmPassword) {
      toast.error('Please confirm your password');
      return;
    }

    // Call auth store method to reset password
    const result = await authStore.resetPassword({
      password: form.value.password,
      password_confirmation: form.value.confirmPassword
    });

    if(!result.success){
      toast.error(result.message);
      return;
    } else {
      toast.success('Password has been reset successfully!');
      
      // Redirect to login after a delay
      setTimeout(() => {
        router.push({ name: 'Home' });
      }, 2000);
    }
};
</script>