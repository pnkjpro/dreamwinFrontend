<template>
  <div class="bg-gray-100 text-gray-800 overflow-x-hidden">
    <!-- Header -->
    <header class="bg-gradient-to-r from-red-600 to-gray-900 text-white p-4 shadow-lg sticky top-0 z-50">
      <div class="flex flex-col sm:flex-row justify-between items-center max-w-7xl mx-auto gap-4 sm:gap-0">
        <div class="flex items-center gap-2 text-2xl font-bold tracking-wide">
          <i class="fas fa-crown text-white"></i>
          <span>Himpri</span>
        </div>
        <div class="flex gap-4">
          <button 
            @click="goToLogin"
            class="bg-white text-red-600 px-6 py-2 rounded-full font-semibold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 w-28 sm:w-auto"
          >
            Login
          </button>
          <button 
            @click="goToRegister"
            class="bg-white text-red-600 px-6 py-2 rounded-full font-bold hover:bg-gray-100 transform hover:-translate-y-1 transition-all duration-300 shadow-md w-28 sm:w-auto"
          >
            Register
          </button>
        </div>
      </div>
    </header>

    <!-- Hero Section with Image Slider -->
    <section class="relative min-h-screen flex items-center justify-center overflow-hidden">
      <div class="absolute inset-0 z-0">
        <div class="relative w-full h-full">
          <div 
            v-for="(image, index) in heroImages" 
            :key="index"
            :class="['absolute inset-0 bg-cover bg-center transition-opacity duration-1000', { 'opacity-100': currentSlide === index, 'opacity-0': currentSlide !== index }]"
            :style="{ backgroundImage: `url(${image})` }"
          >
            <div class="absolute inset-0 bg-gradient-to-r from-red-600/80 to-gray-900/60"></div>
          </div>
        </div>
        <div class="absolute bottom-8 left-1/2 transform -translate-x-1/2 flex gap-3 z-10">
          <span 
            v-for="(image, index) in heroImages" 
            :key="index"
            :class="['w-3 h-3 rounded-full cursor-pointer transition-all duration-300', { 'bg-white': currentSlide === index, 'bg-white/50 hover:bg-white/70': currentSlide !== index }]"
            @click="goToSlide(index)"
          ></span>
        </div>
      </div>
      
      <!-- Floating coins -->
      <div class="absolute inset-0 pointer-events-none z-10" ref="floatingCoins"></div>
      
      <div class="relative z-20 text-center text-white max-w-4xl mx-auto px-6 animate-fade-in-up">
        <h1 class="text-3xl sm:text-4xl md:text-5xl lg:text-6xl font-bold mb-6 leading-tight drop-shadow-lg">
          Start Learning & Earning Today!
        </h1>
        <p class="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90 max-w-3xl mx-auto">
          Join thousands of users who are enhancing their knowledge while earning real cash rewards. Test your skills, challenge others, and win big!
        </p>
        <button 
          @click="goToRegister"
          class="bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:bg-gray-100 transform hover:-translate-y-2 transition-all duration-300 shadow-xl relative overflow-hidden group"
        >
          <span class="relative z-10">Get Started Now</span>
          <div class="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>
    </section>

    <!-- Audience Section -->
    <section class="py-20 bg-white text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          Who Can Join Himpri?
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Everyone can learn, play and earn on our platform!
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-b from-red-100/0 to-red-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/public/images/students.jpg" 
              alt="Students"
              class="w-full h-48 object-cover border-b-4 border-red-600"
            >
            <div class="p-6 relative z-10">
              <h3 class="text-xl font-semibold text-red-600 mb-3">Students</h3>
              <p class="text-gray-600">Give mock tests, learn through study material, and win real cash while preparing for exams.</p>
            </div>
          </div>
          
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-b from-red-100/0 to-red-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/public/images/housewife.jpg" 
              alt="Housewives"
              class="w-full h-48 object-cover border-b-4 border-red-600"
            >
            <div class="p-6 relative z-10">
              <h3 class="text-xl font-semibold text-red-600 mb-3">Housewives</h3>
              <p class="text-gray-600">Join entertainment contests like Bollywood quizzes, cooking challenges, and more fun categories.</p>
            </div>
          </div>
          
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-b from-red-100/0 to-red-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/public/images/political.jpg" 
              alt="Politics Enthusiasts"
              class="w-full h-48 object-cover border-b-4 border-red-600"
            >
            <div class="p-6 relative z-10">
              <h3 class="text-xl font-semibold text-red-600 mb-3">Politics Enthusiasts</h3>
              <p class="text-gray-600">Test your knowledge with political quizzes about current affairs, history, and governance.</p>
            </div>
          </div>
          
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative">
            <div class="absolute inset-0 bg-gradient-to-b from-red-100/0 to-red-200/30 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
            <img 
              src="/public/images/cricket.jpg" 
              alt="Sports Fans"
              class="w-full h-48 object-cover border-b-4 border-red-600"
            >
            <div class="p-6 relative z-10">
              <h3 class="text-xl font-semibold text-red-600 mb-3">Sports Fans</h3>
              <p class="text-gray-600">IPL cricket lovers can join sports contests and predict match outcomes to win big.</p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Learn & Win Section -->
    <section class="py-20 bg-gray-100 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          Learn Here & Get Chance to Win Real Cash
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Prepare for exams while earning money with our specialized learning contests
        </p>
        
        <div class="grid grid-cols-1 sm:grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-6 mt-12">
          <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center relative">
            <div class="text-4xl text-red-600 mb-4">
              <i class="fas fa-graduation-cap"></i>
            </div>
            <h3 class="text-gray-800 mb-4 font-semibold">K12 Exams</h3>
            <span class="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span>
          </div>
          
          <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-4xl text-red-600 mb-4">
              <i class="fas fa-landmark"></i>
            </div>
            <h3 class="text-gray-800 mb-4 font-semibold">Government Exams</h3>
            <span class="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span>
          </div>
          
          <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-4xl text-red-600 mb-4">
              <i class="fas fa-flask"></i>
            </div>
            <h3 class="text-gray-800 mb-4 font-semibold">JEE/NEET</h3>
            <span class="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span>
          </div>
          
          <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center relative">
            <div class="text-4xl text-red-600 mb-4">
              <i class="fas fa-bullhorn"></i>
            </div>
            <h3 class="text-gray-800 mb-4 font-semibold">Political Updates</h3>
            <span class="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span>
          </div>
          
          <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-4xl text-red-600 mb-4">
              <i class="fas fa-history"></i>
            </div>
            <h3 class="text-gray-800 mb-4 font-semibold">Historical Events</h3>
            <span class="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span>
          </div>
          
          <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-4xl text-red-600 mb-4">
              <i class="fas fa-running"></i>
            </div>
            <h3 class="text-gray-800 mb-4 font-semibold">Sports Updates</h3>
            <span class="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span>
          </div>
          
          <div class="group bg-white p-6 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center relative">
            <div class="text-4xl text-red-600 mb-4">
              <i class="fas fa-film"></i>
            </div>
            <h3 class="text-gray-800 mb-4 font-semibold">Entertainment Updates</h3>
            <span class="absolute top-3 right-3 bg-yellow-400 text-white text-xs px-3 py-1 rounded-full font-semibold">Coming Soon</span>
          </div>
        </div>
      </div>
    </section>

    <!-- How to Play Section -->
    <section class="py-20 bg-white text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          How to Play
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Follow these simple steps to start earning with your knowledge
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mt-12">
          <div class="group bg-gray-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-5xl text-red-600 mb-6">
              <i class="fas fa-trophy"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Select a Contest</h3>
            <p class="text-gray-600">Choose from various contests based on your knowledge and interest areas.</p>
          </div>
          
          <div class="group bg-gray-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-5xl text-red-600 mb-6">
              <i class="fas fa-user-plus"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Join the Contest</h3>
            <p class="text-gray-600">Register for the contest with a small entry fee to compete for cash prizes.</p>
          </div>
          
          <div class="group bg-gray-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-5xl text-red-600 mb-6">
              <i class="fas fa-book-open"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Use Lifeline & Study Material</h3>
            <p class="text-gray-600">Access our study materials and use lifelines during the contest for help.</p>
          </div>
          
          <div class="group bg-gray-100 p-8 rounded-2xl hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 text-center">
            <div class="text-5xl text-red-600 mb-6">
              <i class="fas fa-medal"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Win Cash & Check Leaderboard</h3>
            <p class="text-gray-600">Answer correctly to win cash prizes and see your position on the leaderboard.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Our Features Section -->
    <section class="py-20 bg-gray-100 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          Our Features
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Discover what makes Himpri the best platform for knowledge-based earnings
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <!-- First Row -->
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-users"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Refer & Earn</h3>
            <p class="text-gray-600">Invite friends and earn bonuses when they join and participate in contests.</p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-life-ring"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">My Lifeline</h3>
            <p class="text-gray-600">Access special helps during contests to boost your performance and win more.</p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-credit-card"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">My Transactions</h3>
            <p class="text-gray-600">Track all your deposits, winnings, and withdrawals in one secure place.</p>
          </div>
          
          <!-- Second Row -->
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-trophy"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">My Contests</h3>
            <p class="text-gray-600">View your current, upcoming, and past contest participation history.</p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-history"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Lifeline History</h3>
            <p class="text-gray-600">Review how you've used your lifelines in previous contests to improve.</p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-question-circle"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Help & FAQ</h3>
            <p class="text-gray-600">Find answers to common questions about the platform and contests.</p>
          </div>
          
          <!-- Third Row -->
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-book"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Study Materials</h3>
            <p class="text-gray-600">Access comprehensive study materials categorized by subject and exam type.</p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-play-circle"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Learning Videos</h3>
            <p class="text-gray-600">Watch educational videos to prepare for contests and improve knowledge.</p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-video"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">How to Play Videos</h3>
            <p class="text-gray-600">Visual guides to help you understand the platform and features better.</p>
          </div>
          
          <!-- Fourth Row -->
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-file-contract"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Terms & Policies</h3>
            <p class="text-gray-600">Read our terms, conditions, refund and privacy policies for transparency.</p>
          </div>
          
          <div class="group bg-white p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 md:col-span-2 lg:col-span-1">
            <div class="text-4xl text-red-600 mb-6">
              <i class="fas fa-robot"></i>
            </div>
            <h3 class="text-xl font-semibold text-gray-800 mb-4">Chat Bot Support</h3>
            <p class="text-gray-600">Get instant help with our 24/7 AI-powered chat support system.</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Learn How It Works Section -->
    <section class="py-20 bg-white text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          Learn How It Works
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Watch these videos to understand the platform better
        </p>
        
        <!-- Show videos from howVideos store if available -->
        <div v-if="howVideos && howVideos.length > 0" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div v-for="video in howVideos.slice(0, 6)" :key="video.id" class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <div class="relative">
              <!-- YouTube Video Embed -->
              <iframe 
                class="w-full h-48"
                :src="`https://www.youtube.com/embed/${video.youtube_id}`" 
                :title="video.title"
                frameborder="0" 
                allow="accelerometer; autoplay; clipboard-write; encrypted-media; gyroscope; picture-in-picture" 
                allowfullscreen>
              </iframe>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800 mb-2">{{ video.title }}</h3>
              <p class="text-gray-600 text-sm">{{ video.description }}</p>
            </div>
          </div>
        </div>

        <!-- Fallback content if no videos available -->
        <div v-else class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative cursor-pointer">
            <div class="relative">
              <img 
                src="https://images.unsplash.com/photo-1552664730-d307ca884978?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80" 
                alt="Step-by-step guide" 
                class="w-full h-48 object-cover"
              >
              <div class="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i class="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800">Step-by-step guide to start earning</h3>
            </div>
          </div>
          
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative cursor-pointer">
            <div class="relative">
              <img 
                src="https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80" 
                alt="Winner testimonials" 
                class="w-full h-48 object-cover"
              >
              <div class="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i class="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800">Hear from our recent winners</h3>
            </div>
          </div>
          
          <div class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden relative cursor-pointer">
            <div class="relative">
              <img 
                src="https://images.unsplash.com/photo-1501504905252-473c47e087f8?ixlib=rb-4.0.3&auto=format&fit=crop&w=1374&q=80" 
                alt="Expert strategies" 
                class="w-full h-48 object-cover"
              >
              <div class="absolute inset-0 bg-red-600/20 opacity-0 group-hover:opacity-100 transition-opacity duration-300"></div>
              <div class="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2">
                <div class="w-16 h-16 bg-red-600 rounded-full flex items-center justify-center text-white text-2xl group-hover:scale-110 transition-transform duration-300">
                  <i class="fas fa-play"></i>
                </div>
              </div>
            </div>
            <div class="p-6">
              <h3 class="text-lg font-semibold text-gray-800">Expert strategies to maximize earnings</h3>
            </div>
          </div>
        </div>

        <!-- Show More Button if there are more than 6 videos -->
        <div v-if="howVideos && howVideos.length > 6" class="mt-8">
          <router-link 
            to="/how-to-play" 
            class="inline-flex items-center bg-red-600 text-white px-6 py-3 rounded-full font-semibold hover:bg-red-700 transform hover:-translate-y-1 transition-all duration-300"
          >
            <span class="mr-2">View All Videos</span>
            <i class="fas fa-arrow-right"></i>
          </router-link>
        </div>
      </div>
    </section>

    <!-- Stats Section -->
    <section class="stats-section py-20 bg-gradient-to-r from-red-600 to-red-800 text-white text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-10" style="background-image: url('https://images.unsplash.com/photo-1517245386807-bb43f82c33c4?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80')"></div>
      <div class="max-w-7xl mx-auto px-6 relative z-10">
        <h2 class="text-4xl font-bold mb-4 relative inline-block">
          Our Growing Community
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-white rounded"></div>
        </h2>
        <p class="text-xl mb-12 opacity-90 max-w-3xl mx-auto">
          Join our thriving community of knowledge seekers and winners
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{{ animatedUserCount }}+</div>
            <p class="text-base sm:text-lg">Active Users</p>
          </div>
          
          <div class="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">₹{{ animatedWinningsCount.toLocaleString('en-IN') }}+</div>
            <p class="text-base sm:text-lg">Total Winnings</p>
          </div>
          
          <div class="group bg-white/10 backdrop-blur-sm p-6 rounded-2xl hover:bg-white/20 transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-2">{{ animatedWinnersCount }}+</div>
            <p class="text-base sm:text-lg">Daily Winners</p>
          </div>
        </div>
      </div>
    </section>

    <!-- Recent Winners Section -->
    <section class="py-20 bg-gray-100 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          Recent Winners
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Meet some of our recent winners who transformed knowledge into earnings
        </p>
        
        <div v-if="!loadingWinners && recentWinners.length" class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mt-12">
          <div v-for="winner in recentWinners" :key="winner.id" class="group bg-white rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2 overflow-hidden">
            <img 
              :src="getFallbackImage(winner.id)" 
              :alt="winner.name"
              class="w-full h-48 object-cover"
            >
            <div class="p-6">
              <h3 class="text-xl font-semibold text-red-600 mb-2">{{ winner.name }}</h3>
              <p class="text-gray-800 font-semibold mb-2">Won ₹{{ winner.amount.toLocaleString() }} in {{ winner.contest }}</p>
              <span class="text-gray-500 text-sm">{{ formatDate(winner.date) }}</span>
            </div>
          </div>
        </div>
        
        <div v-else-if="loadingWinners" class="py-12">
          <div class="flex justify-center items-center space-x-2">
            <div class="w-6 h-6 bg-red-600 rounded-full animate-bounce"></div>
            <div class="w-6 h-6 bg-red-600 rounded-full animate-bounce" style="animation-delay: 0.1s"></div>
            <div class="w-6 h-6 bg-red-600 rounded-full animate-bounce" style="animation-delay: 0.2s"></div>
          </div>
          <p class="text-gray-600 mt-4">Loading recent winners...</p>
        </div>
        
        <div v-else class="py-12">
          <p class="text-gray-600">No recent winners data available</p>
        </div>
      </div>
    </section>

    <!-- What Our Users Say Section -->
    <section class="py-20 bg-white text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          What Our Users Say
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        <p class="text-xl text-gray-600 mb-12 max-w-3xl mx-auto">
          Hear from our community members about their experiences
        </p>
        
        <div class="grid grid-cols-1 md:grid-cols-3 gap-8 mt-12">
          <div class="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-left">
              <p class="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "Himpri has completely changed how I view learning. I was able to earn ₹15,000 last month just by participating in quizzes about topics I already knew. The platform is so easy to use!"
              </p>
              <div class="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/32.jpg" 
                  alt="Neha Sharma"
                  class="w-12 h-12 rounded-full mr-4"
                >
                <div>
                  <h4 class="text-red-600 font-semibold">Neha Sharma</h4>
                  <p class="text-gray-500 text-sm">College Student</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-left">
              <p class="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "As a housewife, I never thought I could earn money from my knowledge of cooking and Bollywood. Himpri proved me wrong! I've won multiple contests and the withdrawal process is seamless."
              </p>
              <div class="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/women/45.jpg" 
                  alt="Priya Patel"
                  class="w-12 h-12 rounded-full mr-4"
                >
                <div>
                  <h4 class="text-red-600 font-semibold">Priya Patel</h4>
                  <p class="text-gray-500 text-sm">Home Chef</p>
                </div>
              </div>
            </div>
          </div>
          
          <div class="bg-gray-50 p-8 rounded-2xl shadow-lg hover:shadow-2xl transition-all duration-300 transform hover:-translate-y-2">
            <div class="text-left">
              <p class="text-gray-700 text-lg mb-6 leading-relaxed italic">
                "The cricket quizzes on Himpri are amazing! I've been able to turn my passion for IPL into earnings. The contests are fair and the competition keeps me engaged. Highly recommended!"
              </p>
              <div class="flex items-center">
                <img 
                  src="https://randomuser.me/api/portraits/men/42.jpg" 
                  alt="Rahul Verma"
                  class="w-12 h-12 rounded-full mr-4"
                >
                <div>
                  <h4 class="text-red-600 font-semibold">Rahul Verma</h4>
                  <p class="text-gray-500 text-sm">Cricket Enthusiast</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- About Us Section -->
    <section class="py-20 bg-gray-100 text-center">
      <div class="max-w-7xl mx-auto px-6">
        <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
          About Us
          <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
        </h2>
        
        <div class="max-w-4xl mx-auto mt-12">
          <div class="bg-white p-8 md:p-12 rounded-2xl shadow-lg">
            <div class="text-left space-y-6">
              <p class="text-lg text-gray-700 leading-relaxed">
                Welcome to <span class="font-semibold text-red-600">Himpri</span> - India's premier knowledge-based earning platform where learning meets earning. We believe that knowledge is the greatest wealth, and everyone deserves to be rewarded for what they know.
              </p>
              
              <p class="text-lg text-gray-700 leading-relaxed">
                Founded with the vision of democratizing education and making learning fun and rewarding, Himpri connects knowledge seekers with exciting contests and quizzes across various categories including academics, sports, entertainment, current affairs, and much more.
              </p>
              
              <p class="text-lg text-gray-700 leading-relaxed">
                Our platform serves students preparing for competitive exams, homemakers with diverse knowledge, professionals looking to test their expertise, and anyone passionate about learning. With thousands of active users and lakhs of rupees distributed as prizes, we're building India's largest community of knowledge enthusiasts.
              </p>
              
              <div class="bg-red-50 p-6 rounded-xl border-l-4 border-red-600">
                <h3 class="text-xl font-semibold text-red-600 mb-2">Our Mission</h3>
                <p class="text-gray-700">
                  To create an inclusive platform where knowledge is celebrated, learning is rewarded, and everyone has the opportunity to turn their expertise into real earnings while contributing to a smarter society.
                </p>
              </div>
              
              <div class="grid grid-cols-1 md:grid-cols-3 gap-6 mt-8">
                <div class="text-center p-4 bg-gray-50 rounded-xl">
                  <div class="text-3xl text-red-600 mb-2">🎯</div>
                  <h4 class="font-semibold text-gray-800">Fair Play</h4>
                  <p class="text-sm text-gray-600 mt-2">Transparent and ethical contest environment</p>
                </div>
                
                <div class="text-center p-4 bg-gray-50 rounded-xl">
                  <div class="text-3xl text-red-600 mb-2">🚀</div>
                  <h4 class="font-semibold text-gray-800">Innovation</h4>
                  <p class="text-sm text-gray-600 mt-2">Cutting-edge technology for seamless experience</p>
                </div>
                
                <div class="text-center p-4 bg-gray-50 rounded-xl">
                  <div class="text-3xl text-red-600 mb-2">🤝</div>
                  <h4 class="font-semibold text-gray-800">Community</h4>
                  <p class="text-sm text-gray-600 mt-2">Building a supportive learning community</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- Frequently Asked Questions Section -->
    <section class="py-20 bg-white">
      <div class="max-w-4xl mx-auto px-6">
        <div class="text-center mb-12">
          <h2 class="text-4xl font-bold text-red-600 mb-4 relative inline-block">
            Frequently Asked Questions
            <div class="absolute -bottom-3 left-1/2 transform -translate-x-1/2 w-20 h-1 bg-red-600 rounded"></div>
          </h2>
          <p class="text-xl text-gray-600 max-w-3xl mx-auto">
            Find answers to common questions about Himpri
          </p>
        </div>
        
        <div class="space-y-4">
          <div class="bg-gray-50 rounded-xl overflow-hidden">
            <button 
              @click="toggleFaq(0)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
            >
              <span class="font-semibold text-gray-800">How do I join a contest on Himpri?</span>
              <i :class="['fas fa-chevron-down text-red-600 transition-transform duration-200', { 'rotate-180': activeFaq === 0 }]"></i>
            </button>
            <div :class="['px-6 overflow-hidden transition-all duration-300', { 'pb-4 max-h-96': activeFaq === 0, 'max-h-0': activeFaq !== 0 }]">
              <p class="text-gray-700">
                To join a contest, first register on Himpri and complete your profile. Browse available contests, select one that matches your interest, pay the entry fee, and you're in! Make sure to read the contest rules before participating.
              </p>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-xl overflow-hidden">
            <button 
              @click="toggleFaq(1)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
            >
              <span class="font-semibold text-gray-800">How do I withdraw my winnings?</span>
              <i :class="['fas fa-chevron-down text-red-600 transition-transform duration-200', { 'rotate-180': activeFaq === 1 }]"></i>
            </button>
            <div :class="['px-6 overflow-hidden transition-all duration-300', { 'pb-4 max-h-96': activeFaq === 1, 'max-h-0': activeFaq !== 1 }]">
              <p class="text-gray-700">
                Go to your dashboard and click on "My Transactions". Select "Withdraw" and choose your preferred payment method (UPI, Bank Transfer, or Digital Wallet). Enter the amount and confirm. Withdrawals are processed within 24-48 hours.
              </p>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-xl overflow-hidden">
            <button 
              @click="toggleFaq(2)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
            >
              <span class="font-semibold text-gray-800">Are there any free contests?</span>
              <i :class="['fas fa-chevron-down text-red-600 transition-transform duration-200', { 'rotate-180': activeFaq === 2 }]"></i>
            </button>
            <div :class="['px-6 overflow-hidden transition-all duration-300', { 'pb-4 max-h-96': activeFaq === 2, 'max-h-0': activeFaq !== 2 }]">
              <p class="text-gray-700">
                Yes! We regularly host free practice contests and special promotional contests. New users get free entry tickets upon registration. Follow our social media channels and check the app regularly for free contest announcements.
              </p>
            </div>
          </div>
          
          <div class="bg-gray-50 rounded-xl overflow-hidden">
            <button 
              @click="toggleFaq(3)"
              class="w-full px-6 py-4 text-left flex justify-between items-center hover:bg-gray-100 transition-colors duration-200"
            >
              <span class="font-semibold text-gray-800">What happens if I disconnect during a contest?</span>
              <i :class="['fas fa-chevron-down text-red-600 transition-transform duration-200', { 'rotate-180': activeFaq === 3 }]"></i>
            </button>
            <div :class="['px-6 overflow-hidden transition-all duration-300', { 'pb-4 max-h-96': activeFaq === 3, 'max-h-0': activeFaq !== 3 }]">
              <p class="text-gray-700">
                Don't worry! Your progress is automatically saved. If you disconnect, you can rejoin the contest within the time limit. Your previous answers will be preserved, and you can continue from where you left off.
              </p>
            </div>
          </div>
        </div>
      </div>
    </section>

    <!-- CTA Section -->
    <section class="py-20 bg-gradient-to-r from-red-600 to-gray-900 text-white text-center relative overflow-hidden">
      <div class="absolute inset-0 bg-cover bg-center opacity-10" style="background-image: url('https://images.unsplash.com/photo-1521791136064-7986c2920216?ixlib=rb-4.0.3&auto=format&fit=crop&w=1469&q=80')"></div>
      <div class="max-w-4xl mx-auto px-6 relative z-10">
        <h2 class="text-3xl sm:text-4xl lg:text-5xl font-bold mb-6">Ready to Turn Your Knowledge into Cash?</h2>
        <p class="text-lg sm:text-xl lg:text-2xl mb-8 opacity-90">Join thousands of users who are already earning money through quizzes and contests</p>
        <button 
          @click="goToRegister"
          class="bg-white text-red-600 px-6 sm:px-8 py-3 sm:py-4 rounded-full text-lg sm:text-xl font-bold hover:bg-gray-100 transform hover:-translate-y-2 transition-all duration-300 shadow-xl relative overflow-hidden group"
        >
          <span class="relative z-10">Start Earning Today</span>
          <div class="absolute inset-0 bg-gradient-to-t from-white/20 to-transparent transform -translate-y-full group-hover:translate-y-0 transition-transform duration-500"></div>
        </button>
      </div>
    </section>

    <!-- Footer -->
    <footer class="bg-gray-900 text-white py-16">
      <div class="max-w-7xl mx-auto px-6">
        <div class="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-12">
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-white mb-6 relative pb-2">
              Himpri
              <div class="absolute bottom-0 left-0 w-10 h-1 bg-red-600"></div>
            </h3>
            <p class="text-gray-300 leading-relaxed">Learn, Play & Earn Real Cash Rewards. Join the largest community of knowledge seekers and winners.</p>
            <div class="flex space-x-4 mt-6">
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <i class="fab fa-facebook-f"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <i class="fab fa-twitter"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <i class="fab fa-instagram"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <i class="fab fa-youtube"></i>
              </a>
              <a href="#" class="w-10 h-10 bg-white/10 hover:bg-red-600 rounded-full flex items-center justify-center transition-all duration-300 transform hover:-translate-y-1">
                <i class="fab fa-telegram-plane"></i>
              </a>
            </div>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-white mb-6 relative pb-2">
              Quick Links
              <div class="absolute bottom-0 left-0 w-10 h-1 bg-red-600"></div>
            </h3>
            <ul class="space-y-3">
              <li>
                <router-link to="/faqs" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                  <i class="fas fa-question-circle w-4 mr-3 group-hover:text-red-600"></i>
                  Help & FAQs
                </router-link>
              </li>
              <li>
                <router-link to="/aboutus" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                  <i class="fas fa-file-alt w-4 mr-3 group-hover:text-red-600"></i>
                  About Us
                </router-link>
              </li>
              <li>
                <router-link to="/how-to-play" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                  <i class="fas fa-gamepad w-4 mr-3 group-hover:text-red-600"></i>
                  How to Play
                </router-link>
              </li>
            </ul>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-white mb-6 relative pb-2">
              Legal
              <div class="absolute bottom-0 left-0 w-10 h-1 bg-red-600"></div>
            </h3>
            <ul class="space-y-3">
              <li>
                <router-link to="/terms" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                  <i class="fas fa-file-alt w-4 mr-3 group-hover:text-red-600"></i>
                  Terms & Conditions
                </router-link>
              </li>
              <li>
                <router-link to="/privacy-policy" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                  <i class="fas fa-file-alt w-4 mr-3 group-hover:text-red-600"></i>
                  Privacy Policy
                </router-link>
              </li>
              <li>
                <router-link to="/refund-policy" class="text-gray-300 hover:text-white hover:translate-x-2 transition-all duration-300 flex items-center group">
                  <i class="fas fa-file-alt w-4 mr-3 group-hover:text-red-600"></i>
                  Refund Policy
                </router-link>
              </li>
            </ul>
          </div>
          
          <div class="space-y-4">
            <h3 class="text-xl font-semibold text-white mb-6 relative pb-2">
              Connect With Us
              <div class="absolute bottom-0 left-0 w-10 h-1 bg-red-600"></div>
            </h3>
            <div class="space-y-3 text-gray-300">
              <div class="flex items-center space-x-3">
                <i class="fas fa-envelope w-4 text-red-600"></i>
                <span>support@himpri.com</span>
              </div>
              <div class="flex items-center space-x-3">
                <i class="fas fa-phone w-4 text-red-600"></i>
                <span>+91 9876543210</span>
              </div>
            </div>
          </div>
        </div>
        
        <div class="pt-8 border-t border-gray-800 text-center">
          <p class="text-gray-400 text-sm">&copy; 2023 Himpri.com. All Rights Reserved.</p>
        </div>
      </div>
    </footer>

    <!-- Back to Top Button -->
    <div 
      :class="['fixed bottom-8 right-8 w-12 h-12 bg-red-600 hover:bg-red-700 text-white rounded-full flex items-center justify-center cursor-pointer transition-all duration-300 z-50 shadow-lg hover:shadow-xl transform hover:-translate-y-1', { 'opacity-100 visible': showBackToTop, 'opacity-0 invisible': !showBackToTop }]" 
      @click="scrollToTop"
    >
      <i class="fas fa-arrow-up text-lg"></i>
    </div>
  </div>
