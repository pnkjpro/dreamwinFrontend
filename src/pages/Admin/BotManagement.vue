<template>
    <div class="container mx-auto py-8 px-4">
      <h1 class="text-2xl font-bold mb-6">Bot Management</h1>
  
      <!-- Tab navigation -->
      <div class="mb-6 border-b">
        <ul class="flex">
          <li @click="activeTab = 'create'" 
              :class="{'border-b-2 border-blue-500': activeTab === 'create'}" 
              class="mr-4 pb-2 cursor-pointer">
            Create Bot
          </li>
          <li @click="activeTab = 'actions'" 
              :class="{'border-b-2 border-blue-500': activeTab === 'actions', 'opacity-50': !selectedBot}" 
              class="mr-4 pb-2 cursor-pointer">
            Define Bot Actions
          </li>
        </ul>
      </div>
  
      <!-- Create Bot Form -->
      <div v-if="activeTab === 'create'">
        <div class="bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Create New Bot</h2>
          
          <div class="mb-4">
            <label class="block text-gray-700 mb-2">Bot Name</label>
            <input 
              v-model="botForm.name" 
              type="text" 
              class="w-full border rounded px-3 py-2"
              placeholder="Enter bot name" 
            />
          </div>
  
          <div class="flex justify-end">
            <button 
              @click="createBot" 
              :disabled="botStore.loading"
              class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
            >
              <span v-if="botStore.loading">Creating...</span>
              <span v-else>Create Bot</span>
            </button>
          </div>
        </div>
  
        <!-- Bot List -->
        <div class="mt-8 bg-white rounded-lg shadow p-6">
          <h2 class="text-xl font-bold mb-4">Existing Bots</h2>
          
          <div v-if="botStore.loading" class="text-center py-4">
            Loading bots...
          </div>
          
          <div v-else-if="bots.length === 0" class="text-center py-4 text-gray-500">
            No bots created yet
          </div>
          
          <div v-else class="overflow-x-auto">
            <table class="min-w-full">
              <thead>
                <tr>
                  <th class="px-4 py-2 text-left">ID</th>
                  <th class="px-4 py-2 text-left">Name</th>
                  <th class="px-4 py-2 text-left">Email</th>
                  <th class="px-4 py-2 text-left">Funds</th>
                  <th class="px-4 py-2 text-left">Actions</th>
                </tr>
              </thead>
              <tbody>
                <tr v-for="bot in bots" :key="bot.id" class="border-t">
                  <td class="px-4 py-2">{{ bot.id }}</td>
                  <td class="px-4 py-2">{{ bot.name }}</td>
                  <td class="px-4 py-2">{{ bot.email }}</td>
                  <td class="px-4 py-2">{{ bot.funds }}</td>
                  <td class="px-4 py-2">
                    <button 
                      @click="selectBot(bot)"
                      class="bg-green-500 text-white px-3 py-1 rounded hover:bg-green-600 text-sm"
                    >
                      Select
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
  
      <!-- Define Bot Actions -->
      <div v-if="activeTab === 'actions'">
        <div class="bg-white rounded-lg shadow p-6">
          <div v-if="!selectedBot" class="text-center py-4 text-gray-500">
            Please select a bot first
          </div>
          
          <div v-else>
            <h2 class="text-xl font-bold mb-4">Define Actions for {{ selectedBot.name }}</h2>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Select Quiz</label>
              <select 
                v-model="actionForm.quiz_id" 
                @change="loadQuizVariants(actionForm.quiz_id)"
                class="w-full border rounded px-3 py-2"
              >
                <option value="">Select a quiz</option>
                <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
                  {{ quiz.title }}
                </option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Select Variant</label>
              <select 
                v-model="actionForm.variant_id" 
                class="w-full border rounded px-3 py-2"
                :disabled="!actionForm.quiz_id"
              >
                <option value="">Select a variant</option>
                <option v-for="variant in quizVariants" :key="variant.id" :value="variant.id">
                  Variant Rs {{ variant.entry_fee }}
                </option>
              </select>
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Rank</label>
              <input 
                v-model.number="actionForm.rank" 
                type="number" 
                class="w-full border rounded px-3 py-2"
                placeholder="Enter rank" 
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Duration (seconds)</label>
              <input 
                v-model.number="actionForm.duration" 
                type="number" 
                class="w-full border rounded px-3 py-2"
                placeholder="Enter duration in seconds" 
              />
            </div>
            
            <div class="mb-4">
              <label class="block text-gray-700 mb-2">Question Attempts</label>
              <input 
                v-model.number="actionForm.question_attempts" 
                type="number" 
                class="w-full border rounded px-3 py-2"
                placeholder="Enter number of question attempts" 
              />
            </div>
            
            <div class="flex justify-end">
              <button 
                @click="createBotActions" 
                :disabled="botStore.loading"
                class="bg-blue-500 text-white px-4 py-2 rounded hover:bg-blue-600"
              >
                <span v-if="botStore.loading">Creating...</span>
                <span v-else>Define Bot Actions</span>
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, onMounted, computed } from 'vue';
  import axios from 'axios';
  import { useRouter } from 'vue-router';
  import { useToast } from 'vue-toastification';
  import { useBotStore } from '@/stores/botStore';
  import { storeToRefs } from 'pinia';
  
  const router = useRouter();
  const toast = useToast();
  const botStore = useBotStore();
  const { quizzes, bots } = storeToRefs(botStore);
  
  // State
  const activeTab = ref('create');
  const quizVariants = ref([]);
  const selectedBot = ref(null);
  const quiz = ref({});
  
  // Form state
  const botForm = reactive({
    name: ''
  });
  
  const actionForm = reactive({
    user_id: '',
    quiz_id: '',
    variant_id: '',
    rank: 1,
    duration: 60,
    question_attempts: 5
  });
  
  // Methods
  const createBot = async () => {
    if (!botForm.name) {
      toast.error('Bot name is required');
      return;
    }
    const result = await botStore.createBot({name:botForm.name});
    if(!result.success){
        toast.error(result.message);
    } else {
        toast.success(result.message);
        botForm.name = '';
        fetchBots();
    }
    
  };
  
  const fetchBots = async () => {
    const result = await botStore.fetchBots();
    if(!result.success){
        toast.error(result.message);
        return
    }
  };
  
  const fetchQuizzes = async () => {
    const result = await botStore.fetchQuizzes();
    if(!result.success){
        toast.error(result.message);
        return
    }
  };
  
  const loadQuizVariants = async (quiz_id) => {
    if (!actionForm.quiz_id) {
      quizVariants.value = [];
      return;
    }
    
    quiz.value = await quizzes.value.find(q => q.id === quiz_id);
    quizVariants.value = quiz.value.quiz_variants;
  };
  
  const selectBot = (bot) => {
    selectedBot.value = bot;
    actionForm.user_id = bot.id;
    activeTab.value = 'actions';
  };
  
  const createBotActions = async () => {
      const result = await botStore.createBotActions(actionForm);
      if(!result.success){
        toast.error(result.message);
        return
      } else {
          toast.error('Bot actions created successfully');
          
          // Reset form after successful submission
          actionForm.quiz_id = '';
          actionForm.variant_id = '';
          actionForm.rank = 1;
          actionForm.duration = 60;
          actionForm.question_attempts = 5;
          quizVariants.value = [];
      } 
  };
  
  // Lifecycle hooks
  onMounted(() => {
    fetchBots();
    fetchQuizzes();
  });
  </script>