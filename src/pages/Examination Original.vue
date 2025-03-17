<template>
    <div v-if="!showDialog" class="container mx-auto my-12">
      <div class="flex flex-wrap -mx-4">
        <!-- Main Question Section -->
        <div class="w-full md:w-2/3 px-4">
          <div
            class="bg-gradient-to-r from-blue-500 to-indigo-600 text-white p-4 rounded-lg shadow-lg mb-6"
          >
            <div class="text-right text-lg font-semibold">
              <span
                ><i
                  class="fas fa-hourglass-half fa-lg"
                  style="color: #74c0fc"
                ></i>
                Time Left: {{ formatTime(timeLeft) }}</span
              >
            </div>
          </div>
  
          <!-- Question Card -->
          <div
            v-for="question in questions"
            :key="question.id"
            class="bg-white rounded-lg p-6 shadow-lg mb-8 border border-gray-200 relative"
            v-show="quesNo == question.id"
          >
            <h3 class="text-xl font-bold mb-4 text-gray-800">
              {{ question.id + ". " + question.question }}
            </h3>
            <div
              v-for="option in question.options"
              :key="option.id"
              class="flex items-center mb-3"
            >
              <input
                type="radio"
                @click="selectedAnswered(question.id, option.id)"
                :name="question.id"
                :value="option.id"
                v-model="userAnswered[question.id]"
                class="w-4 h-4 text-blue-600 border-gray-300 focus:ring-blue-500"
              />
              <label class="ml-3 text-md text-gray-700">
                {{ option.text }}
              </label>
            </div>
  
            <!-- Navigation Buttons -->
            <div class="flex justify-between bottom-2 left-0 right-0">
              <button
                v-show="quesNo != 1"
                @click="quesNo--"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded transition ease-in-out"
              >
                <i
                  class="fas fa-chevron-circle-left fa-lg"
                  style="color: #110891"
                ></i>
                Back
              </button>
              <button
                @click="clearAnswer(question.id)"
                class="bg-red-500 hover:bg-red-600 text-white font-semibold py-2 px-4 rounded shadow transition transform hover:scale-105"
              >
                <i class="fas fa-eraser fa-lg" style="color: #fff"></i> Clear
              </button>
              <button
                @click="markReview(question.id)"
                class="bg-yellow-400 hover:bg-yellow-500 text-gray-800 font-semibold py-2 px-4 rounded shadow transition transform hover:scale-105"
              >
                <i class="fas fa-file-signature fa-lg" style="color: #760a94"></i>
                Mark Review
              </button>
              <button
                v-show="quesNo != questions.length"
                @click="quesNo++"
                class="bg-gray-100 hover:bg-gray-200 text-gray-700 font-semibold py-2 px-4 rounded transition ease-in-out"
              >
                Next
                <i
                  class="fas fa-chevron-circle-right fa-lg"
                  style="color: #110891"
                ></i>
              </button>
              <button
                @click="submitAnswer()"
                class="bg-green-500 hover:bg-green-600 text-white font-semibold py-2 px-4 rounded shadow transition transform hover:scale-105"
              >
                <i class="fas fa-check-circle fa-lg" style="color: #ffffff"></i>
                Submit
              </button>
            </div>
          </div>
        </div>
  
        <!-- Sidebar -->
        <div class="w-full md:w-1/3 px-4">
          <div
            class="bg-gradient-to-r from-yellow-200 via-yellow-300 to-yellow-100 p-6 rounded-lg shadow-lg mb-6"
          >
            <h3 class="font-bold text-lg mb-4 text-gray-800">👤 Pankaj Pandey</h3>
            <div class="space-y-2">
              <div class="flex items-center">
                <span class="w-4 h-4 bg-blue-500 rounded-full mr-3"></span>
                <span class="text-sm text-gray-700">Visited Question</span>
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 bg-gray-300 rounded-full mr-3"></span>
                <span class="text-sm text-gray-700">Unvisited Question</span>
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 bg-orange-500 rounded-full mr-3"></span>
                <span class="text-sm text-gray-700"
                  >Marked for Review (Unanswered)</span
                >
              </div>
              <div class="flex items-center">
                <span class="w-4 h-4 bg-pink-600 rounded-full mr-3"></span>
                <span class="text-sm text-gray-700"
                  >Marked for Review (Answered)</span
                >
              </div>
            </div>
          </div>
          <div class="grid grid-cols-5 gap-2">
            <button
              v-for="question in questions"
              :key="question.id"
              :class="[
                'text-sm font-semibold py-2 px-3 rounded-full shadow-md transition hover:scale-105',
                isVisited(question.id),
              ]"
              @click="quesNo = question.id"
            >
              {{ question.id }}
            </button>
          </div>
        </div>
      </div>
    </div>
  
    <!-- Dialog -->
    <div
      v-if="showDialog"
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
  import questions from "@/Examsheet/questionData.json";
  import { ref, watch, onBeforeUnmount, onMounted } from "vue";
  
  const quesNo = ref(1);
  const visitedQues = ref([1]);
  let fullname = ref("");
  const userAnswered = ref({});
  let unAnsweredQues = ref([]);
  let score = ref(0);
  let showDialog = ref(false);
  const markAsReview = ref([]);
  
  const timeLeft = ref(100);
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
    showDialog.value = false;
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
        return "bg-pink-600 hover:bg-pink-700 text-white"; // Marked for review and answered
      }
      if (markAsReview.value.includes(QuesId)) {
        return "bg-orange-500 hover:bg-orange-600 text-white"; // Marked for review but unanswered
      }
      return "bg-blue-500 hover:bg-blue-600 text-white"; // Visited question
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
    showDialog.value = true;
  };
  </script>
  
  <style scoped>
  ::v-deep .v-card {
    border-radius: 5px;
  }
  
  .timer {
    font-size: 24px;
    color: white;
    border-radius: 2px;
  }
  ::v-deep .v-card--variant-elevated {
    box-shadow: none !important;
  }
  </style>
  