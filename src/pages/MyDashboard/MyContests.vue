<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header -->
    <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
      <font-awesome-icon icon="arrow-left" class="mr-2" />
      <span class="font-medium">My Contests</span>
    </div>


  <div class="w-full overflow-x-auto rounded-lg shadow-sm">
    <table class="min-w-full divide-y divide-gray-200">
      <thead class="bg-gray-50">
        <tr>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Node ID</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Name</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Score</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
         <!-- Loading state row -->
        <tr v-if="responses.length == 0" class="hover:bg-gray-50">
          <td colspan="4" class="px-4 py-8 text-center">
            <div class="flex justify-center items-center space-x-2">
              <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span class="text-sm text-gray-600">Loading quiz responses...</span>
            </div>
          </td>
        </tr>
        <tr v-for="(response, index) in responses" class="hover:bg-gray-50">
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ response.node_id }}
          </td>
          
          <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
            {{ response.quiz.title }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
            {{ response.score }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            <!-- Time indicator on its own row -->
              <!-- Time indicator on its own row -->
              <div class="mb-2">
                  <p 
                  @click="navigateTo(response.node_id, response.quiz_variant_id)"
                  v-if="getContestStatus(response.quiz.start_time, response.quiz.end_time).isLive" 
                  class="text-red-500 font-bold flex items-center">
                    <span class="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    LIVE
                  </p>
                  <p v-else-if="getContestStatus(response.quiz.start_time, response.quiz.end_time).text === 'Show Result'" @click="showLeaderBoard(response.node_id)" class="text-blue-500 font-medium">
                    {{ getContestStatus(response.quiz.start_time, response.quiz.end_time).text }}
                  </p>
                  <p v-else class="text-blue-500 font-medium">
                    {{ getContestStatus(response.quiz.start_time, response.quiz.end_time).text }}
                  </p>
                </div>
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="responses.length === 0" class="py-8 text-center text-gray-500">
      No data available.
    </div>
      
    </div>
  </div>
</template>

<script setup>
    import { ref, computed, onMounted, onUnmounted } from 'vue';
    import { library } from '@fortawesome/fontawesome-svg-core';
    import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
    import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
    import { fromUnixTime, isPast, formatDistanceToNow } from 'date-fns';
    import { storeToRefs } from 'pinia';
    import { useAuthStore } from '@/stores/authStore';
    import { useQuizStore } from '@/stores/quizStore';
    import { useRouter } from 'vue-router';
    import { useToast } from "vue-toastification";
    import { useMainStore } from '@/stores/mainStore';
    
    // Register FontAwesome icons
    library.add(faArrowLeft);
    
    const router = useRouter();
    const toast = useToast();
    
    const quizStore = useQuizStore();
    const authStore = useAuthStore();
    const mainStore = useMainStore();
    const { user } = storeToRefs(authStore);
    const { responses } = storeToRefs(quizStore);
    const { contest } = storeToRefs(mainStore);


    onMounted(() => {
      quizStore.getUserResponses();
    })


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


function getContestStatus(startTimestamp, endTimestamp) {
  const now = new Date();
  
  // Convert timestamps to Date objects
  const startTime = typeof startTimestamp === 'number' ? fromUnixTime(startTimestamp) : new Date(startTimestamp);
  const endTime = typeof endTimestamp === 'number' ? fromUnixTime(endTimestamp) : new Date(endTimestamp);

  if (now >= endTime) {
    return { isLive: false, text: 'Show Result' }; // Contest has ended
  } else if (now >= startTime) {
    return { isLive: true, text: 'LIVE' }; // Contest is currently live
  } else {
    return { isLive: false, text: formatDistanceToNow(startTime) + ' left' }; // Contest upcoming
  }
}

const navigateTo = async(nodeId, variantId) => {
  await mainStore.fetchCurrentContest(nodeId);
  mainStore.getPrizeContents(variantId);
  router.push('/quiz/variant/details');
}

const showLeaderBoard = (nodeId) => {
  quizStore.getLeaderboard(nodeId);
  router.push('/quiz/leaderboard');
}

const navigateToBack = () => {
  router.back();
}
 
    </script>