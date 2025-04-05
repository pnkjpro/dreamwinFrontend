<template>
  <div class="quiz-form-container">
    <h2 class="form-title">{{ step2 ? 'Create Quiz Questions' : 'Create Quiz' }}</h2>
    
    <!-- =========================== Quiz Information ================================ -->
    <form v-if="!step2" class="quiz-form" @submit.prevent="proceed">
      <div class="form-group">
        <label for="category">Select Category</label>
        <select
          id="category"
          v-model="quizInfo.category_id"
          class="form-control"
          required
        >
          <option v-for="category in categories" :key="category.id" :value="category.id">
            {{ category.name }}
          </option>
        </select>
      </div>
      
      <div class="form-group">
        <label for="title">Title</label>
        <input
          type="text"
          id="title"
          v-model="quizInfo.title"
          placeholder="Enter Quiz Title"
          class="form-control"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="description">Description</label>
        <textarea
          id="description"
          v-model="quizInfo.description"
          placeholder="Enter Quiz Description"
          class="form-control"
          rows="4"
          required
        ></textarea>
      </div>
      
      <div class="form-group">
        <label for="spotLimit">Spot Limit</label>
        <input
          type="number"
          id="spotLimit"
          v-model.number="quizInfo.spot_limit"
          placeholder="Enter Spot Limit"
          class="form-control"
          min="1"
          required
        />
      </div>
      
      <div class="form-group">
        <label for="entryFees">Entry Fees</label>
        <div class="input-with-prefix">
          <span class="input-prefix">$</span>
          <input
            type="number"
            id="entryFees"
            v-model.number="quizInfo.entry_fees"
            placeholder="Input Entry Fees"
            class="form-control"
            min="0"
            required
          />
        </div>
      </div>
      
      <div class="form-group">
        <label for="prizeMoney">Prize Money</label>
        <div class="input-with-prefix">
          <span class="input-prefix">$</span>
          <input
            type="number"
            id="prizeMoney"
            v-model.number="quizInfo.prize_money"
            placeholder="Input Prize Money"
            class="form-control"
            min="0"
            required
          />
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
          type="submit"
          class="btn-save"
        >
          Proceed to Create Questions
        </button>
      </div>
    </form>

    <!-- ===================== Question Form ===================== -->
    <form v-if="step2" class="quiz-form" @submit.prevent="addQuestion">
      <div class="question-section">
        <h3 class="section-title">Question {{ QuestionId }}</h3>
        
        <div class="form-group">
          <label for="question">Question</label>
          <input
            type="text"
            id="question"
            v-model="quizForm.question"
            placeholder="Enter your question"
            class="form-control"
            required
          />
        </div>

        <div class="form-group">
          <label>Options</label>
          <div class="options-grid">
            <div v-for="(optionItem, index) in quizForm.options" :key="`option-${index}`" class="option-item">
              <label :for="`option${index + 1}`">Option {{ index + 1 }}</label>
              <input
                :id="`option${index + 1}`"
                type="text"
                v-model="optionItem.option"
                :placeholder="`Option ${index + 1}`"
                class="form-control"
                required
              />
            </div>
          </div>
        </div>

        <div class="form-group">
          <label for="correctAnswer">Correct Answer</label>
          <select
            id="correctAnswer"
            v-model="quizForm.correctAnswerId"
            class="form-control"
            required
          >
            <option value="">Select correct answer</option>
            <option v-for="(optionItem, index) in quizForm.options" 
                   :key="`answer-${index}`" 
                   :value="optionItem.id"
                   :disabled="!optionItem.option">
              {{ optionItem.option || `Option ${index + 1}` }}
            </option>
          </select>
        </div>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button type="button" @click="goBack" class="btn-cancel">
          Back to Quiz Info
        </button>
        <button type="submit" class="btn-save">
          Add Question
        </button>
        <button type="button" @click="createQuiz" class="btn-primary" :disabled="quiz.length === 0">
          Finish & Create Quiz
        </button>
      </div>
      
      <div v-if="quiz.length > 0" class="questions-summary">
        <h3 class="summary-title">Questions Added ({{ quiz.length }})</h3>
        <div v-for="(question, index) in quiz" :key="`summary-${index}`" class="question-summary-item">
          <div class="question-summary-number">{{ index + 1 }}</div>
          <div class="question-summary-text">{{ question.question }}</div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";

let QuestionId = ref(1);
let quiz = ref([]);
const step2 = ref(false);

const initialQuizInfo = {
  category_id: null,
  title: "",
  description: "",
  banner_image: null,
  quizContents: {},
  spot_limit: 100,
  entry_fees: 0,
  prize_money: 0
};

const initialQuizForm = {
  id: 1,
  question: "",
  options: [
    { id: 1, option: "" },
    { id: 2, option: "" },
    { id: 3, option: "" },
    { id: 4, option: "" },
  ],
  correctAnswerId: "",
};

