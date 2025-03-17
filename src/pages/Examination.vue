<template>
  <div v-show="examStep === 'examOn'" class="h-screen overflow-hidden">
    <!-- Main Container -->
    <div class="flex h-screen flex-col">
      <!-- Top Navigation Bar -->
      <nav class="z-50 border-b border-gray-200 bg-white">
        <div class="w-full px-4 sm:px-6">
          <div class="flex h-14 justify-between">
            <div class="flex items-center">
              <h1 class="text-xl font-bold text-gray-900">{{ examsheet.examName }}</h1>
            </div>
            <div class="flex items-center space-x-4">
              <span class="text-sm text-gray-500">{{ examsheet.examDate }} | Shift: {{ examsheet.examTime }}</span>
              <button class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2">
                <svg class="mr-2 h-4 w-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 8V4m0 0h4M4 4l5 5m11-1V4m0 0h-4m4 0l-5 5M4 16v4m0 0h4m-4 0l5-5m11 5l-5-5m5 5v-4m0 4h-4" />
                </svg>
                Switch Full Screen
              </button>
            </div>
          </div>
        </div>
      </nav>

      <!-- Main Content -->
      <div class="flex flex-1 overflow-hidden">
        <!-- Left Section: Question Area -->
        <div
        v-for="question in questions"
        :key="question.id" 
        v-show="quesNo == question.id"
        class="flex min-h-0 flex-1 flex-col">
          <div class="flex h-full flex-col bg-white">
            <!-- Question Header -->
            <div class="flex-shrink-0 border-b border-gray-200 bg-gray-50 p-4">
              <div class="flex flex-wrap items-center justify-between gap-4">
                <div class="flex items-center space-x-4">
                  <span class="text-lg font-semibold text-gray-900">Question {{  question.id }}</span>
                  <!-- <select class="block w-32 rounded-md border-gray-300 shadow-sm focus:border-blue-500 focus:ring-blue-500 sm:text-sm">
                    <option value="math">Math</option>
                    <option value="science">Science</option>
                    <option value="english">English</option>
                  </select> -->
                </div>
                <div class="flex items-center space-x-6">
                  <div class="text-sm">
                    <span class="text-gray-500">Difficulty:</span>
                    <span class="ml-1 font-medium text-red-600 capitalize">{{ question.difficulty }}</span>
                  </div>
                  <div class="text-sm">
                    <span class="text-gray-500">Marks:</span>
                    <span class="ml-1 font-medium text-green-600">+3</span>
                    <span class="ml-1 font-medium text-red-600">-1</span>
                  </div>
                  <div class="text-sm">
                    <span class="text-gray-500">Time Remaining:</span>
                    <span class="ml-1 font-medium text-blue-600" id="timer">{{ formatTime(timeLeft) }}</span>
                  </div>
                </div>
              </div>
            </div>

            <!-- Question Content - Flex Grow -->
            <div 
            class="flex-1 overflow-y-auto p-4">
              <div class="flex h-full flex-col">
                <div class="prose max-w-none">
                  <p class="text-lg text-gray-900">{{ question.id + ". " + question.question }}</p>
                </div>

                <!-- Options -->
                <div 
                v-for="option in question.options"
                :key="option.id"
                class="mt-4 flex-1 space-y-4">
                  <label class="flex cursor-pointer items-start p-4 hover:bg-gray-50">
                    <div class="flex h-5 items-center">
                      <input type="radio" 
                      @click="selectedAnswered(question.id, option.id)"
                      :name="question.id"
                      :value="option.id"
                      v-model="userAnswered[question.id]"
                      name="answer" class="h-4 w-4 border-gray-300 text-blue-600 focus:ring-blue-500" />
                    </div>
                    <div class="ml-3">
                      <span class="text-base text-gray-700">{{ option.text }}</span>
                    </div>
                  </label>
                </div>
              </div>
            </div>

            <!-- Action Buttons - Fixed at Bottom -->
            <div class="mt-auto border-t border-gray-200 bg-gray-50 px-4 py-3">
              <div class="flex flex-wrap gap-4">
                <button class="inline-flex items-center rounded-md border border-transparent bg-purple-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-purple-700 focus:outline-none focus:ring-2 focus:ring-purple-500 focus:ring-offset-2"
                @click="markReview(question.id)"
                >Mark for Review & Next</button>
                <button class="inline-flex items-center rounded-md border border-gray-300 bg-white px-4 py-2 text-sm font-medium text-gray-700 shadow-sm hover:bg-gray-50 focus:outline-none focus:ring-2 focus:ring-gray-500 focus:ring-offset-2"
                @click="clearAnswer(question.id)"
                >Clear Response</button>
                <div class="flex-1"></div>
                <button class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                v-show="quesNo != 1"
                @click="quesNo--"
                >Previous</button>
                <button class="inline-flex items-center rounded-md border border-transparent bg-blue-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-blue-700 focus:outline-none focus:ring-2 focus:ring-blue-500 focus:ring-offset-2"
                v-show="quesNo != questions.length"
                @click="quesNo++"
                >Next</button>
              </div>
            </div>
          </div>
        </div>

        <!-- Right Sidebar -->
        <div class="flex w-80 flex-col border-l border-gray-200 bg-white">
          <!-- Profile Section -->
          <div class="border-b border-gray-200 p-4">
            <div class="flex items-center space-x-3">
              <div class="flex-shrink-0">
                <div class="flex h-10 w-10 items-center justify-center rounded-full bg-gradient-to-r from-blue-500 to-blue-600">
                  <span class="text-sm font-medium text-white">{{  candidateBasicDetails.candidateName.split("")[0] }}</span>
                </div>
              </div>
              <div>
                <h2 class="text-base font-medium text-gray-900">{{ candidateBasicDetails.candidateName}}</h2>
                <p class="text-sm text-gray-500">Candidate</p>
              </div>
            </div>
          </div>

          <!-- Question Status Legend -->
          <div class="border-b border-gray-200 p-4">
            <h3 class="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Question Status</h3>
            <div class="space-y-3">
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-3 w-3 rounded-full bg-green-500"></div>
                  <span class="ml-2 text-sm text-gray-600">Answered</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{Object.keys(userAnswered).length || 0}}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-3 w-3 rounded-full bg-orange-500"></div>
                  <span class="ml-2 text-sm text-gray-600">Marked & Answered</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ markAnsweredCount }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-3 w-3 rounded-full bg-gray-300"></div>
                  <span class="ml-2 text-sm text-gray-600">Not Visited</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ unVisitedCount }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-3 w-3 rounded-full bg-pink-600"></div>
                  <span class="ml-2 text-sm text-gray-600">Marked & Unanswered</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ markUnansweredCount }}</span>
              </div>
              <div class="flex items-center justify-between">
                <div class="flex items-center">
                  <div class="h-3 w-3 rounded-full bg-red-500"></div>
                  <span class="ml-2 text-sm text-gray-600">Not Answered</span>
                </div>
                <span class="text-sm font-medium text-gray-900">{{ unAnsweredCount }}</span>
              </div>
            </div>
          </div>

          <!-- Question Navigation -->
          <div class="flex-1 overflow-y-auto p-4">
            <h3 class="mb-4 text-xs font-semibold uppercase tracking-wider text-gray-500">Question Navigation</h3>
            <div class="grid grid-cols-5 gap-2">
              <button 
              :class="['inline-flex h-10 w-10 items-center justify-center rounded-full bg-green-100 text-sm font-medium text-green-700 hover:bg-green-200 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2',
                isVisited(question.id),
              ]"
              v-for="question in questions"
              :key="question.id"
              @click="quesNo = question.id"
              >{{ question.id }}</button>
            </div>
          </div>

          <!-- Submit Button -->
          <div class="border-t border-gray-200 p-4">
            <button class="flex w-full justify-center rounded-md border border-transparent bg-green-600 px-4 py-2 text-sm font-medium text-white shadow-sm hover:bg-green-700 focus:outline-none focus:ring-2 focus:ring-green-500 focus:ring-offset-2"
            @click="submitAnswer()"
            >Submit Test</button>
          </div>
        </div>
      </div>
    </div>
  </div>

  <!-- Dialog -->
  <div
      v-show="examStep === 'scoreOn'"
      class="fixed inset-0 flex items-center justify-center bg-black bg-opacity-50"
    >
      <div class="bg-white w-96 p-8 rounded-lg shadow-lg">
        <h2 class="text-2xl font-extrabold text-center text-blue-600 mb-4">
          🎉 Your Score
        </h2>
        <p class="text-lg text-gray-800 mb-2 font-semibold">
          Total Questions: {{ questions.length }}
        </p>
        <p class="text-lg text-gray-800 mb-2 font-semibold">
          Answered: {{ Object.keys(userAnswered).length }}
        </p>
        <p class="text-lg text-gray-800 mb-2 font-semibold">
          Unanswered: {{ unAnsweredQues.length }}
        </p>
        <p class="text-lg font-bold flex items-center mb-4">
          <span class="material-icons text-green-600 mr-2">verified</span>Score:
          {{ score }}
        </p>
        <button
          @click="closeForm"
          class="bg-blue-600 hover:bg-blue-700 text-white font-bold py-2 px-4 rounded-full w-full transition transform hover:scale-105"
        >
          Close
        </button>
      </div>
    </div>
