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
                class="w-24 h-24 rounded-full overflow-hidden flex-shrink-0 border-4 border-white shadow-lg hover:shadow-xl transition-transform hover:scale-105"
                :style="`box-shadow: 0 10px 15px -3px rgba(${220 + (index * 5) % 35}, ${(80 + index * 10) % 120}, ${50}, 0.4)`">
              <img :src="displayImage(category.icon)" :alt="category.name" class="w-full h-full object-cover" />
            </div>
            <p class="text-center font-bold text-sm mt-2 max-w-24 text-black-800">{{ category.name }}</p>
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

      <!-- Promotion Cards -->
      <div class="px-4 mb-6">
        <h2 class="text-xl font-bold text-red-900 mb-3 flex items-center">
          <font-awesome-icon icon="star" class="mr-2 text-yellow-500" /> Featured
        </h2>
        <div class="overflow-x-auto flex space-x-4 no-scrollbar">
          <div v-for="(banner, index) in banners" :key="index" 
              class="flex-shrink-0 w-64 h-32 rounded-xl overflow-hidden shadow-lg">
            <div class="relative w-full h-full group">
              <img :src="displayImage(banner.banner_path)" 
                  :alt="banner.title" 
                  class="w-full h-full object-cover transition-transform duration-300 group-hover:scale-110" />
              <div class="absolute inset-0 bg-gradient-to-t from-red-900 via-transparent to-transparent opacity-60"></div>
            </div>
          </div>
        </div>
        
        <!-- Pagination Dots -->
        <div class="flex justify-center space-x-2 mt-4">
          <div v-for="(dot, index) in 3" :key="index" 
              :class="[
                'h-2 rounded-full transition-all', 
                index === 1 ? 'w-8 bg-orange-500' : 'w-2 bg-red-200'
              ]">
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
                      <!-- Enhanced Prize Section with #1 Medal Icon -->
                      <div class="flex items-center bg-gradient-to-r from-yellow-300 via-yellow-400 to-amber-400 px-3 py-1.5 rounded-xl shadow-lg border-2 border-yellow-200 transform hover:scale-105 transition-all duration-200">
                        <div class="relative mr-2">
                          <font-awesome-icon icon="medal" class="text-amber-800 text-base drop-shadow-sm" />
                          <span class="absolute inset-0 flex items-center justify-center text-white font-black text-xs" style="font-size: 8px; top: 1px;">1</span>
                        </div>
                        <span class="text-amber-900 font-bold text-base tracking-wide">₹{{ contest.prize_money }}</span>
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
                        <div class="text-xs text-gray-500 font-medium">Closes at</div>
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
                        <font-awesome-icon icon="play" class="mr-2 animate-bounce" />
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
  faLayerGroup, faStar, faPhone,
  faHistory
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';

// Add icons to library
library.add(
  faBars, faWallet, faCashRegister, faChevronLeft, faChevronRight, 
  faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt,
  faPlus, faArrowUp, faTrophy, faClock, faChevronDown, faTimes,
  faLayerGroup, faStar, faPhone, faHistory
);
  
const router = useRouter();
const toast = useToast();
const config = inject('config');

const menuOpen = ref(false); 
const currentIndex = ref(0);

const mainStore = useMainStore();
const authStore = useAuthStore();
const transactionStore = useTransactionStore();

const { contests, categories, banners, loading, official_notice, official_notice_status, totalCount, hasShownVideo } = storeToRefs(mainStore);
const { user } = storeToRefs(authStore);
const { fundAction } = storeToRefs(transactionStore);

const hasMoreLoad = computed(()=>{
  if(totalCount.value>contests.value.length){
    return true
  }
  return false
})

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
  { text: 'Terms & Conditions', icon: 'file-alt', url: 'terms' }
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
</style>