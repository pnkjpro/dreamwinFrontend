<template>
  <div class="flex min-h-screen bg-gray-50">
    <!-- Sidebar -->
    <div class="fixed inset-y-0 left-0 z-50 w-72 transform transition-transform duration-300 ease-in-out lg:translate-x-0 lg:static lg:inset-0"
         :class="isSidebarOpen ? 'translate-x-0' : '-translate-x-full'">
      <div class="flex flex-col h-full bg-white shadow-xl border-r border-gray-200">
        
        <!-- Sidebar Header -->
        <div class="flex items-center justify-between p-6 border-b border-gray-200 bg-gradient-to-r from-blue-600 to-purple-700">
          <div class="flex items-center">
            <div class="w-10 h-10 bg-white rounded-lg flex items-center justify-center mr-3">
              <font-awesome-icon icon="crown" class="text-blue-600 text-xl" />
            </div>
            <div>
              <h2 class="text-xl font-bold text-white">Admin Panel</h2>
              <p class="text-blue-100 text-xs">Management Dashboard</p>
            </div>
          </div>
          <button @click="toggleSidebar" class="lg:hidden text-white hover:text-blue-200 transition-colors">
            <font-awesome-icon icon="times" class="text-xl" />
          </button>
        </div>

        <!-- Navigation Menu -->
        <nav class="flex-1 overflow-y-auto py-6">
          <!-- Dashboard Overview -->
           <!-- we'll roll out this in future update -->
          <!-- <div class="mb-6">
            <router-link to="/admin/overview" 
                         class="flex items-center px-6 py-3 mx-4 rounded-lg transition-all duration-200 hover:bg-blue-50 group"
                         :class="route.path === '/admin/overview' ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-500' : 'text-gray-700 hover:text-blue-600'"
                         @click="toggleSidebarIfMobile">
              <font-awesome-icon icon="chart-line" class="text-lg mr-4 group-hover:scale-110 transition-transform" />
              <span class="font-medium">Dashboard Overview</span>
            </router-link>
          </div> -->

          <!-- Menu Groups -->
          <div v-for="(group, groupIndex) in menuGroups" :key="groupIndex" class="mb-6">
            <!-- Group Header -->
            <div class="px-6 mb-3">
              <div class="flex items-center cursor-pointer" @click="toggleGroup(groupIndex)">
                <div class="flex items-center flex-1">
                  <div class="w-8 h-8 rounded-lg flex items-center justify-center mr-3"
                       :class="group.bgColor">
                    <font-awesome-icon :icon="group.icon" class="text-sm" :class="group.iconColor" />
                  </div>
                  <h3 class="text-sm font-semibold text-gray-800 uppercase tracking-wide">{{ group.title }}</h3>
                </div>
                <font-awesome-icon 
                  :icon="group.isOpen ? 'chevron-up' : 'chevron-down'" 
                  class="text-gray-400 text-sm transition-transform duration-200"
                  :class="group.isOpen ? 'rotate-180' : ''" />
              </div>
            </div>

            <!-- Group Items -->
            <transition 
              enter-active-class="transition-all duration-300 ease-out"
              enter-from-class="opacity-0 max-h-0"
              enter-to-class="opacity-100 max-h-96"
              leave-active-class="transition-all duration-300 ease-in"
              leave-from-class="opacity-100 max-h-96"
              leave-to-class="opacity-0 max-h-0">
              <div v-show="group.isOpen" class="overflow-hidden">
                <div v-for="(item, itemIndex) in group.items" :key="itemIndex" class="mb-1">
                  <router-link
                    :to="item.path"
                    class="flex items-center px-6 py-3 mx-4 rounded-lg transition-all duration-200 hover:bg-gray-50 group"
                    :class="route.path === item.path ? 'bg-blue-100 text-blue-700 border-r-4 border-blue-500' : 'text-gray-600 hover:text-gray-900 hover:bg-blue-50'"
                    @click="toggleSidebarIfMobile">
                    <div class="w-6 h-6 rounded-md flex items-center justify-center mr-4 transition-all duration-200"
                         :class="route.path === item.path ? 'bg-blue-200' : 'bg-gray-100 group-hover:bg-blue-100'">
                      <font-awesome-icon :icon="item.icon" class="text-xs"
                                         :class="route.path === item.path ? 'text-blue-700' : 'text-gray-600 group-hover:text-blue-600'" />
                    </div>
                    <span class="font-medium text-sm">{{ item.name }}</span>
                    <span v-if="item.badge" class="ml-auto bg-red-100 text-red-600 text-xs px-2 py-1 rounded-full font-medium">
                      {{ item.badge }}
                    </span>
                  </router-link>
                </div>
              </div>
            </transition>
          </div>
        </nav>

        <!-- Sidebar Footer -->
        <div class="p-6 border-t border-gray-200 bg-gray-50">
          <div class="text-center">
            <p class="text-xs text-gray-500 mb-2">Himpri Admin Panel</p>
            <p class="text-xs text-gray-400">Version 1.0.0</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Overlay for mobile -->
    <div v-if="isSidebarOpen && isMobile" 
         class="fixed inset-0 z-40 bg-gray-600 bg-opacity-75 lg:hidden"
         @click="toggleSidebar"></div>

    <!-- Main Content -->
    <div class="flex-1 flex flex-col lg:ml-0">
      <!-- Top Header -->
      <header class="bg-white shadow-sm border-b border-gray-200 lg:static lg:overflow-y-visible">
        <div class="px-4 sm:px-6 lg:px-8">
          <div class="relative flex justify-between h-16">
            <div class="flex items-center">
              <!-- Mobile menu button -->
              <button @click="toggleSidebar" 
                      class="inline-flex items-center justify-center p-2 rounded-md text-gray-400 hover:text-gray-500 hover:bg-gray-100 focus:outline-none focus:ring-2 focus:ring-inset focus:ring-blue-500 lg:hidden">
                <font-awesome-icon icon="bars" class="text-xl" />
              </button>
              
              <!-- Page Title -->
              <div class="ml-4 lg:ml-0">
                <h1 class="text-2xl font-bold text-gray-900">{{ getPageTitle() }}</h1>
                <p class="text-sm text-gray-500">{{ getPageDescription() }}</p>
              </div>
            </div>

            <!-- Right side header content -->
            <div class="flex items-center space-x-4">
              <!-- Notifications -->
              <!-- <button class="p-2 text-gray-400 hover:text-gray-500 relative">
                <font-awesome-icon icon="bell" class="text-xl" />
                <span class="absolute top-0 right-0 block h-2 w-2 rounded-full bg-red-400 ring-2 ring-white"></span>
              </button> -->
              
              <!-- Admin Profile Dropdown -->
              <div class="relative">
                <button @click="toggleProfileDropdown" 
                        class="flex items-center space-x-2 p-2 rounded-lg hover:bg-gray-100 transition-colors focus:outline-none focus:ring-2 focus:ring-blue-500">
                  <div class="w-8 h-8 bg-gradient-to-r from-blue-500 to-purple-600 rounded-full flex items-center justify-center">
                    <font-awesome-icon icon="user" class="text-white text-sm" />
                  </div>
                  <span class="ml-2 text-sm font-medium text-gray-700 hidden sm:block">Admin</span>
                  <font-awesome-icon icon="chevron-down" class="text-gray-400 text-xs hidden sm:block transition-transform duration-200"
                                     :class="isProfileDropdownOpen ? 'rotate-180' : ''" />
                </button>

                <!-- Dropdown Menu -->
                <transition
                  enter-active-class="transition ease-out duration-200"
                  enter-from-class="transform opacity-0 scale-95"
                  enter-to-class="transform opacity-100 scale-100"
                  leave-active-class="transition ease-in duration-75"
                  leave-from-class="transform opacity-100 scale-100"
                  leave-to-class="transform opacity-0 scale-95">
                  <div v-show="isProfileDropdownOpen" 
                       class="absolute right-0 mt-2 w-48 bg-white rounded-lg shadow-lg border border-gray-200 py-2 z-50">

                    <!-- Menu Items -->
                    <div class="py-1">
                      <button @click="handleLogout" 
                              :disabled="authStore.loading"
                              class="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors disabled:opacity-50 disabled:cursor-not-allowed">
                        <font-awesome-icon icon="sign-out-alt" class="mr-3" />
                        <span v-if="authStore.loading">Logging out...</span>
                        <span v-else>Logout</span>
                      </button>
                    </div>
                  </div>
                </transition>
              </div>
            </div>
          </div>
        </div>
      </header>

      <!-- Main Content Area -->
      <main class="flex-1 overflow-y-auto bg-gray-50">
        <div class="py-6">
          <div class="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
            <router-view />
          </div>
        </div>
      </main>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore';
