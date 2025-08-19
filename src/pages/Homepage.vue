<template>
  <div>
    <!-- Video Preloader -->
    <div v-if="showPreloader" class="fixed inset-0 bg-gradient-to-r from-red-700 to-orange-600 flex justify-center items-center z-50">
      <video 
        ref="preloaderVideo"
        autoplay
        muted
        @ended="onVideoEnded"
        class="max-w-full max-h-full"
      >
        <source :src="videoSource" type="video/mp4">
        Your browser does not support the video tag.
      </video>
    </div>

    <!-- Main Content -->
    <div v-else class="min-h-screen bg-gradient-to-b from-orange-50 via-red-50 to-orange-50">
      <!-- Header -->
      <header class="flex justify-between items-center p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
        <button @click="toggleMenu" class="p-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-md relative">
          <font-awesome-icon icon="bars" class="text-2xl text-white" />
          <!-- Notice notification bubble -->
          <span v-if="hasNewNotice" class="absolute -top-1 -right-1 flex h-4 w-4">
            <span class="animate-ping absolute inline-flex h-full w-full rounded-full bg-yellow-400 opacity-75"></span>
            <span class="relative inline-flex rounded-full h-4 w-4 bg-yellow-500"></span>
          </span>
        </button>
        <div class="flex items-center">
          <div class="relative">
            <img :src="displayImage(user.avatar)" alt="User Avatar" class="w-16 h-16 rounded-full object-cover border-4 border-orange-300" />
            <div class="absolute -bottom-1 -right-1 bg-green-400 w-4 h-4 rounded-full border-2 border-white"></div>
          </div>
          <div class="ml-4">
            <p class="text-orange-200 text-sm">Welcome back!</p>
            <h1 class="text-lg font-bold text-white">{{ user.name }}</h1>
          </div>
        </div>
      </header>

      <!-- Sidebar Menu -->
      <Transition name="slide-fade">
        <aside v-if="menuOpen" class="fixed top-0 left-0 w-3/4 h-full bg-gradient-to-b from-red-700 to-orange-800 p-6 z-50 shadow-lg">
          <div class="flex justify-between items-center mb-8">
            <div class="flex items-center">
              <img :src="displayImage(user.avatar)" alt="User Avatar" class="w-12 h-12 rounded-full object-cover border-2 border-orange-300" />
              <div class="ml-4 text-white">
                <h2 class="text-lg font-bold">{{ user.name }}</h2>
              </div>
            </div>
            <button @click="toggleMenu" class="text-white hover:text-orange-200 bg-red-600 p-2 rounded-full">
              <font-awesome-icon icon="times" class="text-xl" />
            </button>
          </div>
          
          <div class="bg-gradient-to-r from-orange-500 to-red-500 rounded-xl shadow-md text-white mb-6 overflow-hidden">
            <div class="p-4">
              <p class="flex items-center font-bold">
                <font-awesome-icon icon="wallet" class="mr-2 text-yellow-300" /> My Balance 
                <span class="ml-auto text-yellow-300 text-lg">₹ {{ user.funds || 0 }}</span>
              </p>
            </div>
            <div class="grid grid-cols-2 gap-2 p-4 bg-red-600 bg-opacity-30">
              <button @click="handleFunds('withdraw')" class="py-2 bg-red-700 hover:bg-red-600 text-white rounded-lg font-medium text-sm transition-colors flex items-center justify-center shadow-md">
                <font-awesome-icon icon="arrow-up" class="mr-2 text-red-300" /> WITHDRAW
              </button>
              <button @click="handleFunds('deposit')" class="py-2 bg-gradient-to-r from-yellow-500 to-yellow-400 hover:from-yellow-400 hover:to-yellow-300 text-red-900 rounded-lg font-medium text-sm transition-colors flex items-center justify-center shadow-md">
                <font-awesome-icon icon="plus" class="mr-2" /> ADD CASH
              </button>
            </div>
          </div>
          
          <ul class="text-white space-y-2 mb-6">
            <!-- Official Notice Section -->
            <li v-if="official_notice_status && official_notice" 
                @click="showNoticeDialog = true" 
                class="flex items-center justify-between cursor-pointer p-3 rounded-lg bg-gradient-to-r from-yellow-600 to-orange-600 hover:from-yellow-700 hover:to-orange-700 transition-colors border border-yellow-400 shadow-md">
              <div class="flex items-center">
                <font-awesome-icon icon="bell" class="mr-3 text-yellow-200 animate-pulse" />
                <span class="font-semibold">Official Notice</span>
              </div>
              <div class="flex items-center">
                <span v-if="hasNewNotice" class="bg-yellow-400 text-yellow-900 text-xs px-2 py-1 rounded-full font-bold mr-2">NEW</span>
                <font-awesome-icon icon="chevron-right" class="text-yellow-200" />
              </div>
            </li>
            
            <!-- Regular Menu Items -->
            <li v-for="(item, index) in menuItems" :key="index" @click="navigateTo(item.url)" 
                class="flex items-center cursor-pointer p-3 rounded-lg hover:bg-red-600 transition-colors">
              <font-awesome-icon :icon="item.icon" class="mr-3 text-orange-300" />
              <span>{{ item.text }}</span>
            </li>
          </ul>
          
          <button @click="handleLogout" :disabled="authStore.loading" 
                  class="w-full py-3 mt-auto rounded-lg bg-gradient-to-r from-red-600 to-orange-500 text-white font-bold flex items-center justify-center hover:from-red-700 hover:to-orange-600 transition-colors shadow-md">
            <font-awesome-icon icon="sign-out-alt" class="mr-3" />
            <span v-if="authStore.loading">Logging out...</span>
            <span v-else>Logout</span>
          </button>
        </aside>
      </Transition>

      <!-- Notice Dialog -->
      <Transition name="dialog-fade">
        <div v-if="showNoticeDialog" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-[60] p-4">
          <div class="bg-white rounded-2xl shadow-2xl max-w-md w-full max-h-[80vh] overflow-hidden">
            <!-- Dialog Header -->
            <div class="bg-gradient-to-r from-orange-600 to-red-600 text-white p-4 flex items-center justify-between">
              <div class="flex items-center">
                <font-awesome-icon icon="bell" class="mr-2 text-yellow-200" />
                <h3 class="text-lg font-bold">Official Notice</h3>
              </div>
              <button @click="showNoticeDialog = false" class="text-white hover:text-orange-200 bg-red-600 p-1 rounded-full">
                <font-awesome-icon icon="times" class="text-lg" />
              </button>
            </div>
            
            <!-- Dialog Content -->
            <div class="p-6 overflow-y-auto max-h-[60vh]">
              <div class="prose prose-sm max-w-none">
                <p class="text-gray-700 leading-relaxed whitespace-pre-wrap">{{ official_notice }}</p>
              </div>
              
              <!-- Notice Date -->
              <div class="mt-4 pt-4 border-t border-gray-200">
                <p class="text-xs text-gray-500 flex items-center">
                  <font-awesome-icon icon="clock" class="mr-1" />
                  Updated: {{ formatNoticeDate(notice_updated_at) }}
                </p>
              </div>
            </div>
            
            <!-- Dialog Footer -->
            <div class="bg-gray-50 px-6 py-3 flex justify-end">
              <button @click="showNoticeDialog = false" 
                      class="px-6 py-2 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-lg hover:from-red-700 hover:to-orange-700 transition-colors font-medium">
                Got it
              </button>
            </div>
          </div>
        </div>
      </Transition>

      <!-- Category Cards -->
      <div class="p-4">
        <h2 class="text-xl font-bold text-red-900 mb-3 flex items-center">
          <font-awesome-icon icon="layer-group" class="mr-2 text-orange-600" /> Categories
        </h2>
        <div class="flex overflow-x-auto p-1 space-x-4 no-scrollbar">
          <div v-for="(category, index) in categories" :key="index" class="flex flex-col items-center">
            <div @click="getQuizzesByCategory(category.id)" 
                class="w-24 h-24 rounded-xl overflow-hidden flex-shrink-0 border-4 border-white shadow-lg hover:shadow-xl transition-transform hover:scale-105"
                :style="`box-shadow: 0 10px 15px -3px rgba(${220 + (index * 5) % 35}, ${(80 + index * 10) % 120}, ${50}, 0.4)`">
              <img :src="displayImage(category.icon)" :alt="category.name" class="w-full h-full object-cover" />
            </div>
            <p class="text-center font-bold text-sm mt-2 max-w-24 text-black-800">{{ category.name }}</p>
          </div>
        </div>
      </div>

      <!-- Shortcut Links -->
      <div class="px-4 mb-6">
        <h2 class="text-lg font-bold text-red-900 mb-2 flex items-center">
          <font-awesome-icon icon="lightning-bolt" class="mr-2 text-yellow-500" /> Quick Actions
        </h2>
        <div class="grid grid-cols-2 gap-3">
          <div @click="handleFunds('deposit')" class="bg-gradient-to-r from-green-50 to-emerald-50 p-3 rounded-lg border border-green-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-green-500 p-2 rounded-full mr-2">
                <font-awesome-icon icon="wallet" class="text-white text-sm" />
              </div>
              <div>
                <h3 class="font-semibold text-green-800 text-sm">Wallet</h3>
                <p class="text-green-600 text-xs">Add money</p>
              </div>
            </div>
          </div>
          
          <div @click="navigateTo('dashboard/refernearn')" class="bg-gradient-to-r from-blue-50 to-cyan-50 p-3 rounded-lg border border-blue-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-blue-500 p-2 rounded-full mr-2">
                <font-awesome-icon icon="user-friends" class="text-white text-sm" />
              </div>
              <div>
                <h3 class="font-semibold text-blue-800 text-sm">Refer & Earn</h3>
                <p class="text-blue-600 text-xs">Earn rewards</p>
              </div>
            </div>
          </div>
          
          <div @click="navigateTo('dashboard/lifeline')" class="bg-gradient-to-r from-purple-50 to-violet-50 p-3 rounded-lg border border-purple-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-purple-500 p-2 rounded-full mr-2">
                <font-awesome-icon icon="phone" class="text-white text-sm" />
              </div>
              <div>
                <h3 class="font-semibold text-purple-800 text-sm">Lifeline</h3>
                <p class="text-purple-600 text-xs">Get help</p>
              </div>
            </div>
          </div>
          
          <div @click="navigateTo('expert-videos')" class="bg-gradient-to-r from-red-50 to-orange-50 p-3 rounded-lg border border-red-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-red-500 p-2 rounded-full mr-2">
                <font-awesome-icon icon="play-circle" class="text-white text-sm" />
              </div>
              <div>
                <h3 class="font-semibold text-red-800 text-sm">Expert Videos</h3>
                <p class="text-red-600 text-xs">Learn tips</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- YouTube Videos Section -->
      <div class="px-4 mb-6">
        <h2 class="text-xl font-bold text-red-900 mb-3 flex items-center">
          <font-awesome-icon icon="video" class="mr-2 text-red-500" /> Featured Videos
        </h2>
        <div class="overflow-x-auto flex space-x-4 no-scrollbar">
          <div v-for="(video, index) in featuredVideos" :key="index" 
              @click="handleVideoClick(video)"
              class="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-lg bg-white cursor-pointer hover:shadow-xl transition-all transform hover:scale-105 hover:bg-gray-50">
            <div class="relative">
              <img :src="video.thumbnail" 
                  :alt="video.title" 
                  class="w-full h-36 object-cover transition-all hover:brightness-110" />
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center hover:bg-opacity-40 transition-all">
                <div class="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors transform hover:scale-110">
                  <font-awesome-icon icon="play" class="text-white text-xl" />
                </div>
              </div>
              <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {{ video.duration }}
              </div>
              <!-- YouTube indicator -->
              <div class="absolute bottom-2 left-2 bg-red-600 text-white text-xs px-2 py-1 rounded flex items-center">
                <font-awesome-icon icon="video" class="mr-1" />
                YouTube
              </div>
            </div>
            <div class="p-3">
              <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight hover:text-red-600 transition-colors">
                {{ video.title }}
              </h3>
              <p class="text-xs text-gray-600 mt-1">{{ video.views }} views</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Upcoming Contest Section -->
      <div class="p-4 bg-white rounded-t-3xl shadow-inner">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-red-900 flex items-center">
            <font-awesome-icon icon="trophy" class="mr-2 text-yellow-500" /> Upcoming Contests
          </h2>
        </div>

        <!-- Contest Cards -->
        <div class="space-y-4">
          <div v-for="(contest, index) in contests" :key="index"
            class="bg-gradient-to-r from-orange-50 to-red-50 rounded-xl overflow-hidden shadow-md border border-orange-100 hover:shadow-lg transition-shadow">
            <div @click="fetchContest(contest.node_id)" class="flex p-4">

              <!-- Contest Details -->
              <div class="w-full pl-1 flex flex-col h-full">
                <!-- Top Section -->
                <div class="flex-shrink-0">
                  <!-- Category Badge -->
                  <!-- <div class="text-center mb-1.5">
                    <span class="bg-gradient-to-r from-red-500 via-red-600 to-orange-500 text-white px-4 py-1.5 rounded-full text-xs font-bold inline-block shadow-lg transform hover:scale-105 transition-transform duration-200">
                      {{ contest.category.name }}
                    </span>
                  </div> -->

                  <!-- Title -->
                  <div class="mb-2">
                    <h3 class="text-sm font-bold text-gray-900 line-clamp-2 leading-tight hover:text-blue-600 transition-colors duration-200">
                      {{ contest.title }}
                    </h3>
                  </div>
                  
                  <!-- Time indicator and Prize row -->
                  <div class="mb-1.5 flex items-center justify-between">
                    <div class="flex items-center">
                      <p v-if="getContestStatus(contest.start_time).isLive" class="text-white font-bold flex items-center bg-gradient-to-r from-red-500 to-red-600 px-3 py-1.5 rounded-full shadow-lg text-xs border-2 border-red-300">
                        <span class="inline-block h-2 w-2 rounded-full bg-white mr-2 animate-ping"></span>
                        <span class="relative z-10">LIVE</span>
                      </p>
                      <p v-else class="text-orange-600 flex items-center text-sm font-bold bg-orange-50 px-3 py-1.5 rounded-lg border border-orange-200">
                        <font-awesome-icon icon="clock" class="mr-2 text-sm animate-pulse" />
                        {{ getContestStatus(contest.start_time).text }}
                      </p>
                    </div>
                    
                    <!-- Prize and FREE badge on the right -->
                    <div class="flex items-center space-x-3">
                      <!-- Updated Prize Section with Spinning Rupee Icon -->
                      <div class="flex items-center">
                        <img
                          width="30"
                          height="30"
                          :src="'/images/rupee.png'"
                          alt="Rs"
                          onerror="this.style.display='none'"
                        />
                        <span class="text-gray-800 ml-1 font-bold text-xl tracking-wide">{{ contest.prize_money }}</span>
                      </div>
                      
                      <!-- Enhanced FREE Badge -->
                      <span v-if="contest.entry_fees == 0" class="text-white font-bold px-3 py-1.5 bg-gradient-to-r from-emerald-500 via-green-500 to-teal-500 rounded-full shadow-lg text-xs border-2 border-green-300 transform hover:scale-105 transition-all duration-200 animate-pulse">
                        FREE
                      </span>
                    </div>
                  </div>
                </div>

                <!-- Middle Section - Flexible -->
                <div class="flex-grow flex flex-col justify-center space-y-3">
                  <!-- Enhanced Closing Time with Join Button -->
                  <div class="flex items-center justify-between bg-gradient-to-r from-gray-50 to-gray-100 p-1.5 rounded-xl border border-gray-200 shadow-sm">
                    <div class="flex items-center">
                      <div class="bg-gray-200 p-2 rounded-full mr-3">
                        <font-awesome-icon icon="lock" class="text-gray-600 text-sm animate-pulse" />
                      </div>
                      <div>
                        <div class="text-xs text-gray-500 font-medium">Entry Closes at</div>
                        <div class="text-xs text-gray-800 font-bold">
                          {{ formatDateTime(contest.end_time) }}
                        </div>
                      </div>
                    </div>
                    
                    <!-- Enhanced Join Button -->
                    <div class="ml-2">
                      <button 
                        class="bg-gradient-to-r from-blue-500 via-purple-500 to-purple-600 text-white font-bold py-2 px-4 rounded-xl shadow-lg hover:from-blue-600 hover:via-purple-600 hover:to-purple-700 transform hover:scale-105 transition-all duration-300 text-xs border-2 border-blue-300 relative overflow-hidden group"
                        @click="fetchContest(contest.node_id)"
                      >
                        <div class="absolute inset-0 bg-gradient-to-r from-transparent via-white to-transparent opacity-0 group-hover:opacity-20 group-hover:animate-pulse"></div>
                        <font-awesome-icon icon="play" class="mr-2 group-hover:bounce-x" />
                        <span class="relative z-10 tracking-wide">JOIN NOW</span>
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
          
          <!-- Load More Button -->
          <div v-if="hasMoreLoad" class="mt-6 text-center">
            <button @click="loadMoreContests" 
                    class="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
                    :disabled="mainStore.loading">
              <span v-if="mainStore.loading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                Loading...
              </span>
              <span v-else class="flex items-center justify-center">
                Load More
                <font-awesome-icon icon="chevron-down" class="ml-2" />
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, inject, onMounted, computed, onUnmounted } from 'vue';
import { fromUnixTime, isPast, formatDistanceToNow } from 'date-fns';
import { useRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMainStore } from '@/stores/mainStore';
import { useAuthStore } from '@/stores/authStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { 
  faBars, faWallet, faCashRegister, faChevronLeft, faChevronRight, 
  faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt,
  faPlus, faArrowUp, faTrophy, faClock, faChevronDown, faTimes,
  faLayerGroup, faStar, faPhone, faHistory, 
  // faLightningBolt,
  faUserFriends, faPlayCircle, faVideo, faPlay, faLock, faBell
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';

