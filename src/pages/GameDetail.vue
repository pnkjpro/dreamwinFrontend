<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <!-- Header -->
      <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
        <font-awesome-icon icon="arrow-left" class="mr-2" />
        <span class="text-sm">2 h 24m left</span>
      </div>
  
      <!-- Prize Details Card -->
      <div class="m-4">
        <div class="bg-white rounded-xl p-4 shadow-sm">
          <div class="text-gray-500 text-sm">Prize Pool</div>
          <div class="text-3xl font-bold my-1">₹ {{ variant.prize }}</div>
          <div class="h-1 bg-red-500 w-full my-1"></div>
          <div class="flex justify-between text-xs">
            <div class="text-red-500">5 spot left</div>
            <div class="text-gray-500">Total Spot : {{ variant.slot_limit }}</div>
          </div>
        </div>
      </div>
  
      <!-- Join Button -->
      <div class="mx-4 my-2">
        <button @click="handleJoinGame()" class="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
          JOIN ₹ {{ variant.entry_fee }}
        </button>
      </div>
  
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mt-2">
        <div class="flex-1 text-center py-3 text-red-700 font-medium border-b-2 border-red-700">
          Winning
        </div>
        <div class="flex-1 text-center py-3 text-gray-400">
          Guide to Win
        </div>
      </div>
  
      <!-- Prize Distribution Table -->
      <div class="overflow-y-auto flex-1">
        <table class="w-full">
          <thead>
            <tr class="border-b border-gray-200">
              <th class="text-left py-4 px-6 text-red-700 font-medium">Rank</th>
              <th class="text-right py-4 px-6 text-red-700 font-medium">Amount</th>
            </tr>
          </thead>
          <tbody>
            <tr v-for="(prize, index) in prizeContents" :key="index" class="border-b border-gray-100">
              <td class="text-left py-3 px-6">Rank {{ index }}</td>
              <td class="text-right py-3 px-6 text-gray-700">₹ {{ prize }}</td>
            </tr>
          </tbody>
        </table>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref } from 'vue';
  import { useMainStore } from '@/stores/mainStore';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
  
  // Register FontAwesome icons
  library.add(faArrowLeft);

  const router = useRouter();
  const mainStore = useMainStore();
  const {contest, prizeContents, variant} = storeToRefs(mainStore);
  const handleJoinGame = () => {
    router.push('/quiz/instruction');
  }

  const navigateToBack = () => {
    router.back();
  }
  console.log(prizeContents.value);
  </script>