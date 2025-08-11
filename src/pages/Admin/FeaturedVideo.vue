<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Featured YouTube Videos</h1>
          <p class="text-sm text-gray-600 mt-1">Manage homepage featured video content (Maximum 7 videos)</p>
        </div>
        <!-- <button @click="showAddModal = true" 
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-4 py-2 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors flex items-center">
          <font-awesome-icon icon="plus" class="mr-2" />
          Add Video
        </button> -->
      </div>
    </div>

    <!-- Videos List -->
    <div class="p-6">
      <div v-if="videos.length === 0" class="text-center py-12">
        <div class="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
          <font-awesome-icon icon="video" class="text-gray-400 text-4xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No Videos Added</h3>
        <p class="text-gray-500 mb-4">Add your first featured video to get started</p>
        <!-- <button @click="showAddModal = true" 
                class="bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors">
          Add Video
        </button> -->
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="(video, index) in videos" :key="video.id || index" 
             class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
          
          <!-- Video Thumbnail -->
          <div class="relative">
            <img :src="video.thumbnail" 
                 :alt="video.title" 
                 class="w-full h-48 object-cover" />
            <div class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center">
              <div class="bg-red-600 rounded-full p-3">
                <font-awesome-icon icon="play" class="text-white text-xl" />
              </div>
            </div>
            <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {{ video.duration }}
            </div>
            <div class="absolute top-2 left-2 bg-blue-600 text-white text-xs px-2 py-1 rounded font-medium">
              #{{ index + 1 }}
            </div>
          </div>

          <!-- Video Info -->
          <div class="p-4">
            <h3 class="text-lg font-bold text-gray-900 mb-2 line-clamp-2">
              {{ video.title }}
            </h3>
            <p class="text-sm text-gray-600 mb-3 line-clamp-2">
              {{ video.description }}
            </p>
            
            <!-- Video Details -->
            <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span>{{ video.views }} views</span>
              <span>{{ formatDate(video.created_at) }}</span>
            </div>

            <!-- YouTube URL -->
            <div class="mb-4">
              <p class="text-xs text-gray-500 mb-1">YouTube URL:</p>
              <a :href="video.youtubeUrl" 
                 target="_blank" 
                 class="text-blue-600 hover:text-blue-800 text-sm break-all">
                {{ video.youtubeUrl }}
              </a>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button @click="editVideo(video, index)" 
                      class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                <font-awesome-icon icon="edit" class="mr-2" />
                Edit
              </button>
              <!-- <button @click="deleteVideo(index)" 
                      class="flex-1 bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                <font-awesome-icon icon="trash" class="mr-2" />
                Delete
              </button> -->
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Add/Edit Modal -->
    <div v-if="showAddModal || showEditModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-2xl w-full max-h-90vh overflow-y-auto">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-900">
            {{ showEditModal ? 'Edit Video' : 'Add Featured Video' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <font-awesome-icon icon="times" class="text-xl" />
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6 space-y-4">
          <!-- YouTube URL -->
          <div class="form-group">
            <label for="youtubeUrl" class="block mb-2 font-medium text-gray-700">YouTube URL *</label>
            <input
              id="youtubeUrl"
              v-model="formData.youtubeUrl"
              type="url"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="https://www.youtube.com/watch?v=..."
              required
              @blur="extractVideoId"
            />
            <p class="text-xs text-gray-500 mt-1">Paste the YouTube video URL to auto-generate thumbnail</p>
          </div>

          <!-- Title -->
          <div class="form-group">
            <label for="title" class="block mb-2 font-medium text-gray-700">Video Title *</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video title"
              required
            />
          </div>

          <!-- Description -->
          <div class="form-group">
            <label for="description" class="block mb-2 font-medium text-gray-700">Description</label>
            <textarea
              id="description"
              v-model="formData.description"
              rows="3"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="Enter video description"
            ></textarea>
          </div>

          <!-- Duration -->
          <div class="form-group">
            <label for="duration" class="block mb-2 font-medium text-gray-700">Duration *</label>
            <input
              id="duration"
              v-model="formData.duration"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 12:45"
              required
            />
          </div>

          <!-- Views -->
          <div class="form-group">
            <label for="views" class="block mb-2 font-medium text-gray-700">Views *</label>
            <input
              id="views"
              v-model="formData.views"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 focus:border-blue-500"
              placeholder="e.g., 125K"
              required
            />
          </div>

          <!-- Thumbnail Preview -->
          <div v-if="formData.thumbnail" class="form-group">
            <label class="block mb-2 font-medium text-gray-700">Thumbnail Preview</label>
            <img :src="formData.thumbnail" alt="Video Thumbnail" class="h-32 object-cover rounded-lg border" />
          </div>

          <!-- Submit Buttons -->
          <div class="flex space-x-3 pt-4">
            <button type="button" @click="closeModal" 
                    class="flex-1 px-4 py-2 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors">
              Cancel
            </button>
            <button type="submit" 
                    :disabled="mainStore.loading"
                    class="flex-1 px-4 py-2 bg-gradient-to-r from-blue-500 to-purple-600 text-white rounded-lg hover:from-blue-600 hover:to-purple-700 transition-colors disabled:opacity-50">
              {{ mainStore.loading ? 'Saving...' : (showEditModal ? 'Update Video' : 'Add Video') }}
            </button>
          </div>
        </form>
      </div>
    </div>
  </div>
</template>
  
  <script setup>
import { ref, reactive, onMounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { useToast } from 'vue-toastification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlus, faPlay, faEdit, faTrash, faTimes, faVideo, faExclamationTriangle 
} from '@fortawesome/free-solid-svg-icons'
import { storeToRefs } from 'pinia'

// Add icons to library
library.add(faPlus, faPlay, faEdit, faTrash, faTimes, faVideo, faExclamationTriangle)

// Get the main store
const toast = useToast()
const mainStore = useMainStore()
const { featuredVideos } = storeToRefs(mainStore)

const videos = ref([])
// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const editingIndex = ref(-1)

// Form data state
const formData = reactive({
  title: '',
  description: '',
  youtubeUrl: '',
  duration: '',
  views: '',
  thumbnail: ''
})

// Extract YouTube video ID and generate thumbnail
const extractVideoId = () => {
  if (!formData.youtubeUrl) return
  
  const videoId = getYouTubeVideoId(formData.youtubeUrl)
  if (videoId) {
    formData.thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }
}

// Get YouTube video ID from URL
const getYouTubeVideoId = (url) => {
  const regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#&?]*).*/
  const match = url.match(regExp)
  return (match && match[7].length === 11) ? match[7] : null
}

// Format date
const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Reset form
const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.youtubeUrl = ''
  formData.duration = ''
  formData.views = ''
  formData.thumbnail = ''
}

// Close modal
const closeModal = () => {
  showAddModal.value = false
  showEditModal.value = false
  editingIndex.value = -1
  resetForm()
}

// Edit video
const editVideo = (video, index) => {
  editingIndex.value = index
  formData.title = video.title
  formData.description = video.description
  formData.youtubeUrl = video.youtubeUrl
  formData.duration = video.duration
  formData.views = video.views
  formData.thumbnail = video.thumbnail
  showEditModal.value = true
}

// Delete video
const deleteVideo = async (index) => {
  if (confirm('Are you sure you want to delete this video?')) {
    const videoToDelete = videos.value[index]
    
    try {
      const result = await mainStore.deleteFeaturedVideo(videoToDelete.id)
      
      if (result.success) {
        videos.value.splice(index, 1)
        toast.success('Video deleted successfully')
      } else {
        toast.error(result.message || 'Failed to delete video')
      }
    } catch (error) {
      console.error('Error deleting video:', error)
      toast.error('Failed to delete video. Please try again.')
    }
  }
}

// Form submission handler
const handleSubmit = async () => {
  // Check video limit for new videos
  if (!showEditModal.value && videos.value.length >= 7) {
    toast.error('Maximum 7 videos allowed')
    return
  }

  // Validate YouTube URL
  const videoId = getYouTubeVideoId(formData.youtubeUrl)
  if (!videoId) {
    toast.error('Please enter a valid YouTube URL')
    return
  }

  // Ensure thumbnail is set
  if (!formData.thumbnail) {
    formData.thumbnail = `https://img.youtube.com/vi/${videoId}/maxresdefault.jpg`
  }

  const videoData = {
    title: formData.title,
    description: formData.description,
    youtubeUrl: formData.youtubeUrl,
    duration: formData.duration,
    views: formData.views,
    thumbnail: formData.thumbnail,
    createdAt: showEditModal.value ? videos.value[editingIndex.value].createdAt : new Date()
  }

  try {
    let result;
    
    if (showEditModal.value) {
      // Update existing video - send only the updated video data with its ID
      const updatedVideo = { 
        ...videoData, 
        id: videos.value[editingIndex.value].id 
      }
      
      result = await mainStore.updateFeaturedVideo(updatedVideo)
      
      if (result.success) {
        // Update local data
        videos.value[editingIndex.value] = updatedVideo
        toast.success('Video updated successfully')
      }
    } else {
      // disabling the add video button as of now
      // Add new video - send only the new video data
      // result = await mainStore.addFeaturedVideo(videoData)
      
      // if (result.success) {
      //   // Add to local data with the ID returned from server
      //   const newVideo = { ...videoData, id: result.data.id || Date.now() }
      //   videos.value.push(newVideo)
      //   toast.success('Video added successfully')
      // }
    }
    
    if (!result.success) {
      toast.error(result.message)
      return
    }
    
    closeModal()
    
  } catch (error) {
    console.error('Error saving video:', error)
    toast.error('Failed to save video. Please try again.')
  }
}

onMounted(async () => {
  const result = await mainStore.fetchFeaturedVideos()
  if (result.success) {
    videos.value = result.data || []
  }
})
</script>

  <style scoped>
/* Custom line clamp for text truncation */
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Modal max height */
.max-h-90vh {
  max-height: 90vh;
}

/* Smooth transitions */
.transition-colors {
  transition-property: color, background-color, border-color, text-decoration-color, fill, stroke;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-shadow {
  transition-property: box-shadow;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Focus states for better accessibility */
input:focus, textarea:focus, select:focus {
  outline: 2px solid transparent;
  outline-offset: 2px;
}

/* Custom scrollbar for modal */
.overflow-y-auto::-webkit-scrollbar {
  width: 4px;
}

.overflow-y-auto::-webkit-scrollbar-track {
  background: #f1f5f9;
}

.overflow-y-auto::-webkit-scrollbar-thumb {
  background: #cbd5e1;
  border-radius: 2px;
}

.overflow-y-auto::-webkit-scrollbar-thumb:hover {
  background: #94a3b8;
}
</style>