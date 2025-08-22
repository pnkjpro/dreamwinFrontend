<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Winners Management</h1>
          <p class="text-sm text-gray-600 mt-1">Manage recent winners displayed on landing page (Maximum 3 winners)</p>
        </div>
        <button @click="showAddModal = true" 
                :disabled="winners.length >= 3"
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center disabled:opacity-50 disabled:cursor-not-allowed">
          <font-awesome-icon icon="plus" class="mr-2" />
          Add Winner
        </button>
      </div>
    </div>

    <!-- Winners List -->
    <div class="p-6">
      <div v-if="loading" class="text-center py-12">
        <div class="inline-flex items-center px-4 py-2 font-semibold leading-6 text-sm shadow rounded-md text-blue-500 bg-white">
          <svg class="animate-spin -ml-1 mr-3 h-5 w-5 text-blue-500" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
            <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
            <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
          </svg>
          Loading winners...
        </div>
      </div>

      <div v-else-if="winners.length === 0" class="text-center py-12">
        <div class="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
          <font-awesome-icon icon="trophy" class="text-gray-400 text-4xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No Winners Added</h3>
        <p class="text-gray-500 mb-4">Add your first winner to get started (Maximum 3 winners allowed)</p>
        <button @click="showAddModal = true" 
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors">
          Add Winner
        </button>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 xl:grid-cols-3 gap-6">
        <div v-for="winner in winners" :key="winner.id" 
             class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
          
          <!-- Winner Image -->
          <div class="relative">
            <img :src="winner.avatar || getFallbackImage(winner.id)" 
                 :alt="winner.name" 
                 class="w-full h-48 object-cover" />
            <div class="absolute top-2 right-2 bg-green-600 text-white text-xs px-2 py-1 rounded font-medium">
              ₹{{ winner.amount.toLocaleString() }}
            </div>
          </div>

          <!-- Winner Info -->
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-2">
              {{ winner.name }}
            </h3>
            <p class="text-sm text-gray-600 mb-2">
              Won ₹{{ winner.amount.toLocaleString() }} in {{ winner.contest }}
            </p>
            
            <!-- Winner Details -->
            <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{{ formatDate(winner.date) }}</span>
              <span class="bg-blue-100 text-blue-800 px-2 py-1 rounded">
                {{ winner.contest }}
              </span>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button @click="editWinner(winner)" 
                      class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                <font-awesome-icon icon="edit" class="mr-2" />
                Edit
              </button>
              <button @click="deleteWinner(winner)" 
                      class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                <font-awesome-icon icon="trash" class="mr-2" />
                Delete
              </button>
            </div>
          </div>
        </div>
      </div>

      <!-- Winner Limit Message -->
      <div v-if="winners.length >= 3" class="mt-6 p-4 bg-yellow-50 border border-yellow-200 rounded-lg">
        <div class="flex items-center">
          <font-awesome-icon icon="exclamation-triangle" class="text-yellow-600 mr-2" />
          <p class="text-yellow-800 text-sm font-medium">
            Maximum winner limit reached (3/3). You can edit or delete existing winners to add new ones.
          </p>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div class="sticky top-0 bg-white border-b border-gray-200 p-6">
          <div class="flex items-center justify-between">
            <h2 class="text-xl font-bold text-gray-900">
              {{ showEditModal ? 'Edit Winner' : 'Add New Winner' }}
            </h2>
            <button @click="closeModal" 
                    class="text-gray-400 hover:text-gray-600 transition-colors">
              <font-awesome-icon icon="times" class="text-xl" />
            </button>
          </div>
        </div>

        <form @submit.prevent="saveWinner" class="p-6">
          <div class="grid grid-cols-1 md:grid-cols-2 gap-6">
            <!-- Winner Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Winner Name *
              </label>
              <input 
                v-model="form.name"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter winner name"
              />
            </div>

            <!-- Amount Won -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Amount Won (₹) *
              </label>
              <input 
                v-model="form.amount"
                type="number"
                required
                min="1"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter amount won"
              />
            </div>

            <!-- Contest Name -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Contest Name *
              </label>
              <input 
                v-model="form.contest"
                type="text"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
                placeholder="Enter contest name"
              />
            </div>

            <!-- Winner Date -->
            <div>
              <label class="block text-sm font-medium text-gray-700 mb-2">
                Winner Date *
              </label>
              <input 
                v-model="form.date"
                type="date"
                required
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent"
              />
            </div>
          </div>

          <!-- Avatar Image Upload -->
          <div class="mt-6">
            <label class="block text-sm font-medium text-gray-700 mb-2">
              Avatar Image (Optional)
            </label>
            <div class="flex items-center space-x-4">
              <!-- File Upload Button -->
              <div class="relative">
                <input 
                  ref="fileInput"
                  type="file"
                  accept="image/*"
                  @change="handleFileUpload"
                  class="absolute inset-0 w-full h-full opacity-0 cursor-pointer"
                />
                <button 
                  type="button"
                  class="px-4 py-2 bg-gray-100 border border-gray-300 rounded-lg hover:bg-gray-200 transition-colors text-sm font-medium"
                >
                  Choose Image
                </button>
              </div>
              <!-- Clear Image Button -->
              <button 
                v-if="form.avatarFile || form.avatar"
                type="button"
                @click="clearImage"
                class="px-3 py-2 bg-red-100 text-red-600 border border-red-300 rounded-lg hover:bg-red-200 transition-colors text-sm font-medium"
              >
                Clear
              </button>
            </div>
            <p class="text-xs text-gray-500 mt-1">
              Upload an image file (JPG, PNG, GIF). Leave empty to use default fallback image.
            </p>
          </div>

          <!-- Avatar Preview -->
          <div v-if="form.avatarPreview || form.avatar" class="mt-4">
            <label class="block text-sm font-medium text-gray-700 mb-2">Preview</label>
            <div class="relative inline-block">
              <img :src="form.avatarPreview || form.avatar" 
                   alt="Avatar preview" 
                   class="w-24 h-24 rounded-lg object-cover border border-gray-200" />
              <div v-if="form.avatarFile" class="absolute -top-2 -right-2 bg-green-500 text-white rounded-full w-6 h-6 flex items-center justify-center text-xs">
                ✓
              </div>
            </div>
          </div>

          <!-- Form Actions -->
          <div class="flex justify-end space-x-3 mt-8 pt-6 border-t border-gray-200">
            <button 
              type="button"
              @click="closeModal"
              class="px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              type="submit"
              :disabled="formLoading"
              class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed flex items-center"
            >
              <svg v-if="formLoading" class="animate-spin -ml-1 mr-3 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              {{ showEditModal ? 'Update Winner' : 'Add Winner' }}
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Delete Confirmation Modal -->
    <div v-if="showDeleteModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-md w-full">
        <div class="p-6">
          <div class="flex items-center justify-center w-12 h-12 mx-auto mb-4 bg-red-100 rounded-full">
            <font-awesome-icon icon="exclamation-triangle" class="text-red-600 text-xl" />
          </div>
          <h3 class="text-lg font-bold text-gray-900 text-center mb-2">Delete Winner</h3>
          <p class="text-gray-600 text-center mb-6">
            Are you sure you want to delete this winner? This action cannot be undone.
          </p>
          <div class="flex space-x-3">
            <button 
              @click="showDeleteModal = false"
              class="flex-1 px-4 py-2 border border-gray-300 text-gray-700 rounded-lg hover:bg-gray-50 transition-colors"
            >
              Cancel
            </button>
            <button 
              @click="confirmDelete"
              :disabled="formLoading"
              class="flex-1 bg-red-600 text-white px-4 py-2 rounded-lg hover:bg-red-700 transition-colors disabled:opacity-50 disabled:cursor-not-allowed"
            >
              Delete
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { storeToRefs } from 'pinia'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlus, faTrophy, faEdit, faTrash, faTimes, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(faPlus, faTrophy, faEdit, faTrash, faTimes, faExclamationTriangle)

