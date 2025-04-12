<template>
    <div class="banner-form-container p-4 max-w-2xl mx-auto">
      <h2 class="text-xl font-bold mb-4">Update Banner</h2>
      
      <form @submit.prevent="handleSubmit" class="space-y-4">
        <!-- Title Field -->
        <div class="form-group">
          <label for="title" class="block mb-2 font-medium">Banner Title</label>
          <input
            id="title"
            v-model="formData.title"
            type="text"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            placeholder="Enter banner title"
            required
          />
        </div>
        
        <!-- Banner Image Upload -->
        <div class="form-group">
          <label for="bannerImage" class="block mb-2 font-medium">Upload Banner Image</label>
          <div class="flex items-center space-x-2">
            <input
              type="file"
              id="bannerImage"
              @change="handleFileChange"
              accept="image/*"
              class="border rounded p-2 w-full"
              required
            />
            <div v-if="formData.image" class="flex items-center">
              <button 
                @click="clearImage" 
                type="button"
                class="p-1 text-red-500 hover:text-red-700"
              >
                Clear
              </button>
            </div>
          </div>
          
          <!-- Image Preview -->
          <div v-if="imagePreview" class="mt-2">
            <img :src="imagePreview" alt="Banner Preview" class="h-32 object-cover rounded border" />
          </div>
        </div>
        
        <!-- Banner ID Dropdown -->
        <div class="form-group">
          <label for="bannerId" class="block mb-2 font-medium">Banner ID</label>
          <select
            id="bannerId"
            v-model="formData.banner_id"
            class="w-full px-3 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-500"
            required
          >
            <option disabled value="">Select a banner ID</option>
            <option value="1">Banner 1</option>
            <option value="2">Banner 2</option>
            <option value="3">Banner 3</option>
          </select>
        </div>
        
        <!-- Submit Button -->
        <div class="form-group">
          <button
            type="submit"
            class="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600 focus:outline-none focus:ring-2 focus:ring-blue-700"
            :disabled="mainStore.loading"
          >
            {{ mainStore.loading ? 'Updating...' : 'Update Banner' }}
          </button>
        </div>
      </form>
    </div>
  </template>
  
  <script setup>
  import { ref, reactive, computed } from 'vue'
  import { useMainStore } from '@/stores/mainStore'
import { useToast } from 'vue-toastification'
  
  // Get the main store
  const mainStore = useMainStore()
  const toast = useToast();
  
  // Form data state
  const formData = reactive({
    title: '',
    image: null,
    banner_id: ''
  })
  
  // Component state
  const imagePreview = ref(null)
  
  // Handle file input change
  const handleFileChange = (event) => {
    const file = event.target.files[0]
    if (file) {
      formData.image = file
      
      // Create image preview
      const reader = new FileReader()
      reader.onload = (e) => {
        imagePreview.value = e.target.result
      }
      reader.readAsDataURL(file)
    }
  }
  
  // Clear selected image
  const clearImage = () => {
    formData.image = null
    imagePreview.value = null
    
    // Reset file input
    const fileInput = document.getElementById('bannerImage')
    if (fileInput) {
      fileInput.value = ''
    }
  }

  const resetForm = () => {
    formData.title = ''
    formData.banner_id = ''
    clearImage()
  }
  
  // Form submission handler
  const handleSubmit = async () => {
      const payload = new FormData()
      payload.append('title', formData.title)
      payload.append('banner_id', formData.banner_id)
      if (formData.image) {
        payload.append('banner_image', formData.image)
      }
      
      const result = await mainStore.updateBanner(payload)
      console.log("error messages: ", result.message);
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