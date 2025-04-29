<template>
    <div class="container mx-auto px-4 py-8">
      <!-- Loading State -->
      <div v-if="adminStore.loading" class="flex justify-center items-center h-64">
        <div class="text-center">
          <div class="spinner-border text-primary mb-3" role="status"></div>
          <p>Loading quiz data...</p>
        </div>
      </div>
  
      <div v-else-if="error" class="bg-red-100 border border-red-400 text-red-700 px-4 py-3 rounded">
        <p>{{ error }}</p>
      </div>
  
      <div v-else>
        <!-- Header Section -->
        <header class="bg-white shadow rounded-lg p-6 mb-6">
          <button 
            @click="navigateToBack()" 
            class="bg-blue-500 hover:bg-blue-600 text-white px-4 mb-4 py-2 rounded-md flex items-center"
          >
            <span class="mr-2">Back To Quiz List</span>
          </button>
          <div class="flex flex-col md:flex-row justify-between items-start md:items-center">
            <div>
              <h1 class="text-2xl font-bold text-gray-800">{{ usersByquiz.title }}</h1>
              <p class="text-gray-600 mt-1">{{ usersByquiz.description }}</p>
            </div>
            <div class="mt-4 md:mt-0">
              <span class="bg-green-100 text-green-800 text-sm font-medium px-3 py-1 rounded-full">
                {{ usersByquiz.is_active == 1 ? 'Active' : 'Inactive' }}
              </span>
              <span class="bg-blue-100 text-blue-800 text-sm font-medium ml-2 px-3 py-1 rounded-full">
                Node ID: {{ usersByquiz.node_id }}
              </span>
            </div>
          </div>
        </header>
  
        <!-- Quiz Details Section -->
        <div class="grid grid-cols-1 lg:grid-cols-3 gap-6 mb-6">
          <!-- Quiz Information -->
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Quiz Information</h2>
            <div class="grid grid-cols-2 gap-4">
              <div>
                <p class="text-sm font-medium text-gray-500">Entry Fee</p>
                <p class="text-gray-900">₹{{ usersByquiz.entry_fees }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Prize Money</p>
                <p class="text-gray-900">₹{{ usersByquiz.prize_money }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Questions</p>
                <p class="text-gray-900">{{ usersByquiz.totalQuestion }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Time Per Question</p>
                <p class="text-gray-900">{{ usersByquiz.quiz_timer }} seconds</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Participant Limit</p>
                <p class="text-gray-900">{{ usersByquiz.spot_limit }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Winners</p>
                <p class="text-gray-900">{{ usersByquiz.winners }}</p>
              </div>
            </div>
          </div>
  
          <!-- Quiz Timing -->
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Quiz Timing</h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm font-medium text-gray-500">Start Time</p>
                <p class="text-gray-900">{{ useHelperStore().formatDate(usersByquiz.start_time) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">End Time</p>
                <p class="text-gray-900">{{ useHelperStore().formatDate(usersByquiz.end_time) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Quiz Over At</p>
                <p class="text-gray-900">{{ useHelperStore().formatDate(usersByquiz.quiz_over_at) }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Duration</p>
                <p class="text-gray-900">{{ calculateQuizDuration(usersByquiz.totalQuestion * usersByquiz.quiz_timer) }}</p>
              </div>
            </div>
          </div>
  
          <!-- Quiz Statistics -->
          <div class="bg-white shadow rounded-lg p-6">
            <h2 class="text-lg font-semibold text-gray-800 mb-4">Quiz Statistics</h2>
            <div class="space-y-3">
              <div>
                <p class="text-sm font-medium text-gray-500">Total Participants</p>
                <p class="text-gray-900">{{ usersByquiz.user_responses.length }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Completed Attempts</p>
                <p class="text-gray-900">{{ completedAttempts }}</p>
              </div>
              <div>
                <p class="text-sm font-medium text-gray-500">Prize Distribution</p>
                <p class="text-gray-900">{{ usersByquiz.is_prize_distributed == 1 ? 'Completed' : 'Pending' }}</p>
              </div>
              <!-- <div>
                <p class="text-sm font-medium text-gray-500">Average Score</p>
                <p class="text-gray-900">{{ averageScore.toFixed(2) }} / {{ usersByquiz.totalQuestion }}</p>
              </div> -->
            </div>
          </div>
        </div>
  
        <!-- Quiz Questions -->
        <div class="bg-white shadow rounded-lg p-6 mb-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Quiz Questions</h2>
          <div v-for="(question, index) in usersByquiz.quizContents" :key="index" class="mb-6 p-4 border rounded-lg">
            <div class="flex justify-between items-start">
              <h3 class="text-lg font-medium">{{ index + 1 }}. {{ question.question }}</h3>
              <span class="bg-gray-100 text-gray-800 text-xs font-medium px-2 py-1 rounded">
                ID: {{ question.id }}
              </span>
            </div>
            <div class="mt-3 grid grid-cols-1 md:grid-cols-2 gap-2">
              <div v-for="option in question.options" :key="option.id" 
                   :class="['p-2 rounded border', option.id === question.correctAnswerId ? 'bg-green-50 border-green-200' : '']">
                <div class="flex items-center">
                  <span class="h-5 w-5 flex items-center justify-center rounded-full border mr-2"
                        :class="option.id === question.correctAnswerId ? 'bg-green-500 text-white border-green-500' : ''">
                    {{ option.id }}
                  </span>
                  <span>{{ option.option }}</span>
                  <span v-if="option.id === question.correctAnswerId" class="ml-2 text-xs text-green-600 font-medium">
                    (Correct Answer)
                  </span>
                </div>
              </div>
            </div>
          </div>
        </div>
  
        <!-- Participant Results -->
        <div class="bg-white shadow rounded-lg p-6">
          <h2 class="text-xl font-semibold text-gray-800 mb-4">Participant Results</h2>
          <div class="overflow-x-auto">
            <table class="min-w-full divide-y divide-gray-200">
              <thead class="bg-gray-50">
                <tr>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    User
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Status
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Score
                  </th>
                  <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Duration
                  </th>
                  <!-- <th scope="col" class="px-6 py-3 text-left text-xs font-medium text-gray-500 uppercase tracking-wider">
                    Actions
                  </th> -->
                </tr>
              </thead>
              <tbody class="bg-white divide-y divide-gray-200">
                <tr v-for="(response, index) in usersByquiz.user_responses" :key="index">
                  <td class="px-6 py-4 whitespace-nowrap">
                    <!-- <div class="flex items-center"> -->
                      <!-- <div class="flex-shrink-0 h-10 w-10">
                        <img class="h-10 w-10 rounded-full" :src="response.user.avatar" alt="">
                      </div> -->
                      <div>
                        <div class="text-sm font-medium text-gray-900">{{ response.user.name }}</div>
                        <div class="text-sm text-gray-500">{{ response.user.email }}</div>
                      </div>
                    <!-- </div> -->
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <span class="px-2 inline-flex text-xs leading-5 font-semibold rounded-full"
                          :class="{
                            'bg-green-100 text-green-800': response.status === 'completed',
                            'bg-yellow-100 text-yellow-800': response.status === 'joined'
                          }">
                      {{ response.status }}
                    </span>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap">
                    <div class="text-sm text-gray-900">
                      {{ response.score }} / {{ usersByquiz.totalQuestion }}
                    </div>
                    <div v-if="response.status === 'completed'" class="text-xs text-gray-500">
                      {{ calculatePercentage(response.score, usersByquiz.totalQuestion) }}%
                    </div>
                  </td>
                  <td class="px-6 py-4 whitespace-nowrap text-sm text-gray-500">
                    <div v-if="response.started_at > 0">
                      {{ calculateDuration(response.started_at, response.ended_at) }}
                    </div>
                    <div v-else>--</div>
                  </td>
                  <!-- <td class="px-6 py-4 whitespace-nowrap text-right text-sm font-medium">
                    <button @click="showUserResponses(response)" 
                            :disabled="response.status !== 'completed'"
                            class="text-indigo-600 hover:text-indigo-900 disabled:text-gray-400">
                      View Answers
                    </button>
                  </td> -->
                </tr>
              </tbody>
            </table>
          </div>
        </div>
  
        <!-- User Responses Modal -->
        <div v-if="selectedUser" class="fixed inset-0 bg-gray-600 bg-opacity-50 flex items-center justify-center z-50">
          <div class="bg-white rounded-lg shadow-xl max-w-4xl w-full max-h-screen overflow-y-auto">
            <div class="p-6 border-b">
              <div class="flex justify-between items-center">
                <h3 class="text-xl font-semibold text-gray-900">
                  {{ selectedUser.user.name }}'s Responses
                </h3>
                <button @click="selectedUser = null" class="text-gray-400 hover:text-gray-500">
                  <svg class="h-6 w-6" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                    <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M6 18L18 6M6 6l12 12" />
                  </svg>
                </button>
              </div>
            </div>
            <div class="p-6">
              <div class="mb-4">
                <span class="font-medium">Score:</span> {{ selectedUser.score }} / {{ usersByquiz.totalQuestion }}
                ({{ calculatePercentage(selectedUser.score, usersByquiz.totalQuestion) }}%)
              </div>
              <div class="mb-4">
                <span class="font-medium">Time Taken:</span> {{ calculateDuration(selectedUser.started_at, selectedUser.ended_at) }}
              </div>
              <div v-if="selectedUser.responseContents" class="space-y-4">
                <div v-for="(response, index) in selectedUser.responseContents" :key="index" 
                     class="p-4 border rounded-lg"
                     :class="{'bg-green-50': response.is_correct, 'bg-red-50': !response.is_correct}">
                  <div class="flex items-start justify-between">
                    <div>
                      <h4 class="font-medium">
                        Question {{ response.question_id }}: {{ getQuestionText(response.question_id) }}
                      </h4>
                      <p class="mt-2">
                        Selected Answer: {{ getOptionText(response.question_id, response.answer_id) }}
                      </p>
                      <p v-if="!response.is_correct" class="mt-1 text-red-600">
                        Correct Answer: {{ getCorrectAnswerText(response.question_id) }}
                      </p>
                    </div>
                    <span class="inline-flex items-center justify-center h-8 w-8 rounded-full"
                          :class="{'bg-green-100 text-green-800': response.is_correct, 'bg-red-100 text-red-800': !response.is_correct}">
                      <svg v-if="response.is_correct" class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd" />
                      </svg>
                      <svg v-else class="h-5 w-5" fill="currentColor" viewBox="0 0 20 20">
                        <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd" />
                      </svg>
                    </span>
                  </div>
                </div>
              </div>
              <div v-else class="text-center p-6 text-gray-500">
                No response data available
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, computed, onMounted } from 'vue';
  import { useAdminStore } from '@/stores/adminStore';
  import { storeToRefs } from 'pinia';
  import { useRoute, useRouter } from 'vue-router';
  import { useHelperStore } from '@/stores/helperStore';

  
  const adminStore = useAdminStore();
  const { usersByquiz } = storeToRefs(adminStore);
  const loading = ref(true);
  const error = ref(null);
  const route = useRoute();
  const router = useRouter();
  const selectedUser = ref(null);
  
  // Fetch quiz data on component mount
  // const nodeId = route.params.node_id;
  // console.log("node id",nodeId);
  // onMounted(async () => {
  //     await adminStore.showUsersByQuiz(route.params.node_id);
  // });
  
  // Computed properties
  const completedAttempts = computed(() => {
    return usersByquiz.value.user_responses?.filter(response => response.status === 'completed').length || 0;
  });
  
  const averageScore = computed(() => {
    if (!usersByquiz.value.user_responses || usersByquiz.value.user_responses.length === 0) return 0;
    
    const completedResponses = usersByquiz.value.user_responses.filter(response => response.status === 'completed');
    if (completedResponses.length === 0) return 0;
    
    const totalScore = completedResponses.reduce((sum, response) => sum + response.score, 0);
    return totalScore / completedResponses.length;
  });
  
  function calculateDuration(startTime, endTime) {
    if (!startTime || !endTime || startTime === 0 || endTime === 0) return '--';
    
    const durationInSeconds = endTime - startTime;
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    
    return `${minutes}m ${seconds}s`;
  }

  function calculateQuizDuration(durationInSeconds) {
    if (!durationInSeconds || durationInSeconds === 0) return '--';
    
    const minutes = Math.floor(durationInSeconds / 60);
    const seconds = durationInSeconds % 60;
    
    return `${minutes}m ${seconds}s`;
  }
  
  function calculatePercentage(score, total) {
    if (!total) return 0;
    return Math.round((score / total) * 100);
  }
  
  function showUserResponses(user) {
    if (user.status === 'completed') {
      selectedUser.value = user;
    }
  }
  
  function getQuestionText(questionId) {
    const question = usersByquiz.value.quizContents.find(q => q.id === questionId);
    return question ? question.question : 'Unknown question';
  }
  
  function getOptionText(questionId, optionId) {
    const question = usersByquiz.value.quizContents.find(q => q.id === questionId);
    if (!question) return 'Unknown option';
    
    const option = question.options.find(o => o.id === optionId);
    return option ? option.option : 'Unknown option';
  }
  
  function getCorrectAnswerText(questionId) {
    const question = usersByquiz.value.quizContents.find(q => q.id === questionId);
    if (!question) return 'Unknown';
    
    const correctOption = question.options.find(o => o.id === question.correctAnswerId);
    return correctOption ? correctOption.option : 'Unknown';
  }

  const navigateToBack = () => {
    router.back();
  }
  </script>