</template>

<script setup>
  import examsheet from "@/Examsheet/questionData.json";
  import { ref, watch, computed, onBeforeUnmount, onMounted } from "vue";

  const questions = examsheet.questions;
  
  const quesNo = ref(1);
  const visitedQues = ref([1]);
  const userAnswered = ref({});
  let unAnsweredQues = ref([]);
  const markAsReview = ref([]);

  const markAnsweredCount = computed(
    () => visitedQues.value
    .filter(QuesId => markAsReview.value.includes(QuesId) && userAnswered.value[QuesId]).length);

  const markUnansweredCount = computed(
    () => visitedQues.value
    .filter(QuesId => markAsReview.value.includes(QuesId) && !userAnswered.value[QuesId]).length);

  const unAnsweredCount = computed(
    () => visitedQues.value
    .filter(QuesId => !userAnswered.value[QuesId]).length);

  const unVisitedCount = computed(() =>
    questions.filter(Ques =>!visitedQues.value.includes(Ques.id)).length);



  let score = ref(0);
  const examStep = ref("examOn");
  // step 1: instructionOn
  // step 2: examOn
  // step 3: scoreOn


  let candidateBasicDetails = ref({
    candidateName: "Pankaj Pandey",
    candidateRollNo: "CGL-12345",
  });
  const examBasicDetails = {
    examName: "SSC CGL Tier II: Mega Live Test",
    examDuration: 100,
    examType: "Online",
    examDate: "24th November, 2024",
    examTime: "10:00 AM",
    totalQuestions: 5,
  };
  
  const timeLeft = ref(100); //in seconds
  let timer = null;
  
  onMounted(() => {
    startTimer();
  });
  
  onBeforeUnmount(() => {
    clearInterval(timer);
  });
  
  const startTimer = () => {
    timer = setInterval(() => {
      if (timeLeft.value > 0) {
        timeLeft.value--;
      } else {
        clearInterval(timer);
        submitAnswer();
      }
    }, 1000);
  };
  
  const clearAnswer = (quesId) => {
    delete userAnswered.value[quesId];
  };
  
  // Function to format time in minutes and seconds
  const formatTime = (seconds) => {
    const minutes = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${minutes}:${secs < 10 ? "0" : ""}${secs}`;
  };
  // =============== Watches for the Question change and storing it into visitedQues =============
  watch(quesNo, (newVal) => {
    console.log(newVal);
    if (!visitedQues.value.includes(newVal)) {
      visitedQues.value.push(newVal);
    }
  });
  
  // =============== Close and reseting the Exam =============
  const closeForm = () => {
    examStep.value = "examOn";
    quesNo.value = 1;
    userAnswered.value = {};
    unAnsweredQues.value = [];
    score.value = 0;
    visitedQues.value = [1];
    timeLeft.value = 100;
    startTimer();
  };
  
  // =============== Selected Answered =============
  const selectedAnswered = (quesId, optionId) => {
    userAnswered.value[quesId] = optionId;
  };
  
  // =============== Mark as Review =============
  const markReview = (QuesId) => {
    if (!markAsReview.value.includes(QuesId)) {
      markAsReview.value.push(QuesId);
    }
    console.log("marked as review", markAsReview.value);
    if (quesNo.value < 5) {
      quesNo.value += 1;
    } else {
      return;
    }
  };
  
  // =============== If user visited the question No. ===========
  const isVisited = (QuesId) => {
    if (visitedQues.value.includes(QuesId)) {
      if (markAsReview.value.includes(QuesId) && userAnswered.value[QuesId]) {
        return "bg-orange-600 hover:bg-orange-700 text-white"; // Marked & answered
      }
      if (markAsReview.value.includes(QuesId)) {
        return "bg-pink-600 hover:bg-pink-700 text-white"; // Marked & unanswered
      }
      if (userAnswered.value[QuesId]) {
        return "bg-green-500 hover:bg-green-600 text-white"; // Answered question
      }
      if (!userAnswered.value[QuesId]) {
        return "bg-red-500 hover:bg-red-600 text-white"; // Unanswered question
      }
    }
    return "bg-gray-300 hover:bg-gray-400 text-gray-800"; // Unvisited question
  };
  
  // =============== Submit Answer and Calculating the score =============
  const submitAnswer = () => {
    for (let question of questions) {
      if (userAnswered.value[question.id] == question.correctAnswerId) {
        score.value += 1;
      }
  
      if (!userAnswered.value[question.id]) {
        unAnsweredQues.value.push(question.id);
        console.log("Unanswered Questions: ", unAnsweredQues.value);
      }
    }
    examStep.value = "scoreOn";
  };
  </script>