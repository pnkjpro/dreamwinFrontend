<template>
  <div class="quiz-form-container">
    <h2 class="form-title">
      {{ step === 1 ? 'Create Quiz' : step === 2 ? 'Create Quiz Variants' : 'Create Quiz Questions' }}
    </h2>
    
    <!-- =========================== Step 1: Quiz Information ================================ -->
    <form v-if="step === 1" class="quiz-form" @submit.prevent="proceedToVariants">
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
        <label for="bannerImage">Banner Image</label>
        <input
          type="file"
          id="bannerImage"
          @change="handleImageUpload"
          class="form-control file-input"
          accept="image/*"
        />
        <div v-if="imagePreview" class="image-preview">
          <img :src="imagePreview" alt="Banner preview" />
        </div>
      </div>
      
      <div class="form-group date-time-group">
        <div class="date-time-input">
          <label for="startTime">Start Time</label>
          <input
            type="datetime-local"
            id="startTime"
            v-model="quizInfo.start_time"
            class="form-control"
            required
          />
        </div>
        
        <div class="date-time-input">
          <label for="endTime">End Time</label>
          <input
            type="datetime-local"
            id="endTime"
            v-model="quizInfo.end_time"
            class="form-control"
            required
          />
        </div>
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
          <span class="input-prefix">Rs</span>
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
          <span class="input-prefix">Rs</span>
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
      <div class="form-group">
        <label for="quiztimer">Quiz Timer</label>
          <input
            type="number"
            id="quizTimer"
            v-model.number="quizInfo.quiz_timer"
            placeholder="Quiz Timer in Seconds"
            class="form-control"
            min="0"
            required
          />
          <span style="font-size: 14px; color:darkgrey">Quiz Timer in Seconds</span>
      </div>

      <!-- Form Actions -->
      <div class="form-actions">
        <button
          type="submit"
          class="btn-save"
        >
          Proceed to Variants
        </button>
      </div>
    </form>

    <!-- =========================== Step 2: Quiz Variants ================================ -->
    <div v-if="step === 2" class="quiz-form">
      <div class="variant-section">
        <h3 class="section-title">Quiz Variant {{ currentVariantIndex + 1 }}</h3>
        
        <div class="form-group">
          <label for="entryFees">Entry Fees</label>
          <div class="input-with-prefix">
            <span class="input-prefix">Rs</span>
            <input
              type="number"
              id="entryFees"
              v-model.number="currentVariant.entry_fee"
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
            <span class="input-prefix">Rs</span>
            <input
              type="number"
              id="prizeMoney"
              v-model.number="currentVariant.prize"
              placeholder="Input Prize Money"
              class="form-control"
              min="0"
              required
            />
          </div>
        </div>
        
        <div class="form-group">
          <label for="spotLimit">Slot Limit</label>
          <input
            type="number"
            id="spotLimit"
            v-model.number="currentVariant.slot_limit"
            placeholder="Enter Slot Limit"
            class="form-control"
            min="1"
            required
          />
        </div>
        
        <div class="form-group">
          <label for="status">Status</label>
          <select
            id="status"
            v-model="currentVariant.status"
            class="form-control"
            required
          >
            <option value="active">Active</option>
            <option value="inactive">Inactive</option>
            <option value="draft">Draft</option>
          </select>
        </div>
        
        <div class="form-group">
          <div class="prize-distribution-header">
            <label>Prize Distribution</label>
            <button type="button" @click="addPrizeRank" class="btn-add-rank">+ Add Rank</button>
          </div>
          
          <div class="prize-ranks-container">
            <div v-for="(prizeAmount, rank) in currentVariant.prize_contents" :key="rank" class="prize-rank-item">
              <div class="rank-label">Rank {{ rank }}</div>
              <div class="input-with-prefix">
                <span class="input-prefix">Rs</span>
                <input
                  type="number"
                  v-model.number="currentVariant.prize_contents[rank]"
                  placeholder="Prize amount"
                  class="form-control"
                  min="0"
                  required
                />
              </div>
              <button 
                type="button" 
                @click="removePrizeRank(rank)" 
                class="btn-remove-rank"
                title="Remove this rank"
              >
                ×
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Variant Actions -->
      <div class="form-actions">
        <button type="button" @click="goBack" class="btn-cancel">
          Back to Quiz Info
        </button>
        <button type="button" @click="saveCurrentVariant" class="btn-save">
          {{ editingExistingVariant ? 'Update Variant' : 'Add Variant' }}
        </button>
        <button type="button" @click="proceedToQuestions" class="btn-primary" :disabled="quizVariants.length === 0">
          Proceed to Questions
        </button>
      </div>
      
      <!-- Variants Summary -->
      <div v-if="quizVariants.length > 0" class="variants-summary">
        <h3 class="summary-title">Variants Added ({{ quizVariants.length }})</h3>
        <div v-for="(variant, index) in quizVariants" :key="`variant-${index}`" class="variant-summary-item">
          <div class="variant-summary-number">{{ index + 1 }}</div>
          <div class="variant-summary-text">
            <span class="variant-detail">Entry: Rs {{ variant.entry_fee }}</span>
            <span class="variant-detail">Prize: Rs {{ variant.prize }}</span>
            <span class="variant-detail">Slots: {{ variant.slot_limit }}</span>
            <span class="variant-status" :class="variant.status">{{ variant.status }}</span>
          </div>
          <div class="variant-actions">
            <button @click="editVariant(index)" class="btn-edit-variant" title="Edit variant">
              Edit
            </button>
            <button @click="deleteVariant(index)" class="btn-delete-variant" title="Delete variant">
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>

    <!-- ===================== Step 3: Question Form ===================== -->
    <form v-if="step === 3" class="quiz-form" @submit.prevent="addQuestion">
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
        <button type="button" @click="goBackToVariants" class="btn-cancel">
          Back to Variants
        </button>
        <button type="submit" class="btn-save">
          Add Question
        </button>
        <button type="button" @click="createQuiz" class="btn-primary" :disabled="quiz.length === 0 || adminStore.loading">
          {{ adminStore.loading ? 'Creating Quiz...' : 'Finish & Create Quiz'}}
        </button>
      </div>
      
      <div v-if="quiz.length > 0" class="questions-summary">
        <h3 class="summary-title">Questions Added ({{ quiz.length }})</h3>
        <div v-for="(question, index) in quiz" :key="`summary-${index}`" class="question-summary-item">
          <div class="question-summary-number">{{ index + 1 }}</div>
          <div class="question-summary-text">{{ question.question }}</div>
          <div class="question-actions">
            <button @click="deleteQuestion(index)" class="btn-delete-question" title="Delete question">
              Delete
            </button>
          </div>
        </div>
      </div>
    </form>
  </div>
