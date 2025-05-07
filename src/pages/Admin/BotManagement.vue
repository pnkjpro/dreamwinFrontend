<template>
  <div class="container mx-auto py-12 px-6 max-w-7xl">
    <!-- Create Bot Form -->
    <div v-if="activeTab === 'create'">
      <div class="bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Create New Bot</h2>
        
        <div class="mb-6">
          <label class="block text-sm font-medium text-gray-700 mb-2">Bot Name</label>
          <input 
            v-model="botForm.name" 
            type="text" 
            class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors"
            placeholder="Enter bot name" 
          />
        </div>

        <div class="flex justify-end">
          <button 
            @click="createBot" 
            :disabled="botStore.loading"
            class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
          >
            <span v-if="botStore.loading">Creating...</span>
            <span v-else>Create Bot</span>
          </button>
        </div>
      </div>

      <!-- Bot List -->
      <div class="mt-10 bg-white rounded-xl shadow-lg p-8">
        <h2 class="text-2xl font-bold text-gray-900 mb-6">Existing Bots</h2>
        
        <div v-if="botStore.loading" class="text-center py-6 text-gray-600">
          Loading bots...
        </div>
        
        <div v-else-if="bots.length === 0" class="text-center py-6 text-gray-500">
          No bots created yet
        </div>
        
        <div v-else class="overflow-x-auto">
          <table class="min-w-full divide-y divide-gray-200">
            <thead class="bg-gray-50">
              <tr>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">ID</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Name</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Email</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Funds</th>
                <th class="px-6 py-4 text-left text-xs font-semibold text-gray-600 uppercase tracking-wider">Actions</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="bot in bots" :key="bot.id" class="hover:bg-gray-50 transition-colors">
                <td class="px-6 py-4 text-sm text-gray-900">{{ bot.id }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ bot.name }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ bot.email }}</td>
                <td class="px-6 py-4 text-sm text-gray-900">{{ bot.funds }}</td>
                <td class="px-6 py-4">
                  <button 
                    @click="selectBot(bot)"
                    class="bg-green-500 text-white px-4 py-2 rounded-lg text-sm font-medium hover:bg-green-600 focus:ring-2 focus:ring-green-500 focus:ring-offset-2 transition-colors"
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
  <div class="bg-white rounded-xl shadow-lg p-8 max-w-3xl mx-auto">
    <div v-if="!selectedBot" class="text-center py-12 text-gray-500 text-lg">
      Please select a bot to define actions
    </div>

    <div v-else>
      <h2 class="text-2xl font-bold text-gray-900 mb-6">
        Define Actions for {{ selectedBot.name }}
      </h2>

      <!-- Quiz Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Quiz</label>
        <select
          v-model="actionForm.quiz_id"
          @change="loadQuizVariants(actionForm.quiz_id)"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
        >
          <option value="">Select a quiz</option>
          <option v-for="quiz in quizzes" :key="quiz.id" :value="quiz.id">
            {{ quiz.title }}
          </option>
        </select>
      </div>

      <!-- Variant Selection -->
      <div class="mb-6">
        <label class="block text-sm font-medium text-gray-700 mb-2">Select Variant</label>
        <select
          v-model="actionForm.variant_id"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
          :disabled="!actionForm.quiz_id"
        >
          <option value="">Select a variant</option>
          <option v-for="variant in quizVariants" :key="variant.id" :value="variant.id">
            Variant Rs {{ variant.entry_fee }}
          </option>
        </select>
        <p v-if="!actionForm.quiz_id" class="mt-2 text-sm text-gray-500">
          Select a quiz to enable variant selection
        </p>
      </div>

      <!-- Rank Input -->
      <div class="mb-6 relative">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Rank
          <span
            class="inline-block ml-1 text-gray-400 cursor-help"
            title="Rank is determined based on score and duration"
          >
            ⓘ
          </span>
        </label>
        <input
          v-model.number="actionForm.rank"
          type="number"
          min="1"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
          placeholder="Enter rank"
        />
        <p class="mt-2 text-sm text-gray-500">
          Rank is calculated using score and duration.
        </p>
      </div>

      <!-- Question Attempts Input -->
      <div class="mb-8 relative">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Question Attempts
          <span
            class="inline-block ml-1 text-gray-400 cursor-help"
            title="Score cannot exceed the total number of questions in the quiz"
          >
            ⓘ
          </span>
        </label>
        <input
          v-model.number="actionForm.question_attempts"
          type="number"
          min="1"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
          placeholder="Enter number of question attempts"
        />
        <p class="mt-2 text-sm text-gray-500">
          Score cannot be greater than the total questions in the quiz.
        </p>
      </div>

      <!-- Duration Input -->
      <div class="mb-6 relative">
        <label class="block text-sm font-medium text-gray-700 mb-2">
          Duration (seconds)
          <span
            class="inline-block ml-1 text-gray-400 cursor-help"
            title="Duration must be at least equal to the total score attempted"
          >
            ⓘ
          </span>
        </label>
        <input
          v-model.number="actionForm.duration"
          type="number"
          min="1"
          class="w-full border border-gray-300 rounded-lg px-4 py-3 text-sm focus:ring-2 focus:ring-indigo-500 focus:border-indigo-500 transition-colors bg-gray-50"
          placeholder="Enter duration in seconds"
        />
        <p class="mt-2 text-sm text-gray-500">
          Duration cannot be less than the total score attempted.
        </p>
      </div>

      <!-- Action Buttons -->
      <div class="flex justify-end space-x-4">
        <button
          @click="activeTab = 'create'"
          class="bg-gray-200 text-gray-700 px-6 py-3 rounded-lg font-medium hover:bg-gray-300 focus:ring-2 focus:ring-gray-500 focus:ring-offset-2 transition-colors"
        >
          Back to Create Bot
        </button>
        <button
          @click="createBotActions"
          :disabled="botStore.loading"
          class="bg-indigo-600 text-white px-6 py-3 rounded-lg font-medium hover:bg-indigo-700 focus:ring-2 focus:ring-indigo-500 focus:ring-offset-2 transition-colors disabled:bg-indigo-300 disabled:cursor-not-allowed"
        >
          <span v-if="botStore.loading">
            <svg
              class="animate-spin inline-block w-5 h-5 mr-2"
              xmlns="http://www.w3.org/2000/svg"
              fill="none"
              viewBox="0 0 24 24"
            >
              <circle
                class="opacity-25"
                cx="12"
                cy="12"
                r="10"
                stroke="currentColor"
                stroke-width="4"
              ></circle>
              <path
                class="opacity-75"
                fill="currentColor"
                d="M4 12a8 8 0 018-8v8h8a8 8 0 01-16 0z"
              ></path>
            </svg>
            Creating...
          </span>
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
          toast.success(result.message);
          
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