const mainStore = useMainStore()
const { loading } = storeToRefs(mainStore)

// Component state
const winners = ref([])
const showAddModal = ref(false)
const showEditModal = ref(false)
const showDeleteModal = ref(false)
const formLoading = ref(false)
const editingWinner = ref(null)
const deletingWinnerId = ref(null)
const fileInput = ref(null)

// Form data
const form = ref({
  name: '',
  amount: '',
  contest: '',
  date: '',
  avatar: '',
  avatarFile: null,
  avatarPreview: null
})

// Fallback images for winners
const fallbackImages = [
  "https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?auto=format&fit=crop&w=880&q=80", // man smiling
  "https://images.unsplash.com/photo-1527980965255-d3b416303d12?auto=format&fit=crop&w=880&q=80", // woman portrait
  "https://images.unsplash.com/photo-1506794778202-cad84cf45f1d?auto=format&fit=crop&w=880&q=80", // man with glasses
  "https://images.unsplash.com/photo-1529626455594-4ff0802cfb7e?auto=format&fit=crop&w=880&q=80", // young woman
  "https://images.unsplash.com/photo-1544005313-94ddf0286df2?auto=format&fit=crop&w=880&q=80", // laughing girl
  "https://images.unsplash.com/photo-1547425260-76bcadfb4f2c?auto=format&fit=crop&w=880&q=80"  // man in hoodie
]

