<template>
  <div class="min-h-screen bg-gray-50 p-6">
    <div class="max-w-7xl mx-auto">
      <!-- Header -->
      <div class="mb-8">
        <h1 class="text-3xl font-bold text-gray-900 mb-2">Fund Management</h1>
        <p class="text-gray-600">Manage and monitor all fund transactions</p>
      </div>

      <!-- Filters Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 p-6 mb-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 xl:grid-cols-6 gap-4">
          <!-- Search -->
          <div class="col-span-1 md:col-span-2">
            <label class="block text-sm font-medium text-gray-700 mb-2">Search</label>
            <div class="relative">
              <input
                v-model="filters.search"
                type="text"
                placeholder="Search by name, email, mobile, UPI ID, or Razorpay ID..."
                class="w-full pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                @input="debouncedSearch"
              />
              <div class="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <svg class="h-5 w-5 text-gray-400" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z" />
                </svg>
              </div>
            </div>
          </div>

          <!-- Action Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Action</label>
            <select
              v-model="filters.action"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="applyFilters"
            >
              <option value="">All Actions</option>
              <option value="deposit">Deposit</option>
              <option value="referred_reward">Referred Reward</option>
              <option value="quiz_reward">Quiz Reward</option>
              <option value="withdraw">Withdraw</option>
              <option value="quiz_entry">Quiz Entry</option>
              <option value="lifeline_purchase">Lifeline Purchase</option>
            </select>
          </div>

          <!-- Status Filter -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">Status</label>
            <select
              v-model="filters.approved_status"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="applyFilters"
            >
              <option value="">All Status</option>
              <option value="pending">Pending</option>
              <option value="approved">Approved</option>
              <option value="rejected">Rejected</option>
            </select>
          </div>

          <!-- Date From -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">From Date</label>
            <input
              v-model="filters.date_from"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="applyFilters"
            />
          </div>

          <!-- Date To -->
          <div>
            <label class="block text-sm font-medium text-gray-700 mb-2">To Date</label>
            <input
              v-model="filters.date_to"
              type="date"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              @change="applyFilters"
            />
          </div>
        </div>

        <!-- Filter Actions -->
        <div class="flex items-center justify-between mt-4 pt-4 border-t border-gray-200">
          <div class="flex items-center space-x-2">
            <span class="text-sm text-gray-500">Total: {{ totalRecords }} transactions</span>
            <span v-if="hasActiveFilters" class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium bg-blue-100 text-blue-800">
              Filtered
            </span>
          </div>
          <button
            v-if="hasActiveFilters"
            @click="clearFilters"
            class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-sm font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500"
          >
            <svg class="w-4 h-4 mr-1.5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
            Clear Filters
          </button>
        </div>
      </div>

      <!-- Table Section -->
      <div class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden">
        <!-- Loading State -->
        <div v-if="adminStore.loading && page === 1" class="flex items-center justify-center py-12">
          <div class="flex items-center space-x-2">
            <svg class="animate-spin h-5 w-5 text-blue-500" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <span class="text-gray-600">Loading transactions...</span>
          </div>
        </div>

        <!-- Table -->
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  User Details
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Transaction Info
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Amount
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Payment Details
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Status
                </th>
                <th class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Date
                </th>
                <th class="px-6 py-3 text-right text-xs font-medium text-gray-500 uppercase tracking-wider">
                  Actions
                </th>
              </tr>
            </thead>
            <tbody class="bg-white divide-y divide-gray-200">
              <tr v-if="transactions.length === 0 && !adminStore.loading">
                <td colspan="7" class="px-6 py-12 text-center text-gray-500">
                  <div class="flex flex-col items-center">
                    <svg class="w-12 h-12 text-gray-300 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M9 12h6m-6 4h6m2 5H7a2 2 0 01-2-2V5a2 2 0 012-2h5.586a1 1 0 01.707.293l5.414 5.414a1 1 0 01.293.707V19a2 2 0 01-2 2z" />
                    </svg>
                    <p class="text-lg font-medium">No transactions found</p>
                    <p class="text-sm">Try adjusting your filters or search criteria</p>
                  </div>
                </td>
              </tr>
              
              <tr 
                v-for="transaction in transactions" 
                :key="transaction.id"
                class="hover:bg-gray-50 transition-colors duration-200"
                :class="{
                  'bg-red-50 border-l-4 border-red-400': transaction.approved_status === 'rejected',
                  'bg-green-50 border-l-4 border-green-400': transaction.approved_status === 'approved',
                  'bg-yellow-50 border-l-4 border-yellow-400': transaction.approved_status === 'pending'
                }"
              >
                <!-- User Details -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <div class="text-sm font-medium text-gray-900 capitalize">
                      {{ transaction.name || 'N/A' }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ transaction.email || 'N/A' }}
                    </div>
                    <div class="text-sm text-gray-500">
                      {{ transaction.mobile || 'N/A' }}
                    </div>
                    <div class="text-sm text-gray-500">
                      UPI: {{ transaction.upi_id || 'N/A' }}
                    </div>
                  </div>
                </td>

                <!-- Transaction Info -->
                <td class="px-6 py-4">
                  <div class="flex flex-col">
                    <div class="text-sm font-medium text-gray-900">
                      <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                            :class="{
                              'bg-blue-100 text-blue-800': transaction.action === 'deposit',
                              'bg-red-100 text-red-800': transaction.action === 'withdraw',
                              'bg-green-100 text-green-800': transaction.action === 'referred_reward',
                              'bg-purple-100 text-purple-800': transaction.action === 'quiz_reward',
                              'bg-yellow-100 text-yellow-800': transaction.action === 'quiz_entry',
                              'bg-teal-100 text-yellow-800': transaction.action === 'lifeline_purchase'
                            }">
                        {{ getActionLabel(transaction.action) }}
                      </span>
                    </div>
                    <div class="text-sm text-gray-500 mt-1">
                      ID: {{ transaction.id }}
                    </div>
                    <div v-if="transaction.description" class="text-sm text-gray-500 mt-1">
                      {{ transaction.description }}
                    </div>
                  </div>
                </td>

                <!-- Amount -->
                <td class="px-6 py-4">
                  <div class="text-lg font-semibold"
                       :class="{
                         'text-green-600': ['deposit', 'referred_reward', 'quiz', 'bonus'].includes(transaction.action),
                         'text-red-600': transaction.action === 'withdraw'
                       }">
                    ₹{{ formatAmount(transaction.amount) }}
                  </div>
                </td>

                <!-- Payment Details -->
                <td class="px-6 py-4">
                  <div class="flex flex-col text-sm">
                    <div v-if="transaction.razorpay_order_id" class="text-gray-900">
                      <span class="font-medium">Razorpay:</span> {{ transaction.razorpay_order_id }}
                    </div>
                    <div v-if="transaction.transaction_id" class="text-gray-500">
                      <span class="font-medium">Transaction:</span> {{ transaction.transaction_id }}
                    </div>
                    <div v-if="transaction.reference_id" class="text-gray-500">
                      <span class="font-medium">Reference:</span> {{ transaction.reference_id }}
                    </div>
                  </div>
                </td>

                <!-- Status -->
                <td class="px-6 py-4">
                  <span class="inline-flex items-center px-2.5 py-0.5 rounded-full text-xs font-medium capitalize"
                        :class="{
                          'bg-yellow-100 text-yellow-800': transaction.approved_status === 'pending',
                          'bg-green-100 text-green-800': transaction.approved_status === 'approved',
                          'bg-red-100 text-red-800': transaction.approved_status === 'rejected'
                        }">
                    {{ transaction.approved_status }}
                  </span>
                </td>

                <!-- Date -->
                <td class="px-6 py-4 text-sm text-gray-500">
                  <div>{{ formatDate(transaction.created_at) }}</div>
                  <div class="text-xs text-gray-400">{{ formatTime(transaction.created_at) }}</div>
                </td>

                <!-- Actions -->
                <td class="px-6 py-4 text-right text-sm font-medium">
                  <div class="flex items-center justify-end space-x-2">
                    <button
                      v-if="transaction.approved_status === 'pending'"
                      @click="handleStatusApproval(transaction, 'approved')"
                      :disabled="adminStore.loading"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-green-600 hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M5 13l4 4L19 7" />
                      </svg>
                      Approve
                    </button>
                    
                    <button
                      v-if="transaction.approved_status === 'pending'"
                      @click="handleStatusApproval(transaction, 'rejected')"
                      :disabled="adminStore.loading"
                      class="inline-flex items-center px-3 py-1.5 border border-transparent text-xs font-medium rounded-md text-white bg-red-600 hover:bg-red-700 focus:outline-none focus:ring-2 focus:ring-red-500 disabled:opacity-50 disabled:cursor-not-allowed transition-colors duration-200"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                      </svg>
                      Reject
                    </button>

                    <button
                      @click="viewTransaction(transaction)"
                      class="inline-flex items-center px-3 py-1.5 border border-gray-300 text-xs font-medium rounded-md text-gray-700 bg-white hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 transition-colors duration-200"
                    >
                      <svg class="w-3 h-3 mr-1" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                        <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M2.458 12C3.732 7.943 7.523 5 12 5c4.478 0 8.268 2.943 9.542 7-1.274 4.057-5.064 7-9.542 7-4.477 0-8.268-2.943-9.542-7z" />
                      </svg>
                      View
                    </button>
                  </div>
                </td>
              </tr>
            </tbody>
          </table>
        </div>

        <!-- Load More Button -->
        <div v-if="hasMoreData && transactions.length > 0" class="px-6 py-4 border-t border-gray-200 bg-gray-50">
          <div class="text-center">
            <button
              @click="loadMore"
              :disabled="adminStore.loading"
              class="inline-flex items-center px-6 py-3 border border-transparent text-sm font-medium rounded-md text-white bg-blue-600 hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 disabled:opacity-50 disabled:cursor-not-allowed transition-all duration-200 transform hover:scale-105"
            >
              <svg v-if="adminStore.loading" class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <span v-if="adminStore.loading">Loading...</span>
              <span v-else class="flex items-center">
                Load More
                <svg class="ml-2 w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M19 9l-7 7-7-7" />
                </svg>
              </span>
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- Transaction Detail Modal -->
    <div v-if="selectedTransaction" class="fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full z-50" @click="closeModal">
      <div class="relative top-20 mx-auto p-5 border w-11/12 md:w-3/4 lg:w-1/2 shadow-lg rounded-md bg-white" @click.stop>
        <div class="flex items-center justify-between mb-4">
          <h3 class="text-lg font-bold text-gray-900">Transaction Details</h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <svg class="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>
        
        <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
          <div>
            <h4 class="font-semibold text-gray-700 mb-2">User Information</h4>
            <div class="space-y-2 text-sm">
              <div><strong>Name:</strong> {{ selectedTransaction.name || 'N/A' }}</div>
              <div><strong>Email:</strong> {{ selectedTransaction.email || 'N/A' }}</div>
              <div><strong>Mobile:</strong> {{ selectedTransaction.mobile || 'N/A' }}</div>
              <div><strong>UPI ID:</strong> {{ selectedTransaction.upi_id || 'N/A' }}</div>
            </div>
          </div>
          
          <div>
            <h4 class="font-semibold text-gray-700 mb-2">Transaction Information</h4>
            <div class="space-y-2 text-sm">
              <div><strong>ID:</strong> {{ selectedTransaction.id }}</div>
              <div><strong>Action:</strong> {{ selectedTransaction.action }}</div>
              <div><strong>Amount:</strong> ₹{{ formatAmount(selectedTransaction.amount) }}</div>
              <div><strong>Status:</strong> {{ selectedTransaction.approved_status }}</div>
              <div><strong>Created:</strong> {{ formatDate(selectedTransaction.created_at) }}</div>
            </div>
          </div>
        </div>
        
        <div class="mt-4">
          <h4 class="font-semibold text-gray-700 mb-2">Payment Details</h4>
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4 text-sm">
            <div><strong>Razorpay Order ID:</strong> {{ selectedTransaction.razorpay_order_id || 'N/A' }}</div>
            <div><strong>Transaction ID:</strong> {{ selectedTransaction.transaction_id || 'N/A' }}</div>
            <div><strong>Reference ID:</strong> {{ selectedTransaction.reference_id || 'N/A' }}</div>
            <div><strong>Reference Type:</strong> {{ selectedTransaction.reference_type || 'N/A' }}</div>
          </div>
        </div>
        
        <div v-if="selectedTransaction.description" class="mt-4">
          <h4 class="font-semibold text-gray-700 mb-2">Description</h4>
          <p class="text-sm text-gray-600">{{ selectedTransaction.description }}</p>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue'