</template>

<script setup>
import { ref, onMounted, onUnmounted } from 'vue'
import { useRouter } from 'vue-router'
import api from '@/plugins/axios'
import { useMainStore } from '@/stores/mainStore'
import { storeToRefs } from 'pinia'

const router = useRouter()
const mainStore = useMainStore()
const showBackToTop = ref(false)
const currentSlide = ref(0)
const recentWinners = ref([])
const loadingWinners = ref(true)
const activeFaq = ref(null)

const { howVideos } = storeToRefs(mainStore)

// Animated counter values
const animatedUserCount = ref(0)
const animatedWinningsCount = ref(0)
const animatedWinnersCount = ref(0)

// Target values for animation
const targetUserCount = 50000
const targetWinningsCount = 1000000
const targetWinnersCount = 500

// Animation state
const hasAnimated = ref(false)

const baseUrl = import.meta.env.VITE_FRONT_URL
const heroImages = [
  `/public/images/nn1.jpg`,
  `/public/images/nn2.jpg`,
  `/public/images/nn3.jpg`,
  `/public/images/nn4.jpg`
]

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

const goToLogin = () => {
  router.push('/auth/login')
}

const goToRegister = () => {
  router.push('/auth/register')
}

const goToSlide = (index) => {
  currentSlide.value = index
}

