<template>
  <div class="min-h-screen bg-gray-50">
    <!-- Header -->
    <div class="bg-white shadow-sm border-b border-gray-200 p-6">
      <div class="flex items-center justify-between">
        <div>
          <h1 class="text-2xl font-bold text-gray-900">Expert Video Management</h1>
          <p class="text-sm text-gray-600 mt-1">Upload and manage premium expert videos</p>
        </div>
        <button @click="showAddModal = true" 
                class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-4 py-2 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-colors flex items-center">
          <font-awesome-icon icon="plus" class="mr-2" />
          Upload Video
        </button>
      </div>
    </div>

    <!-- Videos List -->
    <div class="p-6">
      <div v-if="videos.length === 0" class="text-center py-12">
        <div class="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
          <font-awesome-icon icon="video" class="text-gray-400 text-4xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No Expert Videos</h3>
        <p class="text-gray-500 mb-4">Upload your first expert video to get started</p>
        <button @click="showAddModal = true" 
                class="bg-gradient-to-r from-purple-500 to-indigo-600 text-white px-6 py-3 rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-colors">
          Upload Video
        </button>
      </div>

      <div v-else class="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div v-for="(video, index) in videos" :key="video.id || index" 
             class="bg-white rounded-xl shadow-sm border border-gray-200 overflow-hidden hover:shadow-lg transition-shadow">
          
          <!-- Video Thumbnail -->
          <div class="relative">
            <img :src="displayImage(video.thumbnail)" 
                 :alt="video.title" 
                 class="w-full h-48 object-cover" />
            
            <!-- Premium Badge -->
            <div class="absolute top-2 left-2 bg-gradient-to-r from-yellow-500 to-orange-500 text-white text-xs px-2 py-1 rounded font-medium flex items-center">
              <font-awesome-icon icon="crown" class="mr-1" />
              PREMIUM
            </div>
            
            <!-- Play Button Overlay -->
            <div @click="playVideo(video)" class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-opacity-40 transition-all">
              <div class="bg-purple-600 rounded-full p-3 hover:bg-purple-700 transform hover:scale-110 transition-all">
                <font-awesome-icon icon="play" class="text-white text-xl" />
              </div>
            </div>
            
            <!-- Duration Badge -->
            <div class="absolute top-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
              {{ video.duration }}
            </div>
            
            <!-- Status Indicators -->
            <div class="absolute bottom-2 left-2 flex space-x-1">
              <span v-if="video.is_active" class="bg-green-500 text-white text-xs px-2 py-1 rounded-full">
                Active
              </span>
              <span v-else class="bg-red-500 text-white text-xs px-2 py-1 rounded-full">
                Inactive
              </span>
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
            
            <!-- Video Stats -->
            <div class="flex items-center justify-between text-xs text-gray-500 mb-4">
              <span class="flex items-center">
                <font-awesome-icon icon="eye" class="mr-1" />
                {{ video.views }} views
              </span>
              <span class="flex items-center">
                <font-awesome-icon icon="calendar" class="mr-1" />
                {{ formatDate(video.created_at) }}
              </span>
            </div>

            <!-- Video URL Display -->
            <div v-if="video.videoUrl" class="mb-4">
              <p class="text-xs text-gray-500 mb-1">Video URL:</p>
              <div class="bg-gray-50 p-2 rounded text-xs text-gray-700 break-all">
                {{ video.videoUrl }}
              </div>
            </div>

            <!-- Action Buttons -->
            <div class="flex space-x-2">
              <button @click="editVideo(video, index)" 
                      class="flex-1 bg-blue-500 text-white py-2 px-4 rounded-lg hover:bg-blue-600 transition-colors text-sm font-medium">
                <font-awesome-icon icon="edit" class="mr-2" />
                Edit
              </button>
              <button @click="toggleStatus(video, index)" 
                      :class="video.is_active ? 'bg-orange-500 hover:bg-orange-600' : 'bg-green-500 hover:bg-green-600'"
                      class="px-4 py-2 text-white rounded-lg transition-colors text-sm font-medium">
                <font-awesome-icon :icon="video.is_active ? 'pause' : 'play'" class="mr-2" />
                {{ video.is_active ? 'Deactivate' : 'Activate' }}
              </button>
              <button @click="deleteVideo(index)" 
                      class="bg-red-500 text-white py-2 px-4 rounded-lg hover:bg-red-600 transition-colors text-sm font-medium">
                <font-awesome-icon icon="trash" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>

    <!-- Upload/Edit Modal -->
    <div v-if="showAddModal || showEditModal" 
         class="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl max-w-3xl w-full max-h-90vh overflow-y-auto">
        <div class="flex justify-between items-center p-6 border-b border-gray-200">
          <h3 class="text-xl font-bold text-gray-900">
            {{ showEditModal ? 'Edit Expert Video' : 'Upload Expert Video' }}
          </h3>
          <button @click="closeModal" class="text-gray-400 hover:text-gray-600">
            <font-awesome-icon icon="times" class="text-xl" />
          </button>
        </div>
        
        <form @submit.prevent="handleSubmit" class="p-6 space-y-6">
          <!-- Video Upload Section -->
          <div v-if="!showEditModal" class="form-group">
            <label class="block mb-2 font-medium text-gray-700">Video File *</label>
            <div class="border-2 border-dashed border-gray-300 rounded-lg p-6 text-center hover:border-purple-400 transition-colors">
              <input
                type="file"
                ref="videoFileInput"
                @change="handleVideoUpload"
                accept="video/*"
                class="hidden"
                required
              />
              
              <div v-if="!formData.videoFile" @click="$refs.videoFileInput.click()" class="cursor-pointer">
                <font-awesome-icon icon="cloud-upload-alt" class="text-4xl text-gray-400 mb-2" />
                <p class="text-gray-600 mb-1">Click to upload video file</p>
                <p class="text-xs text-gray-500">Supported formats: MP4, MOV, AVI (Max: 50MB)</p>
              </div>
              
              <div v-else class="text-green-600">
                <font-awesome-icon icon="check-circle" class="text-2xl mb-2" />
                <p class="font-medium">{{ formData.videoFile.name }}</p>
                <p class="text-xs text-gray-500">{{ formatFileSize(formData.videoFile.size) }}</p>
                <button @click="clearVideoFile" type="button" class="mt-2 text-red-500 hover:text-red-700 text-sm">
                  Remove File
                </button>
              </div>
            </div>
          </div>

          <!-- Thumbnail Upload Section -->
          <div class="form-group">
            <label class="block mb-2 font-medium text-gray-700">Thumbnail Image *</label>
            <div class="flex space-x-4">
              <div class="flex-1">
                <div class="border-2 border-dashed border-gray-300 rounded-lg p-4 text-center hover:border-purple-400 transition-colors">
                  <input
                    type="file"
                    ref="thumbnailFileInput"
                    @change="handleThumbnailUpload"
                    accept="image/*"
                    class="hidden"
                    :required="!showEditModal"
                  />
                  
                  <div v-if="!thumbnailPreview" @click="$refs.thumbnailFileInput.click()" class="cursor-pointer">
                    <font-awesome-icon icon="image" class="text-2xl text-gray-400 mb-2" />
                    <p class="text-gray-600 text-sm">Upload thumbnail</p>
                    <p class="text-xs text-gray-500">JPG, PNG (Max: 5MB)</p>
                  </div>
                  
                  <div v-else class="relative">
                    <img :src="thumbnailPreview" alt="Thumbnail Preview" class="w-full h-24 object-cover rounded" />
                    <button @click="clearThumbnail" type="button" 
                            class="absolute top-1 right-1 bg-red-500 text-white rounded-full p-1 text-xs hover:bg-red-600">
                      <font-awesome-icon icon="times" />
                    </button>
                  </div>
                </div>
              </div>
            </div>
          </div>

          <!-- Title -->
          <div class="form-group">
            <label for="title" class="block mb-2 font-medium text-gray-700">Video Title *</label>
            <input
              id="title"
              v-model="formData.title"
              type="text"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
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
              rows="4"
              class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
              placeholder="Enter video description"
            ></textarea>
          </div>

          <!-- Duration and Views Row -->
          <div class="grid grid-cols-1 md:grid-cols-2 gap-4">
            <!-- Duration -->
            <div class="form-group">
              <label for="duration" class="block mb-2 font-medium text-gray-700">Duration *</label>
              <input
                id="duration"
                v-model="formData.duration"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., 15:30"
                required
              />
            </div>

            <!-- Views -->
            <div class="form-group">
              <label for="views" class="block mb-2 font-medium text-gray-700">Initial Views</label>
              <input
                id="views"
                v-model="formData.views"
                type="text"
                class="w-full px-3 py-2 border border-gray-300 rounded-lg focus:outline-none focus:ring-2 focus:ring-purple-500 focus:border-purple-500"
                placeholder="e.g., 0 or 1.2K"
              />
            </div>
          </div>

          <!-- Status Toggle -->
          <div class="form-group">
            <label class="flex items-center">
              <input
                v-model="formData.is_active"
                type="checkbox"
                class="w-4 h-4 text-purple-600 bg-gray-100 border-gray-300 rounded focus:ring-purple-500 focus:ring-2"
              />
              <span class="ml-2 text-sm font-medium text-gray-700">Make video active immediately</span>
            </label>
          </div>

          <!-- Submit Buttons -->
          <div class="flex space-x-3 pt-4 border-t border-gray-200">
            <button type="button" @click="closeModal" 
                    class="flex-1 px-4 py-3 bg-gray-200 text-gray-800 rounded-lg hover:bg-gray-300 transition-colors font-medium">
              Cancel
            </button>
            <button type="submit" 
                    :disabled="uploading"
                    class="flex-1 px-4 py-3 bg-gradient-to-r from-purple-500 to-indigo-600 text-white rounded-lg hover:from-purple-600 hover:to-indigo-700 transition-colors disabled:opacity-50 font-medium">
              <span v-if="uploading" class="flex items-center justify-center">
                <svg class="animate-spin -ml-1 mr-2 h-4 w-4 text-white" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                  <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                  <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
                </svg>
                {{ showEditModal ? 'Updating...' : 'Uploading...' }}
              </span>
              <span v-else>
                {{ showEditModal ? 'Update Video' : 'Upload Video' }}
              </span>
            </button>
          </div>
        </form>
      </div>
    </div>

    <!-- Video Player Modal -->
    <div v-if="showVideoModal" 
         class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-black rounded-xl max-w-4xl w-full max-h-90vh overflow-hidden relative">
        <!-- Close Button -->
        <button @click="closeVideoModal" 
                class="absolute top-4 right-4 z-10 bg-black bg-opacity-50 text-white rounded-full p-2 hover:bg-opacity-75 transition-opacity">
          <font-awesome-icon icon="times" class="text-xl" />
        </button>
        
        <!-- Video Title -->
        <div class="absolute top-4 left-4 z-10 bg-black bg-opacity-50 text-white px-4 py-2 rounded-lg">
          <h3 class="text-lg font-bold">{{ currentVideo?.title }}</h3>
        </div>
        
        <!-- Video Player -->
        <div class="relative">
          <video 
            v-if="currentVideo && currentVideo.videoUrl"
            ref="videoPlayer"
            class="w-full h-auto max-h-[80vh]"
            controls
            autoplay
            preload="metadata"
            @loadedmetadata="onVideoLoaded"
            @error="onVideoError"
          >
            <source :src="getVideoUrl(currentVideo.videoUrl)" type="video/mp4">
            <source :src="getVideoUrl(currentVideo.videoUrl)" type="video/webm">
            <source :src="getVideoUrl(currentVideo.videoUrl)" type="video/ogg">
            Your browser does not support the video tag.
          </video>
          
          <!-- Video Loading State -->
          <div v-if="videoLoading" class="absolute inset-0 flex items-center justify-center bg-black">
            <div class="text-center text-white">
              <svg class="animate-spin h-12 w-12 text-white mx-auto mb-4" xmlns="http://www.w3.org/2000/svg" fill="none" viewBox="0 0 24 24">
                <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4"></circle>
                <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
              </svg>
              <p>Loading video...</p>
            </div>
          </div>
          
          <!-- Video Error State -->
          <div v-if="videoError" class="absolute inset-0 flex items-center justify-center bg-black text-white text-center p-8">
            <div>
              <font-awesome-icon icon="exclamation-triangle" class="text-4xl text-red-500 mb-4" />
              <h3 class="text-xl font-bold mb-2">Video Not Available</h3>
              <p class="text-gray-300 mb-4">Sorry, this video cannot be played at the moment.</p>
              <p class="text-sm text-gray-400">Video URL: {{ currentVideo?.videoUrl }}</p>
            </div>
          </div>
          
          <!-- No Video URL State -->
          <div v-if="currentVideo && !currentVideo.videoUrl" class="flex items-center justify-center bg-gray-900 text-white text-center p-8 h-64">
            <div>
              <font-awesome-icon icon="video" class="text-4xl text-gray-500 mb-4" />
              <h3 class="text-xl font-bold mb-2">No Video URL</h3>
              <p class="text-gray-300">This video doesn't have a playable URL configured.</p>
            </div>
          </div>
        </div>
        
        <!-- Video Info -->
        <div class="absolute bottom-0 left-0 right-0 bg-gradient-to-t from-black to-transparent text-white p-6">
          <div class="flex items-center justify-between">
            <div>
              <p class="text-sm text-gray-300 mb-1">{{ currentVideo?.description }}</p>
              <div class="flex items-center space-x-4 text-sm text-gray-400">
                <span class="flex items-center">
                  <font-awesome-icon icon="clock" class="mr-1" />
                  {{ currentVideo?.duration }}
                </span>
                <span class="flex items-center">
                  <font-awesome-icon icon="eye" class="mr-1" />
                  {{ currentVideo?.views }} views
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, reactive, onMounted, onUnmounted } from 'vue'
import { useMainStore } from '@/stores/mainStore'
import { useToast } from 'vue-toastification'
import { library } from '@fortawesome/fontawesome-svg-core'
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome'
import { 
  faPlus, faPlay, faEdit, faTrash, faTimes, faVideo, faCrown,
  faEye, faCalendar, faPause, faCloudUploadAlt, faImage,
  faCheckCircle, faClock, faExclamationTriangle
} from '@fortawesome/free-solid-svg-icons'