</template>

<script setup>
import { ref, watch, computed, onMounted } from "vue";
import axios from "axios";
import { useAdminStore } from "@/stores/adminStore";
import { useMainStore } from "@/stores/mainStore";
import { useToast } from "vue-toastification";
import { storeToRefs } from "pinia";

const toast = useToast();
let QuestionId = ref(1);
let quiz = ref([]);
const step = ref(1); // 1: Quiz Info, 2: Variants, 3: Questions
const imagePreview = ref(null);
const quizVariants = ref([]);
const currentVariantIndex = ref(-1);
const editingExistingVariant = ref(false);

const adminStore = useAdminStore();
const mainStore = useMainStore();

const { categories } = storeToRefs(mainStore);

onMounted(() => {
  mainStore.fetchCategories();
})

const initialQuizInfo = {
  category_id: null,
  title: "",
  description: "",
  banner_image: null,
  start_time: "",
  end_time: "",
  quizContents: {},
  spot_limit: 100,
  entry_fees: 0,
  prize_money: 0,
  quiz_timer: 0
};


const initialVariant = {
  entry_fee: 0,
  prize: 0,
  slot_limit: 100,
  status: "active",
  prize_contents: {
    "1": 0
  }
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
const currentVariant = ref(JSON.parse(JSON.stringify(initialVariant)));
const quizForm = ref(JSON.parse(JSON.stringify(initialQuizForm)));

// const categories = [
//   { id: 1, name: "Sports" },
//   { id: 2, name: "Current Affairs" },
//   { id: 3, name: "History" },
//   { id: 4, name: "Politics" }
// ];

const handleImageUpload = (event) => {
  const file = event.target.files[0];
  if (file) {
    quizInfo.value.banner_image = file;
    
    // Create image preview
    const reader = new FileReader();
    reader.onload = (e) => {
      imagePreview.value = e.target.result;
    };
    reader.readAsDataURL(file);
  }
};

const proceedToVariants = () => {
  // Validate date/time (ensure end time is after start time)
  if (new Date(quizInfo.value.end_time) <= new Date(quizInfo.value.start_time)) {
    toast.error("End time must be after start time");
    return;
  }
  
  step.value = 2; // Move to variants step
  resetCurrentVariant();
};

const proceedToQuestions = () => {
  if (quizVariants.value.length === 0) {
    toast.error("You need to add at least one variant");
    return;
  }
  
  step.value = 3; // Move to questions step
};

const goBack = () => {
  step.value = 1; // Go back to quiz info
};

const goBackToVariants = () => {
  step.value = 2; // Go back to variants
};

const resetCurrentVariant = () => {
  currentVariant.value = JSON.parse(JSON.stringify(initialVariant));
  editingExistingVariant.value = false;
  currentVariantIndex.value = -1;
};

const addPrizeRank = () => {
  const ranks = Object.keys(currentVariant.value.prize_contents);
  const nextRank = ranks.length > 0 ? parseInt(ranks[ranks.length - 1]) + 1 : 1;
  currentVariant.value.prize_contents[nextRank] = 0;
};

const removePrizeRank = (rank) => {
  const updatedPrizeContents = {};
  Object.keys(currentVariant.value.prize_contents)
    .filter(r => r !== rank)
    .forEach(r => {
      updatedPrizeContents[r] = currentVariant.value.prize_contents[r];
    });
  
  currentVariant.value.prize_contents = updatedPrizeContents;
};

const saveCurrentVariant = () => {
  // Validate entry fee and prize
  if (currentVariant.value.entry_fee < 0) {
    toast.error("Entry fee cannot be negative");
    return;
  }

  if (currentVariant.value.prize < 0) {
    toast.error("Prize amount cannot be negative");
    return;
  }

  // Validate prize distribution
  const totalPrizeDistribution = Object.values(currentVariant.value.prize_contents).reduce((sum, amount) => sum + amount, 0);
  if (totalPrizeDistribution > currentVariant.value.prize) {
    toast.error("Total prize distribution exceeds the total prize amount");
    return;
  }

  if (editingExistingVariant.value) {
    // Update existing variant
    quizVariants.value[currentVariantIndex.value] = JSON.parse(JSON.stringify(currentVariant.value));
  } else {
    // Add new variant
    quizVariants.value.push(JSON.parse(JSON.stringify(currentVariant.value)));
  }
  
  resetCurrentVariant();
  toast.success(editingExistingVariant.value ? "Variant updated successfully" : "Variant added successfully");
};

const editVariant = (index) => {
  currentVariant.value = JSON.parse(JSON.stringify(quizVariants.value[index]));
  currentVariantIndex.value = index;
  editingExistingVariant.value = true;
};

const deleteVariant = (index) => {
  if (confirm("Are you sure you want to delete this variant?")) {
    quizVariants.value.splice(index, 1);
    toast.success("Variant deleted successfully");
  }
};

const addQuestion = () => {
  // Validate if correct answer is selected
  if (!quizForm.value.correctAnswerId) {
    toast.error("Please select a correct answer");
    return;
  }
  
  // Save current question
  quiz.value.push({...quizForm.value, id: QuestionId.value});
  
  // Reset form for next question
  QuestionId.value++;
  quizForm.value = JSON.parse(JSON.stringify(initialQuizForm));
  quizForm.value.id = QuestionId.value;
  
  toast.success("Question added successfully");
};

const deleteQuestion = (index) => {
  if (confirm("Are you sure you want to delete this question?")) {
    quiz.value.splice(index, 1);
    toast.success("Question deleted successfully");
  }
};

const resetQuiz = () => {
  quizInfo.value = JSON.parse(JSON.stringify(initialQuizInfo));
  quizVariants.value = [];
  quiz.value = [];
  quizForm.value = JSON.parse(JSON.stringify(initialQuizForm));
  step.value = 1;
  QuestionId.value = 1;
  imagePreview.value = null;
};

const createQuiz = async() => {
  if (quiz.value.length === 0) {
    toast.error("No questions added yet");
    return;
  }
  
  const formData = new FormData();

  // Append basic quiz info
  formData.append("category_id", quizInfo.value.category_id);
  formData.append("title", quizInfo.value.title);
  formData.append("description", quizInfo.value.description);
  formData.append("start_time", quizInfo.value.start_time);
  formData.append("end_time", quizInfo.value.end_time);
  formData.append("spot_limit", quizInfo.value.spot_limit);
  formData.append("entry_fees", quizInfo.value.entry_fees);
  formData.append("prize_money", quizInfo.value.prize_money);
  formData.append("quiz_timer", quizInfo.value.quiz_timer);

  // Append the banner image if exists
  if (quizInfo.value.banner_image) {
    formData.append("banner_image", quizInfo.value.banner_image);
  }

  // Append quiz variants
  quizVariants.value.forEach((variant, i) => {
    formData.append(`quizVariants[${i}][entry_fee]`, variant.entry_fee);
    formData.append(`quizVariants[${i}][prize]`, variant.prize);
    formData.append(`quizVariants[${i}][slot_limit]`, variant.slot_limit);
    formData.append(`quizVariants[${i}][status]`, variant.status);
    
    // Append prize distribution
    Object.entries(variant.prize_contents).forEach(([rank, amount]) => {
      formData.append(`quizVariants[${i}][prize_contents][${rank}]`, amount);
    });
  });

  // Append quiz questions
  quiz.value.forEach((question, i) => {
    formData.append(`quizContents[${i}][id]`, question.id);
    formData.append(`quizContents[${i}][question]`, question.question);
    
    question.options.forEach((option, j) => {
      formData.append(`quizContents[${i}][options][${j}][id]`, option.id);
      formData.append(`quizContents[${i}][options][${j}][option]`, option.option);
    });
    formData.append(`quizContents[${i}][correctAnswerId]`, question.correctAnswerId);
  });

  const result = await adminStore.createQuiz(formData);
  if (!result.success) {
    const messages = result.message;

    if (typeof messages === 'object' && messages !== null && !Array.isArray(messages)) {
      Object.values(messages).forEach((msgArray, index) => {
        msgArray.forEach((msg, innerIndex) => {
          setTimeout(() => toast.error(msg), (index + innerIndex) * 300);
        });
      });
    } else if (Array.isArray(messages)) {
      messages.forEach((msg, index) => {
        setTimeout(() => toast.error(msg), index * 300);
      });
    } else {
      toast.error(messages);
    }

    return;
  } else {
    toast.success(result.message);
    resetQuiz();
  }
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

.question-section, .variant-section {
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

.questions-summary, .variants-summary {
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

.question-summary-item, .variant-summary-item {
  display: flex;
  align-items: center;
  padding: 12px;
  background-color: white;
  border-radius: 4px;
  margin-bottom: 8px;
  box-shadow: 0 1px 3px rgba(0, 0, 0, 0.1);
}

.question-summary-number, .variant-summary-number {
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

.question-summary-text, .variant-summary-text {
  font-size: 14px;
  color: #333;
  flex: 1;
}

.variant-summary-text {
  display: flex;
  flex-wrap: wrap;
  gap: 12px;
}

.variant-detail {
  font-weight: 500;
}

.variant-status {
  padding: 3px 8px;
  border-radius: 12px;
  font-size: 12px;
  font-weight: 500;
  text-transform: uppercase;
}

.variant-status.active {
  background-color: #d4edda;
  color: #155724;
}

.variant-status.inactive {
  background-color: #f8d7da;
  color: #721c24;
}

.variant-status.draft {
  background-color: #fff3cd;
  color: #856404;
}

.question-actions, .variant-actions {
  margin-left: auto;
  display: flex;
  gap: 8px;
}

.btn-edit-variant, .btn-delete-variant, .btn-delete-question {
  padding: 4px 8px;
  border-radius: 4px;
  font-size: 12px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-edit-variant {
  background-color: #e7f5ff;
  border: 1px solid #4a90e2;
  color: #1e6fcc;
}

.btn-delete-variant, .btn-delete-question {
  background-color: #fff2f2;
  border: 1px solid #dc3545;
  color: #dc3545;
}

.btn-edit-variant:hover {
  background-color: #d0e7fb;
}

.btn-delete-variant:hover, .btn-delete-question:hover {
  background-color: #ffdbdb;
}

/* Prize distribution styles */
.prize-distribution-header {
  display: flex;
  justify-content: space-between;
  align-items: center;
  margin-bottom: 12px;
}

.btn-add-rank {
  padding: 6px 12px;
  background: #4a90e2;
  border: 1px solid #4a90e2;
  border-radius: 4px;
  color: white;
  font-size: 12px;
  cursor: pointer;
}

.prize-ranks-container {
  display: flex;
  flex-direction: column;
  gap: 12px;
}

.prize-rank-item {
  display: flex;
  align-items: center;
  gap: 12px;
}

.rank-label {
  min-width: 80px;
  font-weight: 500;
}

.btn-remove-rank {
  display: flex;
  align-items: center;
  justify-content: center;
  width: 24px;
  height: 24px;
  border-radius: 50%;
  background-color: #f8d7da;
  border: 1px solid #dc3545;
  color: #dc3545;
  font-size: 16px;
  cursor: pointer;
  transition: background 0.2s;
}

.btn-remove-rank:hover {
  background-color: #f5c6cb;
}

/* File input and image preview */
.file-input {
  padding: 8px 12px;
}

.image-preview {
  margin-top: 10px;
  max-width: 100%;
  border-radius: 4px;
  overflow: hidden;
  border: 1px solid #ddd;
}

.image-preview img {
  max-width: 100%;
  height: auto;
  display: block;
}

.date-time-group {
  display: flex;
  gap: 16px;
}

.date-time-input {
  flex: 1;
}

@media (max-width: 768px) {
  .date-time-group {
    flex-direction: column;
    gap: 16px;
  }
  
  .prize-rank-item {
    flex-wrap: wrap;
  }
  
  .variant-summary-text {
    flex-direction: column;
    gap: 4px;
  }
  
  .question-summary-item, .variant-summary-item {
    flex-direction: column;
    align-items: flex-start;
  }
  
  .question-summary-number, .variant-summary-number {
    margin-bottom: 8px;
  }
  
  .question-actions, .variant-actions {
    margin-left: 0;
    margin-top: 8px;
  }
}
</style>