// Add icons to library
library.add(
  faBars, faWallet, faCashRegister, faChevronLeft, faChevronRight, 
  faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt,
  faPlus, faArrowUp, faTrophy, faClock, faChevronDown, faTimes,
  faLayerGroup, faStar, faPhone, faHistory, 
  // faLightningBolt,
  faUserFriends, faPlayCircle, faVideo, faPlay, faLock, faBell
);
  
const router = useRouter();
const toast = useToast();

const menuOpen = ref(false);
const showNoticeDialog = ref(false);
const mainStore = useMainStore();
const authStore = useAuthStore();
const transactionStore = useTransactionStore();

const { contests, categories, banners, loading, official_notice, official_notice_status, notice_updated_at, totalCount, hasShownVideo, featuredVideos } = storeToRefs(mainStore);
const { user } = storeToRefs(authStore);
const { fundAction } = storeToRefs(transactionStore);

const hasMoreLoad = computed(()=>{
  if(totalCount.value>contests.value.length){
    return true
  }
  return false
})

// Check if there's a new notice (within 24 hours)
const hasNewNotice = computed(() => {
  if (!official_notice_status.value || !notice_updated_at.value) {
    return false;
  }
  
  const noticeDate = new Date(notice_updated_at.value);
  const now = new Date();
  const hoursDiff = (now - noticeDate) / (1000 * 60 * 60);
  
  return hoursDiff <= 24;
});

