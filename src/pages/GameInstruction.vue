<template>
  <div class="flex flex-col min-h-screen bg-white">
    <!-- Header -->
    <div class="bg-orange-500 text-white p-3 flex items-center">
      <font-awesome-icon icon="arrow-left" class="mr-2" />
      <span class="text-sm">2 h 24m left</span>
    </div>

    <!-- Want to crack quiz section -->
    <div class="px-4 py-3 border-b border-gray-200 flex justify-between items-center">
      <h2 class="font-bold text-base">WANT TO CRACK QUIZ</h2>
      <span class="text-blue-500 text-xs">Click Here to Know</span>
    </div>

    <!-- Sport Quiz Card -->
    <div class="m-4">
      <div class="border border-gray-200 rounded-xl p-6 flex flex-col items-center justify-center">
        <h1 class="text-3xl font-semibold text-gray-600">SPORT QUIZ</h1>
        <p class="text-red-500 text-sm my-2">2 h 24m left</p>
        <!-- Fixed START button with more visible styling -->
        <button class="bg-gray-400 hover:bg-gray-500 text-white font-medium px-8 py-1.5 text-sm mt-1 rounded">
          START
        </button>
      </div>
    </div>

    <!-- Instructions -->
    <div class="px-4 mb-4">
      <h3 class="font-bold text-base mb-3">QUESTION PAPER INSTRUCTIONS!</h3>
      <ol class="space-y-1 text-sm ml-5 list-decimal">
        <li>1 Question at one time</li>
        <li>It Consist of 100 Question</li>
        <li>You cannot solve or correct previous question, once submitted cant be change</li>
        <li>1-20 question of 1 marks each and you will get 25 seconds for each question</li>
        <li>20-40 question of 2 mark and you will get 50 sec for each question</li>
        <li>40-70 question of 5 mark and you will get 1 min 20 sec for each question</li>
        <li>70-100 question of 3 mark and you will get 45 sec for each question</li>
      </ol>
    </div>

    <!-- YouTube Video Embed -->
    <div class="px-4 mb-4">
      <div class="relative w-full overflow-hidden" style="padding-top: 56.25%;">
        <iframe 
          class="absolute top-0 left-0 w-full h-full"
          src="https://www.youtube.com/embed/dQw4w9WgXcQ" 
          title="Tech Quiz Live"
          frameborder="0" 
          allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
          allowfullscreen>
        </iframe>
        <div class="absolute bottom-0 left-0 right-0">
          <div class="flex items-center">
            <div class="bg-yellow-400 text-black font-bold px-3 py-1">
              TECH QUIZ
            </div>
            <div class="bg-red-600 text-white px-2 py-0.5 inline-flex items-center text-sm">
              <font-awesome-icon icon="circle" class="text-xs mr-1" />
              LIVE
            </div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>

<script setup>
import { library } from '@fortawesome/fontawesome-svg-core';
import { FontAwesomeIcon } from '@fortawesome/vue-fontawesome';
import { faArrowLeft, faCircle } from '@fortawesome/free-solid-svg-icons';

// Register FontAwesome icons
library.add(faArrowLeft, faCircle);
</script>