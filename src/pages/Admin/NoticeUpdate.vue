<template>
  <div class="max-w-2xl mx-auto p-6">
    <div class="bg-white rounded-xl shadow-lg border border-gray-200 overflow-hidden">
      <!-- Header -->
      <div class="bg-gradient-to-r from-blue-500 to-purple-600 px-6 py-4">
        <h2 class="text-xl font-semibold text-white flex items-center gap-2">
          <svg class="w-5 h-5" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M11 5H6a2 2 0 00-2 2v11a2 2 0 002 2h11a2 2 0 002-2v-5m-1.414-9.414a2 2 0 112.828 2.828L11.828 15H9v-2.828l8.586-8.586z"></path>
          </svg>
          Official Notice Editor
        </h2>
      </div>

      <!-- Content -->
      <div class="p-6 space-y-4">
        <!-- Textarea -->
        <div class="relative">
          <label for="official-notice" class="block text-sm font-medium text-gray-700 mb-2">
            Official Notice Content
          </label>
          <textarea
            id="official-notice"
            v-model="noticeText"
            :disabled="adminStore.loading"
            class="w-full px-4 py-3 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent transition-all duration-200 resize-none shadow-sm"
            :class="{
              'bg-gray-50 cursor-not-allowed': adminStore.loading
            }"
            rows="6"
            placeholder="Enter your official notice content here..."
          />
          
          <!-- Character count -->
          <div class="absolute bottom-3 right-3 text-xs text-gray-400">
            {{ noticeText.length }} characters
          </div>
        </div>

        <!-- Action Buttons -->
        <div class="flex gap-3 pt-2">
          <button
            @click="updateOfficialNotice"
            :disabled="adminStore.loading || !hasChanges"
            class="flex-1 bg-gradient-to-r from-blue-500 to-purple-600 text-white px-6 py-3 rounded-lg font-medium transition-all duration-200 flex items-center justify-center gap-2 shadow-md hover:shadow-lg"
            :class="{
              'opacity-50 cursor-not-allowed': adminStore.loading || !hasChanges,
              'hover:from-blue-600 hover:to-purple-700 transform hover:-translate-y-0.5': !adminStore.loading && hasChanges
            }"
          >
            <svg v-if="adminStore.loading" class="w-4 h-4 animate-spin" viewBox="0 0 24 24">
              <circle class="opacity-25" cx="12" cy="12" r="10" stroke="currentColor" stroke-width="4" fill="none"></circle>
              <path class="opacity-75" fill="currentColor" d="M4 12a8 8 0 018-8V0C5.373 0 0 5.373 0 12h4zm2 5.291A7.962 7.962 0 014 12H0c0 3.042 1.135 5.824 3 7.938l3-2.647z"></path>
            </svg>
            <svg v-else class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 16v1a3 3 0 003 3h10a3 3 0 003-3v-1m-4-8l-4-4m0 0L8 8m4-4v12"></path>
            </svg>
            {{ adminStore.loading ? 'Updating...' : 'Update Notice' }}
          </button>

          <button
            @click="resetText"
            :disabled="adminStore.loading"
            class="px-6 py-3 border border-gray-300 text-gray-700 rounded-lg font-medium hover:bg-gray-50 transition-all duration-200 flex items-center gap-2"
            :class="{ 'opacity-50 cursor-not-allowed': adminStore.loading }"
          >
            <svg class="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path stroke-linecap="round" stroke-linejoin="round" stroke-width="2" d="M4 4v5h.582m15.356 2A8.001 8.001 0 004.582 9m0 0H9m11 11v-5h-.581m0 0a8.003 8.003 0 01-15.357-2m15.357 2H15"></path>
            </svg>
            Reset
          </button>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { useAdminStore } from '@/stores/adminStore';
import { ref, computed, onMounted } from 'vue'
import { useToast } from 'vue-toastification'


// Reactive state
const noticeText = ref('');
const originalText = ref('');
const toast = useToast();
const adminStore = useAdminStore();


// Computed properties
const hasChanges = computed(() => {
  return noticeText.value.trim() !== originalText.value.trim()
})

// Functions
const updateOfficialNotice = async () => {
  const result = await adminStore.updateOfficialNotice({name:'official_notice', value: {official_notice: noticeText.value}});
  if(!result.success){
    toast.error("Official Notice has been Updated!");
  } else {
    toast.success(result.message);
  }
}

const resetText = () => {
  noticeText.value = originalText.value
}
</script>

<style scoped>
.fade-enter-active, .fade-leave-active {
  transition: opacity 0.3s ease;
}
.fade-enter-from, .fade-leave-to {
  opacity: 0;
}
</style>