const nextSlide = () => {
  currentSlide.value = (currentSlide.value + 1) % heroImages.length
}

const scrollToTop = () => {
  window.scrollTo({
    top: 0,
    behavior: 'smooth'
  })
}

const handleScroll = () => {
  showBackToTop.value = window.pageYOffset > 300
}

const createFloatingCoins = () => {
  const container = document.querySelector('.floating-coins')
  if (!container) return

  const coinCount = 15
  container.innerHTML = ''
  
  for (let i = 0; i < coinCount; i++) {
    const coin = document.createElement('div')
    coin.className = 'coin'
    
    coin.style.left = `${Math.random() * 100}%`
    coin.style.top = `${Math.random() * 100}%`
    
    const size = 20 + Math.random() * 20
    coin.style.width = `${size}px`
    coin.style.height = `${size}px`
    
    const duration = 10 + Math.random() * 20
    coin.style.animationDuration = `${duration}s`
    coin.style.animationDelay = `${Math.random() * 5}s`
    
    container.appendChild(coin)
  }
}

// Animated counter function
const animateCounter = (startValue, endValue, duration, callback) => {
  const startTime = Date.now()
  const endTime = startTime + duration
  
  const updateCounter = () => {
    const now = Date.now()
    const remaining = Math.max((endTime - now) / duration, 0)
    const progress = 1 - remaining
    
    // Easing function for smooth animation
    const easeOutCubic = 1 - Math.pow(1 - progress, 3)
    const currentValue = Math.round(startValue + (endValue - startValue) * easeOutCubic)
    
    callback(currentValue)
    
    if (progress < 1) {
      requestAnimationFrame(updateCounter)
    } else {
      callback(endValue)
    }
  }
  
  updateCounter()
}

