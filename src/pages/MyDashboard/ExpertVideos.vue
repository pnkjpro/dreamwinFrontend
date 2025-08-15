<template>
  <div class="min-h-screen bg-gradient-to-b from-orange-50 via-red-50 to-orange-50">
    <!-- Header -->
    <header class="flex justify-between items-center p-4 bg-gradient-to-r from-orange-600 to-red-600 text-white shadow-lg">
      <button @click="goBack" class="p-3 rounded-full bg-red-500 hover:bg-red-400 transition-colors shadow-md">
        <font-awesome-icon icon="arrow-left" class="text-xl text-white" />
      </button>
      <h1 class="text-xl font-bold">Expert Videos</h1>
      <div class="w-12"></div> <!-- Spacer for centering -->
    </header>

    <!-- Video Player Modal -->
    <div v-if="showVideoPlayer" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl overflow-hidden max-w-4xl w-full max-h-full">
        <div class="flex justify-between items-center p-4 bg-gradient-to-r from-red-600 to-orange-600 text-white">
          <h3 class="text-lg font-bold">{{ currentVideo.title }}</h3>
          <button @click="closeVideoPlayer" class="p-2 hover:bg-red-500 rounded-full transition-colors">
            <font-awesome-icon icon="times" class="text-xl" />
          </button>
        </div>
        <div class="relative">
          <video 
            ref="videoPlayer"
            controls 
            preload="metadata"
            class="w-full max-h-96 bg-black"
            @loadedmetadata="onVideoLoaded"
            @ended="onVideoEnded"
          >
            <source :src="currentVideo.videoUrl" type="video/mp4">
            Your browser does not support the video tag.
          </video>
        </div>
        <div class="p-4">
          <p class="text-gray-700 text-sm mb-2">{{ currentVideo.description }}</p>
          <div class="flex items-center text-xs text-gray-500">
            <span class="mr-4">Duration: {{ currentVideo.duration }}</span>
            <span>Category: {{ currentVideo.category }}</span>
          </div>
        </div>
      </div>
    </div>

    <!-- Purchase Modal -->
    <div v-if="showPurchaseModal" class="fixed inset-0 bg-black bg-opacity-75 flex items-center justify-center z-50 p-4">
      <div class="bg-white rounded-xl p-6 max-w-md w-full">
        <div class="text-center mb-6">
          <div class="bg-gradient-to-r from-red-500 to-orange-500 rounded-full p-4 w-16 h-16 mx-auto mb-4">
            <font-awesome-icon icon="lock" class="text-white text-2xl" />
          </div>
          <h3 class="text-xl font-bold text-gray-900 mb-2">Premium Content</h3>
          <p class="text-gray-600">This video is part of our premium collection</p>
        </div>
        
        <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-lg mb-6">
          <h4 class="font-bold text-lg text-gray-900 mb-2">{{ selectedVideo.title }}</h4>
          <div class="flex items-center justify-between">
            <span class="text-gray-600">Price:</span>
            <span class="text-2xl font-bold text-green-600">₹{{ selectedVideo.price }}</span>
          </div>
        </div>

        <div class="flex space-x-3">
          <button @click="closePurchaseModal" 
                  class="flex-1 py-3 px-4 bg-gray-200 text-gray-800 rounded-lg font-medium hover:bg-gray-300 transition-colors">
            Cancel
          </button>
          <button @click="purchaseVideo" 
                  :disabled="purchasing"
                  class="flex-1 py-3 px-4 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-colors disabled:opacity-50">
            <span v-if="purchasing">Purchasing...</span>
            <span v-else>Purchase</span>
          </button>
        </div>
      </div>
    </div>

    <!-- Main Content -->
    <div class="p-4">
      <!-- Stats Section -->
      <div class="grid grid-cols-2 gap-4 mb-6">
        <div class="bg-gradient-to-r from-green-50 to-emerald-50 p-4 rounded-xl border border-green-200">
          <div class="flex items-center">
            <div class="bg-green-500 p-3 rounded-full mr-3">
              <font-awesome-icon icon="unlock" class="text-white text-lg" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-green-800">{{ unlockedCount }}</h3>
              <p class="text-green-600 text-sm">Unlocked</p>
            </div>
          </div>
        </div>
        
        <div class="bg-gradient-to-r from-orange-50 to-red-50 p-4 rounded-xl border border-orange-200">
          <div class="flex items-center">
            <div class="bg-orange-500 p-3 rounded-full mr-3">
              <font-awesome-icon icon="lock" class="text-white text-lg" />
            </div>
            <div>
              <h3 class="text-2xl font-bold text-orange-800">{{ lockedCount }}</h3>
              <p class="text-orange-600 text-sm">Locked</p>
            </div>
          </div>
        </div>
      </div>

      <!-- Filter Tabs -->
      <div class="flex mb-6 bg-white rounded-xl p-1 shadow-md">
        <button @click="activeFilter = 'all'" 
                :class="[
                  'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
                  activeFilter === 'all' 
                    ? 'bg-gradient-to-r from-red-500 to-orange-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                ]">
          All Videos
        </button>
        <button @click="activeFilter = 'unlocked'" 
                :class="[
                  'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
                  activeFilter === 'unlocked' 
                    ? 'bg-gradient-to-r from-green-500 to-emerald-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                ]">
          Unlocked
        </button>
        <button @click="activeFilter = 'locked'" 
                :class="[
                  'flex-1 py-3 px-4 rounded-lg font-medium transition-colors',
                  activeFilter === 'locked' 
                    ? 'bg-gradient-to-r from-orange-500 to-red-500 text-white' 
                    : 'text-gray-600 hover:bg-gray-100'
                ]">
          Locked
        </button>
      </div>

      <!-- Videos Grid -->
      <div class="space-y-4">
        <div v-for="video in filteredVideos" :key="video.id" 
             class="bg-white rounded-xl shadow-md overflow-hidden hover:shadow-lg transition-shadow">
          <div class="flex">
            <!-- Video Thumbnail -->
            <div class="relative w-40 h-28 flex-shrink-0">
              <img :src="video.thumbnail" 
                   :alt="video.title" 
                   class="w-full h-full object-cover" />
              
              <!-- Lock Overlay for locked videos -->
              <div v-if="!video.isUnlocked" 
                   class="absolute inset-0 bg-black bg-opacity-60 flex items-center justify-center">
                <div class="bg-red-500 rounded-full p-2">
                  <font-awesome-icon icon="lock" class="text-white text-lg" />
                </div>
              </div>
              
              <!-- Play Button for unlocked videos -->
              <div v-else 
                   @click="playVideo(video)"
                   class="absolute inset-0 bg-black bg-opacity-30 flex items-center justify-center cursor-pointer hover:bg-opacity-50 transition-all">
                <div class="bg-red-600 rounded-full p-3 hover:bg-red-700 transition-colors">
                  <font-awesome-icon icon="play" class="text-white text-xl" />
                </div>
              </div>
              
              <!-- Duration Badge -->
              <div class="absolute bottom-2 right-2 bg-black bg-opacity-75 text-white text-xs px-2 py-1 rounded">
                {{ video.duration }}
              </div>
            </div>

            <!-- Video Info -->
            <div class="flex-1 p-4 flex flex-col justify-between">
              <div>
                <h3 class="text-lg font-bold text-gray-900 mb-1 line-clamp-2">
                  {{ video.title }}
                </h3>
                <p class="text-sm text-gray-600 mb-2 line-clamp-2">
                  {{ video.description }}
                </p>
                <div class="flex items-center text-xs text-gray-500">
                  <span class="bg-gray-100 px-2 py-1 rounded-full mr-2">{{ video.category }}</span>
                  <span>{{ video.difficulty }}</span>
                </div>
              </div>
              
              <!-- Action Button -->
              <div class="mt-3">
                <button v-if="video.purchased" 
                        @click="playVideo(video)"
                        class="w-full py-2 bg-gradient-to-r from-green-500 to-emerald-600 text-white rounded-lg font-medium hover:from-green-600 hover:to-emerald-700 transition-colors flex items-center justify-center">
                  <font-awesome-icon icon="play" class="mr-2" />
                  Watch Now
                </button>
                <button v-else 
                        @click="showPurchase(video)"
                        class="w-full py-2 bg-gradient-to-r from-orange-500 to-red-500 text-white rounded-lg font-medium hover:from-orange-600 hover:to-red-600 transition-colors flex items-center justify-center">
                  <font-awesome-icon icon="shopping-cart" class="mr-2" />
                  Buy for ₹{{ video.price }}
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>

      <!-- Empty State -->
      <div v-if="filteredVideos.length === 0" class="text-center py-12">
        <div class="bg-gray-100 rounded-full p-6 w-24 h-24 mx-auto mb-4">
          <font-awesome-icon icon="video-slash" class="text-gray-400 text-4xl" />
        </div>
        <h3 class="text-xl font-bold text-gray-700 mb-2">No Videos Found</h3>
        <p class="text-gray-500">No videos match the current filter</p>
      </div>
    </div>
  </div>
