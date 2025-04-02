<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="flex justify-between items-center p-4 bg-white">
        <div class="flex items-center">
          <!-- <img :src="avatar" alt="User Avatar" class="w-16 h-16 rounded-full object-cover" /> -->
          <img :src="'/images/fallbackImage.png'" alt="User Avatar" class="w-16 h-16 rounded-full object-cover" />
          <div class="ml-4">
            <p class="text-gray-600">Good to see you!</p>
            <h1 class="text-lg font-bold text-gray-700">{{ user.name }}</h1>
          </div>
        </div>
        <button @click="toggleMenu" class="p-2 rounded-full border-2 border-gray-300">
          <font-awesome-icon icon="bars" class="text-2xl text-gray-600" />
        </button>
      </header>

      <!-- Sidebar Menu -->
    <Transition name="slide-fade">
      <aside v-if="menuOpen" class="fixed top-0 left-0 w-3/4 h-full bg-orange-500 p-6 z-50 shadow-lg">
        <div class="flex items-center mb-6">
          <!-- <img :src="avatar" alt="User Avatar" class="w-12 h-12 rounded-full object-cover" /> -->
          <img :src="'/images/fallbackImage.png'" alt="User Avatar" class="w-12 h-12 rounded-full object-cover" />
          <div class="ml-4 text-white">
            <h2 class="text-lg font-bold">{{ user.name }}</h2>
            <!-- <p>Skill Score: 584</p> -->
          </div>
        </div>
        <div class="bg-white p-4 rounded-lg text-gray-700 mb-4">
          <p class="flex items-center font-bold">
            <font-awesome-icon icon="wallet" class="mr-2" /> My Balance <span class="ml-auto text-red-500">₹ {{ user.funds }}</span>
          </p>
          <div class="flex mt-2">
            <button @click="handleFunds('withdraw')" class="flex-1 py-2 bg-gray-200 rounded-lg mr-2">WITHDRAW</button>
            <button @click="handleFunds('deposit')" class="flex-1 py-2 bg-gray-200 rounded-lg">ADD CASH</button>
          </div>
        </div>
        <ul class="text-white space-y-4">
          <li v-for="(item, index) in menuItems" :key="index" @click="navigateTo(item.url)" class="flex items-center cursor-pointer">
            <font-awesome-icon :icon="item.icon" class="mr-3" />
            <span>{{ item.text }}</span>
          </li>
          <button @click="handleLogout" :disabled="authStore.loading" class="logout-btn">
            <font-awesome-icon icon="sign-out-alt" class="mr-3" />
            <span v-if="authStore.loading">Logging out...</span>
            <span v-else>Logout</span>
          </button>
        </ul>
      </aside>
    </Transition>
  
      <!-- Category Cards -->
      <div class="flex overflow-x-auto p-4 space-x-4 no-scrollbar">
        <div v-for="(category, index) in categories" :key="index" class="flex flex-col items-center">
          <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <!-- <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" /> -->
            <img :src="'/images/fallbackImage.png'" :alt="category.name" class="w-full h-full object-cover" />
          </div>
          <p class="text-center font-bold text-sm mt-2 max-w-24">{{ category.name }}</p>
        </div>
      </div>
  
      <!-- Promotion Cards -->
      <div class="px-4 overflow-x-auto flex space-x-4 no-scrollbar">
        <div v-for="(promo, index) in promotions" :key="index" 
             class="flex-shrink-0 w-64 bg-orange-400 rounded-lg p-6 text-white">
          <p class="font-bold">{{ promo.title }}</p>
        </div>
      </div>
  
      <!-- Pagination Dots -->
      <div class="flex justify-center space-x-2 mt-4">
        <div v-for="(dot, index) in 3" :key="index" 
             :class="[
               'h-2 rounded-full', 
               index === 1 ? 'w-8 bg-orange-400' : 'w-2 bg-gray-300'
             ]">
        </div>
      </div>
  
      <!-- Upcoming Contest Section -->
      <div class="p-4">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-2xl font-bold text-gray-700">Upcoming Contest</h2>
          <a href="#" class="flex items-center text-gray-700">
            View All
            <font-awesome-icon icon="arrow-right" class="ml-2" />
          </a>
        </div>
  
        <!-- Contest Cards -->
        <div class="space-y-4">
          <div v-for="(contest, index) in activeContests" :key="index"
            class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div @click="fetchContest(contest.node_id)" class="flex p-4">
              <!-- Contest Image -->
              <div class="w-1/4 flex-shrink-0">
                <img :src="'/images/fallbackImage.png'" :alt="contest.title" class="w-full h-full object-cover rounded-lg" />
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
                  <span class="text-orange-400 font-bold mr-2">MEGA PRIZE</span>
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
  import { ref, inject, onMounted, computed, onUnmounted } from 'vue';
  import { fromUnixTime, isPast, formatDistanceToNow } from 'date-fns';
  import { useRouter } from 'vue-router';
  import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMainStore } from '@/stores/mainStore';