// Add icons to library
library.add(
  faPlus, faPlay, faEdit, faTrash, faTimes, faVideo, faCrown,
  faEye, faCalendar, faPause, faCloudUploadAlt, faImage,
  faCheckCircle, faClock, faExclamationTriangle
)

// Get the main store
const mainStore = useMainStore()
const toast = useToast()

// Videos data
const videos = ref([])

// Modal states
const showAddModal = ref(false)
const showEditModal = ref(false)
const showVideoModal = ref(false)
const editingIndex = ref(-1)
const uploading = ref(false)

// Video player states
const currentVideo = ref(null)
const videoLoading = ref(false)
const videoError = ref(false)
const videoPlayer = ref(null)

// Form data state
const formData = reactive({
  title: '',
  description: '',
  duration: '',
  views: '0',
  is_active: true,
  is_premium: true, // Always true for expert videos
  is_featured: false, // Always false for expert videos
  videoFile: null,
  thumbnailFile: null
})

// File previews
const thumbnailPreview = ref(null)

// Handle video file upload
const handleVideoUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (50MB limit - more realistic for server upload limits)
    if (file.size > 50 * 1024 * 1024) {
      toast.error('Video file size must be less than 50MB. Please compress your video before uploading.')
      return
    }
    
    // Check file type
    const allowedTypes = ['video/mp4', 'video/mov', 'video/avi', 'video/quicktime']
    if (!allowedTypes.includes(file.type)) {
      toast.error('Please upload a valid video file (MP4, MOV, or AVI)')
      return
    }
    
    formData.videoFile = file
  }
}