// ================ load intro video =========================
// Video preloader settings
const showPreloader = ref(false);
const videoSource = ref('/videos/himpri_intro.mp4'); // Replace with actual path to your 2-sec video
const videoTimeout = ref(null);

// Check if we've shown the intro video in this session
const checkPreloaderStatus = () => {
  if (!hasShownVideo.value) {
    showPreloader.value = true;
    // Set a fallback timeout to hide preloader after 3 seconds
    // in case the video doesn't trigger the ended event
    videoTimeout.value = setTimeout(() => {
      hidePreloader();
    }, 3000);
  }
};

const hidePreloader = () => {
  showPreloader.value = false;
  // Mark that we've shown the video for this session
  hasShownVideo.value = true;
  if (videoTimeout.value) {
    clearTimeout(videoTimeout.value);
  }
};

const onVideoEnded = () => {
  // Hide preloader when video ends
  hidePreloader();
};
// ===========================================================

const handleFunds = (fundType) => {
  fundAction.value = fundType;
  console.log(fundType);
  console.log(fundAction.value);
  router.push('/dashboard/funds');
}

const handleVideoClick = (video) => {
  if (video.youtubeUrl || video.url) {
    const youtubeUrl = video.youtubeUrl || video.url;
    window.open(youtubeUrl, '_blank');
  } else {
    console.log('No YouTube URL found for video:', video);
  }
}

 const isContestExpired = (endDateTime) => {
      const endTime = typeof endDateTime === 'string' 
        ? new Date(endDateTime).getTime() / 1000 
        : endDateTime;
      
      const now = Math.floor(Date.now() / 1000);
      return endTime <= now;
    }

  const formatDateTime = (dateTime) => {
    // Handle both datetime strings and timestamps
    const date = typeof dateTime === 'string' 
      ? new Date(dateTime) 
      : new Date(dateTime * 1000);
    
    return date.toLocaleDateString('en-IN', {
      day: 'numeric',
      month: 'short',
      hour: '2-digit',
      minute: '2-digit',
      hour12: true
    });
  }