const getFallbackImage = (index) => {
  return fallbackImages[index % fallbackImages.length]
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const handleFileUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Validate file type
    if (!file.type.startsWith('image/')) {
      console.error('Please select an image file')
      // You can add a toast notification here
      return
    }
    
    // Validate file size (max 5MB)
    if (file.size > 5 * 1024 * 1024) {
      console.error('Image size should be less than 5MB')
      // You can add a toast notification here
      return
    }
    
    form.value.avatarFile = file
    
    // Create preview URL
    const reader = new FileReader()
    reader.onload = (e) => {
      form.value.avatarPreview = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

const clearImage = () => {
  form.value.avatar = ''
  form.value.avatarFile = null
  form.value.avatarPreview = null
  if (fileInput.value) {
    fileInput.value.value = ''
  }
}

const fetchWinners = async () => {
  try {
    const result = await mainStore.fetchWinners()
    if (result.success) {
      winners.value = result.data || []
    } else {
      console.error('Failed to fetch winners:', result.message)
    }
  } catch (error) {
    console.error('Error fetching winners:', error)
  }
}

const resetForm = () => {
  form.value = {
    name: '',
    amount: '',
    contest: '',
    date: '',
    avatar: '',
    avatarFile: null,
    avatarPreview: null
  }
  if (fileInput.value) {
    fileInput.value.value = ''
  }
  editingWinner.value = null
}

const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  resetForm()
}

const editWinner = (winner) => {
  editingWinner.value = winner
  form.value = {
    name: winner.name,
    amount: winner.amount,
    contest: winner.contest,
    date: new Date(winner.date).toISOString().split('T')[0],
    avatar: winner.avatar || '',
    avatarFile: null,
    avatarPreview: null
  }
  showEditModal.value = true
}

const saveWinner = async () => {
  try {
    // Check winner limit for new winners only
    if (!showEditModal.value && winners.value.length >= 3) {
      console.error('Maximum 3 winners allowed')
      // You can add a toast notification here if you have a notification system
      return
    }
    
    formLoading.value = true
    
    // Create FormData for file upload
    const formData = new FormData()
    formData.append('name', form.value.name)
    formData.append('amount', form.value.amount)
    formData.append('contest', form.value.contest)
    formData.append('date', form.value.date)
    
    // Handle avatar - either file upload or existing URL
    if (form.value.avatarFile) {
      formData.append('avatar', form.value.avatarFile)
    } else if (form.value.avatar) {
      formData.append('avatar_url', form.value.avatar)
    }

    let result
    if (showEditModal.value && editingWinner.value) {
      // For update, pass the UID
      result = await mainStore.updateWinner(editingWinner.value.uid, formData)
    } else {
      // For add, no UID needed
      result = await mainStore.addWinner(formData)
    }

    if (result.success) {
      closeModal()
      await fetchWinners() // Refresh the list
      // You can add a success notification here if you have a notification system
    } else {
      console.error('Failed to save winner:', result.message)
      // You can add an error notification here
    }
  } catch (error) {
    console.error('Error saving winner:', error)
  } finally {
    formLoading.value = false
  }
}

const deleteWinner = (winner) => {
  deletingWinnerId.value = winner.uid
  showDeleteModal.value = true
}

const confirmDelete = async () => {
  try {
    formLoading.value = true
    const result = await mainStore.deleteWinner(deletingWinnerId.value)
    
    if (result.success) {
      showDeleteModal.value = false
      deletingWinnerId.value = null
      await fetchWinners() // Refresh the list
      // You can add a success notification here
    } else {
      console.error('Failed to delete winner:', result.message)
      // You can add an error notification here
    }
  } catch (error) {
    console.error('Error deleting winner:', error)
  } finally {
    formLoading.value = false
  }
}

// Load winners on component mount
onMounted(() => {
  fetchWinners()
})
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

.max-h-90vh {
  max-height: 90vh;
}
</style>
