<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <!-- Header -->
      <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        <span class="font-medium">Fund Management</span>
      </div>
  
  
    <div class="w-full overflow-x-auto rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Lifeline Name</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Quiz Applied</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Used At</th>
          </tr>
        </thead>
        <tbody class="bg-white divide-y divide-gray-200">
          <!-- Loading state row -->
          <tr v-if="transactionStore.loading" class="hover:bg-gray-50">
            <td colspan="4" class="px-4 py-8 text-center">
              <div class="flex justify-center items-center space-x-2">
                <svg class="animate-spin h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                <span class="text-sm text-gray-600">Loading transactions...</span>
              </div>
            </td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
            <td></td>
          </tr>
          <tr v-for="(history, index) in lifeline_histories" :key="lifeline_histories.id" class="hover:bg-gray-50">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ index+1 }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {{ history.lifeline_name }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {{ history.applied_quiz_name || '' }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(history.used_at) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="lifeline_histories.length === 0" class="py-8 text-center text-gray-500">
        No transactions available.
      </div>
        
      </div>
    </div>
  </template>
  
  <script setup>
      import { ref, computed, onMounted } from 'vue';
      import { useTransactionStore } from '@/stores/transactionStore';
      import { library } from '@fortawesome/fontawesome-svg-core';
      import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
      import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
      import { storeToRefs } from 'pinia';
      import { useAuthStore } from '@/stores/authStore';
      import { useRouter } from 'vue-router';
      import { useToast } from "vue-toastification";
      
      // Register FontAwesome icons
      library.add(faArrowLeft);
      
      const router = useRouter();
      const toast = useToast();
      
      const transactionStore = useTransactionStore();
      const authStore = useAuthStore();
      const { user } = storeToRefs(authStore);
      const { lifeline_histories } = storeToRefs(transactionStore);
  
  
      onMounted(() => {
        transactionStore.getLifelineHistories();
      })
  
  // Format the date for better readability
  const formatDate = (dateString) => {
    const date = new Date(dateString);
    return date.toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };
  
  const navigateToBack = () => {
    router.back();
  }
   
</script>