<template>
    <div class="min-h-screen bg-gray-100">
      <!-- Header -->
      <header class="flex justify-between items-center p-4 bg-white">
        <div class="flex items-center">
          <!-- <img :src="avatar" alt="User Avatar" class="w-16 h-16 rounded-full object-cover" /> -->
          <img :src="fallbackImage" alt="User Avatar" class="w-16 h-16 rounded-full object-cover" />
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
          <img :src="fallbackImage" alt="User Avatar" class="w-12 h-12 rounded-full object-cover" />
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
        </ul>
      </aside>
    </Transition>
  
      <!-- Category Cards -->
      <div class="flex overflow-x-auto p-4 space-x-4 no-scrollbar">
        <div v-for="(category, index) in categories" :key="index" class="flex flex-col items-center">
          <div class="w-24 h-24 rounded-lg overflow-hidden flex-shrink-0">
            <!-- <img :src="category.image" :alt="category.name" class="w-full h-full object-cover" /> -->
            <img :src="fallbackImage" :alt="category.name" class="w-full h-full object-cover" />
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
          <div v-for="(contest, index) in contests" :key="index"
               class="bg-white rounded-lg overflow-hidden shadow-sm border border-gray-200">
            <div @click="fetchContest(contest.node_id)" class="flex p-4">
              <!-- Contest Image -->
              <div class="w-1/4 flex-shrink-0">
                <!-- <img :src="contest.image" :alt="contest.title" class="w-full h-full object-cover rounded-lg" /> -->
                <img :src="fallbackImage" :alt="contest.title" class="w-full h-full object-cover rounded-lg" />
              </div>
              
              <!-- Contest Details -->
              <div class="w-3/4 pl-4 flex flex-col justify-between">
                <!-- Category Badge - Centered at top -->
                <div class="text-center mb-2">
                  <span class="bg-purple-50 text-purple-700 px-6 py-1 rounded-full inline-block">
                    {{ contest.category.name }}
                  </span>
                </div>
                
                <!-- Title and Time in same row -->
                <div class="flex justify-between items-center mb-2">
                  <h3 class="text-md font-bold text-gray-700">{{ contest.title }}</h3>
                  <p class="text-red-500 font-bold">{{ contest.time }}</p>
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
  import { ref, inject, onMounted } from 'vue';
  import { useRouter } from 'vue-router';
  import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { useMainStore } from '@/stores/mainStore';
import { useAuthStore } from '@/stores/authStore';
import { useTransactionStore } from '@/stores/transactionStore';
import { storeToRefs } from 'pinia';
import { faBars, faWallet, faChevronLeft, faChevronRight, faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt } from '@fortawesome/free-solid-svg-icons';

  // Add icons to library
  library.add(faBars, faWallet, faChevronLeft, faChevronRight, faUser, faQuestionCircle, faGamepad, faFileAlt, faSignOutAlt);
    
  const avatar = ref('/api/placeholder/80/80');

  const router = useRouter();
  const config = inject('config');
  const fallbackImage = config.FALLBACK_IMAGE;

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

  // User data
  // const user = ref({
  //   name: 'RAJSHREE AHUJA',
  //   avatar: '/api/placeholder/80/80'
  // });
  
  // Categories
  // const categories = ref([
  //   { name: 'HISTORY & CULTURE', image: '/api/placeholder/96/96' },
  //   { name: 'NATURAL SCIENCE', image: '/api/placeholder/96/96' },
  //   { name: 'ART & CREATIVITY', image: '/api/placeholder/96/96' },
  //   { name: 'WORLD GEOGRAPHY', image: '/api/placeholder/96/96' },
  //   { name: 'FOOD & BEVERAGE', image: '/api/placeholder/96/96' }
  // ]);
  
  // Upcoming contests
  // const contests = ref([
  //   { 
  //     title: 'SPORT QUIZ', 
  //     category: 'Sports & Games',
  //     image: '/api/placeholder/100/100',
  //     prize: '10 Lakh',
  //     time: 'Mon 11:00 Am'
  //   },
  //   { 
  //     title: 'INT. POLITICS', 
  //     category: 'Politics',
  //     image: '/api/placeholder/100/100',
  //     prize: '5 Lakh',
  //     time: 'Sun 11:00 Am'
  //   },
  //   { 
  //     title: 'CURRENT AFFAIR', 
  //     category: 'Affairs',
  //     image: '/api/placeholder/100/100',
  //     prize: '10 Lakh',
  //     time: 'Mon 11:00 Am'
  //   },
  //   { 
  //     title: 'HOME SCIENCE', 
  //     category: 'Science',
  //     image: '/api/placeholder/100/100',
  //     prize: '10 Lakh',
  //     time: 'Mon 11:00 Am'
  //   }
  // ]);



  const menuItems = ref([
  { text: 'Refer & Earn', icon: 'user', url: 'refernearn' },
  { text: 'Help', icon: 'question-circle', url: 'help' },
  { text: 'About Us', icon: 'file-alt', url: 'aboutus' },
  { text: 'How to Play', icon: 'gamepad', url: 'how_to_play' },
  { text: 'Terms & Conditions', icon: 'file-alt', url: 'terms' },
  { text: 'Logout', icon: 'sign-out-alt', url: 'logout' }
]);

const navigateTo = (url) => {
  router.push(`/${url}`);
}

const toggleMenu = () => menuOpen.value = !menuOpen.value;
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