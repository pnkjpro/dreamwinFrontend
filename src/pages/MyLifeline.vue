<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <!-- Header -->
      <div class="bg-orange-500 text-white p-3 flex items-center">
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        <span class="font-medium">My Lifelines</span>
        <div class="ml-auto flex items-center">
          <font-awesome-icon icon="coins" class="mr-1" />
          <span>₹ {{ availableBalance }}</span>
        </div>
      </div>
  
      <!-- Balance Card -->
      <div class="bg-white p-4 mb-2 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-sm text-gray-600">Available Balance</div>
            <div class="text-xl font-bold">₹ {{ availableBalance }}</div>
          </div>
          <router-link 
            to="/add-fund" 
            class="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
          >
            Add Funds
          </router-link>
        </div>
      </div>
  
      <!-- Lifelines Section -->
      <div class="p-4">
        <div class="text-lg font-bold mb-4">Your Lifelines</div>
        
        <!-- 50:50 Lifeline -->
        <div class="bg-white rounded-lg p-4 shadow-sm mb-3 flex items-center">
          <div class="bg-blue-100 h-12 w-12 rounded-full flex items-center justify-center mr-3">
            <font-awesome-icon icon="divide" class="text-blue-600 text-lg" />
          </div>
          <div class="flex-1">
            <div class="font-medium">50:50 Lifeline</div>
            <div class="text-sm text-gray-600">Removes two incorrect options</div>
            <div class="mt-1.5 flex items-center">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                ₹ 49 each
              </span>
              <span class="ml-3 text-xs text-green-600 font-medium">
                Available: {{ lifelines.fifty.quantity }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Skip Lifeline -->
        <div class="bg-white rounded-lg p-4 shadow-sm mb-3 flex items-center">
          <div class="bg-purple-100 h-12 w-12 rounded-full flex items-center justify-center mr-3">
            <font-awesome-icon icon="forward-step" class="text-purple-600 text-lg" />
          </div>
          <div class="flex-1">
            <div class="font-medium">Skip Lifeline</div>
            <div class="text-sm text-gray-600">Skip the current question without penalty</div>
            <div class="mt-1.5 flex items-center">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                ₹ 149 each
              </span>
              <span class="ml-3 text-xs text-green-600 font-medium">
                Available: {{ lifelines.skip.quantity }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Extend Time Lifeline -->
        <div class="bg-white rounded-lg p-4 shadow-sm mb-5 flex items-center">
          <div class="bg-yellow-100 h-12 w-12 rounded-full flex items-center justify-center mr-3">
            <font-awesome-icon icon="clock" class="text-yellow-600 text-lg" />
          </div>
          <div class="flex-1">
            <div class="font-medium">Extend Time Lifeline</div>
            <div class="text-sm text-gray-600">Add 30 seconds to your question timer</div>
            <div class="mt-1.5 flex items-center">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                ₹ 29 each
              </span>
              <span class="ml-3 text-xs text-green-600 font-medium">
                Available: {{ lifelines.extendTime.quantity }}
              </span>
            </div>
          </div>
        </div>
        
        <!-- Purchase Form -->
        <div class="bg-white rounded-lg p-4 shadow-sm">
          <div class="font-medium mb-3">Purchase Lifelines</div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="lifeline-type">
              Select Lifeline
            </label>
            <select 
              id="lifeline-type" 
              v-model="selectedLifeline"
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
            >
              <option value="">Select a lifeline to purchase</option>
              <option value="fifty">50:50 Lifeline (₹ 49)</option>
              <option value="skip">Skip Lifeline (₹ 149)</option>
              <option value="extendTime">Extend Time by 30s (₹ 29)</option>
            </select>
          </div>
          
          <div class="mb-4">
            <label class="block text-gray-700 text-sm font-medium mb-2" for="quantity">
              Quantity
            </label>
            <input 
              type="number" 
              id="quantity" 
              v-model="purchaseQuantity" 
              class="w-full px-3 py-2 border border-gray-300 rounded-md focus:outline-none focus:ring-2 focus:ring-orange-500"
              min="1"
              max="10"
              placeholder="How many do you want to purchase?"
            />
          </div>
          
          <div class="mb-4 p-3 bg-gray-100 rounded-lg" v-if="selectedLifeline && purchaseQuantity > 0">
            <div class="flex justify-between text-sm mb-2">
              <span>Price per lifeline:</span>
              <span>₹ {{ getLifelinePrice(selectedLifeline) }}</span>
            </div>
            <div class="flex justify-between text-sm mb-2">
              <span>Quantity:</span>
              <span>× {{ purchaseQuantity }}</span>
            </div>
            <div class="border-t border-gray-300 my-2"></div>
            <div class="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹ {{ getTotalPrice() }}</span>
            </div>
          </div>
          
          <div v-if="errorMessage" class="mb-4 p-3 bg-red-100 text-red-700 rounded-lg text-sm">
            {{ errorMessage }}
            <router-link 
              v-if="insufficientFunds" 
              to="/add-fund" 
              class="text-blue-600 underline ml-1"
            >
              Add funds to continue
            </router-link>
          </div>
          
          <button 
            class="bg-orange-500 text-white py-2 px-6 rounded-lg font-medium w-full"
            @click="purchaseLifeline"
            :disabled="!selectedLifeline || purchaseQuantity <= 0"
          >
            PURCHASE
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed } from 'vue';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { 
    faArrowLeft, 
    faCoins, 
    faDivide, 
    faForwardStep, 
    faClock 
  } from '@fortawesome/free-solid-svg-icons';
  
  // Register FontAwesome icons
  library.add(faArrowLeft, faCoins, faDivide, faForwardStep, faClock);
  
  // Available balance
  const availableBalance = ref(100); // Example amount (low to demonstrate insufficient funds)
  
  // Lifeline data
  const lifelines = ref({
    fifty: {
      name: "50:50 Lifeline",
      price: 49,
      quantity: 2
    },
    skip: {
      name: "Skip Lifeline",
      price: 149,
      quantity: 1
    },
    extendTime: {
      name: "Extend Time Lifeline",
      price: 29,
      quantity: 3
    }
  });
  
  // Purchase form state
  const selectedLifeline = ref('');
  const purchaseQuantity = ref(1);
  const errorMessage = ref('');
  const insufficientFunds = ref(false);
  
  // Get price for selected lifeline
  const getLifelinePrice = (lifelineType) => {
    if (!lifelineType) return 0;
    return lifelines.value[lifelineType].price;
  };
  
  // Calculate total price
  const getTotalPrice = () => {
    if (!selectedLifeline.value) return 0;
    return getLifelinePrice(selectedLifeline.value) * purchaseQuantity.value;
  };
  
  // Purchase lifeline
  const purchaseLifeline = () => {
    errorMessage.value = '';
    insufficientFunds.value = false;
    
    const totalPrice = getTotalPrice();
    
    // Validate available funds
    if (totalPrice > availableBalance.value) {
      errorMessage.value = `Insufficient funds. You need ₹${totalPrice - availableBalance.value} more.`;
      insufficientFunds.value = true;
      return;
    }
    
    // Validate quantity
    if (purchaseQuantity.value <= 0) {
      errorMessage.value = 'Please select at least 1 lifeline to purchase.';
      return;
    }
    
    // Process purchase
    availableBalance.value -= totalPrice;
    lifelines.value[selectedLifeline.value].quantity += purchaseQuantity.value;
    
    // Reset form
    alert(`Successfully purchased ${purchaseQuantity.value} ${lifelines.value[selectedLifeline.value].name}`);
    selectedLifeline.value = '';
    purchaseQuantity.value = 1;
  };
  </script>