// Start counter animations
const startCounterAnimations = () => {
  if (hasAnimated.value) return
  hasAnimated.value = true
  
  // Animate user count (starts immediately)
  setTimeout(() => {
    animateCounter(0, targetUserCount, 2500, (value) => {
      animatedUserCount.value = value.toLocaleString('en-IN')
    })
  }, 200)
  
  // Animate winnings count (starts after 300ms)
  setTimeout(() => {
    animateCounter(0, targetWinningsCount, 3000, (value) => {
      animatedWinningsCount.value = value
    })
  }, 500)
  
  // Animate winners count (starts after 600ms)
  setTimeout(() => {
    animateCounter(0, targetWinnersCount, 2000, (value) => {
      animatedWinnersCount.value = value.toLocaleString('en-IN')
    })
  }, 800)
}

// Intersection Observer for stats section
const setupStatsAnimation = () => {
  const statsSection = document.querySelector('.stats-section')
  if (!statsSection) return

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting && !hasAnimated.value) {
          startCounterAnimations()
        }
      })
    },
    {
      threshold: 0.3, // Trigger when 30% of the section is visible
      rootMargin: '0px 0px -100px 0px' // Start animation a bit before the section is fully visible
    }
  )

  observer.observe(statsSection)
  
  return observer
}