import { useAuthStore } from '@/stores/authStore';
import { ref, onMounted, onUnmounted } from 'vue';
import { useRoute, useRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faCrown, faTimes, faBars, faChartLine, faChevronUp, faChevronDown,
  faSignOutAlt, faBell, faUser, faMoneyBillWave, faGamepad, faCog,
  faUsers, faRobot, faTrophy, 
  // faApprovalCheck, 
  faPlus, faEdit,
  faEye, faList, faHome, faVideo, faPhone, faLifeRing, faUserCircle
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';

// Add icons to library
library.add(
  faCrown, faTimes, faBars, faChartLine, faChevronUp, faChevronDown,
  faSignOutAlt, faBell, faUser, faMoneyBillWave, faGamepad, faCog,
  faUsers, faRobot, faTrophy, 
  // faApprovalCheck, 
  faPlus, faEdit,
  faEye, faList, faHome, faVideo, faPhone, faLifeRing, faUserCircle
);

const authStore = useAuthStore();
const route = useRoute();
const router = useRouter();
const toast = useToast();
const isSidebarOpen = ref(true);
const isMobile = ref(false);
const isProfileDropdownOpen = ref(false);

// Grouped menu structure
const menuGroups = ref([
  {
    title: 'Financial Management',
    icon: 'money-bill-wave',
    iconColor: 'text-green-600',
    bgColor: 'bg-green-100',
    isOpen: true,
    items: [
      { name: 'Fund Approval', path: '/admin/funds/approval', icon: 'approval-check', badge: '3' }
    ]
  },
  {
    title: 'Content Management',
    icon: 'gamepad',
    iconColor: 'text-blue-600',
    bgColor: 'bg-blue-100',
    isOpen: true,
    items: [
      { name: 'Quiz Creation', path: '/admin/quiz/create', icon: 'plus' },
      { name: 'Category Create', path: '/admin/category/create', icon: 'plus' },
      { name: 'Quiz List', path: '/admin/quiz/list', icon: 'list' }
    ]
  },
  {
    title: 'Website Settings',
    icon: 'cog',
    iconColor: 'text-purple-600',
    bgColor: 'bg-purple-100',
    isOpen: true,
    items: [
      { name: 'Update Banner', path: '/admin/banner/update', icon: 'home' },
      { name: 'Update Notice', path: '/admin/notice/update', icon: 'edit' },
      { name: 'Update How Video', path: '/admin/howVideo/update', icon: 'video' },
      { name: 'Update Lifeline', path: '/admin/lifeline/update', icon: 'phone' }
    ]
  },
  {
    title: 'User Management',
    icon: 'users',
    iconColor: 'text-indigo-600',
    bgColor: 'bg-indigo-100',
    isOpen: true,
    items: [
      { name: 'Users List', path: '/admin/user/list', icon: 'users' },
      { name: 'Bot Management', path: '/admin/bot/list', icon: 'robot' },
      { name: 'Leaderboard', path: '/admin/leaderboard/list', icon: 'trophy' }
    ]
  }
]);

const toggleSidebar = () => {
  isSidebarOpen.value = !isSidebarOpen.value;
};

const toggleGroup = (groupIndex) => {
  menuGroups.value[groupIndex].isOpen = !menuGroups.value[groupIndex].isOpen;
};

const toggleProfileDropdown = () => {
  isProfileDropdownOpen.value = !isProfileDropdownOpen.value;
};

const viewProfile = () => {
  isProfileDropdownOpen.value = false;
  // Navigate to profile page or open profile modal
  toast.info('Profile page will be implemented soon');
};

const adminSettings = () => {
  isProfileDropdownOpen.value = false;
  // Navigate to settings page
  toast.info('Settings page will be implemented soon');
};

const handleLogout = async () => {
  isProfileDropdownOpen.value = false;
  const result = await authStore.logout();
  if (!result.success) {
    toast.error(result.message);
  } else {
    router.push('/auth/login');
  }
};

const toggleSidebarIfMobile = () => {
  if (isMobile.value) isSidebarOpen.value = false;
};

const checkIfMobile = () => {
  isMobile.value = window.innerWidth <= 1024;
  if (!isMobile.value) {
    isSidebarOpen.value = true;
  }
};

// Close dropdown when clicking outside
const handleClickOutside = (event) => {
  if (isProfileDropdownOpen.value && !event.target.closest('.relative')) {
    isProfileDropdownOpen.value = false;
  }
};

const getPageTitle = () => {
  const currentPath = route.path;
  
  // Search through all menu groups and items
  for (const group of menuGroups.value) {
    for (const item of group.items) {
      if (item.path === currentPath) {
        return item.name;
      }
    }
  }
  
  // Default titles for specific paths
  const titleMap = {
    '/admin/overview': 'Dashboard Overview'
  };
  
  return titleMap[currentPath] || 'Admin Dashboard';
};

const getPageDescription = () => {
  const currentPath = route.path;
  
  const descriptionMap = {
    '/admin/overview': 'Overview of system statistics and metrics',
    '/admin/funds/approval': 'Review and approve fund withdrawal requests',
    '/admin/quiz/create': 'Create new quiz competitions',
    '/admin/category/create': 'Add new quiz categories',
    '/admin/quiz/list': 'Manage existing quizzes',
    '/admin/banner/update': 'Update homepage banner content',
    '/admin/notice/update': 'Manage system notices and announcements',
    '/admin/howVideo/update': 'Update instructional videos',
    '/admin/lifeline/update': 'Configure lifeline options',
    '/admin/user/list': 'View and manage registered users',
    '/admin/bot/list': 'Manage bot accounts and settings',
    '/admin/leaderboard/list': 'View competition leaderboards'
  };
  
  return descriptionMap[currentPath] || 'Manage your application settings and content';
};

onMounted(() => {
  checkIfMobile();
  window.addEventListener('resize', checkIfMobile);
  document.addEventListener('click', handleClickOutside);
});

onUnmounted(() => {
  window.removeEventListener('resize', checkIfMobile);
  document.removeEventListener('click', handleClickOutside);
});
</script>

<style>
/* Custom scrollbar for sidebar */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}

/* Smooth transitions for group toggle */
.max-h-0 {
  max-height: 0;
}

.max-h-96 {
  max-height: 24rem;
}

/* Focus styles for accessibility */
.focus\:ring-2:focus {
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5);
}

.focus\:ring-offset-2:focus {
  box-shadow: 0 0 0 2px white, 0 0 0 4px rgba(59, 130, 246, 0.5);
}
</style>