</template>

<script setup>
import { ref, computed, onMounted } from 'vue';
import { useRouter } from 'vue-router';
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { 
  faArrowLeft, faPlay, faTimes, faLock, faUnlock, 
  faShoppingCart, faVideoSlash
} from '@fortawesome/free-solid-svg-icons';
import { useToast } from 'vue-toastification';
import { useMainStore } from '@/stores/mainStore';

// Add icons to library
library.add(faArrowLeft, faPlay, faTimes, faLock, faUnlock, faShoppingCart, faVideoSlash);

const router = useRouter();
const toast = useToast();

// Reactive variables
const activeFilter = ref('all');
const showVideoPlayer = ref(false);
const showPurchaseModal = ref(false);
const currentVideo = ref(null);
const selectedVideo = ref(null);
const purchasing = ref(false);
const videoPlayer = ref(null);

// Mock video data - replace with actual data from your API
const videos = ref([]);

// Computed properties
const filteredVideos = computed(() => {
  if (activeFilter.value === 'all') return videos.value;
  if (activeFilter.value === 'unlocked') return videos.value.filter(v => v.purchased);
  if (activeFilter.value === 'locked') return videos.value.filter(v => !v.purchased);
  return videos.value;
});

const unlockedCount = computed(() => videos.value.filter(v => v.purchased).length);
const lockedCount = computed(() => videos.value.filter(v => !v.purchased).length);