import { useAuthStore } from '@/stores/authStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { faBars, faWallet, faCashRegister, faChevronLeft, faChevronRight, faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

  // Add icons to library
  library.add(faBars, faWallet, faCashRegister, faChevronLeft, faChevronRight, faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt);
    
  const avatar = ref('/api/placeholder/80/80');

  const router = useRouter();
  const config = inject('config');
  // const fallbackImage = config.FALLBACK_IMAGE;

  const menuOpen = ref(false);
  const currentIndex = ref(0);

  
  
  // Promotions
  const promotions = ref([
    { title: 'Unleash Your Competitive Spirit in Special Event!' },
    { title: 'Explore Today\'s Top Picks of Engaging Quizzes!' },
    { title: 'Conquer the Weekly Challenges!' }
  ]);

  const mainStore = useMainStore();
  const authStore = useAuthStore();
  const transactionStore = useTransactionStore();

  const { contests, categories } = storeToRefs(mainStore);
  const { user } = storeToRefs(authStore);
  const { fundAction } = storeToRefs(transactionStore);

  const handleFunds = (fundType) => {
    fundAction.value = fundType;
    console.log(fundType);
    console.log(fundAction.value);
    router.push('/funds');
  }

  const fetchContest = async(nodeId) => {
    await mainStore.fetchCurrentContest(nodeId)
    router.push('/quiz/variants')
  }

  onMounted(() => {
    mainStore.fetchContests();
    mainStore.fetchCategories();
  })

  const menuItems = ref([
  { text: 'Refer & Earn', icon: 'user', url: 'refernearn' },
  { text: 'My Lifelines', icon: 'phone', url: 'lifeline'},
  { text: 'My Transactions', icon: 'cash-register', url: 'transactions'},
  { text: 'My Contests', icon: 'gamepad', url: 'my-contests'},
  { text: 'Help', icon: 'question-circle', url: 'help' },
  { text: 'About Us', icon: 'file-alt', url: 'aboutus' },
  { text: 'How to Play', icon: 'gamepad', url: 'how_to_play' },
  { text: 'Terms & Conditions', icon: 'file-alt', url: 'terms' }
]);

// Filter contests that are still active
const activeContests = computed(() => {
  const currentTime = Math.floor(Date.now() / 1000); // Get current Unix timestamp
  return contests.value.filter(contest => contest.end_time > currentTime);
});

const navigateTo = (url) => {
  router.push(`/${url}`);
}

const handleLogout = async () => {
  try {
    const result = await authStore.logout();
    if (result.success) {
      router.push('/auth/login');
    } else {
      alert(result.message);
    }
  } catch (error) {
    console.error('Logout error:', error);
    alert('An error occurred during logout');
  }
};

const toggleMenu = () => menuOpen.value = !menuOpen.value;

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
  transform: translateX(20px);
  opacity: 0;
}
  </style>