const fetchContest = async(nodeId) => {
  await mainStore.fetchCurrentContest(nodeId)
  router.push('/quiz/variants')
}

const getQuizzesByCategory = async(categoryId) => {
  mainStore.fetchQuizzesByCategory(categoryId);
  router.push('/category/quiz/list');
}

const loadMoreContests = () => {
  const result = mainStore.fetchMoreContests();
}

onMounted(() => {
  // Check if we should show the preloader
  checkPreloaderStatus();
  
  if(contests.value.length > 0){
    return;
  }
  mainStore.fetchContests();
  mainStore.fetchCategories();
  mainStore.fetchHomeBanners();
  mainStore.fetchHowVideos();
  mainStore.fetchFeaturedVideos().then(() => {
    console.log('Featured Videos loaded:', featuredVideos.value);
    // Log each video's structure for debugging
    featuredVideos.value.forEach((video, index) => {
      console.log(`Video ${index + 1}:`, video);
      console.log(`YouTube URL for video ${index + 1}:`, video.youtubeUrl);
    });
  });
})

onUnmounted(() => {
  // Clear timeout if component is unmounted
  if (videoTimeout.value) {
    clearTimeout(videoTimeout.value);
  }
})

const menuItems = ref([
  { text: 'Refer & Earn', icon: 'user', url: 'dashboard/refernearn' },
  { text: 'My Lifelines', icon: 'phone', url: 'dashboard/lifeline'},
  { text: 'My Transactions', icon: 'cash-register', url: 'dashboard/transactions'},
  { text: 'My Contests', icon: 'gamepad', url: 'dashboard/my-contests'},
  { text: 'Lifeline History', icon: 'history', url: 'dashboard/lifeline-history'}
]);

