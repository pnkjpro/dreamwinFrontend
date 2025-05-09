<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header -->
    <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
      <font-awesome-icon icon="arrow-left" class="mr-2" />
      <span class="font-medium">Fund Management</span>
    </div>

    <!-- Tabs -->
    <div class="flex border-b border-gray-200 bg-white">
      <button 
        @click="activeTab = 'deposit'" 
        :class="[
          'flex-1 py-3 text-center font-medium',
          activeTab === 'deposit' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
        ]"
      >
        Add Fund
      </button>
      <button 
        @click="activeTab = 'withdraw'" 
        :class="[
          'flex-1 py-3 text-center font-medium',
          activeTab === 'withdraw' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
        ]"
      >
        Withdraw Fund
      </button>
    </div>

    <!-- Add Fund Tab (Razorpay Integration) -->
    <div v-if="activeTab === 'deposit'" class="p-4 flex flex-col gap-6">
      <div class="payment-container bg-white rounded-lg p-4 shadow-sm">
        <div class="text-lg font-medium mb-4">Make Payment</div>
        
        <form @submit.prevent="createOrder" v-if="!transactionStore.showPaymentSuccess">
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="amount">
              Amount (₹)
            </label>
            <input 
              type="number" 
              id="amount" 
              v-model="amount" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              min="100" 
              placeholder="Enter amount"
              required
            />
            <span class="text-xs text-gray-500 mt-1 block">Minimum amount: ₹100</span>
          </div>
          
          <!-- Quick Amount Options -->
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2">
              Quick Options:
            </label>
            <div class="flex flex-wrap gap-2">
              <button 
                type="button"
                v-for="(value, index) in quickAmounts" 
                :key="index"
                @click="amount = value"
                class="px-4 py-2 border border-gray-300 rounded-md hover:bg-orange-100 hover:border-orange-300 transition-colors"
              >
                ₹{{ value }}
              </button>
            </div>
          </div>
          
          <button 
            type="submit" 
            class="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
            :disabled="transactionStore.loading || amount < 100"
          >
            <div v-if="transactionStore.loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Processing...
            </div>
            <span v-else>Pay Now</span>
          </button>
        </form>
        
        <!-- Payment Success Message -->
        <div v-if="transactionStore.showPaymentSuccess" class="payment-success text-center p-6">
          <div class="success-icon mb-4 text-5xl text-green-500">✓</div>
          <h3 class="text-xl font-bold mb-2">Payment Successful!</h3>
          <p class="mb-2">Your payment has been processed successfully.</p>
          <p class="mb-4 text-gray-600">Payment ID: {{ paymentDetails.order_id }}</p>
          <button 
            class="bg-blue-500 text-white py-2 px-6 rounded-lg font-medium"
            @click="resetPayment"
          >
            Make Another Payment
          </button>
        </div>
        
        <!-- Error Message -->
        <div v-if="error" class="mt-4 p-3 bg-red-100 border border-red-300 text-red-700 rounded">
          {{ error }}
        </div>
      </div>
    </div>

    <!-- Withdraw Fund Tab -->
    <div v-if="activeTab === 'withdraw'" class="p-4 flex flex-col gap-4">
      <div class="bg-white rounded-lg p-4 shadow-sm">
        <div class="text-center mb-2">
          <div class="text-gray-600 text-sm">Your Available Balance</div>
          <div class="text-2xl font-bold text-green-600">₹ {{ user.funds }}</div>
        </div>
      </div>
      
      <!-- UPI ID Verification and Update Modal -->
      <div v-if="!user.upi_id" class="bg-yellow-100 border-l-4 border-yellow-500 p-4 mb-4">
        <div class="flex items-center">
          <div class="ml-3">
            <p class="text-yellow-700 font-medium">
              Please add your UPI ID to enable withdrawals
            </p>
            <div class="mt-2">
              <div class="mb-4">
                <label class="block text-gray-700 text-sm font-medium mb-2" for="upi-id">
                  UPI ID
                </label>
                <input 
                  type="text" 
                  id="upi-id" 
                  v-model="newUpiId" 
                  class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
                  placeholder="Enter your UPI ID"
                />
              </div>
              <button 
                class="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium w-full"
                @click="updateUpiId"
                :disabled="authStore.loading"
              >
                <div v-if="authStore.loading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Updating UPI ID...
                </div>
                <span v-else>Update UPI ID</span>
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Withdrawal Form (shown only when UPI ID is set) -->
      <div v-else class="bg-white rounded-lg p-4 shadow-sm">
        <div class="text-lg font-medium mb-4">Withdraw Funds</div>
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="withdraw-amount">
            Withdrawal Amount (₹)
          </label>
          <input 
            type="number" 
            id="withdraw-amount" 
            v-model="withdrawAmount" 
            class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            placeholder="Enter amount to withdraw"
            :max="availableBalance"
          />
          <span style="font-size: 13px; color:darkcyan">Minimum Rs 50 can be withdrawn</span>
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="account-number">
            To UPI ID:
          </label>
          <div class="flex items-center gap-2">
            <input 
              type="text" 
              id="account-number" 
              v-model="upi_id" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              :disabled="!isEditingUPI"
            />
            <button 
              v-if="!isEditingUPI" 
              class="text-blue-500 underline" 
              @click="isEditingUPI = true"
            >
              Edit
            </button>
            <button 
              v-if="isEditingUPI" 
              class="bg-green-500 text-white px-4 py-1 rounded" 
              @click="saveUPI"
            >
            <div v-if="authStore.loading" class="flex items-center justify-center">
                  <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                    <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                    <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                  </svg>
                  Saving...
                </div>
                <span v-else>Save</span>
            </button>
          </div>
        </div>
        
        <button 
          class="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium w-full disabled:bg-gray-400 disabled:cursor-not-allowed"
          @click="requestWithdrawal"
          :disabled="withdrawAmount < 50 || withdrawAmount > availableBalance || !upi_id || transactionStore.loading"
        >
          <div v-if="transactionStore.loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Requesting Withdrawal...
          </div>
          <span v-else>Request Withdrawal</span>
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
import { faArrowLeft, faDownload, faCopy, faCheck } from '@fortawesome/free-solid-svg-icons';
import { storeToRefs } from 'pinia';
import { useAuthStore } from '@/stores/authStore';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";

