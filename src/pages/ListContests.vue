<template>
    <div class="bg-gray-100 min-h-screen">
      <!-- Header -->
      <header class="bg-white sticky top-0 z-50 border-b border-gray-200">
        <div class="flex justify-between items-center p-4">
          <button class="text-2xl" @click="goBack">
            <span class="inline-block transform rotate-180">→</span>
          </button>
          <h1 class="text-xl font-semibold">All Upcoming Contests</h1>
          <button class="text-xl">
            <span class="inline-block">⚙️</span>
          </button>
        </div>
      </header>
  
      <!-- Category Filters -->
      <div class="bg-white border-b border-gray-200">
        <div class="p-4 overflow-x-auto">
          <div class="flex gap-3">
            <button 
              v-for="category in categories" 
              :key="category.id"
              :class="[
                'px-4 py-2 rounded-full text-sm whitespace-nowrap', 
                selectedCategory === category.id 
                  ? 'bg-indigo-600 text-white' 
                  : 'bg-gray-100 text-gray-700'
              ]"
              @click="selectCategory(category.id)"
            >
              {{ category.name }}
            </button>
          </div>
        </div>
      </div>
  
      <!-- Contest List -->
      <div class="p-4">
        <div v-for="contest in filteredContests" :key="contest.id" class="bg-white rounded-xl shadow mb-4 overflow-hidden">
          <!-- Contest Card -->
          <div class="p-4">
            <!-- Category Tag -->
            <div class="mb-2">
              <span class="bg-purple-100 text-purple-800 text-xs px-3 py-1 rounded-full">
                {{ contest.category }}
              </span>
            </div>
  
            <!-- Contest Info -->
            <div class="flex">
              <img :src="contest.image" alt="Contest image" class="w-20 h-20 rounded-lg object-cover mr-3">
              <div class="flex-1">
                <h3 class="text-lg font-bold text-gray-800">{{ contest.title }}</h3>
                <div class="flex items-center text-red-500 mt-1">
                  <span class="mr-1">📅</span>
                  <span>{{ contest.date }}</span>
                </div>
                <div class="flex items-center text-gray-600 mt-1">
                  <span class="mr-1">🏆</span>
                  <span>Prize ₹ {{ contest.prize }}</span>
                </div>
              </div>
            </div>
          </div>
  
          <!-- Action Button -->
          <div class="bg-orange-500 p-3 text-center text-white font-medium">
            Register Now
          </div>
        </div>
      </div>
    </div>
  </template>
  
  <script>
  export default {
    data() {
      return {
        selectedCategory: 'all',
        categories: [
          { id: 'all', name: 'All Categories' },
          { id: 'sports', name: 'Sports & Games' },
          { id: 'politics', name: 'Politics' },
          { id: 'current', name: 'Current Affairs' },
          { id: 'science', name: 'Science' },
          { id: 'history', name: 'History & Culture' },
          { id: 'food', name: 'Food & Beverage' },
          { id: 'art', name: 'Art & Creativity' },
          { id: 'geography', name: 'World Geography' }
        ],
        contests: [
          {
            id: 1,
            title: 'SPORT QUIZ',
            category: 'Sports & Games',
            date: 'Mon 11:00 Am',
            prize: '10 Lakh',
            image: '/api/placeholder/400/320'
          },
          {
            id: 2,
            title: 'INT. POLITICS',
            category: 'Politics',
            date: 'Sun 11:00 Am',
            prize: '5 Lakh',
            image: '/api/placeholder/400/320'
          },
          {
            id: 3,
            title: 'CURRENT AFFAIR',
            category: 'Current Affairs',
            date: 'Mon 11:00 Am',
            prize: '10 Lakh',
            image: '/api/placeholder/400/320'
          },
          {
            id: 4,
            title: 'HOME SCIENCE',
            category: 'Science',
            date: 'Mon 11:00 Am',
            prize: '10 Lakh',
            image: '/api/placeholder/400/320'
          },
          {
            id: 5,
            title: 'WORLD TRIVIA',
            category: 'World Geography',
            date: 'Tue 3:00 Pm',
            prize: '7 Lakh',
            image: '/api/placeholder/400/320'
          },
          {
            id: 6,
            title: 'ANCIENT HISTORY',
            category: 'History & Culture',
            date: 'Wed 12:00 Pm',
            prize: '8 Lakh',
            image: '/api/placeholder/400/320'
          }
        ]
      }
    },
    computed: {
      filteredContests() {
        if (this.selectedCategory === 'all') {
          return this.contests;
        } else {
          return this.contests.filter(contest => 
            contest.category.toLowerCase().includes(this.selectedCategory.toLowerCase())
          );
        }
      }
    },
    methods: {
      selectCategory(categoryId) {
        this.selectedCategory = categoryId;
      },
      goBack() {
        // In a real app, this would use Vue Router or window history
        console.log('Going back to home page');
      }
    }
  }
  </script>