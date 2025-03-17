<template>
  <div class="mx-auto mt-10 max-w-4xl rounded-lg bg-white p-6 shadow-lg">
    <h2 class="mb-6 text-2xl font-semibold text-gray-800">Create a Quiz</h2>

     <!-- =========================== Quiz Information ================================ -->
     <div v-if="!step2" class="space-y-6">
       <div>
          <label for="correctAnswer" class="mb-2 block text-lg text-gray-700"
            >Select Category</label
          >
          <select
            id="correctAnswer"
            name="correctAnswer"
            v-model="quizInfo.category_id"
            class="block w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          >
            <option v-for="category in categories" :value="category.id">{{ category.name }}</option>
          </select>
        </div>
      <div>
        <label for="question" class="mb-2 block text-lg text-gray-700"
          >Title</label
        >
        <input
          type="text"
          id="questionTitle"
          v-model="quizInfo.title"
          name="title"
          placeholder="Enter Question Title"
          class="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label for="question" class="mb-2 block text-lg text-gray-700"
          >Description</label
        >
        <textarea
          id="description"
          v-model="quizInfo.description"
          name="description"
          placeholder="Enter Question Title"
          class="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
          rows="4"
        ></textarea>
      </div>
      <div>
        <label for="question" class="mb-2 block text-lg text-gray-700"
          >Spot Limit</label
        >
        <input
          type="number"
          id="spotLimit"
          v-model="quizInfo.spot_limit"
          name="spot_limit"
          placeholder="Enter Spot Limit"
          class="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label for="question" class="mb-2 block text-lg text-gray-700"
          >Entry Fees</label
        >
        <input
          type="number"
          id="entryFees"
          v-model="quizInfo.entry_fees"
          name="entry_fees"
          placeholder="Input Entry Fees"
          class="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>
      <div>
        <label for="question" class="mb-2 block text-lg text-gray-700"
          >Prize Money</label
        >
        <input
          type="number"
          id="prizeMoney"
          v-model="quizInfo.prize_money"
          name="prize_money"
          placeholder="Input Entry Fees"
          class="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Submit Button -->
      <div>
        <button
          @click="step2 = true"
          class="w-full rounded-md bg-blue-500 py-3 my-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Proceed to Create Quiz
        </button>
      </div>
    </div>

    <!-- ===================== Question Form ===================== -->
    <div v-if="step2" class="space-y-6">
      <!-- Question Input -->
      <div>
        <label for="question" class="mb-2 block text-lg text-gray-700"
          >Question</label
        >
        <input
          type="text"
          id="question"
          v-model="quizForm.question"
          name="question"
          placeholder="Enter your question"
          class="w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        />
      </div>

      <!-- Options Input -->
      <div>
        <label class="mb-2 block text-lg text-gray-700">Options</label>
        <div class="space-y-2">
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option1"
              v-model="quizForm.options[0].option"
              placeholder="Option 1"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option2"
              v-model="quizForm.options[1].option"
              placeholder="Option 2"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option3"
              v-model="quizForm.options[2].option"
              placeholder="Option 3"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
          <div class="flex items-center space-x-3">
            <input
              type="text"
              name="option4"
              v-model="quizForm.options[3].option"
              placeholder="Option 4"
              class="flex-1 rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
            />
          </div>
        </div>
      </div>

      <!-- Correct Answer Input -->
      <div>
        <label for="correctAnswer" class="mb-2 block text-lg text-gray-700"
          >Correct Answer</label
        >
        <select
          id="correctAnswer"
          name="correctAnswer"
          v-model="quizForm.correctAnswerId"
          class="block w-full rounded-md border border-gray-300 p-3 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          <option value="1">{{ quizForm.options[0].option }}</option>
          <option value="2">{{ quizForm.options[1].option }}</option>
          <option value="3">{{ quizForm.options[2].option }}</option>
          <option value="4">{{ quizForm.options[3].option }}</option>
        </select>
      </div>

      <!-- Submit Button -->
      <div>
        <button
          @click="QuestionId++"
          class="w-full rounded-md bg-blue-500 py-3 my-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Add Question
        </button>
        <button
          @click="createQuiz"
          class="w-full rounded-md bg-blue-500 py-3 my-3 font-semibold text-white hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-400"
        >
          Create Quiz
        </button>
      </div>
    </div>

   
  </div>
</template>

<script setup>
import { ref, watch, computed } from "vue";
import axios from "axios";

let QuestionId = ref(1);
let quiz = [];
const step2 = ref(false);

const initialQuizInfo = {
  category_id: null,
  title: "",
  description: "",
  banner_image: null,
  quizContents: {},
  spot_limit: 0,
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
  correctAnswerId: null,
};

const quizInfo = ref(JSON.parse(JSON.stringify(initialQuizInfo)));
const quizForm = ref(JSON.parse(JSON.stringify(initialQuizForm)));

const categories = [
  {
    id: 1,
    name: "Sports"
  },
  {
    id: 2,
    name: "Current Affairs"
  },
  {
    id: 3,
    name: "History",
  },
  {
    id: 4,
    name: "Politics"
  }
]

watch(
  () => QuestionId.value,
  (newId, oldId) => {
    quizForm.value.id = oldId;
    quiz.push(quizForm.value);
    quizForm.value = JSON.parse(JSON.stringify(initialQuizForm));
    console.log("Reset Quizzes: ", quizForm.value);
  }
);

watch(
  () => step2.value,
  () => {
    console.log(quizInfo.value);
  }
);

const createQuiz = () => {
  quizInfo.value.quizContents = quiz;
  const formData = new FormData();

  // Append each field to formData
  Object.entries(quizInfo.value).forEach(([key, value]) => {
    formData.append(key, value);
  });
  console.log(formData);
  // axios.post(`http://dreamwin.local:8000/api/quiz/create`, formData, {
  //   headers: { "Content-Type": "multipart/form-data" }
  // })
  axios.post(`http://dreamwin.local:8000/api/quiz/create`, quizInfo.value)
    .then(response => {
      console.log("Quiz Created:", response.data);
    })
    .catch(error => {
      console.error("Error creating quiz:", error.response?.data);
    });
};
</script>
