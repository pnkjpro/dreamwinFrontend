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
        <button @click="toggleMenu" class="p-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-md">
          <font-awesome-icon icon="bars" class="text-2xl text-white" />
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
          
          <ul class="text-white space-y-2 mb-8">
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
        <h2 class="text-xl font-bold text-red-900 mb-3 flex items-center">
          <font-awesome-icon icon="lightning-bolt" class="mr-2 text-yellow-500" /> Quick Actions
        </h2>
        <div class="grid grid-cols-2 gap-4">
          <div @click="handleFunds('deposit')" class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-green-500 p-3 rounded-full mr-3">
                <font-awesome-icon icon="wallet" class="text-white text-lg" />
              </div>
              <div>
                <h3 class="font-bold text-green-800">Wallet</h3>
                <p class="text-green-600 text-xs">Add money</p>
              </div>
            </div>
          </div>
          
          <div @click="navigateTo('dashboard/refernearn')" class="bg-gradient-to-r from-blue-50 to-cyan-50 p-4 rounded-xl border border-blue-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-blue-500 p-3 rounded-full mr-3">
                <font-awesome-icon icon="user-friends" class="text-white text-lg" />
              </div>
              <div>
                <h3 class="font-bold text-blue-800">Refer & Earn</h3>
                <p class="text-blue-600 text-xs">Earn rewards</p>
              </div>
            </div>
          </div>
          
          <div @click="navigateTo('dashboard/lifeline')" class="bg-gradient-to-r from-purple-50 to-violet-50 p-4 rounded-xl border border-purple-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-purple-500 p-3 rounded-full mr-3">
                <font-awesome-icon icon="phone" class="text-white text-lg" />
              </div>
              <div>
                <h3 class="font-bold text-purple-800">Lifeline</h3>
                <p class="text-purple-600 text-xs">Get help</p>
              </div>
            </div>
          </div>
          
          <div @click="navigateTo('expert-videos')" class="bg-gradient-to-r from-red-50 to-orange-50 p-4 rounded-xl border border-red-200 shadow-md hover:shadow-lg transition-all hover:scale-105 cursor-pointer">
            <div class="flex items-center">
              <div class="bg-red-500 p-3 rounded-full mr-3">
                <font-awesome-icon icon="play-circle" class="text-white text-lg" />
              </div>
              <div>
                <h3 class="font-bold text-red-800">Expert Videos</h3>
                <p class="text-red-600 text-xs">Learn tips</p>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Official Notice -->
      <div v-if="official_notice_status" class="px-4 mb-4">
        <div class="bg-yellow-100 border-l-4 border-yellow-500 p-4 rounded-md">
          <p class="text-red-900 font-semibold">
            {{ official_notice }}
          </p>
        </div>
      </div>

      <!-- YouTube Videos Section -->
      <div class="px-4 mb-6">
        <h2 class="text-xl font-bold text-red-900 mb-3 flex items-center">
          <font-awesome-icon icon="video" class="mr-2 text-red-500" /> Featured Videos
        </h2>
        <div class="overflow-x-auto flex space-x-4 no-scrollbar">
          <div v-for="(video, index) in featuredVideos" :key="index" 
              class="flex-shrink-0 w-64 rounded-xl overflow-hidden shadow-lg bg-white">
            <div class="relative">
              <img :src="video.thumbnail" 
                  :alt="video.title" 
                  class="w-full h-36 object-cover" />
              <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
                <div class="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors cursor-pointer">
                  <font-awesome-icon icon="play" class="text-white text-xl" />
                </div>
              </div>
              <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {{ video.duration }}
              </div>
            </div>
            <div class="p-3">
              <h3 class="text-sm font-semibold text-gray-900 line-clamp-2 leading-tight">
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
  faUserFriends, faPlayCircle, faVideo, faPlay, faLock
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';

// Add icons to library
library.add(
  faBars, faWallet, faCashRegister, faChevronLeft, faChevronRight, 
  faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt,
  faPlus, faArrowUp, faTrophy, faClock, faChevronDown, faTimes,
  faLayerGroup, faStar, faPhone, faHistory, 
  // faLightningBolt,
  faUserFriends, faPlayCircle, faVideo, faPlay, faLock
);
  
const router = useRouter();
const toast = useToast();

const menuOpen = ref(false);
const mainStore = useMainStore();
const authStore = useAuthStore();
const transactionStore = useTransactionStore();

const { contests, categories, banners, loading, official_notice, official_notice_status, totalCount, hasShownVideo, featuredVideos } = storeToRefs(mainStore);
const { user } = storeToRefs(authStore);
const { fundAction } = storeToRefs(transactionStore);

const hasMoreLoad = computed(()=>{
  if(totalCount.value>contests.value.length){
    return true
  }
  return false
})

// YouTube Videos placeholder data
// const youtubeVideos = ref([
//   {
//     id: 1,
//     title: "How to Win Quiz Contests - Expert Tips and Strategies",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "12:45",
//     views: "125K"
//   },
//   {
//     id: 2,
//     title: "Top 10 General Knowledge Questions for Quiz Competitions",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "8:30",
//     views: "89K"
//   },
//   {
//     id: 3,
//     title: "Speed Quiz Techniques - Answer Faster and More Accurately",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "15:20",
//     views: "203K"
//   },
//   {
//     id: 4,
//     title: "Current Affairs 2024 - Important Questions for Quiz",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "22:15",
//     views: "67K"
//   },
//   {
//     id: 5,
//     title: "Memory Techniques for Quiz Preparation",
//     thumbnail: "https://img.youtube.com/vi/dQw4w9WgXcQ/maxresdefault.jpg",
//     duration: "18:40",
//     views: "156K"
//   }
// ]);

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
  mainStore.fetchFeaturedVideos();
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
  { text: 'Lifeline History', icon: 'history', url: 'dashboard/lifeline-history'},
  { text: 'Help & FAQs', icon: 'question-circle', url: 'faqs' },
  { text: 'About Us', icon: 'file-alt', url: 'aboutus' },
  { text: 'How to Play', icon: 'gamepad', url: 'how-to-play' },
  { text: 'Terms & Conditions', icon: 'file-alt', url: 'terms' },
  { text: 'Privacy Policy', icon: 'file-alt', url: 'privacy-policy' },
  { text: 'Refund Policy', icon: 'file-alt', url: 'refund-policy' }
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