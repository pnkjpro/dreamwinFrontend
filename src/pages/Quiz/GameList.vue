<template>
  <div class="flex flex-col min-h-screen bg-gray-100">
    <!-- Header -->
    <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
      <font-awesome-icon icon="arrow-left" class="mr-2" />
    </div>

    <!-- Title -->
    <div class="p-4 flex justify-between items-center">
      <h1 class="text-2xl font-bold text-gray-700">{{ contest.title }}</h1>
    </div>

    <!-- Banner Image -->
    <div class="px-4 mb-4">
      <div class="relative w-full h-48 overflow-hidden rounded-lg">
        <img 
          :src="displayImage(contest.banner_image)"
          alt="Sports athletes collage" 
          class="w-full h-full object-cover"
        />
      </div>
    </div>

    <!-- Tabs -->
    <div class="flex px-4 mb-4 border-b border-gray-200">
      <div class="pb-2 px-2 font-medium border-b-2 border-gray-800">Contest</div>
    </div>

    <!-- Contest Cards -->
    <div class="px-4 space-y-4">
      <!-- Contest Cards -->
      <div v-for="variant in contest.quiz_variants" :key="variant.id" class="bg-white rounded-lg shadow-sm p-4">
        <div @click="navigateTo(variant.id)" class="flex justify-between mb-2">
          <div>
            <div class="font-medium">Prize Pool</div>
            <div class="flex items-center">
              <font-awesome-icon icon="trophy" class="mr-2 text-gray-700" />
              <span class="font-bold">Prize ₹ {{ variant.prize }}</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-gray-500 text-sm">Entry Fee</div>
            <button class="bg-green-500 text-white px-3 py-1 rounded-lg">
              ₹ {{ variant.entry_fee }}
            </button>
          </div>
        </div>
        
        <!-- Progress Bar -->
        <div class="w-full bg-gray-200 rounded-full h-2 mb-1">
          <div 
            class="bg-red-500 h-2 rounded-full" 
            :style="`width: ${calculateProgress(variant)}%`"
          ></div>
        </div>
        
        <div class="flex justify-between text-xs">
          <div class="text-red-500">{{ variant.slot_limit - variant.user_responses_count }} spot left</div>
          <div class="text-gray-500">Total spot: {{ variant.slot_limit }}</div>
        </div>
        <div class="flex justify-between text-xs mt-1">
          <div>1st prize - ₹ {{ variant?.prize_contents['1'] || '...' }}</div>
          <div class="text-gray-500">Guaranteed</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { onMounted, ref, inject } from 'vue';
import { useMainStore } from '@/stores/mainStore';
import { storeToRefs } from 'pinia';
import { useRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faArrowLeft, 
  faBars, 
  faTrophy
} from '@fortawesome/free-solid-svg-icons';

const router = useRouter();

const mainStore = useMainStore();
const { contest, prizeContents } = storeToRefs(mainStore);

const displayImage = (imagePath) => {
  let path = '/images/fallbackImage.png';
  if(imagePath){
    path = `${import.meta.env.VITE_BASE_API}/storage/${imagePath}`
  }
  return path;
}

// Calculate progress percentage for progress bar
const calculateProgress = (variant) => {
  const slotsOccupied = variant.user_responses_count;
  const totalSlots = variant.slot_limit;
  
  if (!totalSlots) return 0;
  
  // Calculate percentage of slots filled
  const percentage = (slotsOccupied / totalSlots) * 100;
  return Math.max(0, Math.min(100, percentage)); // Ensure value is between 0-100
}

const config = inject('config');
// const fallbackImage = config.FALLBACK_IMAGE;

const navigateTo = (variantId) => {
  console.log("gamelist variantId", variantId);
  mainStore.getPrizeContents(variantId);
  router.push('/quiz/variant/details');
}

const navigateToBack = () => {
  router.back();
}

// Register FontAwesome icons
library.add(faArrowLeft, faBars, faTrophy);
</script>