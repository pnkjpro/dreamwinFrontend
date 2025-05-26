import { defineStore } from 'pinia';
import { reactive, ref } from 'vue';
import api from '@/plugins/axios';

export const useAdminStore = defineStore('admin', () => {
  const loading = ref(false);
  const error = ref(null);
  const leaderboards = ref([]);
  const userList = ref([]);
  const quizList = ref([]);
  const quizzesByuser = ref([]);
  const usersByquiz = ref([]);
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

  async function fetchTransactions(page = 1, filters = {}) {
    try {
      loading.value = true;
      
      // Build parameters
      const params = { 
        page,
        per_page: 30 // Fixed page size as requested
      };
      
      // Add filter parameters if they exist
      if (filters.search) params.search = filters.search;
      if (filters.action) params.action = filters.action;
      if (filters.approved_status) params.approved_status = filters.approved_status;
      if (filters.date_from) params.date_from = filters.date_from;
      if (filters.date_to) params.date_to = filters.date_to;
      
      const response = await api.get(`/admin/transaction/list/all`, { params });
      
      if (page === 1) {
        // Reset data for first page or when filters change
        allTransactions.value = [...response.data.data.transactions];
      } else {
        // Append data for pagination
        allTransactions.value = [...allTransactions.value, ...response.data.data.transactions];
      }
      
      const hasMoreData = response.data.data.totalCount > allTransactions.value.length;
      
      return {
        success: response.data.success,
        message: response.data.message,
        pagination: hasMoreData,
        totalCount: response.data.data.totalCount,
        currentPage: page,
        transactions: response.data.data.transactions
      };
    } catch (error) {
      console.error("Error fetching transactions:", error);
      const errorMessage = error.response?.data?.message || "An unexpected error occurred";
      return { 
        success: false, 
        message: errorMessage,
        pagination: false,
        totalCount: 0
      };
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

  const listAdminLeaderboards = async (page = 1) => {
    loading.value = true
    error.value = null
    
    try {
      const params = {page}
      const response = await api.get(`/admin/list/leaderboards`, {params})
      if(page === 1){
        leaderboards.value = response.data.data.leaderboards;
      } else {
        leaderboards.value = [...leaderboards.value, ...response.data.data.leaderboards];
      }
        return {
            success: response.data.success,
            message: response.data.message,
            pagination: response.data.data.totalCount > leaderboards.value.length ? true : false
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

  async function updateLifelineCost(payload){
    try{
        loading.value = true;
        const response = await api.post('/admin/lifeline/update', payload)
        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        console.error("Error updating Lifeline:", error);
        return { success: false, message: 'Error updating Lifeline' };
    } finally {
        loading.value = false;
    }
  }

  async function updateOfficialNotice(payload){
    try{
        loading.value = true;
        const response = await api.post('/admin/variables/update', payload)
        return {
            success: response.data.success,
            message: response.data.message
        }
    } catch (error) {
        console.error("Error updating official notice:", error);
        return { success: false, message: 'Error updating official notice' };
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

  const updateCategorySorting = async (categories) => {
    loading.value = true;
    try {
      const response = await api.post('/admin/categories/update-order', { categories });
      loading.value = false;
      return response.data;
    } catch (error) {
      loading.value = false;
      console.error('Error updating categories order:', error);
      return { 
        success: false, 
        message: error.response?.data?.message || 'Failed to update category order' 
      };
    }
  }

  async function showUsersByQuiz(nodeId){
    try{
      loading.value = true;
      console.log("pinia node id: ",nodeId)
      const response = await api.get(`/admin/show/quiz/users?node_id=${nodeId}`);
      usersByquiz.value = response.data.data;
      loading.value = false;
      return {
          success: response.data.success,
          message: response.data.message
      }
      
    } catch (error) {
        loading.value = false;
        console.error("Error showing users of quiz:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    }
  }

  async function showQuizzesByUser(userId){
    try{
      loading.value = true;
      const response = await api.get('/admin/show/user/quizzes', {user_id: userId});
      quizzesByuser.value = response.data.data;
      loading.value = false;
      return {
          success: response.data.success,
          message: response.data.message
      }
      
    } catch (error) {
        loading.value = false;
        console.error("Error showing quizzes by user:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    }
  }

  async function showUserList(page = 1, filters = {}) {
    try {
        loading.value = true;
        const params = { page, per_page: 30, ...filters };
        const response = await api.get(`/admin/user/list`, { params });
        
        if (page === 1) {
            // Reset the list for new search/filter or refresh
            userList.value = [...response.data.data.users];
        } else {
            // Append to existing list for pagination
            userList.value = [...userList.value, ...response.data.data.users];
        }
        
        loading.value = false;
        
        return {
            success: response.data.success,
            message: response.data.message,
            pagination: {
                has_more: response.data.data.pagination.has_more,
                current_page: response.data.data.pagination.current_page,
                total_pages: response.data.data.pagination.total_pages,
                total_count: response.data.data.pagination.total,
                per_page: response.data.data.pagination.per_page
            }
        };
        
    } catch (error) {
        loading.value = false;
        console.error("Error showing user list:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    }
  }
  
  async function showQuizList(page =1, category=''){
    try{
      loading.value = true;
      const params = { page };
      if (category) {
        params.category = category;
      }
      const response = await api.get(`/admin/quiz/list`, {params});
      if (page === 1) {
        quizList.value = response.data.data.quizzes;
      } else {
        quizList.value = [...quizList.value, ...response.data.data.quizzes];
      }
      loading.value = false;
      return {
          success: response.data.success,
          message: response.data.message,
          pagination:  response.data.data.totalCount > quizList.value.length ? true : false
      }
      
    } catch (error) {
        loading.value = false;
        console.error("Error showing user list:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
    }
  }


  return {
    createCategory,
    createQuiz,
    fetchTransactions,
    statusApproval,
    listAdminLeaderboards,
    showAdminLeaderboard,
    resetLeaderboardState,
    updateLifelineCost,
    updateCategorySorting,
    updateOfficialNotice,
    showUsersByQuiz,
    showQuizzesByUser,
    showUserList,
    showQuizList,
    quizzesByuser,
    usersByquiz,
    userList,
    quizList,
    allTransactions,
    leaderboards,
    currentLeaderboard,
    loading
  }

})