// Handle thumbnail upload
const handleThumbnailUpload = (event) => {
  const file = event.target.files[0]
  if (file) {
    // Check file size (5MB limit)
    if (file.size > 5 * 1024 * 1024) {
      toast.error('Thumbnail file size must be less than 5MB')
      return
    }
    
    formData.thumbnailFile = file
    
    // Create thumbnail preview
    const reader = new FileReader()
    reader.onload = (e) => {
      thumbnailPreview.value = e.target.result
    }
    reader.readAsDataURL(file)
  }
}

// Clear video file
const clearVideoFile = () => {
  formData.videoFile = null
  const fileInput = document.querySelector('input[type="file"][accept="video/*"]')
  if (fileInput) fileInput.value = ''
}

// Clear thumbnail
const clearThumbnail = () => {
  formData.thumbnailFile = null
  thumbnailPreview.value = null
  const fileInput = document.querySelector('input[type="file"][accept="image/*"]')
  if (fileInput) fileInput.value = ''
}

// Format file size
const formatFileSize = (bytes) => {
  if (bytes === 0) return '0 Bytes'
  const k = 1024
  const sizes = ['Bytes', 'KB', 'MB', 'GB']
  const i = Math.floor(Math.log(bytes) / Math.log(k))
  return parseFloat((bytes / Math.pow(k, i)).toFixed(2)) + ' ' + sizes[i]
}

