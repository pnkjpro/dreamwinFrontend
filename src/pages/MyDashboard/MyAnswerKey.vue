<template>
  <div class="min-h-screen bg-gradient-to-br from-blue-50 to-indigo-100 p-4">
    <div class="max-w-4xl mx-auto">
      <!-- Header -->
      <div class="text-center mb-8">
        <h1 class="text-4xl font-bold text-gray-800 mb-2">Quiz Results</h1>
        <p class="text-gray-600">Review your performance and correct answers</p>
      </div>

      <!-- Loading State -->
      <div v-if="quizStore.loading" class="flex justify-center items-center py-12">
        <div class="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600"></div>
        <span class="ml-3 text-gray-600">Loading your results...</span>
      </div>

      <!-- Error State -->
      <div v-else-if="results.length === 0" class="bg-red-50 border border-red-200 rounded-lg p-6 text-center">
        <div class="text-red-600 mb-2">
          <svg class="w-12 h-12 mx-auto mb-3" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M12 8v4m0 4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z"></path>
          </svg>
        </div>
        <h3 class="text-lg font-semibold text-red-800 mb-2">Result Not Found!</h3>
      </div>

      <!-- Results Content -->
      <div v-else-if="results">
        <!-- Questions Review -->
        <div class="space-y-6">
          <h2 class="text-2xl font-bold text-gray-800 mb-4">Question Review</h2>
          
          <div 
            v-for="(question, key) in results" 
            :key="key"
            class="bg-white rounded-xl shadow-lg overflow-hidden"
          >
            <!-- Question Header -->
            <div class="p-6 border-b border-gray-100">
              <div class="flex items-start justify-between mb-3">
                <h3 class="text-lg font-semibold text-gray-800 flex-1">
                  Question {{ key }}
                </h3>
                <div class="ml-4">
                  <span 
                    v-if="question.is_correct" 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Correct
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    Incorrect
                  </span>
                </div>
              </div>
              
              <p class="text-gray-700 leading-relaxed">{{ question.question }}</p>
            </div>

            <!-- Options -->
            <div class="p-6">
              <div class="grid gap-3">
                <div 
                  v-for="option in question.options" 
                  :key="option.id"
                  class="p-4 rounded-lg border-2 transition-all"
                  :class="getOptionClasses(option, question)"
                >
                  <div class="flex items-center justify-between">
                    <span class="text-gray-800">{{ option.option }}</span>
                    <div class="flex items-center space-x-2">
                      <!-- Correct Answer Badge -->
                      <span 
                        v-if="option.id === question.correct_answer_id"
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        Correct
                      </span>
                      
                      <!-- Your Answer Badge -->
                      <span 
                        v-if="option.id === question.user_answer_id"
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                        :class="question.is_correct ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'"
                      >
                        Your Answer
                      </span>
                      
                      <!-- No Answer Badge -->
                      <span 
                        v-if="!question.user_answer_id && option.id === question.correct_answer_id"
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-gray-100 text-gray-600"
                      >
                        Not Answered
                      </span>
                    </div>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useQuizStore } from '@/stores/quizStore'
import { storeToRefs } from 'pinia'
import { ref, computed, onMounted, onUnmounted } from 'vue'
import { useToast } from 'vue-toastification'

// Reactive data
const error = ref(null)
const toast = useToast();
const quizStore = useQuizStore();
const { results } = storeToRefs(quizStore);

// Computed properties
const totalQuestions = computed(() => {
  return results.value ? Object.keys(results.value).length : 0
})

const correctAnswers = computed(() => {
  if (!results.value) return 0
  return Object.values(results.value).filter(q => q.is_correct).length
})

const scorePercentage = computed(() => {
  if (totalQuestions.value === 0) return 0
  return (correctAnswers.value / totalQuestions.value) * 100
})

const scoreColor = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 80) return 'text-green-600'
  if (percentage >= 60) return 'text-yellow-600'
  return 'text-red-600'
})

const progressBarColor = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 80) return 'bg-green-500'
  if (percentage >= 60) return 'bg-yellow-500'
  return 'bg-red-500'
})

const performanceMessage = computed(() => {
  const percentage = scorePercentage.value
  if (percentage >= 90) return 'Excellent work! Outstanding performance!'
  if (percentage >= 80) return 'Great job! You did very well!'
  if (percentage >= 70) return 'Good work! Room for improvement.'
  if (percentage >= 60) return 'Fair performance. Keep practicing!'
  return 'Keep studying and try again!'
})

// // Methods
// const fetchResults = async () => {
//   const response = await quizStore.showAnswerKey();
//   if(!response.success){
//     error.value = true;
//     toast.error("Failed to load Answer Key!");
//   }
// }

const getOptionClasses = (option, question) => {
  const isCorrect = option.id === question.correct_answer_id
  const isUserAnswer = option.id === question.user_answer_id
  const wasAnsweredCorrectly = question.is_correct && isUserAnswer
  
  if (isCorrect && isUserAnswer) {
    return 'border-green-300 bg-green-50'
  } else if (isCorrect) {
    return 'border-green-300 bg-green-50'
  } else if (isUserAnswer && !question.is_correct) {
    return 'border-red-300 bg-red-50'
  } else {
    return 'border-gray-200 bg-gray-50'
  }
}

// Lifecycle
// onMounted(() => {
//   fetchResults()
// })

onUnmounted(() => {
  results.value = [];
})
</script>