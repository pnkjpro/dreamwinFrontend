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
              <font-awesome-icon icon="chevron-down" class="ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAdminStore } from '@/stores/adminStore';
import { useToast } from "vue-toastification";

const adminStore = useAdminStore();

// State
const hasMoreLoad = ref(true);
const page = ref(1);
const toast = useToast();

// Computed properties
const userList = computed(() => adminStore.userList || []);

// Methods
const fetchUserList = async() => {
    const result = await adminStore.showUserList(page.value);
    if(!result.success){
      toast.error("failed to get users");
    } else {
      if(result.pagination){
        page.value = page.value + 1;
      } else {
        hasMoreLoad.value = false;
      }
    }
  
};

const refreshUserList = () => {
  fetchUserList();
};

// Lifecycle hooks
onMounted(() => {
  fetchUserList();
});
</script>