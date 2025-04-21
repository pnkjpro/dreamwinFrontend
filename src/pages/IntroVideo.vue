<template>
    <div class="intro-container">
      <video ref="introVideo" autoplay muted playsinline @ended="goToHome">
        <source src="/videos/himpri_intro.mp4" type="video/mp4" />
        Your browser does not support the video tag.
      </video>
    </div>
  </template>
  
  <script setup>
  import { onMounted, ref } from 'vue'
  import { useRouter } from 'vue-router'
  
  const router = useRouter()
  const introVideo = ref(null)
  
  const goToHome = () => {
    sessionStorage.setItem('seenIntro', 'true')
    router.replace('/home')
  }
  
  onMounted(() => {
    // Fallback in case video doesn't trigger 'ended'
    setTimeout(goToHome, 2500)
  })
  </script>
  
  <style scoped>
  .intro-container {
    width: 100vw;
    height: 100vh;
    background: black;
    display: flex;
    align-items: center;
    justify-content: center;
  }
  
  video {
    max-width: 100%;
    max-height: 100%;
  }
  </style>
  