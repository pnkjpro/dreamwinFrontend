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
            activeTab === 'add' ? 'text-orange-500 border-b-2 border-orange-500' : 'text-gray-500'
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
  
      <!-- Add Fund Tab -->
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
          <div class="bg-gray-100 p-3 rounded-lg w-56 h-56 mb-3 flex items-center justify-center">
            <!-- SVG QR Code Placeholder -->
            <svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 200 200" class="w-full h-full">
              <rect x="0" y="0" width="200" height="200" fill="#fff" />
              <g fill="#000">
                <!-- Simple QR Code pattern - would be replaced with real QR -->
                <rect x="20" y="20" width="30" height="30" />
                <rect x="150" y="20" width="30" height="30" />
                <rect x="20" y="150" width="30" height="30" />
                <rect x="60" y="60" width="80" height="80" />
                <rect x="60" y="20" width="10" height="10" />
                <rect x="80" y="20" width="10" height="10" />
                <rect x="110" y="20" width="10" height="10" />
                <rect x="130" y="20" width="10" height="10" />
                <rect x="20" y="60" width="10" height="10" />
                <rect x="20" y="80" width="10" height="10" />
                <rect x="20" y="110" width="10" height="10" />
                <rect x="20" y="130" width="10" height="10" />
                <rect x="150" y="60" width="10" height="10" />
                <rect x="150" y="80" width="10" height="10" />
                <rect x="150" y="110" width="10" height="10" />
                <rect x="150" y="130" width="10" height="10" />
                <rect x="60" y="150" width="10" height="10" />
                <rect x="80" y="150" width="10" height="10" />
                <rect x="110" y="150" width="10" height="10" />
                <rect x="130" y="150" width="10" height="10" />
              </g>
            </svg>
          </div>
          <p class="text-center text-gray-700 text-sm mb-4">
            Scan this QR to make payment and submit done button and your fund will be reflected in your account within 3 hours
          </p>
          <button 
            class="bg-green-500 text-white py-2 px-6 rounded-lg font-medium w-full"
            @click="submitAddFund"
          >
            DONE
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
        
        <div class="bg-white rounded-lg p-4 shadow-sm">
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
              Bank Account Number
            </label>
            <input 
              type="text" 
              id="account-number" 
              v-model="accountNumber" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter your bank account number"
            />
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="ifsc-code">
              IFSC Code
            </label>
            <input 
              type="text" 
              id="ifsc-code" 
              v-model="ifscCode" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              placeholder="Enter IFSC code"
            />
          </div>
          
          <button 
            class="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium w-full"
            @click="requestWithdrawal"
            :disabled="withdrawAmount <= 0 || withdrawAmount > availableBalance || !accountNumber || !ifscCode"
          >
            REQUEST WITHDRAWAL
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useTransactionStore } from '@/stores/transactionStore';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
  import { storeToRefs } from 'pinia';
  import { useAuthStore } from '@/stores/authStore';
  import { useRouter } from 'vue-router';
  
  // Register FontAwesome icons
  library.add(faArrowLeft);
  // State for tab management
  const activeTab = ref('deposit');
  const router = useRouter();

  const useTransaction = useTransactionStore();
  const useAuth = useAuthStore();
  const { user } = storeToRefs(useAuth);
  const { fundAction } = storeToRefs(useTransaction);

  activeTab.value = fundAction.value;
  
  
  // Add Fund state
  const addFundAmount = ref('');
  
  // Withdraw Fund state
  const withdrawAmount = ref('');
  const accountNumber = ref('');
  const ifscCode = ref('');
  
  // Methods
  const submitAddFund = () => {
    if (addFundAmount.value) {
      useTransaction.addFunds(addFundAmount.value);
      alert(`Payment of ₹${addFundAmount.value} has been registered. Funds will be credited within 3 hours.`);
      addFundAmount.value = '';
    } else {
      alert('Please enter an amount');
    }
  };
  
  const requestWithdrawal = () => {
    // Here you would handle the withdrawal request
    if (withdrawAmount.value > 0 && withdrawAmount.value <= availableBalance.value) {
      useTransaction.withdrawFunds(withdrawAmount.value);
      alert(`Withdrawal request for ₹${withdrawAmount.value} has been submitted.`);
      // Reset form
      withdrawAmount.value = '';
      accountNumber.value = '';
      ifscCode.value = '';
    } else {
      alert('Please enter a valid amount');
    }
  };

  const navigateToBack = () => {
    router.back();
  }
  </script>