<template>
  <div class="container mx-auto px-4 py-8">
    <div class="bg-white rounded-lg shadow-md p-6">
      <div class="flex justify-between items-center mb-6">
        <h1 class="text-2xl font-bold text-gray-800">Quiz Management</h1>
        <div class="flex space-x-3">
          <!-- Category Filter Dropdown -->
          <div class="relative">
            <select 
              v-model="selectedCategory" 
              @change="handleCategoryChange"
              class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-blue-500 focus:border-blue-500 block w-full p-2.5"
            >
              <option value="">All Categories</option>
              <option v-for="category in categories" :key="category" :value="category.id">{{ category.name }}</option>
            </select>
          </div>
          
          <button 
            @click="refreshQuizList" 
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 py-2 rounded-md flex items-center"
          >
            <span class="mr-2">Refresh</span>
            <svg xmlns="http://www.w3.org/2000/svg" class="h-5 w-5" viewBox="0 0 20 20" fill="currentColor">
              <path fill-rule="evenodd" d="M4 2a1 1 0 011 1v2.101a7.002 7.002 0 0111.601 2.566 1 1 0 11-1.885.666A5.002 5.002 0 005.999 7H9a1 1 0 010 2H4a1 1 0 01-1-1V3a1 1 0 011-1zm.008 9.057a1 1 0 011.276.61A5.002 5.002 0 0014.001 13H11a1 1 0 110-2h5a1 1 0 011 1v5a1 1 0 11-2 0v-2.101a7.002 7.002 0 01-11.601-2.566 1 1 0 01.61-1.276z" clip-rule="evenodd" />
            </svg>
          </button>
        </div>
      </div>

      <div v-if="adminStore.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-t-2 border-b-2 border-blue-500"></div>
      </div>
      
      <div v-else-if="!quizList.length" class="text-center py-12">
        <p class="text-gray-500">No quizzes found</p>
      </div>
      
      <div v-else>
        <div class="overflow-x-auto">
          <table class="min-w-full bg-white">
            <thead class="bg-gray-100">
              <tr>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Node ID</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Title</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Spot Limit</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Entry Fees</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Prize Money</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Start Time</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">End Time</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Category</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Timer</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Winners</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Total Questions</th>
                <th class="py-3 px-4 text-left text-gray-600 font-medium">Action</th>
              </tr>
            </thead>
            <tbody class="divide-y divide-gray-200">
              <tr v-for="quiz in quizList" :key="quiz.id" class="hover:bg-gray-50">
                <td class="py-3 px-4 text-gray-800">{{ quiz.node_id }}</td>
                <td class="py-3 px-4 text-gray-800">{{ quiz.title }}</td>
                <td class="py-3 px-4 text-gray-800">{{ quiz.spot_limit }}</td>
                <td class="py-3 px-4 text-gray-800">{{ quiz.entry_fees }}</td>
                <td class="py-3 px-4 text-gray-800">{{ quiz.prize_money }}</td>
                <td class="py-3 px-4 text-gray-800">{{ quiz.start_time }}</td>             
                <td class="py-3 px-4 text-gray-800">{{ quiz.end_time }}</td>
                <td class="py-3 px-4 text-gray-800">{{ quiz.category.name }}</td>             
                <td class="py-3 px-4 text-gray-800">{{ quiz.quiz_timer }}</td>             
                <td class="py-3 px-4 text-gray-800">{{ quiz.winners }}</td>             
                <td class="py-3 px-4 text-gray-800">{{ quiz.totalQuestion }}</td>  
                <td class="py-3 px-4 text-gray-800">
                  <button 
                  type="button" 
                  @click="showQuiz(quiz.node_id)"
                  class="text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:ring-blue-300 font-medium rounded-lg text-sm px-5 py-2.5 me-2 mb-2 dark:bg-blue-600 dark:hover:bg-blue-700 focus:outline-none dark:focus:ring-blue-800">
                      Show Quiz
                  </button>
                </td>  
              </tr>
            </tbody>
          </table>
        </div>
        
        <div class="mt-6 flex justify-between items-center">
          <div class="text-sm text-gray-500">
            Showing <span class="font-medium">{{ quizList.length }}</span> quizzes
          </div>
        </div>
        <!-- Load More Button -->
        <div v-if="hasMoreLoad" class="mt-6 text-center">
          <button @click="fetchQuizList" 
                  class="px-8 py-3 bg-gradient-to-r from-red-600 to-orange-600 text-white rounded-full shadow-lg hover:from-red-700 hover:to-orange-700 focus:outline-none focus:ring-2 focus:ring-red-400 transition-all transform hover:scale-105"
                  :disabled="adminStore.loading">
            <span v-if="adminStore.loading" class="flex items-center justify-center">
              <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              Loading...
            </span>
            <span v-else class="flex items-center justify-center">
              Load More
              <font-awesome-icon icon="chevron-down" class="ml-2" />
            </span>
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, computed } from 'vue';
import { useAdminStore } from '@/stores/adminStore';
import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
import { useMainStore } from '@/stores/mainStore';
import { storeToRefs } from 'pinia';

const adminStore = useAdminStore();
const mainStore = useMainStore();
const { categories } = storeToRefs(mainStore);

// State
const toast = useToast();
const router = useRouter();
const page = ref(1);
const hasMoreLoad = ref(true);
const selectedCategory = ref('');

// Computed properties
const quizList = computed(() => adminStore.quizList || []);

// Methods
const fetchQuizList = async() => {
    const result = await adminStore.showQuizList(page.value, selectedCategory.value);
    if(!result.success){
      toast.error("Failed to get quizzes");
    } else {
      if(result.pagination){
        page.value = page.value + 1;
      } else {
        hasMoreLoad.value = false;
      }
    }
};

const handleCategoryChange = () => {
  page.value = 1;
  fetchQuizList();
};

const refreshQuizList = () => {
  fetchQuizList();
};

// Lifecycle hooks
onMounted(() => {
  fetchQuizList();
  mainStore.fetchCategories();
});

const showQuiz = (nodeId) => {
  console.log(nodeId);
  adminStore.showUsersByQuiz(nodeId);
  router.push(`/admin/quiz/show/${nodeId}`);
}
</script>