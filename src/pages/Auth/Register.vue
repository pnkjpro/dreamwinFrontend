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
      
      <form @submit.prevent="handleRegistration">
        <div class="mb-4 relative">
          <input 
            type="text" 
            placeholder="Name" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.name"
          />
          <p v-if="errors.name" class="text-red-500 text-sm mt-1">{{ errors.name }}</p>
        </div>
        <div class="mb-4 relative">
          <input 
            type="number" 
            placeholder="Contact Number" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.mobile"
          />
          <p v-if="errors.mobile" class="text-red-500 text-sm mt-1">{{ errors.mobile }}</p>
        </div>
        <div class="mb-4 relative">
          <input 
            type="text" 
            placeholder="Email" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.email"
          />
          <p v-if="errors.mobile" class="text-red-500 text-sm mt-1">{{ errors.email }}</p>
        </div>
        
        <div class="mb-4 relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Password" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.password"
          />
          <p v-if="errors.mobile" class="text-red-500 text-sm mt-1">{{ errors.password }}</p>
          <button 
            type="button" 
            @click="togglePassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>
        <div class="mb-4 relative">
          <input 
            :type="showPassword ? 'text' : 'password'" 
            placeholder="Confirm Password" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.password_confirmation"
          />
          <p v-if="errors.mobile" class="text-red-500 text-sm mt-1">{{ errors.password_confirmation }}</p>
          <button 
            type="button" 
            @click="togglePassword" 
            class="absolute right-4 top-1/2 transform -translate-y-1/2 text-yellow-400"
          >
            <font-awesome-icon :icon="showPassword ? 'eye' : 'eye-slash'" />
          </button>
        </div>

        <div class="mb-4 relative">
          <input 
            type="text" 
            placeholder="Refer Code(Optional)" 
            class="w-full bg-gray-200 py-4 px-6 rounded-xl text-gray-700"
            v-model="form.refer_code"
          />
          <p v-if="errors.refer_code" class="text-red-500 text-sm mt-1">{{ errors.refer_code }}</p>
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
              Registering...
            </div>
            <span v-else>Register</span>
          </button>
      </form>
    </div>
    
    <!-- Register Option -->
    <div @click="navigateTo('/auth/login')" class="mt-8 mb-12 text-white text-lg">
      Already have an account? <span class="text-orange-400 font-bold">Login Now</span>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue';
import { useRoute, useRouter } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import * as yup from "yup";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';
import { useToast } from 'vue-toastification';

// Add icons to the library
library.add(faEye, faEyeSlash, faGoogle, faFacebook);

const router = useRouter();
const route = useRoute();
const toast = useToast();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);

const errors = ref({});

// Validation Schema using Yup
const schema = yup.object().shape({
  name: yup.string().required("Name is required"),
  mobile: yup
    .string()
    .matches(/^\d{10}$/, "Mobile number must be 10 digits")
    .required("Mobile number is required"),
  email: yup.string().email("Invalid email format").required("Email is required"),
  password: yup
    .string()
    .min(6, "Password must be at least 6 characters")
    .required("Password is required"),
    password_confirmation: yup
    .string()
    .oneOf([yup.ref("password")], "Passwords must match")
    .required("Confirm password is required"),
});

// Validate Form before Submission
const validateForm = async () => {
  try {
    await schema.validate(form.value, { abortEarly: false });
    errors.value = {}; // Clear errors if validation passes
    return true;
  } catch (validationErrors) {
    const formattedErrors = {};
    validationErrors.inner.forEach((err) => {
      formattedErrors[err.path] = err.message;
    });
    errors.value = formattedErrors;
    return false;
  }
};


// Reactive state
const form = ref({
  name: "",
  mobile: null,
  email: "",
  password: "",
  password_confirmation: "",
  refer_code: "",
})

if(route.query.refer_code){
  form.value.refer_code = route.query.refer_code;
}

const handleRegistration = async () => {
  const isValid = await validateForm();
  if (!isValid) return;

  const result = await authStore.register(form);

  if (!result.success) {
    const messages = result.message;

    if (typeof messages === 'object' && messages !== null && !Array.isArray(messages)) {
      Object.values(messages).forEach((msgArray, index) => {
        msgArray.forEach((msg, innerIndex) => {
          setTimeout(() => toast.error(msg), (index + innerIndex) * 300);
        });
      });
    } else if (Array.isArray(messages)) {
      messages.forEach((msg, index) => {
        setTimeout(() => toast.error(msg), index * 300);
      });
    } else {
      toast.error(messages);
    }

    return;
  }

  navigateTo('/auth/otp/verify');
};

const navigateTo = (path) => {
  router.push(path);
}

const showPassword = ref(false);
const stayLoggedIn = ref(false);

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};


</script>