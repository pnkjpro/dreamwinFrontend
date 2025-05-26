<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">User Management</h1>
        <button 
          @click="refreshUserList" 
          class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
        >
          <span class="mr-2">Refresh</span>
          <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
            <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
          </svg>
        </button>
      </div>

      <!-- Search and Filters Section -->
      <div class="bg-gray-50 rounded-lg p-4 mb-6">
        <h3 class="text-lg font-semibold text-gray-700 mb-4">Search & Filters</h3>
        
        <!-- Search Fields -->
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search by Name</label>
            <input 
              v-model="searchFilters.name"
              type="text" 
              placeholder="Enter name..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search by Email</label>
            <input 
              v-model="searchFilters.email"
              type="email" 
              placeholder="Enter email..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search by Mobile</label>
            <input 
              v-model="searchFilters.mobile"
              type="text" 
              placeholder="Enter mobile..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Search by UPI ID</label>
            <input 
              v-model="searchFilters.upi_id"
              type="text" 
              placeholder="Enter UPI ID..."
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Filters Row -->
        <div class="grid grid-cols-1 md:grid-cols-3 gap-4 mb-4">
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Verification Status</label>
            <select 
              v-model="searchFilters.verified_status"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="">All</option>
              <option value="verified">Verified</option>
              <option value="not_verified">Not Verified</option>
            </select>
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">Start Date</label>
            <input 
              v-model="searchFilters.start_date"
              type="date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-1">End Date</label>
            <input 
              v-model="searchFilters.end_date"
              type="date" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-blue-500"
            />
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-2">
          <button 
            @click="applyFilters"
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md"
          >
            Apply Filters
          </button>
          <button 
            @click="clearFilters"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Clear Filters
          </button>
        </div>
      </div>

      <div v-if="adminStore.loading && !userList.length" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else-if="!userList.length" class="text-center py-12">
        <p class="text-gray-500">No users found</p>
      </div>
      
      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">ID</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Email</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Mobile</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">UPI ID</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Funds</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Refer Code</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Referred By Code</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Verified Status</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Created At</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Referred Users</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="user in userList" :key="user.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 text-gray-800">{{ user.id }}</td>
                <td class="py-3 px-4 text-gray-800">{{ user.name }}</td>
                <td class="py-3 px-4 text-gray-800">{{ user.email }}</td>
                <td class="py-3 px-4 text-gray-800">{{ user.mobile }}</td>
                <td class="py-3 px-4 text-gray-800">{{ user.upi_id }}</td>
                <td class="py-3 px-4 text-gray-800">{{ user.funds }}</td>             
                <td class="py-3 px-4 text-gray-800">{{ user.refer_code }}</td>             
                <td class="py-3 px-4 text-gray-800">{{ user.referred_by_code }}</td>             
                <td class="py-3 px-4">
                  <div class="flex items-center">
                    <span v-if="user.email_verified_at != null" class="inline-flex items-center">
                      <span class="bg-green-100 text-green-800 text-xs font-medium mr-1 px-2.5 py-0.5 rounded-full flex items-center">
                        <svg class="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zm3.707-9.293a1 1 0 00-1.414-1.414L9 10.586 7.707 9.293a1 1 0 00-1.414 1.414l2 2a1 1 0 001.414 0l4-4z" clip-rule="evenodd" />
                        </svg>
                        Verified
                      </span>
                    </span>
                    <span v-else class="inline-flex items-center">
                      <span class="bg-red-100 text-red-800 text-xs font-medium px-2.5 py-0.5 rounded-full flex items-center">
                        <svg class="w-3 h-3 mr-1" viewBox="0 0 20 20" fill="currentColor" xmlns="http://www.w3.org/2000/svg">
                          <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd" />
                        </svg>
                        Unverified
                      </span>
                    </span>
                  </div>
                </td>
                <td class="py-3 px-4 text-gray-800">{{ formatDate(user.created_at) }}</td>
                <td class="py-3 px-4">
                  <button 
                    @click="openReferredUsersModal(user)"
                    class="bg-indigo-500 hover:bg-indigo-600 text-white px-3 py-1 rounded text-sm"
                  >
                    View ({{ user.referred_users?.length || 0 }})
                  </button>
                </td>          
              </tr>
            </tbody>
          </table>
        </div>
        <div class="mt-6 flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">{{ userList.length }}</span> users
          </div>
        </div>
        <!-- Load More Button -->
        <div v-if="hasMoreLoad" class="mt-6 text-center">
          <button @click="fetchUserList" 
          class="px-8 py-3 bg-gradient-to-r from-blue-600 to-violet-600 text-white rounded-full shadow-lg hover:from-blue-700 hover:to-cyan-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
          :disabled="adminStore.loading">
            <span v-if="adminStore.loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
            <span v-else class="flex items-center justify-center">
              Load More
              <svg xmlns="http://www.w3.org/2000/svg" class="h-4 w-4 ml-2" viewBox="0 0 20 20" fill="currentColor">
                <path fill-rule="evenodd" d="M5.293 7.293a1 1 0 011.414 0L10 10.586l3.293-3.293a1 1 0 111.414 1.414l-4 4a1 1 0 01-1.414 0l-4-4a1 1 0 010-1.414z" clip-rule="evenodd" />
              </svg>
            </span>
          </button>
        </div>
      </div>
    </div>

    <!-- Referred Users Modal -->
    <div v-if="showReferredModal" class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50">
      <div class="bg-white rounded-lg p-6 w-full max-w-4xl max-h-[90vh] overflow-y-auto">
        <div class="flex justify-between items-center mb-4">
          <h2 class="text-xl font-bold text-gray-800">
            Referred Users - {{ selectedUser?.name }}
          </h2>
          <button 
            @click="closeReferredUsersModal"
            class="text-gray-500 hover:text-gray-700"
          >
            <svg xmlns="http://www.w3.org/2000/svg" class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        <div v-if="!selectedUser?.referred_users?.length" class="text-center py-8">
          <div class="text-gray-400 mb-4">
            <svg xmlns="http://www.w3.org/2000/svg" class="h-16 w-16 mx-auto" fill="none" viewBox="0 0 24 24" stroke="currentColor">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M17 20h5v-2a3 3 0 00-5.356-1.857M17 20H7m10 0v-2c0-.656-.126-1.283-.356-1.857M7 20H2v-2a3 3 0 015.356-1.857M7 20v-2c0-.656.126-1.283.356-1.857m0 0a5.002 5.002 0 019.288 0M15 7a3 3 0 11-6 0 3 3 0 016 0zm6 3a2 2 0 11-4 0 2 2 0 014 0zM7 10a2 2 0 11-4 0 2 2 0 014 0z" />
            </svg>
          </div>
          <p class="text-gray-500 text-lg">No referred users found</p>
          <p class="text-gray-400 text-sm mt-2">This user hasn't referred anyone yet.</p>
        </div>

        <div v-else class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">ID</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Name</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Email</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Refer Code</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="refUser in selectedUser.referred_users" :key="refUser.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 text-gray-800">{{ refUser.id }}</td>
                <td class="py-3 px-4 text-gray-800">{{ refUser.name }}</td>
                <td class="py-3 px-4 text-gray-800">{{ refUser.email }}</td>
                <td class="py-3 px-4 text-gray-800">{{ refUser.refer_code }}</td>
              </tr>
            </tbody>
          </table>
        </div>

        <div class="mt-6 flex justify-end">
          <button 
            @click="closeReferredUsersModal"
            class="bg-gray-500 hover:bg-gray-600 text-white px-4 py-2 rounded-md"
          >
            Close
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed, reactive, watch } from 'vue';
import { useAdminStore } from '@/stores/adminStore';
import { useToast } from "vue-toastification";

