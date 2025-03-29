<template>
    <div class="min-h-screen bg-gradient-to-b from-rose-300 to-rose-600 p-4 flex flex-col items-center">
  
      <!-- Failed Quiz Card -->
      <div class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg text-center">
        <div class="text-red-500 mb-2">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-24 w-24 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M10 14l2-2m0 0l2-2m-2 2l-2-2m2 2l2 2m7-2a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
        </div>
        
        <h1 class="text-3xl font-bold text-gray-800 mb-4">Quiz Failed!</h1>
        
        <!-- Revival Lifeline -->
        <div class="mb-8">
          <div class="flex items-center justify-center mb-2">
            <div class="font-bold text-xl text-purple-600 mr-2">Revival Available:</div>
            <div class="text-xl font-bold text-purple-600">{{ formattedTimeRemaining }}</div>
          </div>
          
          <button 
            class="w-full py-4 px-6 bg-gradient-to-r from-purple-500 to-indigo-600 rounded-full text-white font-bold text-xl hover:from-purple-600 hover:to-indigo-700 focus:outline-none focus:ring-2 focus:ring-purple-300 flex items-center justify-center"
            :class="{ 'opacity-50 cursor-not-allowed': timeRemaining <= 0 || !lifelines.revival }"
            :disabled="disableRevival"
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
import { useToast } from 'vue-toastification';
  
  // Quiz data
  const currentQuestion = ref(67);
  const totalQuestions = ref(100);
  const points = ref(5);
  const players = ref(100);
  const disableRevival = ref(false);
  const router = useRouter();
  const toast = useToast();

  
  const lifelines = inject('lifeline');
  const quizStore = useQuizStore();
  const lifelineStore = useLifelineStore();
  const mainStore = useMainStore();
  const { question } = storeToRefs(quizStore);
  const { contest } = storeToRefs(mainStore);

  
  // Revival timer
  const initialTime = 60; // 30 seconds for revival
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
        disableRevival.value = true;
        clearInterval(timerInterval);
      }
    }, 1000);
  });
  
  // Clean up timer on component destroy
  onUnmounted(() => {
    clearInterval(timerInterval);
  });
  
  const handleLifeline = async(lifelineId) => {
    try{
      if(contest.value.totalQuestion === question.value.id){
        const result = await lifelineStore.useLifeline({
          lifeline_id: lifelineId,
          node_id: contest.value.node_id,
          question_id: question.value.id
          });
        if(!result.success){
          toast.error(result.message);
        }
        if(result.success){
          router.push('/quiz/play/finished');
        }
      } else {
        const result = await lifelineStore.useLifeline({
          lifeline_id: lifelineId,
          node_id: contest.value.node_id,
          question_id: question.value.id
        });
        if(!result.success){
          toast.error(result.message);
        }
        if(result.success){
          router.push('/quiz/play');
        }
      }
    } catch(err){
      toast.error("Unexpected Error Occured!");
    }
}
  
  const goToResults = () => {
    // Logic to go to results screen
    console.log('Going to results screen');
    // This would navigate to the results screen in a real implementation
  };
  </script>