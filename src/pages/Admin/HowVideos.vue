<template>
    <div class="banner-form-container p-4 max-w-2xl mx-auto">
      <h2 class="text-xl font-bold mb-4">Update Youtube Video</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Title Field -->
        <div class="form-group">
          <label for="title" class="block mb-2 font-medium">Video Title</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter video title"
            required
          />
        </div>
        <div class="form-group">
          <label for="description" class="block mb-2 font-medium">Video Description</label>
          <input
            id="description"
            v-model="formData.description"
            type="text"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter video description"
            required
          />
        </div>

        <div class="form-group">
          <label for="video_id" class="block mb-2 font-medium">Youtube Video Id</label>
          <input
            id="video_id"
            v-model="formData.youtube_id"
            type="text"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter Youtube Video Id"
            required
          />
        </div>
        
        <!-- Youtube ID Dropdown -->
        <div class="form-group">
          <label for="youtubeId" class="block mb-2 font-medium">YouTube ID</label>
          <select
            id="youtubeId"
            v-model="formData.video_id"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option disabled value="">Select a YouTube ID</option>
            <option value="1">Youtube Video 1</option>
            <option value="2">Youtube Video 2</option>
            <option value="3">Youtube Video 3</option>
          </select>
        </div>
        
        <!-- Submit Button -->
        <div class="form-group">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
            :disabled="loading"
          >
            {{ loading ? 'Updating...' : 'Update Video' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue'
  import { useMainStore } from '@/stores/mainStore'
  import { useToast } from 'vue-toastification'
  import { useRouter } from 'vue-router';
  import { storeToRefs } from 'pinia';
  
  const toast = useToast();
  const router = useRouter();

  // Get the main store
  const mainStore = useMainStore()
  const { loading } = storeToRefs(mainStore);
  
  // Form data state
  const formData = reactive({
    title: '',
    description: '',
    youtube_id: ''
  })

  const resetForm = () => {
    formData.title = '',
    formData.description = '',
    formData.youtube_id = ''
  }
  
  // Form submission handler
  const handleSubmit = async () => {
    const result = await mainStore.updateHowVideo(formData);
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
      resetForm();
    }
  }
  </script>

  <style scoped>
  /* Container for the form */
.banner-form-container {
  padding: 1rem;
  max-width: 42rem; /* 2xl */
  margin: 0 auto;
}

/* Headline */
.banner-form-container h2 {
  font-size: 1.25rem; /* text-xl */
  font-weight: bold;
  margin-bottom: 1rem;
}

/* Form group spacing */
.form-group {
  margin-bottom: 1rem;
}

/* Labels */
.form-group label {
  display: block;
  margin-bottom: 0.5rem;
  font-weight: 500;
}

/* Input fields */
.form-group input[type="text"],
.form-group input[type="file"],
.form-group select {
  width: 100%;
  padding: 0.5rem 0.75rem;
  border: 1px solid #ccc;
  border-radius: 0.375rem; /* rounded */
  outline: none;
  transition: border 0.2s, box-shadow 0.2s;
}

.form-group input:focus,
.form-group select:focus {
  border-color: #3b82f6; /* blue-500 */
  box-shadow: 0 0 0 2px rgba(59, 130, 246, 0.5); /* focus:ring-2 focus:ring-blue-500 */
}

/* Image preview styling */
img {
  height: 8rem; /* h-32 */
  object-fit: cover;
  border-radius: 0.375rem;
  border: 1px solid #ccc;
}

/* Clear button */
button[type="button"] {
  padding: 0.25rem;
  color: #ef4444; /* text-red-500 */
  cursor: pointer;
  transition: color 0.2s;
}

button[type="button"]:hover {
  color: #b91c1c; /* text-red-700 */
}

/* Submit button */
button[type="submit"] {
  padding: 0.5rem 1rem;
  background-color: #3b82f6; /* bg-blue-500 */
  color: white;
  border: none;
  border-radius: 0.375rem;
  cursor: pointer;
  transition: background-color 0.2s;
}

button[type="submit"]:hover {
  background-color: #2563eb; /* hover:bg-blue-600 */
}

button[type="submit"]:focus {
  outline: none;
  box-shadow: 0 0 0 2px rgba(29, 78, 216, 0.5); /* focus:ring-2 focus:ring-blue-700 */
}

button[disabled] {
  opacity: 0.6;
  cursor: not-allowed;
}

/* Success and error messages */
.success-message,
.error-message {
  padding: 0.75rem;
  border-radius: 0.375rem;
  margin-top: 1rem;
}

.success-message {
  background-color: #d1fae5; /* bg-green-100 */
  color: #047857; /* text-green-700 */
}

.error-message {
  background-color: #fee2e2; /* bg-red-100 */
  color: #b91c1c; /* text-red-700 */
}
</style>