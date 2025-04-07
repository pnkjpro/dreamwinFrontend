<template>
  <div class="min-h-screen bg-gradient-to-b from-rose-300 to-rose-600 p-4 flex flex-col items-center">
    <!-- Progress bar -->
    <div class="w-full max-w-md mb-8 mt-24">
      <div class="flex justify-between mb-2">
        <div class="bg-amber-400 flex items-center justify-center px-4 py-2 rounded-full">
          <span class="text-black font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm6 0H9v1h2V3z" clip-rule="evenodd" />
            </svg>
            {{ question.id }} / {{ totalQuestions }}
          </span>
        </div>
        <div class="bg-rose-500 flex items-center justify-center px-4 py-2 rounded-full">
          <span class="text-white font-bold flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5 mr-1" viewBox="0 0 20 20" fill="currentColor">
              <path d="M13 6a3 3 0 11-6 0 3 3 0 016 0zM18 8a2 2 0 11-4 0 2 2 0 014 0zM14 15a4 4 0 00-8 0v3h8v-3zM6 8a2 2 0 11-4 0 2 2 0 014 0zM16 18v-3a5.972 5.972 0 00-.75-2.906A3.005 3.005 0 0119 15v3h-3zM4.75 12.094A5.973 5.973 0 004 15v3H1v-3a3 3 0 013.75-2.906z" />
            </svg>
            100
          </span>
        </div>
      </div>
      <div class="bg-gray-300 rounded-full h-4">
        <div 
          class="bg-white rounded-full h-4" 
          :style="{ width: progressPercentage + '%' }"
        ></div>
      </div>
    </div>
    
    <!-- Lifelines -->
    <div class="w-full max-w-md mb-4 flex justify-center space-x-4">
      <button 
        class="bg-blue-500 hover:bg-blue-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
        :class="{ 'opacity-50 cursor-not-allowed': !lifelines.fiftyFifty }"
        @click="handleLifeline(lifelines.fiftyFifty.id)"
        :disabled="!lifelines.fiftyFifty"
      >
        <span class="text-sm">{{ lifelines.fiftyFifty.alias }}</span>
      </button>
      <button 
        class="bg-green-500 hover:bg-green-600 text-white font-bold py-2 px-4 rounded-full flex items-center justify-center"
        :class="{ 'opacity-50 cursor-not-allowed': !lifelines.skip }"
        @click="handleLifeline(lifelines.skip.id)"
        :disabled="!lifelines.skip"
      >
        <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM9.555 7.168A1 1 0 008 8v4a1 1 0 001.555.832l3-2a1 1 0 000-1.664l-3-2z" clip-rule="evenodd" />
        </svg>
        <span class="text-sm ml-1">{{ lifelines.skip.alias }}</span>
      </button>
    </div>

    <!-- Question Card -->
    <div class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg">
      <div class="flex justify-between items-center mb-4">
        <h2 class="text-gray-800 text-xl font-bold">Question {{ question.id }} of 100</h2>
        <div class="flex items-center text-purple-600">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-1" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4l3 3m6-3a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <span class="text-xl font-bold">{{ timeLeft }}</span>
        </div>
      </div>

      <h1 class="text-4xl font-bold text-gray-800 mb-8">
        {{ question.id }}. {{ question.question }}
      </h1>

      <!-- Answer Options -->
      <div v-for="(option, index) in question.options" class="space-y-4">
        <button 
          class="w-full py-4 px-6 border-2 border-rose-400 rounded-full text-rose-500 font-bold text-2xl hover:bg-rose-50 focus:outline-none focus:ring-2 focus:ring-rose-300"
          :disabled="removedOption[index] !== undefined"
          :class="{ 'opacity-50 cursor-not-allowed': removedOption[index] !== undefined }"
          @click="handleNextQuestion(option.id)"
        >
          {{ option.option }}
        </button>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useLifelineStore } from '@/stores/lifelineStore';
import { useMainStore } from '@/stores/mainStore';
import { useQuizStore } from '@/stores/quizStore';
import { storeToRefs } from 'pinia';
import { ref, inject, onMounted, onUnmounted, watch, computed } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';

const router = useRouter();
const toast = useToast();
const quizStore = useQuizStore();
const lifelineStore = useLifelineStore();
const mainStore = useMainStore();
const { question } = storeToRefs(quizStore);
const { contest } = storeToRefs(mainStore);
const { removedOption } = storeToRefs(lifelineStore);
const lifelines = inject('lifeline');

const timeLeft = ref(30);
let timer = null;
const isLifelineActive = ref(false);

const totalQuestions = ref(contest.value.totalQuestion);

const progressPercentage = computed(() => {
  return (question.value.id / totalQuestions.value) * 100;
});

// Function to start the timer
const startTimer = () => {
  clearInterval(timer); // Clear any existing timer
  timeLeft.value = 30;

  timer = setInterval(() => {
    if (timeLeft.value > 0 && !isLifelineActive.value) {
      timeLeft.value--;
    } else if (timeLeft.value === 0) {
      clearInterval(timer);
      handleTimeout();
    }
  }, 1000);
};

// Function to pause the timer
const pauseTimer = () => {
  isLifelineActive.value = true;
};

// Function to resume the timer
const resumeTimer = () => {
  isLifelineActive.value = false;
};

// Handle timeout scenario
const handleTimeout = async () => {
  await quizStore.nextQuestion(null); // Pass null to indicate timeout
  router.push('/quiz/play/failed'); // Redirect the user
};

// Handle user selecting an answer
const handleNextQuestion = async (selectedOption) => {
  clearInterval(timer); // Stop timer when user answers
  removedOption.value = [];
  const result = await quizStore.nextQuestion(selectedOption);
  if(!result.success){
    toast.error(result.message);
    router.push('/quiz/play/failed');
  }
  startTimer(); // Restart timer for next question
};

// Watch for changes in the question to restart the timer
watch(question, () => {
  startTimer();
}, { deep: true });

// Handle lifeline usage
const handleLifeline = async (lifelineId) => {
  // Pause the timer while lifeline is being used
  pauseTimer();
  
  removedOption.value = [];
  const result = await lifelineStore.useLifeline({
    lifeline_id: lifelineId,
    node_id: contest.value.node_id,
    question_id: question.value.id
  });
  
  if(!result.success){
    toast.error(result.message);
  }
  
  // Resume the timer after lifeline has been processed
  resumeTimer();
};

// Start timer when component is mounted
onMounted(() => {
  startTimer();
});

// Cleanup timer when component is unmounted
onUnmounted(() => {
  clearInterval(timer);
});
</script>