const fetchRecentWinners = async () => {
  try {
    loadingWinners.value = true
    const result = await mainStore.fetchRecentWinners()
    if (result.success) {
      recentWinners.value = result.data || []
    } else {
      console.error('Failed to fetch winners:', result.message)
      // Fallback data for demo
      recentWinners.value = [
        {
          id: 1,
          name: 'Rahul K.',
          amount: 25000,
          contest: 'Science Quiz',
          date: new Date(),
          avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80'
        },
        {
          id: 2,
          name: 'Priya M.',
          amount: 18500,
          contest: 'GK Challenge',
          date: new Date(),
          avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
        },
        {
          id: 3,
          name: 'Amit S.',
          amount: 32000,
          contest: 'Math Masters',
          date: new Date(),
          avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1467&q=80'
        }
      ]
    }
  } catch (error) {
    console.error('Error fetching recent winners:', error)
    // Fallback data for demo
    recentWinners.value = [
      {
        id: 1,
        name: 'Rahul K.',
        amount: 25000,
        contest: 'Science Quiz',
        date: new Date(),
        avatar: 'https://images.unsplash.com/photo-1535713875002-d1d0cf377fde?ixlib=rb-4.0.3&auto=format&fit=crop&w=880&q=80'
      },
      {
        id: 2,
        name: 'Priya M.',
        amount: 18500,
        contest: 'GK Challenge',
        date: new Date(),
        avatar: 'https://images.unsplash.com/photo-1438761681033-6461ffad8d80?ixlib=rb-4.0.3&auto=format&fit=crop&w=1470&q=80'
      },
      {
        id: 3,
        name: 'Amit S.',
        amount: 32000,
        contest: 'Math Masters',
        date: new Date(),
        avatar: 'https://images.unsplash.com/photo-1544725176-7c40e5a71c5e?ixlib=rb-4.0.3&auto=format&fit=crop&w=1467&q=80'
      }
    ]
  } finally {
    loadingWinners.value = false
  }
}

