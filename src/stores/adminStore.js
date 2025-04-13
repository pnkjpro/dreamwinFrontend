import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import api from '@/plugins/axios';

export const useAdminStore = defineStore('admin', () => {
  const loading = ref(false);
  const error = ref(null);
  const leaderboards = ref([]);
  const currentLeaderboard = ref([]);
  const allTransactions = ref([]);

  async function createCategory(formData){
    try{
        loading.value = true;
        const response = await api.post('/admin/category/create', formData);
        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        console.error("Error using Lifeline:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    } finally {
        loading.value = false;
        
    }
  }

  async function createQuiz(finalQuizData){
    try{
        loading.value = true;
        const response = await api.post('/admin/quiz/create', finalQuizData);
        loading.value = true;
        return {
            success: response.data.success,
            message: response.data.message
        }
        
    } catch (error) {
        loading.value = true;
        console.error("Error using Lifeline:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    }
  }

  async function fetchTransactions(){
    try{
        loading.value = true;
        const response = await api.get('/admin/transaction/list/all');
        allTransactions.value = [...response.data.data];
        console.log(allTransactions.value);
        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        console.error("Error using Lifeline:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    } finally {
        loading.value = false;
    }
  }

  async function statusApproval(request, approval){
    try{
        console.log(request);
        loading.value = true;
        const response = await api.post('/admin/transaction/approval', {
            uid: request.user_id,
            approval_id: request.id,
            change_approval: approval
        });
        // Directly modify the allTransactions after the approval
        if (response.data.success) {
            const updatedTransaction = { ...request, approved_status: approval };  // assuming the approval field changes
            
            // Find the index of the transaction and update it
            const index = allTransactions.value.findIndex(txn => txn.id === request.id);
            if (index !== -1) {
                allTransactions.value[index] = updatedTransaction;
            }
    
        }
        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        console.error("Error using Lifeline:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    } finally {
        loading.value = false;
    }
  }

  const listAdminLeaderboards = async () => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.get('/admin/list/leaderboards')
        leaderboards.value = response.data.data
        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        console.error("Error using Lifeline:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    } finally {
        loading.value = false;
    }
  }
  
  /**
   * Get details for a specific quiz leaderboard
   * @param {Object} params - Request parameters
   * @param {number} params.quiz_id - ID of the quiz to fetch leaderboard for
   * @returns {Promise} Result object with success status and data
   */
  const showAdminLeaderboard = async (payload) => {
    loading.value = true
    error.value = null
    
    try {
      const response = await api.post('/admin/show/leaderboard', payload)
      
        currentLeaderboard.value = response.data.data
        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        console.error("Error using Lifeline:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    } finally {
        loading.value = false;
    }
  }
  
  /**
   * Reset leaderboard state
   */
  const resetLeaderboardState = () => {
    leaderboards.value = []
    currentLeaderboard.value = []
    error.value = null
  }


  return {
    createCategory,
    createQuiz,
    fetchTransactions,
    statusApproval,
    listAdminLeaderboards,
    showAdminLeaderboard,
    resetLeaderboardState,
    allTransactions,
    leaderboards,
    currentLeaderboard,
    loading
  }

})