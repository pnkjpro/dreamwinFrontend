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
  
        <div v-if="adminStore.loading" class="flex justify-center items-center py-12">
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
                </tr>
              </tbody>
            </table>
          </div>
          
          <div class="mt-6 flex justify-between items-center">
            <div class="text-sm text-gray-500">
              Showing <span class="font-medium">{{ userList.length }}</span> users
            </div>
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
  const totalUsers = ref(0);
  const toast = useToast();
  
  // Computed properties
  const userList = computed(() => adminStore.userList || []);
  
  // Methods
  const fetchUserList = async() => {
      const result = await adminStore.showUserList();
      if(!result.success){
        toast.error("failed to get users");
      }
      totalUsers.value = userList.value.length;
    
  };
  
  const refreshUserList = () => {
    fetchUserList();
  };
  
  // Lifecycle hooks
  onMounted(() => {
    fetchUserList();
  });
  </script>