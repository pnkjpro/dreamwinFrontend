<template>
    <div class="admin-leaderboard-container">
      <h2 class="page-title">Quiz Leaderboards</h2>
      
      <!-- Leaderboard List Section -->
      <div v-if="!selectedQuiz" class="leaderboard-list-section">
        <div class="section-header">
          <h3>Available Leaderboards</h3>
        </div>
        
        <div v-if="adminStore.loading" class="loading-indicator">
          <p>Loading leaderboards...</p>
        </div>
        
        <div v-else-if="leaderboards.length === 0" class="empty-state">
          <p>No leaderboards available.</p>
        </div>
        
        <div v-else class="leaderboard-grid">
          <div 
            v-for="leaderboard in leaderboards" 
            :key="leaderboard.quiz_id"
            class="leaderboard-card"
            @click="viewLeaderboard(leaderboard.quiz_id)"
          >
            <h4 class="quiz-title">{{ leaderboard.title }}</h4>
            <div class="card-meta">
              <span class="top-rank-label">Top Rank</span>
              <span class="top-rank-value">{{ leaderboard.top_rank }}</span>
            </div>
            <button class="view-btn">View Details</button>
          </div>
        </div>
      </div>
      
      <!-- Single Leaderboard Detail Section -->
      <div v-else class="leaderboard-detail-section">
        <div class="section-header">
          <button class="back-btn" @click="backToList">
            &larr; Back to List
          </button>
          <h3>{{ selectedQuizTitle }}</h3>
        </div>
        
        <div v-if="adminStore.loading" class="loading-indicator">
          <p>Loading leaderboard details...</p>
        </div>
        
        <div v-else-if="currentLeaderboard.length === 0" class="empty-state">
          <p>No participants in this leaderboard yet.</p>
        </div>
        
        <div v-else class="leaderboard-table-container">
          <table class="leaderboard-table">
            <thead>
              <tr>
                <th>Rank</th>
                <th>Name</th>
                <th>Score</th>
                <th>Duration</th>
                <th>Reward</th>
              </tr>
            </thead>
            <tbody>
              <tr v-for="entry in currentLeaderboard" :key="entry.rank">
                <td class="rank-cell">{{ entry.rank }}</td>
                <td>{{ entry.name }}</td>
                <td>{{ entry.score }}</td>
                <td>{{ formatDuration(entry.duration) }}</td>
                <td>{{ entry.reward || 'None' }}</td>
              </tr>
            </tbody>
          </table>
        </div>
      </div>
    </div>
  </template>
  
  <script setup>
  import { ref, onMounted, computed } from 'vue';
  import { useAdminStore } from '@/stores/adminStore';
  import { storeToRefs } from 'pinia';
  import { useToast } from 'vue-toastification';
  
  const adminStore = useAdminStore();
  const { leaderboards, currentLeaderboard } = storeToRefs(adminStore);
  const toast = useToast();
  
  const selectedQuiz = ref(null);
  const selectedQuizTitle = ref('');
  
  // Load initial leaderboard list
  const fetchLeaderboards = async () => {
      const result = await adminStore.listAdminLeaderboards();
      if(!result.success){
        toast.error(result.message);
      }
  };
  
  // Fetch details for a specific leaderboard
  const viewLeaderboard = async (quizId) => {
    selectedQuiz.value = quizId;
    
    // Find the quiz title
    const quiz = leaderboards.value.find(item => item.quiz_id === quizId);
    selectedQuizTitle.value = quiz ? quiz.title : 'Quiz Leaderboard';
    
    const result = await adminStore.showAdminLeaderboard({
    quiz_id: quizId
    });
    
    if(!result.success){
    toast.error(result.message);
    }
  };

  // Return to leaderboard list view
const backToList = () => {
  selectedQuiz.value = null;
  currentLeaderboard.value = [];
  selectedQuizTitle.value = '';
};
  
  // Format duration (assuming it's in seconds)
  const formatDuration = (seconds) => {
    if (!seconds) return '0s';
    
    const minutes = Math.floor(seconds / 60);
    const remainingSeconds = seconds % 60;
    
    if (minutes > 0) {
      return `${minutes}m ${remainingSeconds}s`;
    } else {
      return `${remainingSeconds}s`;
    }
  };
  
  // Load leaderboards on component mount
  onMounted(() => {
    fetchLeaderboards();
  });
  </script>
  
  <style scoped>
  .admin-leaderboard-container {
    max-width: 1200px;
    margin: 0 auto;
    padding: 20px;
    background-color: #fff;
    border-radius: 8px;
    box-shadow: 0 2px 10px rgba(0, 0, 0, 0.1);
  }
  
  .page-title {
    margin-bottom: 24px;
    color: #333;
    font-size: 1.5rem;
  }
  
  .section-header {
    display: flex;
    align-items: center;
    margin-bottom: 20px;
    padding-bottom: 10px;
    border-bottom: 1px solid #eee;
  }
  
  .section-header h3 {
    margin: 0;
    font-size: 1.2rem;
    color: #444;
  }
  
  .loading-indicator, .empty-state {
    padding: 40px;
    text-align: center;
    color: #666;
    background-color: #f9f9f9;
    border-radius: 6px;
  }
  
  /* Leaderboard List Styles */
  .leaderboard-grid {
    display: grid;
    grid-template-columns: repeat(auto-fill, minmax(280px, 1fr));
    grid-gap: 20px;
  }
  
  .leaderboard-card {
    padding: 16px;
    background-color: #f9f9f9;
    border-radius: 6px;
    border: 1px solid #eee;
    cursor: pointer;
    transition: all 0.2s;
  }
  
  .leaderboard-card:hover {
    transform: translateY(-3px);
    box-shadow: 0 4px 12px rgba(0, 0, 0, 0.05);
    border-color: #ddd;
  }
  
  .quiz-title {
    margin-top: 0;
    margin-bottom: 12px;
    font-size: 1.1rem;
    color: #222;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }
  
  .card-meta {
    display: flex;
    justify-content: space-between;
    margin-bottom: 15px;
    padding: 8px 0;
    border-top: 1px solid #eee;
    border-bottom: 1px solid #eee;
  }
  
  .top-rank-label {
    font-size: 0.9rem;
    color: #666;
  }
  
  .top-rank-value {
    font-weight: bold;
    color: #007bff;
  }
  
  .view-btn {
    width: 100%;
    padding: 8px;
    background-color: #007bff;
    color: white;
    border: none;
    border-radius: 4px;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .view-btn:hover {
    background-color: #0069d9;
  }
  
  /* Leaderboard Detail Styles */
  .back-btn {
    margin-right: 15px;
    padding: 6px 12px;
    background-color: #f5f5f5;
    border: 1px solid #ddd;
    border-radius: 4px;
    color: #555;
    cursor: pointer;
    transition: background-color 0.2s;
  }
  
  .back-btn:hover {
    background-color: #e5e5e5;
  }
  
  .leaderboard-table-container {
    overflow-x: auto;
  }
  
  .leaderboard-table {
    width: 100%;
    border-collapse: collapse;
  }
  
  .leaderboard-table th, 
  .leaderboard-table td {
    padding: 12px 15px;
    border-bottom: 1px solid #eee;
    text-align: left;
  }
  
  .leaderboard-table thead tr {
    background-color: #f5f5f5;
  }
  
  .leaderboard-table tbody tr:hover {
    background-color: #f9f9f9;
  }
  
  .rank-cell {
    font-weight: bold;
    color: #007bff;
  }
  </style>