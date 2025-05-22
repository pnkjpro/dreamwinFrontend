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

      <!-- Referral Stats Card -->
      <div class="bg-white rounded-lg shadow-md p-5 mb-4">
        <div class="flex justify-between">
          <div class="text-center p-3 flex-1">
            <p class="text-gray-600 text-sm">Total Referred</p>
            <p class="text-xl font-bold text-gray-800">{{ referredMetaData.totalReferred }}</p>
          </div>
          <div class="text-center p-3 flex-1 border-x border-gray-200">
            <p class="text-gray-600 text-sm">Rewards Earned</p>
            <p class="text-xl font-bold text-green-600">₹ {{ referredMetaData.referEarned }}</p>
          </div>
          <div class="text-center p-3 flex-1">
            <p class="text-gray-600 text-sm">Pending Claims</p>
            <p class="text-xl font-bold text-orange-500">{{ referredMetaData.pendingRewards }}</p>
          </div>
        </div>
      </div>

      <!-- Referred Users Section -->
      <div class="bg-white rounded-lg shadow-md p-5 mb-4">
        <div class="flex justify-between items-center mb-4">
          <h3 class="font-bold text-lg text-gray-800">My Referred Users</h3>
          <div class="flex items-center text-sm">
            <span class="text-gray-500 mr-2">Showing:</span>
            <span class="text-green-600 font-medium">{{ referredMetaData.claimedRewards }}</span>
            <span class="text-gray-500 mx-1">/</span>
            <span class="text-orange-500 font-medium">{{ referredMetaData.pendingRewards }}</span>
            <span class="text-gray-500 mx-1">/</span>
            <span class="text-gray-700 font-medium">{{ referredMetaData.totalReferred }}</span>
          </div>
        </div>

        <div v-if="mainStore.loading" class="flex justify-center items-center py-8">
          <font-awesome-icon icon="spinner" spin class="text-orange-500 text-2xl" />
        </div>
        
        <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded relative" role="alert">
          <strong class="font-bold">Error!</strong>
          <span class="block sm:inline"> {{ error }}</span>
        </div>
        
        <div v-else-if="referredUsers.length === 0" class="text-center py-8">
          <font-awesome-icon icon="user-friends" class="text-gray-400 text-4xl mb-3" />
          <p class="text-gray-600">You haven't referred any users yet.</p>
        </div>
        
        <div v-else class="overflow-hidden">
          <div v-for="user in referredUsers" :key="user.id" class="border-b border-gray-100 last:border-b-0">
            <div class="flex items-center py-3">
              <div class="flex-1">
                <h3 class="font-medium text-gray-800">{{ user.name }}</h3>
                <p class="text-xs text-gray-500">Joined {{ formatDate(user.created_at) }}</p>
              </div>
              <div class="ml-2">
                <span v-if="user.is_reward_given" class="bg-green-100 text-green-700 text-xs px-2 py-1 rounded-full">
                  Claimed
                </span>
                <span v-else class="bg-orange-100 text-orange-700 text-xs px-2 py-1 rounded-full">
                  Pending
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- How it Works (Commented out as in your original code) -->
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
import { ref, computed, onMounted } from 'vue';
import { useAuthStore } from '@/stores/authStore';
import { storeToRefs } from 'pinia';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faArrowLeft, 
  faCoins, 
  faDivide, 
  faForwardStep, 
  faClock,
  faUserFriends,
  faSpinner
} from '@fortawesome/free-solid-svg-icons';
import { useRouter } from 'vue-router';
import { useToast } from "vue-toastification";
import axios from 'axios';
import { useMainStore } from '@/stores/mainStore';

// Register FontAwesome icons
library.add(faArrowLeft, faCoins, faDivide, faForwardStep, faClock, faUserFriends, faSpinner);

const router = useRouter();
const toast = useToast();
const authStore = useAuthStore();
const mainStore = useMainStore();
const { user } = storeToRefs(authStore);
const { referredUsers, referredMetaData } = storeToRefs(mainStore);

const error = ref(null);
const referPage = ref(1);

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

const shareMessage = `Hey! Use my referral code ${user.value.refer_code} to sign up!
 follow this link to join now https://www.himpri.com/auth/register?refer_code=${user.value.refer_code}`;

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

// Format date for referred users
const formatDate = (dateString) => {
  const date = new Date(dateString);
  return date.toLocaleDateString('en-US', { 
    year: 'numeric', 
    month: 'short', 
    day: 'numeric' 
  });
};

const fetchReferredUsers = async() => {
  const result = await mainStore.fetchReferredUsers(referPage.value);
  if(result.success){
    referPage.value = referPage.value + 1;
  } else {
    toast.error(result.message);
  }
}

// Fetch referred users data on component mount
onMounted(()=>{
  fetchReferredUsers()
});
</script>