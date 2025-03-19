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
          <span class="text-orange-500">D</span><span class="text-purple-700">DREAM</span> <span class="text-blue-700">WIN</span>
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
        
        <div class="flex justify-between items-center mb-8">
          <div>
            <label class="flex items-center cursor-pointer">
              <input type="checkbox" class="w-5 h-5 border-2 border-gray-300 rounded" v-model="stayLoggedIn">
              <span class="ml-2 text-gray-700">Stay Logged In</span>
            </label>
          </div>
          <a href="#" class="text-purple-500 hover:underline">Forgot Password?</a>
        </div>
        
        <button type="submit" class="w-full bg-orange-400 hover:bg-orange-500 text-white py-4 px-6 rounded-full text-xl font-bold transition duration-300">
          Register
        </button>
      </form>
    </div>
    
    <!-- Register Option -->
    <div class="mt-8 mb-12 text-white text-lg">
      Already have an account? <a href="#" class="text-orange-400 font-bold">Login Now</a>
    </div>
  </div>
</template>

<script setup>
import { ref, watch, computed, reactive, onMounted } from 'vue';
import { useRouter } from "vue-router";
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import * as yup from "yup";
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faEye, faEyeSlash } from '@fortawesome/free-solid-svg-icons';
import { faGoogle, faFacebook } from '@fortawesome/free-brands-svg-icons';

// Add icons to the library
library.add(faEye, faEyeSlash, faGoogle, faFacebook);

const router = useRouter();
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
  password_confirmation: ""
})

const handleRegistration = async () => {
  console.log("clicked",form.value);
  const isValid = await validateForm();
  if (!isValid) return;
    try {
      await authStore.register(form);
      navigateToHome();
    } catch (error) {
      // Handle login errors
      console.error("Login failed", error);
    }
};

const navigateToHome = () => {
  console.log("Home clicked");
  router.push("/home");
}

const showPassword = ref(false);
const stayLoggedIn = ref(false);

// Methods
const togglePassword = () => {
  showPassword.value = !showPassword.value;
};


</script>