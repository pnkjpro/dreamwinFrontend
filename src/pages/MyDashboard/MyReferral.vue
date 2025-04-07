<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <!-- Header -->
      <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        <span class="font-medium">My Refer Code</span>
      </div>
  
      <!-- Referral Content -->
      <div class="flex-1 p-4">
        <!-- Referral Card -->
        <div class="bg-white rounded-lg shadow-md p-5 mb-4">
          <div class="text-center mb-6">
            <font-awesome-icon icon="coins" class="text-orange-500 text-4xl mb-3" />
            <h2 class="text-xl font-bold text-gray-800">Share Your Referral Code</h2>
            <p class="text-gray-600 mt-2">Invite friends and earn rewards!</p>
          </div>
  
          <!-- Referral Code Display -->
          <div class="bg-gray-100 rounded-lg p-4 mb-4 flex items-center justify-between">
            <span class="font-bold text-lg text-gray-800">{{ user.refer_code }}</span>
            <button 
              @click="copyReferCode" 
              class="bg-orange-500 hover:bg-orange-600 text-white px-3 py-2 rounded text-sm"
            >
              Copy
            </button>
          </div>
  
          <!-- Sharing Options -->
          <div class="mb-6">
            <p class="text-gray-700 font-medium mb-3">Share via:</p>
            <div class="flex space-x-3">
              <button @click="shareViaWhatsApp" class="bg-green-500 text-white p-3 rounded-full flex-1 font-medium">
                WhatsApp
              </button>
              <button @click="shareViaSMS" class="bg-blue-500 text-white p-3 rounded-full flex-1 font-medium">
                SMS
              </button>
              <button @click="shareViaEmail" class="bg-red-500 text-white p-3 rounded-full flex-1 font-medium">
                Email
              </button>
            </div>
          </div>
        </div>
  
        <!-- How it Works -->
        <!-- <div class="bg-white rounded-lg shadow-md p-5">
          <h3 class="font-bold text-lg text-gray-800 mb-4">How It Works</h3>
          
          <div class="flex items-start mb-4">
            <div class="bg-orange-100 rounded-full p-2 mr-3">
              <font-awesome-icon icon="forward-step" class="text-orange-500" />
            </div>
            <div>
              <p class="font-medium text-gray-800">Share your code</p>
              <p class="text-gray-600 text-sm">Send your unique code to friends</p>
            </div>
          </div>
          
          <div class="flex items-start mb-4">
            <div class="bg-orange-100 rounded-full p-2 mr-3">
              <font-awesome-icon icon="divide" class="text-orange-500" />
            </div>
            <div>
              <p class="font-medium text-gray-800">Friends sign up</p>
              <p class="text-gray-600 text-sm">They register using your code</p>
            </div>
          </div>
          
          <div class="flex items-start">
            <div class="bg-orange-100 rounded-full p-2 mr-3">
              <font-awesome-icon icon="coins" class="text-orange-500" />
            </div>
            <div>
              <p class="font-medium text-gray-800">Both earn rewards</p>
              <p class="text-gray-600 text-sm">You and your friend get bonus credits</p>
            </div>
          </div>
        </div> -->
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useAuthStore } from '@/stores/authStore';
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
  import { useRouter } from 'vue-router';
  import { useToast } from "vue-toastification";
  
  // Register FontAwesome icons
  library.add(faArrowLeft, faCoins, faDivide, faForwardStep, faClock);
  
  const router = useRouter();
  const toast = useToast();
  const authStore = useAuthStore();
  const { user } = storeToRefs(authStore);
  
  const navigateToBack = () => {
    router.back();
  }
  
  const copyReferCode = () => {
    navigator.clipboard.writeText(user.value.refer_code)
      .then(() => {
        toast.success("Referral code copied to clipboard!");
      })
      .catch(() => {
        toast.error("Failed to copy referral code");
      });
  }
  
  const shareMessage = `Hey! Use my referral code ${user.value.refer_code} to sign up and we'll both get rewards!`;
  
  const shareViaWhatsApp = () => {
    const encodedMessage = encodeURIComponent(shareMessage);
    window.open(`https://wa.me/?text=${encodedMessage}`, '_blank');
  }
  
  const shareViaSMS = () => {
    const encodedMessage = encodeURIComponent(shareMessage);
    window.open(`sms:?body=${encodedMessage}`, '_blank');
  }
  
  const shareViaEmail = () => {
    const encodedSubject = encodeURIComponent("Join using my referral code");
    const encodedBody = encodeURIComponent(shareMessage);
    window.open(`mailto:?subject=${encodedSubject}&body=${encodedBody}`, '_blank');
  }
  </script>