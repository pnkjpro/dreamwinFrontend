<template>
  <div class="min-h-screen bg-gradient-to-b from-green-300 to-green-600 p-4 flex flex-col items-center">
  
    <!-- Success Quiz Card -->
    <div class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg text-center">
      <div class="text-green-500 mb-2">
        <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
          <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4m6 2a9 9 0 11-18 0 9 9 0 0118 0z" />
        </svg>
      </div>
      
      <h1 class="text-3xl font-bold text-gray-800 mb-4">Quiz Completed!</h1>
      
      <p class="text-gray-600 mb-6">Results will be available in my contest once the quiz game is finished for all participants.</p>
      
      <button 
        class="w-full py-3 px-6 bg-green-500 hover:bg-green-600 rounded-full text-white font-bold text-lg focus:outline-none focus:ring-2 focus:ring-green-300 transition duration-300"
        @click="goToHome"
      >
        Return to Home
      </button>
    </div>
  </div>
</template>
  
  <script setup>
import { useRouter } from 'vue-router';

  const router = useRouter();
  const goToHome = () => {
    window.location.href = '/home';
    // router.push('/home');
  }
  </script>