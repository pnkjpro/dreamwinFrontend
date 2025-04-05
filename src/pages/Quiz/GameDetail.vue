<template>
    <div class="flex flex-col min-h-screen bg-gray-100">
      <!-- Header -->
      <div @click="navigateToBack()" class="bg-orange-500 text-white p-3 flex items-center">
        <font-awesome-icon icon="arrow-left" class="mr-2" />
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
        <button v-if="joinStatus == 'joined'" @click="navigateTo('/quiz/instruction')" class="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
          Start Quiz
        </button>
        <button disabled v-else-if="joinStatus == 'disabled'" class="w-full bg-stone-400 text-white py-3 rounded-lg font-medium">
          Joined Other Variant!
        </button>
        <button disabled v-else-if="joinStatus == 'initiated'" class="w-full bg-stone-400 text-white py-3 rounded-lg font-medium">
          Game Already Started!
        </button>
        <button disabled v-else-if="joinStatus == 'completed'" class="w-full bg-stone-400 text-white py-3 rounded-lg font-medium">
          Game Completed!
        </button>
        <button v-else="" @click="handleJoinGame(variant.id)" class="w-full bg-green-500 text-white py-3 rounded-lg font-medium">
          JOIN ₹ {{ variant.entry_fee }}
        </button>
      </div>
  
      <!-- Tabs -->
      <div class="flex border-b border-gray-200 mt-2">
        <div class="flex-1 text-center py-3 text-red-700 font-medium border-b-2 border-red-700">
          Winning
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
  import { ref, computed } from 'vue';
  import { useMainStore } from '@/stores/mainStore';
  import { storeToRefs } from 'pinia';
  import { useRouter } from 'vue-router';
  import { library } from '@fortawesome/fontawesome-svg-core';
  import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
  import { faArrowLeft } from '@fortawesome/free-solid-svg-icons';
import { useTransactionStore } from '@/stores/transactionStore';
import { useToast } from 'vue-toastification';
import { useAuthStore } from '@/stores/authStore';
  
  // Register FontAwesome icons
  library.add(faArrowLeft);

  const router = useRouter();
  const toast = useToast();
  const mainStore = useMainStore();
  const authStore = useAuthStore();
  const transactionStore = useTransactionStore();
  const {contest, prizeContents, variant} = storeToRefs(mainStore);
  const { user } = storeToRefs(authStore);
  const handleJoinGame = async(variantId) => {
    const result = await transactionStore.joinGame(variant.value.id)
    if(result.success){
      toast.success(result.message);
      router.push('/quiz/instruction');
    }else{
      toast.error(result.message);
    }
  }

  // =================== Know Join Status ==================
  const userResponse = computed(() => {
  return user.value?.user_responses.find(response => response.node_id === contest.value.node_id) || null;
  });

  const joinStatus = computed(() => {
    if (!userResponse.value) {
      return 'pending'; // If userResponse is empty, return 'pending'
    }

    return userResponse.value.quiz_variant_id === variant.value.id
      ? userResponse.value.status
      : 'disabled'; // If userResponse exists but quiz_variant_id doesn't match, return 'disabled'
  });

  // ==========================================================

  const navigateToBack = () => {
    router.back();
  }

  const navigateTo = (link) => {
    router.push(link)
  }
  console.log(prizeContents.value);
  </script>