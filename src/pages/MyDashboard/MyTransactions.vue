<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header -->
    <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
      <font-awesome-icon icon="arrow-left" class="mr-2" />
      <span class="font-medium">Fund Transactions</span>
    </div>


    <!-- Tabs -->
    <div class="flex border-b border-gray-200 bg-white">
      <button 
        @click="activeTab = 'fund_transactions'" 
        :class="[
          'flex-1 py-3 text-center font-medium',
          activeTab === 'deposit' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
        ]"
      >
        Fund Transactions
      </button>
      <button 
        @click="fetchLifelineTransactions" 
        :class="[
          'flex-1 py-3 text-center font-medium',
          activeTab === 'withdraw' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
        ]"
      >
        Lifeline Transactions
      </button>
    </div>

    <div v-if="activeTab === 'fund_transactions'" class="w-full overflow-x-auto rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Order ID</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Status</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
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
          <tr v-for="(transaction, index) in transactions" :key="transaction.id" class="hover:bg-gray-50">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ index+1 }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              <span :class="getActionClass(transaction.action)">
                {{ getActionLabel(transaction.action) }}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {{ transaction.amount }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {{ transaction.description || '' }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {{ transaction.razorpay_order_id || '' }}
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
      <div v-if="hasMoreLoad" class="my-4 text-center">
          <button @click="fetchTransactions" 
          class="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
          :disabled="transactionStore.loading">
            <span v-if="transactionStore.loading" class="flex items-center justify-center">
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
    <div v-if="activeTab === 'lifeline_transactions'" class="w-full overflow-x-auto rounded-lg shadow-sm">
      <table class="min-w-full divide-y divide-gray-200">
        <thead class="bg-gray-50">
          <tr>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">ID</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Transaction Type</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Amount</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Description</th>
            <th scope="col" class="px-4 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">Date</th>
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
          <tr v-for="(transaction, index) in lifeline_transactions" :key="lifeline_transactions.id" class="hover:bg-gray-50">
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-900">
              {{ index+1 }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap">
              <span :class="transaction.type === 'lifeline_purchase' ? 'text-green-600 font-medium' : 'text-red-600 font-medium'">
                {{ transaction.type === 'lifeline_purchase' ? 'Lifeline Purchased' : '' }}
              </span>
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {{ transaction.amount }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm font-medium">
              {{ transaction.description || '' }}
            </td>
            <td class="px-4 py-4 whitespace-nowrap text-sm text-gray-500">
              {{ formatDate(transaction.created_at) }}
            </td>
          </tr>
        </tbody>
      </table>
      <div v-if="lifeline_transactions.length === 0" class="py-8 text-center text-gray-500">
        No transactions available.
      </div>
      <div v-if="hasMoreLoad" class="my-4 text-center">
          <button @click="fetchLifelineTransactions" 
          class="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
          :disabled="transactionStore.loading">
            <span v-if="transactionStore.loading" class="flex items-center justify-center">
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
    const activeTab = ref('fund_transactions');
    const router = useRouter();
    const toast = useToast();
    const page = ref(1);
    const lifePage = ref(1);
    const hasMoreLoad = ref(true);
    const hasMoreLifelineLoad = ref(true);
    
    const transactionStore = useTransactionStore();
    const authStore = useAuthStore();
    const { user } = storeToRefs(authStore);
    const { transactions, lifeline_transactions } = storeToRefs(transactionStore);


    onMounted(() => {
      fetchTransactions();
    })

    const fetchTransactions = async() => {
      const result = await transactionStore.getTransactions(page.value)
      if(!result.success){
        toast.error("failed to fetch transactions")
      } else {
        if(result.pagination){
          page.value = page.value + 1;
        } else {
          hasMoreLoad.value = false;
        }
      }
    }

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

const getActionClass = (action) => {
    switch(action) {
      case 'deposit':
      case 'referred_reward':
      case 'quiz_reward':
        return 'text-green-600 font-medium';
      case 'withdrawal':
        return 'text-red-600 font-medium';
      default:
        return 'text-gray-600 font-medium';
    }
  }
  
  const getActionLabel = (action) => {
    switch(action) {
      case 'deposit':
        return 'Deposit';
      case 'withdrawal':
        return 'Withdrawal';
      case 'referred_reward':
        return 'Referral Reward';
      case 'quiz_reward':
        return 'Quiz Reward';
      default:
        return action.charAt(0).toUpperCase() + action.slice(1);
    }
  }

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

const fetchLifelineTransactions = async() => {
  activeTab.value = 'lifeline_transactions'
  // if(lifeline_transactions.value.length > 0){
  //   return
  // }
  const result = await transactionStore.getLifelineTransactions(lifePage.value);
  if(!result.success){
    toast.error("failed to fetch transactions")
  } else {
    if(result.pagination){
      lifePage.value = lifePage.value + 1;
    } else {
      hasMoreLifelineLoad.value = false;
    }
  }

}

const navigateToBack = () => {
  router.back();
}
 
    </script>