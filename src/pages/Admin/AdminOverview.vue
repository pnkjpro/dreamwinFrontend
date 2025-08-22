<template>
  <div class="space-y-6">
    <!-- Welcome Header -->
    <div class="bg-gradient-to-r from-blue-600 to-purple-700 rounded-xl p-6 text-white">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-3xl font-bold mb-2">Welcome back, Admin!</h1>
          <p class="text-blue-100">Here's what's happening with your platform today.</p>
        </div>
        <div class="hidden md:block">
          <div class="w-16 h-16 bg-white bg-opacity-20 rounded-full flex items-center justify-center">
            <font-awesome-icon icon="chart-line" class="text-2xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Quick Stats Grid -->
    <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
      <!-- Total Users -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Users</p>
            <p class="text-2xl font-bold text-gray-900">12,345</p>
            <p class="text-xs text-green-600 mt-1">
              <font-awesome-icon icon="arrow-up" class="mr-1" />
              +12% from last month
            </p>
          </div>
          <div class="w-12 h-12 bg-blue-100 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="users" class="text-blue-600 text-xl" />
          </div>
        </div>
      </div>

      <!-- Active Contests -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Active Contests</p>
            <p class="text-2xl font-bold text-gray-900">87</p>
            <p class="text-xs text-green-600 mt-1">
              <font-awesome-icon icon="arrow-up" class="mr-1" />
              +5 this week
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="trophy" class="text-green-600 text-xl" />
          </div>
        </div>
      </div>

      <!-- Total Revenue -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Total Revenue</p>
            <p class="text-2xl font-bold text-gray-900">₹2,45,678</p>
            <p class="text-xs text-green-600 mt-1">
              <font-awesome-icon icon="arrow-up" class="mr-1" />
              +18% from last month
            </p>
          </div>
          <div class="w-12 h-12 bg-green-100 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="money-bill-wave" class="text-green-600 text-xl" />
          </div>
        </div>
      </div>

      <!-- Pending Approvals -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between">
          <div>
            <p class="text-sm font-medium text-gray-600">Pending Approvals</p>
            <p class="text-2xl font-bold text-gray-900">23</p>
            <p class="text-xs text-red-600 mt-1">
              <font-awesome-icon icon="clock" class="mr-1" />
              Requires attention
            </p>
          </div>
          <div class="w-12 h-12 bg-red-100 rounded-lg flex items-center justify-center">
            <font-awesome-icon icon="exclamation-triangle" class="text-red-600 text-xl" />
          </div>
        </div>
      </div>
    </div>

    <!-- Charts Row -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- User Growth Chart -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">User Growth</h3>
          <button class="text-sm text-blue-600 hover:text-blue-700">View Details</button>
        </div>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <font-awesome-icon icon="chart-area" class="text-4xl mb-2" />
            <p>Chart Placeholder</p>
            <p class="text-xs">Integration with Chart.js or similar</p>
          </div>
        </div>
      </div>

      <!-- Revenue Chart -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-semibold text-gray-900">Revenue Overview</h3>
          <button class="text-sm text-blue-600 hover:text-blue-700">View Details</button>
        </div>
        <div class="h-64 bg-gray-50 rounded-lg flex items-center justify-center">
          <div class="text-center text-gray-500">
            <font-awesome-icon icon="chart-bar" class="text-4xl mb-2" />
            <p>Chart Placeholder</p>
            <p class="text-xs">Integration with Chart.js or similar</p>
          </div>
        </div>
      </div>
    </div>

    <!-- Recent Activity & Quick Actions -->
    <div class="grid grid-cols-1 lg:grid-cols-2 gap-6">
      <!-- Recent Activity -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Recent Activity</h3>
        <div class="space-y-4">
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-blue-100 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="user-plus" class="text-blue-600 text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">New user registered</p>
              <p class="text-xs text-gray-500">2 minutes ago</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-green-100 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="trophy" class="text-green-600 text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">Contest completed</p>
              <p class="text-xs text-gray-500">15 minutes ago</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-red-100 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="exclamation-circle" class="text-red-600 text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">Fund approval pending</p>
              <p class="text-xs text-gray-500">1 hour ago</p>
            </div>
          </div>
          
          <div class="flex items-center space-x-3">
            <div class="w-8 h-8 bg-purple-100 rounded-full flex items-center justify-center">
              <font-awesome-icon icon="gamepad" class="text-purple-600 text-sm" />
            </div>
            <div class="flex-1">
              <p class="text-sm font-medium text-gray-900">New quiz created</p>
              <p class="text-xs text-gray-500">3 hours ago</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Quick Actions -->
      <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
        <h3 class="text-lg font-semibold text-gray-900 mb-4">Quick Actions</h3>
        <div class="grid grid-cols-2 gap-4">
          <router-link to="/admin/quiz/create" 
                       class="flex flex-col items-center p-4 bg-blue-50 rounded-lg hover:bg-blue-100 transition-colors group">
            <div class="w-12 h-12 bg-blue-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <font-awesome-icon icon="plus" class="text-white text-xl" />
            </div>
            <span class="text-sm font-medium text-gray-900">Create Quiz</span>
          </router-link>
          
          <router-link to="/admin/funds/approval" 
                       class="flex flex-col items-center p-4 bg-green-50 rounded-lg hover:bg-green-100 transition-colors group">
            <div class="w-12 h-12 bg-green-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <font-awesome-icon icon="check" class="text-white text-xl" />
            </div>
            <span class="text-sm font-medium text-gray-900">Approvals</span>
          </router-link>
          
          <router-link to="/admin/user/list" 
                       class="flex flex-col items-center p-4 bg-purple-50 rounded-lg hover:bg-purple-100 transition-colors group">
            <div class="w-12 h-12 bg-purple-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <font-awesome-icon icon="users" class="text-white text-xl" />
            </div>
            <span class="text-sm font-medium text-gray-900">Users</span>
          </router-link>
          
          <router-link to="/admin/banner/update" 
                       class="flex flex-col items-center p-4 bg-orange-50 rounded-lg hover:bg-orange-100 transition-colors group">
            <div class="w-12 h-12 bg-orange-500 rounded-lg flex items-center justify-center mb-2 group-hover:scale-110 transition-transform">
              <font-awesome-icon icon="edit" class="text-white text-xl" />
            </div>
            <span class="text-sm font-medium text-gray-900">Settings</span>
          </router-link>
        </div>
      </div>
    </div>

    <!-- System Status -->
    <div class="bg-white rounded-xl p-6 shadow-sm border border-gray-200">
      <h3 class="text-lg font-semibold text-gray-900 mb-4">System Status</h3>
      <div class="grid grid-cols-1 md:grid-cols-3 gap-4">
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-700">Database: Online</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-green-500 rounded-full"></div>
          <span class="text-sm text-gray-700">Payment Gateway: Active</span>
        </div>
        <div class="flex items-center space-x-3">
          <div class="w-3 h-3 bg-yellow-500 rounded-full"></div>
          <span class="text-sm text-gray-700">Email Service: Slow</span>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted } from 'vue';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faChartLine, faUsers, faTrophy, faMoneyBillWave, faExclamationTriangle,
  faClock, faArrowUp, faChartArea, faChartBar, faUserPlus, faExclamationCircle,
  faGamepad, faPlus, faCheck, faEdit
} from '@fortawesome/free-solid-svg-icons';

// Add icons to library
library.add(
  faChartLine, faUsers, faTrophy, faMoneyBillWave, faExclamationTriangle,
  faClock, faArrowUp, faChartArea, faChartBar, faUserPlus, faExclamationCircle,
  faGamepad, faPlus, faCheck, faEdit
);

onMounted(() => {
  // Fetch dashboard data
  console.log('Admin Overview loaded');
});
</script>

<style scoped>
/* Additional custom styles if needed */
</style>
