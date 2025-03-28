<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <!-- Header -->
      <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        <span class="font-medium">My Lifelines</span>
        <div class="ml-auto flex items-center">
          <font-awesome-icon icon="coins" class="mr-1" />
          <span>₹ {{ user.funds }}</span>
        </div>
      </div>
  
      <!-- Balance Card -->
      <div class="bg-white p-4 mb-2 shadow-sm">
        <div class="flex justify-between items-center">
          <div>
            <div class="text-sm text-gray-600">Available Balance</div>
            <div class="text-xl font-bold">₹ {{ user.funds }}</div>
          </div>
          <button 
            @click="navigateTo('funds')" 
            class="bg-orange-500 text-white px-4 py-1.5 rounded-lg text-sm font-medium"
          >
            Add Funds
        </button>
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
                ₹ {{ 29 }} each
              </span>
              <span class="ml-3 text-xs text-green-600 font-medium">
                Available: {{ lifelines[0].quantity }}
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
                ₹ 49 each
              </span>
              <span class="ml-3 text-xs text-green-600 font-medium">
                Available: {{ lifelines[1].quantity }}
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
            <div class="font-medium">Revive Lifeline</div>
            <div class="text-sm text-gray-600">Add 30 seconds to your question timer</div>
            <div class="mt-1.5 flex items-center">
              <span class="text-xs bg-gray-200 text-gray-700 px-2 py-0.5 rounded">
                ₹ 99 each
              </span>
              <span class="ml-3 text-xs text-green-600 font-medium">
                Available: {{ lifelines[2].quantity }}
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
              <option value="1">50:50 Lifeline (₹ 29)</option>
              <option value="2">Skip Lifeline (₹ 49)</option>
              <option value="3">Revive Game (₹ 99)</option>
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
            <!-- <div class="flex justify-between font-bold">
              <span>Total:</span>
              <span>₹ {{ getTotalPrice() }}</span>
            </div> -->
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
            @click="handlePurchaseLifeline"
          >
            PURCHASE
          </button>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, inject, watch } from 'vue';
  import { useMainStore } from '@/stores/mainStore';
  import { useAuthStore } from '@/stores/authStore';
  import { useLifelineStore } from '@/stores/lifelineStore';
  import { useTransactionStore } from '@/stores/transactionStore';
  import { storeToRefs } from 'pinia';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { 
    faArrowLeft, 
    faCoins, 
    faDivide, 
    faForwardStep, 
    faClock 
  } from '@fortawesome/free-solid-svg-icons';
import { useRouter, onBeforeRouteLeave } from 'vue-router';
import { useToast } from "vue-toastification";
  
  // Register FontAwesome icons
  library.add(faArrowLeft, faCoins, faDivide, faForwardStep, faClock);


  const router = useRouter();
  const toast = useToast();
  const lifelineReference = inject('lifeline')
  const mainStore = useMainStore();
  const authStore = useAuthStore();
  const lifelineStore = useLifelineStore();
  const transactionStore = useTransactionStore();
  const { user } = storeToRefs(authStore);

  const lifelines = computed(() => user.value.lifelines || 0);

  const handlePurchaseLifeline = async() => {
    if(!selectedLifeline.value || purchaseQuantity.value > 0){
      const result = await lifelineStore.purchaseLifeline(selectedLifeline.value, purchaseQuantity.value);
      if(result.success){
        toast.success(result.message);
      }else{
        toast.error(result.message);
      }
    } else {
      toast.error("Please enter valid field!");
    }
    //reseting the value;
    selectedLifeline.value = '';
    purchaseQuantity.value = 1;
  }

  const navigateToBack = () => {
    router.back();
  }

  const navigateTo = (link) => {
    router.push(`/${link}`)
  }
  
  // Purchase form state
  const selectedLifeline = ref('');
  const purchaseQuantity = ref(1);

//   onBeforeRouteLeave((to, from, next) => {
//   if (!confirm("Are you sure you want to leave the game, huh?")) {
//     next(false); // Cancel navigation
//   } else {
//     next(); // Allow navigation
//   }
// });
  </script>