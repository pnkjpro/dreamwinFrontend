<template>
    <div class="min-h-screen bg-gradient-to-b from-rose-300 to-rose-600 p-4 flex flex-col items-center">
      <!-- Progress and points section -->
      <div class="w-full max-w-md mb-8 mt-24">
        <div class="flex justify-between mb-2">
          <div class="bg-amber-400 flex items-center justify-center px-4 py-2 rounded-full">
            <span class="text-black font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm6 0H9v1h2V3z" clip-rule="evenodd" />
              </svg>
              {{ points }} Point
            </span>
          </div>
          <div class="bg-rose-500 flex items-center justify-center px-4 py-2 rounded-full">
            <span class="text-white font-bold flex items-center">
              <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
                <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
              </svg>
              {{ players }}
            </span>
          </div>
        </div>
        <div class="bg-gray-300 rounded-full h-4">
          <div class="bg-white rounded-full h-4" :style="{ width: `${(currentQuestion / totalQuestions) * 100}%` }"></div>
        </div>
      </div>
      
      <!-- Lifelines -->
      <div class="w-full max-w-md mb-4 flex justify-center space-x-4">
        <button 
          class="bg-blue-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed"
        >
          <span class="text-sm">50:50</span>
        </button>
        <button 
          class="bg-green-500 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center opacity-50 cursor-not-allowed"
        >
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
          </svg>
          <span class="text-sm ml-1">Skip</span>
        </button>
      </div>
  
      <!-- Failed Quiz Card -->
      <div class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg text-center">
        <div class="text-red-500 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Quiz Failed!</h1>
        
        <p class="text-gray-600 mb-6">
          You selected the wrong answer for Question {{ currentQuestion }} of {{ totalQuestions }}.
        </p>
        
        <div class="mb-6">
          <h2 class="text-xl font-bold text-gray-800 mb-2">The correct answer was:</h2>
          <div class="bg-green-100 border border-green-200 text-green-800 font-bold text-xl py-3 px-4 rounded-lg">
            64
          </div>
        </div>
        
        <!-- Revival Lifeline -->
        <div class="mb-8">
          <div class="flex items-center justify-center mb-2">
            <div class="font-bold text-xl text-purple-600 mr-2">Revival Available:</div>
            <div class="text-xl font-bold text-purple-600">{{ formattedTimeRemaining }}</div>
          </div>
          
          <button 
            class="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white font-bold text-xl hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 flex items-center justify-center"
            :class="{ 'opacity-50 cursor-not-allowed': timeRemaining <= 0 || !lifelines.revival }"
            @click="handleLifeline(lifelines.revive.id)"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15" />
            </svg>
            Use Revival Lifeline
          </button>
        </div>
        
        <button 
          class="w-full py-3 px-6 bg-gray-200 hover:bg-gray-300 rounded-full text-gray-700 font-bold text-lg focus:outline-none focus:ring-2 focus:ring-gray-300"
          @click="goToResults"
        >
          End Quiz
        </button>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useLifelineStore } from '@/stores/lifelineStore';
  import { useQuizStore } from '@/stores/quizStore';
  import { useMainStore } from '@/stores/mainStore';
  import { storeToRefs } from 'pinia';
import { ref, reactive, computed, onMounted, onUnmounted, inject } from 'vue';
import { useRouter } from 'vue-router';
  
  // Quiz data
  const currentQuestion = ref(67);
  const totalQuestions = ref(100);
  const points = ref(5);
  const players = ref(100);
  const router = useRouter();

  
  const lifelines = inject('lifeline');
  const quizStore = useQuizStore();
  const lifelineStore = useLifelineStore();
  const mainStore = useMainStore();
  const { question } = storeToRefs(quizStore);
  const { contest } = storeToRefs(mainStore);

  
  // Revival timer
  const initialTime = 30; // 30 seconds for revival
  const timeRemaining = ref(initialTime);
  let timerInterval = null;
  
  // Formatted time for display
  const formattedTimeRemaining = computed(() => {
    const seconds = timeRemaining.value % 60;
    const minutes = Math.floor(timeRemaining.value / 60);
    return `${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  });
  
  // Start countdown timer
  onMounted(() => {
    timerInterval = setInterval(() => {
      if (timeRemaining.value > 0) {
        timeRemaining.value--;
      } else {
        clearInterval(timerInterval);
      }
    }, 1000);
  });
  
  // Clean up timer on component destroy
  onUnmounted(() => {
    clearInterval(timerInterval);
  });
  
  const handleLifeline = async(lifelineId) => {
    await lifelineStore.useLifeline({
      lifeline_id: lifelineId,
      node_id: contest.value.node_id,
      question_id: question.value.id
    });
    router.push('/quiz/play');
}
  
  const goToResults = () => {
    // Logic to go to results screen
    console.log('Going to results screen');
    // This would navigate to the results screen in a real implementation
  };
  </script>