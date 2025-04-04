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
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
          <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
        </tr>
      </thead>
      <tbody class="bg-white divide-y divide-gray-200">
        <tr v-for="(transaction, index) in transactions" :key="transaction.id" class="hover:bg-gray-50">
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
            {{ index+1 }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            <span :class="transaction.action === 'deposit' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
              {{ transaction.action === 'deposit' ? 'Deposit' : 'Withdrawal' }}
            </span>
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
            {{ transaction.amount }}
          </td>
          <td class="px-4 py-4 whitespace-nowrap">
            <span class="px-2 py-1 inline-flex text-xs leading-5 font-semibold rounded-full"
                  :class="getStatusClass(transaction.approved_status)">
              {{ formatStatus(transaction.approved_status) }}
            </span>
          </td>
          <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
            {{ formatDate(transaction.created_at) }}
          </td>
        </tr>
      </tbody>
    </table>
    <div v-if="transactions.length === 0" class="py-8 text-center text-gray-500">
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
    
    // State for tab management
    const activeTab = ref('quiz_transaction');
    const router = useRouter();
    const toast = useToast();
    
    const transactionStore = useTransactionStore();
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    const { transactions } = storeToRefs(transactionStore);


    onMounted(() => {
      transactionStore.getTransactions();
    })

// Format the status for better readability 
const formatStatus = (status) => {
  switch (status) {
    case 'pending':
      return 'Pending';
    case 'approved':
      return 'Approved';
    case 'rejected':
      return 'Rejected';
    default:
      return status.charAt(0).toUpperCase() + status.slice(1);
  }
};

// Get the appropriate CSS class for the status badge
const getStatusClass = (status) => {
  switch (status) {
    case 'pending':
      return 'bg-yellow-100 text-yellow-800';
    case 'approved':
      return 'bg-green-100 text-green-800';
    case 'rejected':
      return 'bg-red-100 text-red-800';
    default:
      return 'bg-gray-100 text-gray-800';
  }
};

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