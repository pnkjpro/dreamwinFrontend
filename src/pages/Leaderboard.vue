<template>
    <div class="min-h-screen bg-gradient-to-b from-rose-300 to-rose-600 p-4 flex flex-col items-center">
      <!-- Header -->
      <div class="w-full max-w-md mt-8 mb-6 text-center">
        <h1 class="text-3xl font-bold text-white mb-2">Quiz Complete!</h1>
        <div class="bg-amber-400 inline-flex items-center justify-center px-6 py-3 rounded-full">
          <span class="text-black font-bold text-xl flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M5 3a2 2 0 012-2h6a2 2 0 012 2v1h2a2 2 0 012 2v11a2 2 0 01-2 2H3a2 2 0 01-2-2V6a2 2 0 012-2h2V3zm6 0H9v1h2V3z" clip-rule="evenodd" />
            </svg>
            Your Score: {{ leaderboard?.userPoints?.score || 0 }} Points 
          </span>
        </div>
      </div>
  
      <!-- Participation Stats Card -->
      <div class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg mb-6">
        <h2 class="text-xl font-bold text-gray-800 mb-4 flex items-center">
          <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-blue-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 5H7a2 2 0 00-2 2v12a2 2 0 002 2h10a2 2 0 002-2V7a2 2 0 00-2-2h-2M9 5a2 2 0 002 2h2a2 2 0 002-2M9 5a2 2 0 012-2h2a2 2 0 012 2" />
          </svg>
          Quiz Statistics
        </h2>
        
        <div class="grid grid-cols-2 gap-4">
          <div class="bg-blue-50 rounded-xl p-4 text-center">
            <div class="text-blue-600 text-3xl font-bold mb-1">{{ leaderboard?.totalParticipants || 0 }}</div>
            <div class="text-blue-800 text-sm">Total Players</div>
          </div>
          <!-- <div class="bg-purple-50 rounded-xl p-4 text-center">
            <div class="text-purple-600 text-3xl font-bold mb-1">{{ averageScore }}</div>
            <div class="text-purple-800 text-sm">Average Score</div>
          </div> -->
          <div class="bg-green-50 rounded-xl p-4 text-center">
            <div class="text-green-600 text-3xl font-bold mb-1">{{ leaderboard.topPlayers[0]?.score || 0 }}</div>
            <div class="text-green-800 text-sm">Top Score</div>
          </div>
          <!-- <div class="bg-orange-50 rounded-xl p-4 text-center">
            <div class="text-orange-600 text-3xl font-bold mb-1">{{ userRank }}</div>
            <div class="text-orange-800 text-sm">Your Rank</div>
          </div> -->
        </div>
      </div>
  
      <!-- Leaderboard Card -->
      <div class="bg-white rounded-3xl p-6 w-full max-w-md shadow-lg mb-8">
        <div class="flex justify-between items-center mb-6">
          <h2 class="text-xl font-bold text-gray-800 flex items-center">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6 mr-2 text-amber-500" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12l2 2 4-4M7.835 4.697a3.42 3.42 0 001.946-.806 3.42 3.42 0 014.438 0 3.42 3.42 0 001.946.806 3.42 3.42 0 013.138 3.138 3.42 3.42 0 00.806 1.946 3.42 3.42 0 010 4.438 3.42 3.42 0 00-.806 1.946 3.42 3.42 0 01-3.138 3.138 3.42 3.42 0 00-1.946.806 3.42 3.42 0 01-4.438 0 3.42 3.42 0 00-1.946-.806 3.42 3.42 0 01-3.138-3.138 3.42 3.42 0 00-.806-1.946 3.42 3.42 0 010-4.438 3.42 3.42 0 00.806-1.946 3.42 3.42 0 013.138-3.138z" />
            </svg>
            Leaderboard
          </h2>
          
          <div class="text-sm bg-gray-100 px-3 py-1 rounded-full text-gray-600">
            Top 10 Players
          </div>
        </div>
        
        <div class="space-y-3">
          <div v-for="(player, index) in leaderboard?.topPlayers" :key="player.id" 
               class="flex items-center py-3 px-4 rounded-xl"
               :class="{
                 'bg-amber-100 border-l-4 border-amber-500': player.isUser,
                 'bg-gray-50': !player.isUser && index % 2 === 0,
                 'bg-white': !player.isUser && index % 2 !== 0,
               }">
            
            <!-- Rank -->
            <div class="w-10 h-10 flex-shrink-0 flex items-center justify-center" 
                 :class="{
                   'bg-yellow-500 text-white rounded-full': index === 0,
                   'bg-gray-300 text-white rounded-full': index === 1,
                   'bg-amber-700 text-white rounded-full': index === 2,
                   'text-gray-700': index > 2
                 }">
              <span class="font-bold">{{ index + 1 }}</span>
            </div>
            
            <!-- Player info -->
            <div class="ml-3 flex-grow">
              <div class="font-bold text-gray-800">{{ player.name }}</div>
            </div>
            
            <!-- Score -->
            <div class="font-bold text-lg"
                 :class="{
                   'text-amber-600': player.isUser,
                   'text-gray-800': !player.isUser
                 }">
              {{ player.score }}
            </div>
          </div>
        </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useQuizStore } from '@/stores/quizStore';
  import { useAuthStore } from '@/stores/authStore';
  import { useMainStore } from '@/stores/mainStore';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { storeToRefs } from 'pinia';

  const router = useRouter();
  const toast = useToast();

  const quizStore = useQuizStore();
  const authStore = useAuthStore();
  const mainStore = useMainStore();

  const { user } = storeToRefs(authStore);
  const { leaderboard } = storeToRefs(quizStore);

  onMounted(() => {
   quizStore.getLeaderboard(1000);
});
  
  // User data
  const userScore = ref(75);
  const userRank = ref(8);
  const averageScore = ref(62);
  </script>