// Register FontAwesome icons
library.add(faArrowLeft, faDownload, faCopy, faCheck);

// State for tab management
const activeTab = ref('deposit');
const router = useRouter();
const toast = useToast();

const transactionStore = useTransactionStore();
const authStore = useAuthStore();
const { user } = storeToRefs(authStore);
const { fundAction } = storeToRefs(transactionStore);

// Use onMounted to set the active tab after initial render
onMounted(() => {
  if (fundAction.value === 'withdraw') {
    activeTab.value = 'withdraw';
  }
});

// Razorpay integration state
const amount = ref(100);
const isProcessing = ref(false);
const error = ref('');
const showPaymentSuccess = ref(false);
const paymentDetails = ref({});
const quickAmounts = [50, 100, 200, 500, 1000, 2000];

// Create Razorpay order
const createOrder = async () => {
  if (amount.value < 100) {
    toast.error("Amount should not be less than Rs 100");
    return;
  }
  error.value = '';
  const result = await transactionStore.payWithRazorpay(amount.value);
  if (!result.success) {
    toast.error(result.message);
  } else {
    paymentDetails.value.order_id = result.data.order_id;
    toast.success("Payment is successfully processed");
  }
};

// Reset payment form
const resetPayment = () => {
  transactionStore.showPaymentSuccess = false;
  paymentDetails.value = {};
  amount.value = 100;
  error.value = '';
};

// Withdraw Fund state
const withdrawAmount = ref('');
const upi_id = ref(user.value.upi_id || '');
const newUpiId = ref('');
const isEditingUPI = ref(false);

// Computed property for available balance
const availableBalance = computed(() => user.value.funds || 0);

// Methods
const requestWithdrawal = async() => {
  if (withdrawAmount.value >= 50 && withdrawAmount.value <= availableBalance.value) {
    const result = await transactionStore.withdrawFunds(withdrawAmount.value);
    if(result.success){
      toast.success(result.message);
    }else {
      toast.error(result.message);
    }
    withdrawAmount.value = '';
  } else {
    toast.error('Please enter a valid amount');
  }
};

const updateUpiId = async() => {
  if (newUpiId.value.trim()) {
    const result = await authStore.updateUpiId(newUpiId.value);
    if(result.success){
      toast.success(result.message);
      upi_id.value = newUpiId.value;
    }else {
      toast.error(result.message);
    }
    newUpiId.value = '';
  } else {
    toast.error('Please enter a valid UPI ID');
  }
};

const saveUPI = async() => {
  if (upi_id.value.trim()) {
    const result = await authStore.updateUpiId(upi_id.value);
    if(result.success){
      toast.success(result.message);
    }else {
      toast.error(result.message);
    }
    isEditingUPI.value = false;
  } else {
    toast.error('Please enter a valid UPI ID');
  }
};

const navigateToBack = () => {
  router.back();
};
</script>

<style scoped>
.success-icon {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 64px;
  height: 64px;
  border-radius: 50%;
  background-color: #d1fae5;
  margin: 0 auto;
  color: #10b981;
  font-size: 32px;
}
</style>