const navigateTo = (url) => {
  router.push(`/${url}`);
  menuOpen.value = false;
}

const handleLogout = async () => {
  const result = await authStore.logout();
  if (!result.success) {
    toast.error(result.message);
  } else {
    router.push('/auth/login');
  }
};

const toggleMenu = () => menuOpen.value = !menuOpen.value;

const displayImage = (imagePath) => {
  let path = '/images/fallbackImage.png';
  if(imagePath){
    path = `${import.meta.env.VITE_BASE_API}/storage/${imagePath}`
  }
  return path;
}

const formatNoticeDate = (dateTime) => {
  if (!dateTime) return 'Unknown';
  
  const date = new Date(dateTime);
  return date.toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric',
    hour: '2-digit',
    minute: '2-digit',
    hour12: true
  });
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
  const startTime = fromUnixTime(Number(unixTimestamp));
  const isLive = Date.now() >= startTime.getTime();

  if (isLive) {
    return { isLive: true, text: 'LIVE' };
  } else {
    let text = formatDistanceToNow(startTime, { addSuffix: false });
    text = text.replace(/^about\s/, ''); // Remove 'about ' prefix if present
    return {
      isLive: false,
      text: `${text} left`
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

.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.slide-fade-enter-active {
  transition: all 0.3s ease-out;
}

.slide-fade-leave-active {
  transition: all 0.3s cubic-bezier(1, 0.5, 0.8, 1);
}

.slide-fade-enter-from,
.slide-fade-leave-to {
  transform: translateX(-100%);
  opacity: 0;
}

.dialog-fade-enter-active {
  transition: all 0.3s ease-out;
}

.dialog-fade-leave-active {
  transition: all 0.2s cubic-bezier(1, 0.5, 0.8, 1);
}

.dialog-fade-enter-from,
.dialog-fade-leave-to {
  opacity: 0;
  transform: scale(0.9);
}

@keyframes ping {
  75%, 100% {
    transform: scale(1.5);
    opacity: 0;
  }
}
.animate-ping {
  animation: ping 1.5s cubic-bezier(0, 0, 0.2, 1) infinite;
}

@keyframes bounce-x {
  0%, 100% {
    transform: translateX(-25%);
    animation-timing-function: cubic-bezier(0.8, 0, 1, 1);
  }
  50% {
    transform: translateX(0);
    animation-timing-function: cubic-bezier(0, 0, 0.2, 1);
  }
}

.bounce-x {
  animation: bounce-x 1s infinite;
}
</style>