// Display image helper
const displayImage = (imagePath) => {
  if (!imagePath) return '/images/fallbackImage.png'
  if (imagePath.startsWith('http')) return imagePath
  return `${import.meta.env.VITE_BASE_API}/storage/${imagePath}`
}

// Get video URL helper
const getVideoUrl = (videoPath) => {
  if (!videoPath) return null
  if (videoPath.startsWith('http')) return videoPath
  return `${import.meta.env.VITE_BASE_API}/storage/${videoPath}`
}

// Play video function
const playVideo = (video) => {
  currentVideo.value = video
  videoLoading.value = true
  videoError.value = false
  showVideoModal.value = true
}

// Close video modal
const closeVideoModal = () => {
  showVideoModal.value = false
  currentVideo.value = null
  videoLoading.value = false
  videoError.value = false
  
  // Pause video if playing
  if (videoPlayer.value) {
    videoPlayer.value.pause()
    videoPlayer.value.currentTime = 0
  }
}

// Video loaded event
const onVideoLoaded = () => {
  videoLoading.value = false
  videoError.value = false
}

// Video error event
const onVideoError = (event) => {
  console.error('Video loading error:', event)
  videoLoading.value = false
  videoError.value = true
  toast.error('Failed to load video. Please check the video URL.')
}

// Format date
const formatDate = (dateString) => {
  if (!dateString) return 'N/A'
  return new Date(dateString).toLocaleDateString('en-US', {
    year: 'numeric',
    month: 'short',
    day: 'numeric'
  })
}