const formatDate = (date) => {
  return new Date(date).toLocaleDateString('en-IN', {
    day: 'numeric',
    month: 'short',
    year: 'numeric'
  })
}

const toggleFaq = (index) => {
  activeFaq.value = activeFaq.value === index ? null : index
}

onMounted(() => {
  createFloatingCoins()
  fetchRecentWinners()
  mainStore.fetchHowVideos();
  
  // Auto-slide functionality
  const slideInterval = setInterval(nextSlide, 5000)
  
  // Scroll event listener
  window.addEventListener('scroll', handleScroll)
  
  // Setup stats animation observer
  const statsObserver = setupStatsAnimation()
  
  // Cleanup on unmount
  onUnmounted(() => {
    clearInterval(slideInterval)
    window.removeEventListener('scroll', handleScroll)
    if (statsObserver) {
      statsObserver.disconnect()
    }
  })
})
</script>

<style scoped>
/* Custom animations and coin effects */
.animate-fade-in-up {
  animation: fadeInUp 1s ease-out;
}

@keyframes fadeInUp {
  from {
    opacity: 0;
    transform: translateY(30px);
  }
  to {
    opacity: 1;
    transform: translateY(0);
  }
}

/* Floating coins animation */
:deep(.coin) {
  position: absolute;
  width: 30px;
  height: 30px;
  background: url('data:image/svg+xml;utf8,<svg xmlns="http://www.w3.org/2000/svg" viewBox="0 0 24 24" fill="%23fdcb6e"><path d="M12,2C6.48,2,2,6.48,2,12s4.48,10,10,10s10-4.48,10-10S17.52,2,12,2z M12,20c-4.41,0-8-3.59-8-8s3.59-8,8-8s8,3.59,8,8 S16.41,20,12,20z M12,10c-1.1,0-2,0.9-2,2s0.9,2,2,2s2-0.9,2-2S13.1,10,12,10z"/></svg>') no-repeat center center;
  opacity: 0.7;
  animation: float 15s infinite linear;
}

@keyframes float {
  0% {
    transform: translateY(0) rotate(0deg);
    opacity: 0;
  }
  10% {
    opacity: 0.7;
  }
  100% {
    transform: translateY(-100vh) rotate(360deg);
    opacity: 0;
  }
}

/* Custom responsive grid for categories */
@media (max-width: 640px) {
  .grid-cols-2 {
    grid-template-columns: repeat(1, minmax(0, 1fr));
  }
}

/* Smooth transitions for hover effects */
.group:hover .group-hover\:text-red-600 {
  color: #dc2626;
}
</style>
