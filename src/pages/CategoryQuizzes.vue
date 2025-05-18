<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
       <!-- Header -->
       <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        <span class="font-medium">Upcoming Contests</span>
      </div>

      <div class="p-4">
        <!-- Loading State -->
        <div v-if="mainStore.loading" class="flex flex-col items-center justify-center py-8">
          <div class="w-12 h-12 border-4 border-orange-300 border-t-orange-500 rounded-full animate-spin mb-4"></div>
          <p class="text-gray-600">Loading contests...</p>
        </div>

        <!-- No Contests State -->
        <div v-else-if="activeContests.length === 0" class="flex flex-col items-center justify-center py-12">
          <font-awesome-icon icon="calendar-times" class="text-gray-400 text-5xl mb-4" />
          <h3 class="text-lg font-medium text-gray-600 mb-2">No Active Contests</h3>
          <p class="text-gray-500 text-center">There are no upcoming contests at this time. Please check back later!</p>
        </div>

        <!-- Contest Cards -->
        <div class="space-y-4">
          <div v-for="(contest, index) in activeContests" :key="index"
            class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div @click="fetchContest(contest.node_id)" class="flex p-4">
              <!-- Contest Image -->
              <div class="w-1/4 flex-shrink-0">
                <img :src="displayImage(contest.banner_image)" :alt="contest.title" class="w-full h-full object-cover rounded-lg" />
              </div>
  
              <!-- Contest Details -->
              <div class="w-3/4 pl-4 flex flex-col justify-between">
                <!-- Category Badge -->
                <div class="text-center mb-2">
                  <span class="bg-purple-50 text-purple-700 px-6 py-1 rounded-full inline-block">
                    {{ contest.category.name }}
                  </span>
                </div>
  
                <!-- Title -->
                <div class="mb-2">
                  <h3 class="text-md font-bold text-gray-700 truncate">{{ contest.title }}</h3>
                </div>
                
                <!-- Time indicator on its own row -->
                <div class="mb-2">
                  <p v-if="getContestStatus(contest.start_time).isLive" class="text-red-500 font-bold flex items-center">
                    <span class="inline-block h-2 w-2 rounded-full bg-red-500 mr-2"></span>
                    LIVE
                  </p>
                  <p v-else class="text-blue-500 font-medium">
                    {{ getContestStatus(contest.start_time).text }}
                  </p>
                </div>
  
                <!-- Prize row -->
                <div class="flex items-center">
                  <span class="text-orange-400 font-bold mr-2">PRIZE POOL</span>
                  <font-awesome-icon icon="trophy" class="text-gray-600 mx-2" />
                  <span class="text-gray-600">Prize ₹ {{ contest.prize_money }}</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed, onUnmounted } from 'vue';
  import { fromUnixTime, isPast, formatDistanceToNow } from 'date-fns';
  import { useRouter } from 'vue-router';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { useMainStore } from '@/stores/mainStore';
  import { storeToRefs } from 'pinia';
  import { useToast } from 'vue-toastification';
  
  const router = useRouter();
  const toast = useToast();
  
  const mainStore = useMainStore();
  
  const { catContests } = storeToRefs(mainStore);
  
  const fetchContest = async(nodeId) => {
    await mainStore.fetchCurrentContest(nodeId)
    router.push('/quiz/variants')
  }

  const navigateToBack = () => {
    router.back();
  }
  
  // Filter contests that are still active
  const activeContests = computed(() => {
  const currentTime = Math.floor(Date.now() / 1000); // Get current Unix timestamp
  return catContests.value.filter(contest => contest.end_time > currentTime);
  });
  
  const displayImage = (imagePath) => {
  let path = '/images/fallbackImage.png';
  if(imagePath){
    path = `${import.meta.env.VITE_BASE_API}/storage/${imagePath}`
  }
  return path;
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
  </script>
  
  <style scoped>
  .no-scrollbar {
    -ms-overflow-style: none;
    scrollbar-width: none;
  }
  .no-scrollbar::-webkit-scrollbar {
    display: none;
  }
  
  .slide-fade-enter-active {
  transition: all 0.3s ease-out;
  }
  
  .slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
  }
  
  .slide-fade-enter-from,
  .slide-fade-leave-to {
  transform: translateX(20px);
  opacity: 0;
  }
  </style>