// Reset form
const resetForm = () => {
  formData.title = ''
  formData.description = ''
  formData.duration = ''
  formData.views = '0'
  formData.is_active = true
  formData.videoFile = null
  formData.thumbnailFile = null
  thumbnailPreview.value = null
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
  formData.duration = video.duration
  formData.views = video.views
  formData.is_active = video.is_active
  
  // Set thumbnail preview if exists
  if (video.thumbnail) {
    thumbnailPreview.value = displayImage(video.thumbnail)
  }
  
  showEditModal.value = true
}

// Toggle video status
const toggleStatus = async (video, index) => {
  try {
    const result = await mainStore.toggleExpertVideoStatus(video.id)
    
    if (result.success) {
      videos.value[index].is_active = !videos.value[index].is_active
      toast.success(`Video ${videos.value[index].is_active ? 'activated' : 'deactivated'} successfully`)
    } else {
      toast.error(result.message || 'Failed to update video status')
    }
  } catch (error) {
    console.error('Error toggling video status:', error)
    toast.error('Failed to update video status')
  }
}

// Delete video
const deleteVideo = async (index) => {
  if (confirm('Are you sure you want to delete this video? This action cannot be undone.')) {
    const videoToDelete = videos.value[index]
    
    try {
      const result = await mainStore.deleteExpertVideo(videoToDelete.id)
      
      if (result.success) {
        videos.value.splice(index, 1)
        toast.success('Video deleted successfully')
      } else {
        toast.error(result.message || 'Failed to delete video')
      }
    } catch (error) {
      console.error('Error deleting video:', error)
      toast.error('Failed to delete video')
    }
  }
}

