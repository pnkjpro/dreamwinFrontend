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
                <div class="ml-4 flex items-center space-x-2">
                  <!-- Lifeline Badge -->
                  <span 
                    v-if="question.lifeline_used" 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-purple-100 text-purple-800"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z"/>
                    </svg>
                    {{ question.lifeline_type }}
                  </span>
                  
                  <!-- Correct/Incorrect Badge -->
                  <span 
                    v-if="question.is_correct === true" 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-green-100 text-green-800"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                    </svg>
                    Correct
                  </span>
                  <span 
                    v-else-if="question.is_correct === false" 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-red-100 text-red-800"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M4.293 4.293a1 1 0 011.414 0L10 8.586l4.293-4.293a1 1 0 111.414 1.414L11.414 10l4.293 4.293a1 1 0 01-1.414 1.414L10 11.414l-4.293 4.293a1 1 0 01-1.414-1.414L8.586 10 4.293 5.707a1 1 0 010-1.414z" clip-rule="evenodd"></path>
                    </svg>
                    Incorrect
                  </span>
                  <span 
                    v-else 
                    class="inline-flex items-center px-3 py-1 rounded-full text-sm font-medium bg-gray-100 text-gray-600"
                  >
                    <svg class="w-4 h-4 mr-1" fill="currentColor" viewBox="0 0 20 20">
                      <path fill-rule="evenodd" d="M10 18a8 8 0 100-16 8 8 0 000 16zM8.707 7.293a1 1 0 00-1.414 1.414L8.586 10l-1.293 1.293a1 1 0 101.414 1.414L10 11.414l1.293 1.293a1 1 0 001.414-1.414L11.414 10l1.293-1.293a1 1 0 00-1.414-1.414L10 8.586 8.707 7.293z" clip-rule="evenodd"></path>
                    </svg>
                    Skipped
                  </span>
                </div>
              </div>
              
              <p class="text-gray-700 leading-relaxed">{{ question.question }}</p>
            </div>

            <!-- Options -->
            <div class="p-6">
              <!-- Skip Question Message -->
              <div v-if="question.lifeline_type === 'Skip Question'" class="mb-4 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-5 h-5 text-yellow-600 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M8.257 3.099c.765-1.36 2.722-1.36 3.486 0l5.58 9.92c.75 1.334-.213 2.98-1.742 2.98H4.42c-1.53 0-2.493-1.646-1.743-2.98l5.58-9.92zM11 13a1 1 0 11-2 0 1 1 0 012 0zm-1-8a1 1 0 00-1 1v3a1 1 0 002 0V6a1 1 0 00-1-1z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-yellow-800 font-medium">This question was skipped using a lifeline</span>
                </div>
              </div>

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
                        v-if="option.id === question.correct_answer_id && question.correct_answer_id"
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium bg-green-100 text-green-800"
                      >
                        <svg class="w-3 h-3 mr-1" fill="currentColor" viewBox="0 0 20 20">
                          <path fill-rule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clip-rule="evenodd"></path>
                        </svg>
                        Correct
                      </span>
                      
                      <!-- Your Answer Badge -->
                      <span 
                        v-if="option.id === question.user_answer_id && question.user_answer_id"
                        class="inline-flex items-center px-2 py-1 rounded text-xs font-medium"
                        :class="question.is_correct ? 'bg-blue-100 text-blue-800' : 'bg-red-100 text-red-800'"
                      >
                        Your Answer
                      </span>
                    </div>
                  </div>
                </div>
              </div>

              <!-- No Answer Message for non-skipped questions -->
              <div v-if="!question.user_answer_id && question.lifeline_type !== 'Skip Question'" class="mt-4 p-3 bg-gray-50 border border-gray-200 rounded-lg">
                <div class="flex items-center">
                  <svg class="w-4 h-4 text-gray-500 mr-2" fill="currentColor" viewBox="0 0 20 20">
                    <path fill-rule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-8-3a1 1 0 00-.867.5 1 1 0 11-1.731-1A3 3 0 0113 8a3.001 3.001 0 01-2 2.83V11a1 1 0 11-2 0v-1a1 1 0 011-1 1 1 0 100-2zm0 8a1 1 0 100-2 1 1 0 000 2z" clip-rule="evenodd"/>
                  </svg>
                  <span class="text-gray-600 text-sm">No answer was provided for this question</span>
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
  return Object.values(results.value).filter(q => q.is_correct === true).length
})

const skippedQuestions = computed(() => {
  if (!results.value) return 0
  return Object.values(results.value).filter(q => q.lifeline_type === 'Skip Question').length
})

const lifelinesUsed = computed(() => {
  if (!results.value) return 0
  return Object.values(results.value).filter(q => q.lifeline_used).length
})

const scorePercentage = computed(() => {
  const answeredQuestions = totalQuestions.value - skippedQuestions.value
  if (answeredQuestions === 0) return 0
  return (correctAnswers.value / answeredQuestions) * 100
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

// Methods
const getOptionClasses = (option, question) => {
  const isCorrect = option.id === question.correct_answer_id
  const isUserAnswer = option.id === question.user_answer_id
  
  // For skipped questions, highlight only correct answer
  if (question.lifeline_type === 'Skip Question') {
    if (isCorrect) {
      return 'border-green-300 bg-green-50'
    }
    return 'border-gray-200 bg-gray-50'
  }
  
  // For answered questions
  if (isCorrect && isUserAnswer) {
    return 'border-green-300 bg-green-50'
  } else if (isCorrect) {
    return 'border-green-300 bg-green-50'
  } else if (isUserAnswer && question.is_correct === false) {
    return 'border-red-300 bg-red-50'
  } else {
    return 'border-gray-200 bg-gray-50'
  }
}

// Lifecycle
onUnmounted(() => {
  results.value = [];
})
</script>