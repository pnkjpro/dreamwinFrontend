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

    <!-- Add Fund Tab (Updated with downloadable QR) -->
    <div v-if="activeTab === 'deposit'" class="p-4 flex flex-col gap-6">
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <div class="text-lg font-medium mb-2">Add Funds to Your Account</div>
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="payment-amount">
              Payment Amount (₹)
            </label>
            <input 
              type="number" 
              id="payment-amount" 
              v-model="addFundAmount" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter amount"
            />
          </div>
        </div>
        
        <div class="bg-white rounded-lg p-4 shadow-sm flex flex-col items-center">
          <div class="font-medium text-center mb-3">Scan QR Code to Make Payment</div>
          <div class="bg-gray-100 p-3 rounded-lg w-84 h-84 mb-3 flex items-center justify-center relative">
            <!-- QR Code with download overlay -->
            <img ref="qrCodeImg" class="w-3/4" src="/images/QRcode.jpeg" alt="QR code"/>
            <button 
              @click="downloadQRCode" 
              class="absolute bottom-3 right-3 bg-white rounded-full p-2 shadow-md"
              title="Download QR Code"
            >
              <font-awesome-icon icon="download" class="text-gray-700" />
            </button>
          </div>
          
          <!-- UPI ID Display & Copy -->
          <div class="w-full mb-4">
            <div class="text-sm font-medium text-gray-700 mb-1">UPI ID:</div>
            <div class="flex w-full">
              <div class="flex-1 bg-gray-100 p-2 rounded-l-md truncate">
                dprasadpandey0@okhdfcbank
              </div>
              <button
                @click="copyUpiId"
                class="bg-blue-500 text-white px-3 rounded-r-md flex items-center justify-center"
              >
                <font-awesome-icon :icon="hasCopied ? 'check' : 'copy'" class="text-white" />
              </button>
            </div>
          </div>
          
          <p class="text-center text-gray-700 text-sm mb-4">
            Scan this QR to make payment and submit done button and your fund will be reflected in your account within 3 hours
          </p>
          <button 
            class="bg-green-500 text-white py-2 px-6 rounded-lg font-medium w-full"
            @click="submitAddFund"
            :disabled="transactionStore.loading"
          >
          <div v-if="transactionStore.loading" class="flex items-center justify-center">
            <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            Requesting Add Funds
          </div>
          <span v-else>Done</span>
          </button>
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
        </div>
        
        <div class="mb-4">
          <label class="block text-gray-700 text-sm font-medium mb-2" for="account-number">
            Account ID:
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
const qrCodeImg = ref(null);
const hasCopied = ref(false);

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

// Add Fund state
const addFundAmount = ref('');

// Withdraw Fund state
const withdrawAmount = ref('');
const upi_id = ref(user.value.upi_id || '');
const newUpiId = ref('');
const isEditingUPI = ref(false);

// Computed property for available balance
const availableBalance = computed(() => user.value.funds || 0);

// Methods
const submitAddFund = async() => {
  if (addFundAmount.value > 0) {
    const result = await transactionStore.addFunds(addFundAmount.value);
    if(result.success){
      toast.success(result.message);
    }else{
      toast.error(result.message);
    }
    addFundAmount.value = '';
  } else {
    toast.error('Please enter an amount');
  }
};

const requestWithdrawal = async() => {
  if (withdrawAmount.value > 50 && withdrawAmount.value <= availableBalance.value) {
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

// Function to download QR code image
const downloadQRCode = () => {
  if (qrCodeImg.value) {
    // Create a link element
    const link = document.createElement('a');
    // Set the download attribute with filename
    link.download = 'payment_qr_code.jpeg';
    // Set the href to the image src
    link.href = qrCodeImg.value.src;
    // Append to body, click, and remove
    document.body.appendChild(link);
    link.click();
    document.body.removeChild(link);
    
    toast.success('QR Code downloaded successfully');
  } else {
    toast.error('Could not download QR Code');
  }
};

// Function to copy UPI ID to clipboard
const copyUpiId = () => {
  const upiId = 'dprasadpandey0@okhdfcbank';
  navigator.clipboard.writeText(upiId)
    .then(() => {
      hasCopied.value = true;
      toast.success('UPI ID copied to clipboard');
      
      // Reset the copy icon after 2 seconds
      setTimeout(() => {
        hasCopied.value = false;
      }, 2000);
    })
    .catch(() => {
      toast.error('Failed to copy UPI ID');
    });
};
</script>