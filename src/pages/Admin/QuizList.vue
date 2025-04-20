<template>
    <div class="container mx-auto px-4 py-8">
      <div class="bg-white rounded-lg shadow-md p-6">
        <div class="flex justify-between items-center mb-6">
          <h1 class="text-2xl font-bold text-gray-800">Quiz Management</h1>
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
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useAdminStore } from '@/stores/adminStore';
  import { useToast } from "vue-toastification";
import { useRouter } from 'vue-router';
  
  const adminStore = useAdminStore();
  
  // State
  const totalQuizzes = ref(0);
  const toast = useToast();
  const router = useRouter();
  const page = ref(1);
  
  // Computed properties
  const quizList = computed(() => adminStore.quizList || []);
  
  // Methods
  const fetchQuizList = async() => {
      const result = await adminStore.showQuizList(page.value);
      if(!result.success){
        toast.error("failed to get quizzes");
      } else {
        totalQuizzes.value = quizList.value.length;
        page.value = page.value + 1;
      }

    
  };
  
  const refreshQuizList = () => {
    fetchQuizList();
  };
  
  // Lifecycle hooks
  onMounted(() => {
    fetchQuizList();
  });

  const showQuiz = (nodeId) => {
    console.log(nodeId);
    adminStore.showUsersByQuiz(nodeId);
    router.push(`/admin/quiz/show/${nodeId}`);
  }
  </script>