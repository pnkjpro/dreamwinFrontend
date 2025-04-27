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

    <!-- OTP Verification Form -->
    <div class="bg-white rounded-3xl p-8 w-11/12 max-w-md shadow-lg">
      <h1 class="text-4xl font-bold text-center text-gray-800 mb-2">Verify OTP</h1>
      <p class="text-xl text-center text-gray-700 mb-8">Please enter the OTP sent to your email, check Spam Folder also.</p>
      
      <form @submit.prevent="verifyOTP">
        <div class="mb-6">
          <div class="flex justify-center gap-2">
            <input 
              v-for="(digit, index) in otpDigits" 
              :key="index"
              v-model="otpDigits[index]"
              type="text" 
              maxlength="1"
              @input="handleDigitInput(index)"
              @keydown="handleKeydown($event, index)"
              @paste="handlePaste($event)"
              ref="otpInputs"
              class="w-12 h-16 text-center text-2xl font-bold bg-gray-200 rounded-xl text-gray-700 focus:outline-none focus:ring-2 focus:ring-orange-400"
            />
          </div>
          <p v-if="error" class="text-red-500 text-sm mt-4 text-center">{{ error }}</p>
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
            Verifying...
          </div>
          <span v-else>Verify OTP</span>
        </button>
      </form>

      <div class="mt-6 text-center">
        <p class="text-gray-600">Didn't receive the code?</p>
        <button 
          @click="resendOTP" 
          :class="['mt-2 text-orange-500 font-bold', { 'opacity-50 cursor-not-allowed': resendLoading || countdown > 0 }]"
          :disabled="resendLoading || countdown > 0"
        >
          <div v-if="resendLoading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-1 h-4 w-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Sending...
          </div>
          <span v-else-if="countdown > 0">Resend in {{ countdown }}s</span>
          <span v-else>Resend OTP</span>
        </button>
      </div>
    </div>
    
    <!-- Back Option -->
    <div @click="goBack" class="mt-8 mb-12 text-white text-lg cursor-pointer">
      <span class="text-orange-400 font-bold">← Back to Login</span>
    </div>
  </div>
</template>

<script setup>
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { ref, computed, onMounted, onUnmounted, nextTick } from 'vue';
import { useRouter, useRoute } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const route = useRoute();
const authStore = useAuthStore();
const { verifyEmail, verificationLabel } = storeToRefs(authStore);

// OTP inputs
const otpLength = 6;
const otpDigits = ref(Array(otpLength).fill(''));
const otpInputs = ref([]);
const resendLoading = ref(false);
const countdown = ref(0);
const error = ref('');
let countdownTimer = null;

// Start countdown timer
const startCountdown = () => {
  countdown.value = 60;
  countdownTimer = setInterval(() => {
    if (countdown.value > 0) {
      countdown.value -= 1;
    } else {
      clearInterval(countdownTimer);
    }
  }, 1000);
};

// Handle input for each digit
const handleDigitInput = (index) => {
  error.value = '';
  
  // Force digit to be numeric only
  otpDigits.value[index] = otpDigits.value[index].replace(/[^0-9]/g, '');
  
  // Auto-move to next input
  if (otpDigits.value[index] && index < otpLength - 1) {
    nextTick(() => {
      otpInputs.value[index + 1].focus();
    });
  }
};

// Handle keydown events
const handleKeydown = (event, index) => {
  // Handle backspace
  if (event.key === 'Backspace') {
    if (!otpDigits.value[index] && index > 0) {
      otpDigits.value[index - 1] = '';
      nextTick(() => {
        otpInputs.value[index - 1].focus();
      });
    }
  }
  
  // Handle arrow keys for navigation
  if (event.key === 'ArrowLeft' && index > 0) {
    nextTick(() => {
      otpInputs.value[index - 1].focus();
    });
  }
  
  if (event.key === 'ArrowRight' && index < otpLength - 1) {
    nextTick(() => {
      otpInputs.value[index + 1].focus();
    });
  }
};

// Handle paste event
const handlePaste = (event) => {
  event.preventDefault();
  const pastedData = event.clipboardData.getData('text').trim();
  
  // Check if pasted content is numeric and has the correct length
  if (/^\d+$/.test(pastedData)) {
    const digits = pastedData.split('').slice(0, otpLength);
    
    // Fill in as many digits as we have
    digits.forEach((digit, index) => {
      if (index < otpLength) {
        otpDigits.value[index] = digit;
      }
    });
    
    // Focus on the next empty input or the last input if all are filled
    const nextEmptyIndex = otpDigits.value.findIndex(digit => !digit);
    if (nextEmptyIndex !== -1) {
      nextTick(() => {
        otpInputs.value[nextEmptyIndex].focus();
      });
    } else {
      nextTick(() => {
        otpInputs.value[otpLength - 1].focus();
      });
    }
  } else {
    toast.error('Please paste a numeric OTP only');
  }
};

// Verify OTP
const verifyOTP = async () => {
  const otp = otpDigits.value.join('');
  
  if (otp.length !== otpLength) {
    toast.error('Please enter all digits of the OTP');
    return;
  }
  
  if (!verifyEmail.value) {
    toast.error('Email is missing. Please go back to login.');
    router.push('/auth/password/forgot')
    return;
  }
  
  const result = await authStore.verifyOtp({otp: otp, email: verifyEmail.value, label: verificationLabel.value});
  if(!result.success){
    toast.error(result.message);
    return;
  }
  if(verificationLabel.value === 'reset_password'){
    router.push({ name: 'ResetPassword' });
  } else {
    router.push({ name: 'Home' });
  }
};

// Resend OTP
const resendOTP = async () => {
  if (!verifyEmail.value) {
    toast.error('Email is missing. Please go back to login.');
    router.push('/auth/password/forgot');
    return;
  }
  const result = await authStore.sendOtp({email: verifyEmail.value, label: verificationLabel.value});
  if(!result.success){
    toast.error(result.message);
    return;
  }
  startCountdown();
};

// Go back to login page
const goBack = () => {
  router.push({ name: 'Login' });
};

// Focus first input on mount
onMounted(() => {
  nextTick(() => {
    if (otpInputs.value[0]) {
      otpInputs.value[0].focus();
    }
    startCountdown(); // Start initial countdown
  });
});

// Clear timer on unmount
onUnmounted(() => {
  if (countdownTimer) {
    clearInterval(countdownTimer);
  }
});
</script>