import { useAdminStore } from '@/stores/adminStore'
import { storeToRefs } from 'pinia'
import { useToast } from 'vue-toastification'

const toast = useToast()
const adminStore = useAdminStore()
const { allTransactions } = storeToRefs(adminStore)

// State
const page = ref(1)
const hasMoreData = ref(true)
const totalRecords = ref(0)
const selectedTransaction = ref(null)
const searchTimeout = ref(null)

// Filters
const filters = ref({
  search: '',
  action: '',
  approved_status: '',
  date_from: '',
  date_to: ''
})

// Computed
const transactions = computed(() => allTransactions.value || [])

const hasActiveFilters = computed(() => {
  return filters.value.search || 
         filters.value.action || 
         filters.value.approved_status || 
         filters.value.date_from || 
         filters.value.date_to
})

// Methods
const fetchTransactions = async (pageNum = 1, resetData = false) => {
  try {
    // Build filter params
    const filterParams = {}
    
    if (filters.value.search) filterParams.search = filters.value.search
    if (filters.value.action) filterParams.action = filters.value.action
    if (filters.value.approved_status) filterParams.approved_status = filters.value.approved_status
    if (filters.value.date_from) filterParams.date_from = filters.value.date_from
    if (filters.value.date_to) filterParams.date_to = filters.value.date_to

    const result = await adminStore.fetchTransactions(pageNum, filterParams)
    
    if (!result.success) {
      toast.error(result.message || "Failed to fetch transactions")
    } else {
      if (resetData) {
        // Reset pagination state when applying new filters
        page.value = 1
        hasMoreData.value = result.pagination
      } else {
        // Update pagination for load more
        hasMoreData.value = result.pagination
      }
      
      // Update total records if provided
      if (result.totalCount !== undefined) {
        totalRecords.value = result.totalCount
      }
    }
  } catch (error) {
    console.error('Error fetching transactions:', error)
    toast.error("An error occurred while fetching transactions")
  }
}

