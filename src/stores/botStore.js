import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '@/plugins/axios';

export const useBotStore = defineStore('botManagement', () => {
    const loading = ref(false);
    const router = useRouter();
    const toast = useToast();
    const quizzes = ref([]);
    const bots = ref([]);

    const createBot = async (payload) => {
        try {
          loading.value = true;
          const response = await api.post('/bot/create', payload);
          loading.value = false
          return {
            success: response.data.success,
            message: response.data.message
          }
        } catch (error) {
            loading.value = false;
            console.error("Error Responses:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            return { success: false, message: errorMessage };
        }
      };

    const createBotActions = async (actionForm) => {
        try {
          loading.value = true;
          const response = await api.post('/bot/action/create', actionForm);
          loading.value = false
          return {
            success: response.data.success,
            message: response.data.message
          }
        } catch (error) {
            loading.value = false;
            console.error("Error Responses:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";
            return { success: false, message: errorMessage };
        }
      };

      const fetchQuizzes = async () => {
        try {
            loading.value = true
            const response = await api.get('/bot/quizzes');
            quizzes.value = response.data.data;
            loading.value = false
            return {
              success: response.data.success,
              message: response.data.message
            }
          } catch (error) {
              loading.value = false;
              console.error("Error Responses:", error);
              const errorMessage = error.response?.data?.message || "An unexpected error occurred";
  
              return { success: false, message: errorMessage };
          }
      };

      const fetchBots = async () => {
        try {
            loading.value = true
            const response = await api.get('/bot/list');
            bots.value = response.data.data;
            loading.value = false
            return {
              success: response.data.success,
              message: response.data.message
            }
          } catch (error) {
              loading.value = false;
              console.error("Error Responses:", error);
              const errorMessage = error.response?.data?.message || "An unexpected error occurred";
  
              return { success: false, message: errorMessage };
          }
      };

    return {
        createBot,
        createBotActions,
        fetchQuizzes,
        fetchBots,
        quizzes,
        bots,
        loading
    }
})