// Form submission handler
const handleSubmit = async () => {
  uploading.value = true
  
  try {
    const payload = new FormData()
    
    // Add form fields
    payload.append('title', formData.title)
    payload.append('description', formData.description)
    payload.append('duration', formData.duration)
    payload.append('views', formData.views || '0')
    payload.append('is_active', formData.is_active ? '1' : '0')
    payload.append('is_premium', '1') // Always premium
    payload.append('is_featured', '0') // Never featured
    
    // Add files
    if (formData.videoFile) {
      payload.append('video', formData.videoFile)
    }
    
    if (formData.thumbnailFile) {
      payload.append('thumbnail', formData.thumbnailFile)
    }
    
    let result;
    
    if (showEditModal.value) {
      // Update existing video - add video ID to payload
      payload.append('video_id', videos.value[editingIndex.value].id)
      result = await mainStore.updateExpertVideo(videos.value[editingIndex.value].id, payload)
    } else {
      // Create new video
      result = await mainStore.createExpertVideo(payload)
    }
    
    if (result.success) {
      toast.success(showEditModal.value ? 'Video updated successfully' : 'Video uploaded successfully')
      closeModal()
      
      // Refresh videos list
      await fetchVideos()
    } else {
      // Handle validation errors
      if (result.errors) {
        Object.values(result.errors).flat().forEach(error => {
          toast.error(error)
        })
      } else {
        toast.error(result.message || 'Operation failed')
      }
    }
    
  } catch (error) {
    console.error('Error submitting form:', error)
    toast.error('An error occurred. Please try again.')
  } finally {
    uploading.value = false
  }
}

// Fetch videos
const fetchVideos = async () => {
  try {
    const result = await mainStore.fetchExpertVideos()
    if (result.success) {
      videos.value = result.data
    }
  } catch (error) {
    console.error('Error fetching videos:', error)
  }
}

// Load videos on component mount
onMounted(async () => {
  await fetchVideos()
})

// Handle keyboard shortcuts
const handleKeydown = (event) => {
  if (event.key === 'Escape') {
    if (showVideoModal.value) {
      closeVideoModal()
    } else if (showAddModal.value || showEditModal.value) {
      closeModal()
    }
  }
}

// Add event listener on mount and cleanup on unmount
onMounted(() => {
  document.addEventListener('keydown', handleKeydown)
})

onUnmounted(() => {
  document.removeEventListener('keydown', handleKeydown)
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

/* Video player styles */
video {
  background-color: #000;
  width: 100%;
  height: auto;
}

video::-webkit-media-controls {
  background-color: rgba(0, 0, 0, 0.8);
}

video::-webkit-media-controls-panel {
  background-color: rgba(0, 0, 0, 0.8);
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

.transition-all {
  transition-property: all;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

.transition-opacity {
  transition-property: opacity;
  transition-timing-function: cubic-bezier(0.4, 0, 0.2, 1);
  transition-duration: 150ms;
}

/* Transform utilities */
.transform {
  transform: translateX(var(--tw-translate-x)) translateY(var(--tw-translate-y)) rotate(var(--tw-rotate)) skewX(var(--tw-skew-x)) skewY(var(--tw-skew-y)) scaleX(var(--tw-scale-x)) scaleY(var(--tw-scale-y));
}

.hover\:scale-110:hover {
  --tw-scale-x: 1.1;
  --tw-scale-y: 1.1;
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

/* Loading spinner animation */
@keyframes spin {
  to {
    transform: rotate(360deg);
  }
}

.animate-spin {
  animation: spin 1s linear infinite;
}

/* Video modal backdrop blur effect */
.fixed.inset-0.bg-black.bg-opacity-75 {
  backdrop-filter: blur(4px);
  -webkit-backdrop-filter: blur(4px);
}
</style>
