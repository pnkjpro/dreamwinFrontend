<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <div @click="navigateToBack" class="bg-orange-500 text-white p-3 flex items-center">
      <font-awesome-icon icon="arrow-left" class="mr-2" />
    </div>

    <!-- Sport Quiz Card -->
    <div class="m-4">
      <div class="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center">
        <h1 class="text-3xl font-semibold text-gray-600">{{ contest.title }}</h1>
        <!-- Time indicator on its own row -->
          <div class="mb-2">
            <p v-if="getContestStatus(contest.start_time).isLive" class="text-red-500 font-bold flex items-center">
              <button 
              @click="handlePlayGame()" 
              class="bg-green-400 hover:bg-gray-500 text-white font-medium px-8 py-1.5 text-sm mt-1 rounded"
              :disabled="quizStore.loading"
              >
                {{ quizStore.loading ? 'Starting...' :  'START'}}
            </button>
            </p>
            <p v-else class="text-blue-500 font-medium">
              {{ getContestStatus(contest.start_time).text }}
            </p>
          </div>
      </div>
    </div>

    <!-- Instructions -->
    <div class="px-4 mb-4">
      <h3 class="font-bold text-base mb-3">📢 QUIZ INSTRUCTIONS – PLEASE READ CAREFULLY</h3>
      <div class="space-y-3 text-sm">
        <div>
          <p class="font-semibold">Stable Internet Connection Required</p>
          <p>Make sure you are in a good network area while attempting the quiz. Do not refresh the page during the quiz — refreshing will lead to auto-submission of your test.</p>
        </div>
        
        <div>
          <p class="font-semibold">Use of Lifelines</p>
          <p>You can use the following lifelines during the quiz:</p>
          <ul class="ml-5 list-disc space-y-1 mt-1">
            <li>50-50: Eliminates two incorrect options.</li>
            <li>Skip the Question: Skip one question without elimination.</li>
            <li>Revive the Game: Get a second chance after a wrong answer.</li>
          </ul>
        </div>
        
        <div>
          <p class="font-semibold">Lifeline Usage Rule</p>
          <p>You can use one lifeline once during the entire quiz. Choose wisely!</p>
        </div>
        
        <div>
          <p class="font-semibold">Quiz Format</p>
          <ul class="ml-5 list-disc space-y-1 mt-1">
            <li>The quiz consists of {{ totalQuestions }} questions.</li>
            <li>If you answer even one question incorrectly, you will be eliminated from the game.</li>
            <li>All questions will have a timer displayed on the screen.</li>
          </ul>
        </div>
        
        <div>
          <p class="font-semibold">Important Tip</p>
          <p>Use your lifeline before selecting an incorrect answer to stay in the game!</p>
        </div>
      </div>
    </div>

    <!-- YouTube Video Embed -->
    <div class="px-4 mb-4">
      <div class="relative w-full overflow-hidden" style="padding-top: 56.25%;">
        <iframe 
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/3uFyxKX6EmY" 
          title="Tech Quiz Live"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
        <div class="absolute bottom-0 left-0 right-0">
          <div class="flex items-center">
            <div class="bg-yellow-400 text-black font-bold px-3 py-1">
              TECH QUIZ
            </div>
            <div class="bg-red-600 text-white px-2 py-0.5 inline-flex items-center text-sm">
              <font-awesome-icon icon="circle" class="text-xs mr-1" />
              LIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useQuizStore } from '@/stores/quizStore';
import { storeToRefs } from 'pinia';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';
import { fromUnixTime, isPast, formatDistanceToNow } from 'date-fns';
import { useMainStore } from '@/stores/mainStore';
import { ref, onMounted, onUnmounted } from 'vue';
import { useToast } from 'vue-toastification';


// Register FontAwesome icons
library.add(faArrowLeft, faCircle);

const quizStore = useQuizStore();
const mainStore = useMainStore();
const router = useRouter();
const toast = useToast();
const { playQuiz, question } = storeToRefs(quizStore);
const { contest } = storeToRefs(mainStore);

const totalQuestions = ref(contest.value.totalQuestion); // Adjust based on actual total questions

const handlePlayGame = async() => {
  const result = await quizStore.playQuiz();
  if(!result.success){
    toast.error(result.message);
  }
  if(result.success){
    router.push('/quiz/play');
  }
}

// ======================== Date n Time Handle ====================
// Update current time every minute
const now = ref(new Date());

onMounted(() => {
  const timer = setInterval(() => {
    now.value = new Date();
  }, 60000);
  
  onUnmounted(() => {
    clearInterval(timer);
  });
});
// Check contest status
function getContestStatus(unixTimestamp) {
  // Make sure the timestamp is being processed correctly
  // If it's in milliseconds, you don't need fromUnixTime
  // If it's in seconds (standard Unix timestamp), use fromUnixTime
  
  const startTime = fromUnixTime(Number(unixTimestamp))
  const isLive = now.value >= startTime;
  
  if (isLive) {
    return { isLive: true, text: 'LIVE' };
  } else {
    return { 
      isLive: false, 
      text: formatDistanceToNow(startTime) + ' left'
    };
  }
}
  // ==============================================================

const navigateToBack = () => {
  router.back();
}
</script>