// Methods
const goBack = () => {
  router.go(-1);
};

const playVideo = (video) => {
  if (!video.purchased) {
    showPurchase(video);
    return;
  }
  currentVideo.value = video;
  showVideoPlayer.value = true;
};

const closeVideoPlayer = () => {
  showVideoPlayer.value = false;
  if (videoPlayer.value) {
    videoPlayer.value.pause();
  }
  currentVideo.value = null;
};

const showPurchase = (video) => {
  selectedVideo.value = video;
  showPurchaseModal.value = true;
};

const closePurchaseModal = () => {
  showPurchaseModal.value = false;
  selectedVideo.value = null;
};

const purchaseVideo = async () => {
  purchasing.value = true;
  
  try {
    const result = await useMainStore().purchaseExpertVideo(selectedVideo.value.id);
    toast.success('Video purchased successfully!');
    closePurchaseModal();
    
  } catch (error) {
    toast.error('Purchase failed. Please try again.');
  } finally {
    purchasing.value = false;
    fetchExpertVideos(); // Refresh the video list after purchase
  }
};

const onVideoLoaded = () => {
  console.log('Video loaded');
};

const onVideoEnded = () => {
  console.log('Video ended');
  // You can add logic here for tracking video completion
};

const fetchExpertVideos = async () => {
  const response = await useMainStore().fetchUserExpertVideos();
  videos.value = response.data.videos.map(video => ({
    ...video,
    purchased: video.purchased || false, // Ensure purchased is set
    videoUrl: video.videoUrl || '/videos/fallback.mp4', // Fallback URL if not provided
    thumbnail: video.thumbnail || '/images/fallbackImage.png' // Fallback thumbnail
  }));
};

onMounted(() => {
  fetchExpertVideos();
});
</script>

<style scoped>
.line-clamp-2 {
  display: -webkit-box;
  -webkit-line-clamp: 2;
  line-clamp: 2;
  -webkit-box-orient: vertical;
  overflow: hidden;
}

/* Custom video player styles */
video::-webkit-media-controls-panel {
  background-color: rgba(0, 0, 0, 0.8);
}

video::-webkit-media-controls-play-button,
video::-webkit-media-controls-volume-slider,
video::-webkit-media-controls-timeline,
video::-webkit-media-controls-current-time-display,
video::-webkit-media-controls-time-remaining-display {
  filter: invert(1);
}
</style>