const loadMore = async () => {
  if (hasMoreData.value && !adminStore.loading) {
    page.value += 1
    await fetchTransactions(page.value)
  }
}

const applyFilters = async () => {
  // Reset to first page and fetch with filters
  page.value = 1
  hasMoreData.value = true
  await fetchTransactions(1, true)
}

const debouncedSearch = () => {
  if (searchTimeout.value) {
    clearTimeout(searchTimeout.value)
  }
  searchTimeout.value = setTimeout(() => {
    applyFilters()
  }, 500) // 500ms delay for search
}

const clearFilters = async () => {
  filters.value = {
    search: '',
    action: '',
    approved_status: '',
    date_from: '',
    date_to: ''
  }
  await applyFilters()
}

const handleStatusApproval = async (transaction, approval) => {
  try {
    const result = await adminStore.statusApproval(transaction, approval)
    if (!result.success) {
      toast.error(result.message || "Failed to update transaction status")
    } else {
      toast.success(result.message || `Transaction ${approval} successfully`)
    }
  } catch (error) {
    console.error('Error updating transaction status:', error)
    toast.error("An error occurred while updating transaction status")
  }
}

const viewTransaction = (transaction) => {
  selectedTransaction.value = transaction
}

const closeModal = () => {
  selectedTransaction.value = null
}

const formatAmount = (amount) => {
  return new Intl.NumberFormat('en-IN').format(amount)
}

const formatDate = (dateString) => {
  return new Date(dateString).toLocaleDateString('en-IN', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

const formatTime = (dateString) => {
  return new Date(dateString).toLocaleTimeString('en-IN', {
    hour: '2-digit',
    minute: '2-digit'
  })
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
      case 'quiz_entry':
        return 'Quiz Entry';
      case 'lifeline_purchase':
        return 'Lifeline Purchase';
      default:
        return action.charAt(0).toUpperCase() + action.slice(1);
    }
  }

// Lifecycle
onMounted(() => {
  fetchTransactions(1, true)
})
</script>