const adminStore = useAdminStore();

// State
const hasMoreLoad = ref(true);
const page = ref(1);
const toast = useToast();
const showReferredModal = ref(false);
const selectedUser = ref(null);

// Search and filter state
const searchFilters = reactive({
  name: '',
  email: '',
  mobile: '',
  upi_id: '',
  verified_status: '',
  start_date: '',
  end_date: ''
});

// Computed properties
const userList = computed(() => adminStore.userList || []);

// Methods
const fetchUserList = async (resetPage = false) => {
  if (resetPage) {
    page.value = 1;
    hasMoreLoad.value = true;
    adminStore.userList = []; // Clear existing list
  }

  // Build filters object
  const filters = {};
  Object.keys(searchFilters).forEach(key => {
    if (searchFilters[key]) {
      filters[key] = searchFilters[key];
    }
  });

  const result = await adminStore.showUserList(page.value, filters);
  if (!result.success) {
    toast.error("Failed to get users");
  } else {
    if (result.pagination && result.pagination.has_more) {
      page.value = page.value + 1;
    } else {
      hasMoreLoad.value = false;
    }
  }
};

const refreshUserList = () => {
  fetchUserList(true);
};

const applyFilters = () => {
  fetchUserList(true);
};

const clearFilters = () => {
  Object.keys(searchFilters).forEach(key => {
    searchFilters[key] = '';
  });
  fetchUserList(true);
};

const formatDate = (dateString) => {
  if (!dateString) return 'N/A';
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  });
};

const openReferredUsersModal = (user) => {
  selectedUser.value = user;
  showReferredModal.value = true;
};

const closeReferredUsersModal = () => {
  showReferredModal.value = false;
  selectedUser.value = null;
};

// Watch for changes in search filters with debounce
let searchTimeout;
watch(searchFilters, () => {
  clearTimeout(searchTimeout);
  searchTimeout = setTimeout(() => {
    applyFilters();
  }, 500);
}, { deep: true });

// Lifecycle hooks
onMounted(() => {
  fetchUserList();
});
</script>