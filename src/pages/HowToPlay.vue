<template>
    <div class="min-h-screen bg-orange-500 text-white p-6">
      <!-- Back button at the top -->
      <div class="mb-6">
        <button @click="goBack" class="flex items-center bg-white text-orange-600 px-4 py-2 rounded-lg font-bold hover:bg-orange-200 transition-colors">
          <span class="mr-2">←</span> Back
        </button>
      </div>
  
      <!-- Page header -->
      <h1 class="text-4xl font-bold text-center mb-8">How To Play</h1>
  
      <!-- Video tutorial section -->
      <div class="max-w-4xl mx-auto space-y-10">
        <!-- Tutorial 1 -->
        <div v-for="video in howVideos" class="bg-white rounded-xl shadow-lg overflow-hidden">
          <div class="aspect-w-16 aspect-h-9">
            <!-- YouTube Video Embed -->
            <iframe 
              class="w-full h-64"
              :src="`https://www.youtube.com/embed/${video.youtube_id}`" 
              title="Getting Started Tutorial"
              frameborder="0" 
              allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
              allowfullscreen>
            </iframe>
          </div>
          <div class="p-6 bg-white text-gray-800">
            <h2 class="text-2xl font-bold mb-2">{{ video.title }}</h2>
            <p class="text-gray-600">{{ video.description }}</p>
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { useMainStore } from '@/stores/mainStore';
    import { storeToRefs } from 'pinia';
    import { useRouter } from 'vue-router';
  
  const mainStore = useMainStore();
  const { howVideos } = storeToRefs(mainStore);
  const router = useRouter();
  const goBack = () => {
    router.back();
  };
  </script>
  
  <style scoped>
  /* Adding aspect ratio support for the video containers */
  .aspect-w-16 {
    position: relative;
    padding-bottom: 56.25%; /* 16:9 Aspect Ratio */
  }
  
  .aspect-w-16 iframe {
    position: absolute;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
  }
  </style>