const quizInfo = ref(JSON.parse(JSON.stringify(initialQuizInfo)));
const quizForm = ref(JSON.parse(JSON.stringify(initialQuizForm)));

const categories = [
  { id: 1, name: "Sports" },
  { id: 2, name: "Current Affairs" },
  { id: 3, name: "History" },
  { id: 4, name: "Politics" }
];

const proceed = () => {
  step2.value = true;
};

const goBack = () => {
  step2.value = false;
};

const addQuestion = () => {
  // Save current question
  quiz.value.push({...quizForm.value, id: QuestionId.value});
  
  // Reset form for next question
  QuestionId.value++;
  quizForm.value = JSON.parse(JSON.stringify(initialQuizForm));
  quizForm.value.id = QuestionId.value;
};

const createQuiz = () => {
  if (quiz.value.length === 0) {
    // No questions added yet
    return;
  }
  
  const finalQuizData = {
    ...quizInfo.value,
    quizContents: quiz.value
  };
  console.log("finalQuizData: ",finalQuizData);
  // Submit to API
  axios.post(`http://dreamwin.local:8000/api/quiz/create`, finalQuizData)
    .then(response => {
      console.log("Quiz Created:", response.data);
      // Reset everything after successful creation
      quiz.value = [];
      QuestionId.value = 1;
      quizInfo.value = JSON.parse(JSON.stringify(initialQuizInfo));
      quizForm.value = JSON.parse(JSON.stringify(initialQuizForm));
      step2.value = false;
      // Optionally add success notification here
    })
    .catch(error => {
      console.error("Error creating quiz:", error.response?.data);
      // Optionally add error notification here
    });
};
</script>

<style scoped>
.quiz-form-container {
  max-width: 800px;
  margin: 0 auto;
  padding: 24px;
  background-color: #fff;
  border-radius: 8px;
  box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
}

.form-title {
  margin-bottom: 24px;
  color: #333;
  font-size: 1.5rem;
}

.quiz-form {
  display: flex;
  flex-direction: column;
  gap: 20px;
}

.form-group {
  margin-bottom: 16px;
}

.form-group label {
  display: block;
  margin-bottom: 8px;
  font-weight: 500;
  color: #555;
}

.form-control {
  width: 100%;
  padding: 10px 12px;
  border: 1px solid #ddd;
  border-radius: 4px;
  font-size: 14px;
  transition: border-color 0.2s;
}

.form-control:focus {
  border-color: #4a90e2;
  outline: none;
}

.input-with-prefix {
  display: flex;
  align-items: center;
  width: 100%;
}

.input-prefix {
  display: flex;
  align-items: center;
  justify-content: center;
  padding: 0 12px;
  background-color: #f5f5f5;
  border: 1px solid #ddd;
  border-right: none;
  border-radius: 4px 0 0 4px;
  height: 40px;
  color: #666;
}

.input-with-prefix .form-control {
  border-radius: 0 4px 4px 0;
}

.options-grid {
  display: grid;
  grid-template-columns: repeat(auto-fill, minmax(300px, 1fr));
  gap: 16px;
}

.option-item {
  display: flex;
  flex-direction: column;
  gap: 6px;
}

.question-section {
  background-color: #f9f9f9;
  padding: 20px;
  border-radius: 6px;
  margin-bottom: 20px;
}

.section-title {
  margin-bottom: 16px;
  color: #333;
  font-size: 1.2rem;
}

.form-actions {
  display: flex;
  gap: 12px;
  margin-top: 20px;
}

.btn-cancel {
  padding: 10px 20px;
  background: #f5f5f5;
  border: 1px solid #ddd;
  border-radius: 4px;
  color: #555;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-cancel:hover {
  background: #e5e5e5;
}

.btn-save {
  padding: 10px 20px;
  background: #4a90e2;
  border: 1px solid #4a90e2;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-save:hover {
  background: #3a80d2;
}

.btn-primary {
  padding: 10px 20px;
  background: #28a745;
  border: 1px solid #28a745;
  border-radius: 4px;
  color: white;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-primary:hover {
  background: #218838;
}

.btn-primary:disabled,
.btn-save:disabled {
  opacity: 0.65;
  cursor: not-allowed;
}

.questions-summary {
  margin-top: 30px;
  padding: 20px;
  background-color: #f9f9f9;
  border-radius: 6px;
}

.summary-title {
  margin-bottom: 16px;
  color: #333;
  font-size: 1.2rem;
}

.question-summary-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.question-summary-number {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  background-color: #4a90e2;
  color: white;
  border-radius: 50%;
  font-size: 14px;
  margin-right: 12px;
  flex-shrink: 0;
}

.question-summary-text {
  font-size: 14px;
  color: #333;
}
</style>