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
      <!-- First Contest Card -->
      <div v-for="variant in contest.quiz_variants" class="bg-white rounded-lg shadow-sm p-4">
        <div @click="navigateTo(variant.id)" class="flex justify-between mb-2">
          <div>
            <div class="font-medium">Prize Pool</div>
            <div class="flex items-center">
              <font-awesome-icon icon="trophy" class="mr-2 text-gray-700" />
              <span class="font-bold">Prize ₹ 50,000</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-gray-500 text-sm">Entry Fee</div>
            <button class="bg-green-500 text-white px-3 py-1 rounded-lg">
              ₹ {{ variant.entry_fee }}
            </button>
          </div>
        </div>
        <div class="h-1 w-full bg-red-500 mb-1"></div>
        <div class="flex justify-between text-xs">
          <div class="text-red-500">5 spot left</div>
          <div class="text-gray-500">Total spot: {{ variant.slot_limit }}</div>
        </div>
        <div class="flex justify-between text-xs mt-1">
          <div>1 st prize - ₹ {{ variant.prize }}</div>
          <div class="text-gray-500">Guaranteed</div>
        </div>
      </div>

      <!-- Second Contest Card -->
      <!-- <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex justify-between mb-2">
          <div>
            <div class="font-medium">Prize Pool</div>
            <div class="flex items-center">
              <font-awesome-icon icon="trophy" class="mr-2 text-gray-700" />
              <span class="font-bold">Prize ₹ 20,000</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-gray-500 text-sm">Entry Fee</div>
            <button class="bg-green-500 text-white px-3 py-1 rounded-lg">
              ₹ 51
            </button>
          </div>
        </div>
        <div class="h-1 w-full bg-red-500 mb-1"></div>
        <div class="flex justify-between text-xs">
          <div class="text-red-500">20 spot left</div>
          <div class="text-gray-500">Total spot: 100</div>
        </div>
        <div class="flex justify-between text-xs mt-1">
          <div>1 st prize - ₹ 10000</div>
          <div class="text-gray-500">Guaranteed</div>
        </div>
      </div> -->

      <!-- Third Contest Card -->
      <!-- <div class="bg-white rounded-lg shadow-sm p-4">
        <div class="flex justify-between mb-2">
          <div>
            <div class="font-medium">Prize Pool</div>
            <div class="flex items-center">
              <font-awesome-icon icon="trophy" class="mr-2 text-gray-700" />
              <span class="font-bold">Prize ₹ 5000</span>
            </div>
          </div>
          <div class="text-right">
            <div class="text-gray-500 text-sm">Entry Fee</div>
            <button class="bg-green-500 text-white px-3 py-1 rounded-lg">
              ₹ 21
            </button>
          </div>
        </div>
        <div class="h-1 w-full bg-red-500 mb-1"></div>
        <div class="flex justify-between text-xs">
          <div class="text-red-500">10 spot left</div>
          <div class="text-gray-500">Total spot: 100</div>
        </div>
        <div class="flex justify-between text-xs mt-1">
          <div>1 st prize - ₹ 2500</div>
          <div class="text-gray-500">Guaranteed</div>
        </div>
      </div> -->
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

const config = inject('config');
// const fallbackImage = config.FALLBACK_IMAGE;

const navigateTo = (variantId) => {
  console.log("gamelist variantId",variantId);
  mainStore.getPrizeContents(variantId);
  router.push('/quiz/variant/details');
}

const navigateToBack = () => {
  router.back();
}

// Register FontAwesome icons
library.add(faArrowLeft, faBars, faTrophy);
</script>