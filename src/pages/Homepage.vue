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
            <p class="text-center font-medium text-sm mt-2 max-w-24 text-red-800">{{ category.name }}</p>
          </div>
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
              <!-- Contest Image -->
              <div class="w-1/4 flex-shrink-0">
                <div class="rounded-lg overflow-hidden shadow-md h-full">
                  <img :src="displayImage(contest.banner_image)" :alt="contest.title" class="w-full h-full object-cover" />
                </div>
              </div>

              <!-- Contest Details -->
              <div class="w-3/4 pl-4 flex flex-col justify-between">
                <!-- Category Badge -->
                <div class="text-center mb-2">
                  <span class="bg-gradient-to-r from-red-600 to-orange-600 text-white px-4 py-1 rounded-full text-xs font-medium inline-block shadow-sm">
                    {{ contest.category.name }}
                  </span>
                </div>

                <!-- Title -->
                <div class="mb-2">
                  <h3 class="text-md font-bold text-red-900 truncate">{{ contest.title }}</h3>
                </div>
                
                <!-- Time indicator on its own row -->
                <div class="mb-2 flex items-center">
                  <p v-if="getContestStatus(contest.start_time).isLive" class="text-white font-bold flex items-center bg-red-500 px-3 py-0.5 rounded-full shadow-sm">
                    <span class="inline-block h-2 w-2 rounded-full bg-white mr-2 animate-ping"></span>
                    LIVE
                  </p>
                  <p v-else class="text-orange-600 font-medium flex items-center">
                    <font-awesome-icon icon="clock" class="mr-2" />
                    {{ getContestStatus(contest.start_time).text }}
                  </p>
                  <span v-if="contest.entry_fees == 0" class="text-white font-bold ml-auto px-3 py-0.5 bg-gradient-to-r from-green-500 to-teal-500 rounded-full shadow-sm">FREE</span>
                </div>

                <!-- Prize row -->
                <div class="flex items-center bg-gradient-to-r from-yellow-400 to-orange-300 p-2 rounded-lg shadow-sm">
                  <span class="text-red-900 font-bold text-sm">MEGA PRIZE</span>
                  <font-awesome-icon icon="trophy" class="text-red-600 mx-2" />
                  <span class="text-red-900 font-medium">₹ {{ contest.prize_money }}</span>
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

// Video preloader settings
const showPreloader = ref(false);
const videoSource = ref('/videos/himpri_intro.mp4'); // Replace with actual path to your 2-sec video
const videoTimeout = ref(null);
const SESSION_KEY = 'hasShownIntroVideo';

// Check if we've shown the intro video in this session
const checkPreloaderStatus = () => {
  const hasShownVideo = localStorage.getItem(SESSION_KEY);
  if (!hasShownVideo) {
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
  localStorage.setItem(SESSION_KEY, 'true');
  if (videoTimeout.value) {
    clearTimeout(videoTimeout.value);
  }
};

const onVideoEnded = () => {
  // Hide preloader when video ends
  hidePreloader();
};

const menuOpen = ref(false);
const currentIndex = ref(0);

const mainStore = useMainStore();
const authStore = useAuthStore();
const transactionStore = useTransactionStore();

const { contests, categories, banners, loading, totalCount } = storeToRefs(mainStore);
const { user } = storeToRefs(authStore);
const { fundAction } = storeToRefs(transactionStore);

const hasMoreLoad = computed(()=>{
  if(totalCount.value>contests.value.length){
    return true
  }
  return false
})

const handleFunds = (fundType) => {
  fundAction.value = fundType;
  console.log(fundType);
  console.log(fundAction.value);
  router.push('/dashboard/funds');
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
  // Make sure the timestamp is being processed correctly
  // If it's in milliseconds, you don't need fromUnixTime
  // If it's in seconds (standard Unix timestamp), use fromUnixTime
  
  const startTime = typeof unixTimestamp === 'number' ? 
    fromUnixTime(unixTimestamp) : 
    new Date(unixTimestamp);
    
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