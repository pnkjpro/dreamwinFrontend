import { defineStore, storeToRefs } from 'pinia';
import { ref, inject } from 'vue';
import { useAuthStore } from './authStore';
import { useMainStore } from './mainStore';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import Leaderboard from '@/pages/Leaderboard.vue';

export const useQuizStore = defineStore('playQuiz', () => {
    const loading = ref(false);
    const error = ref(null);
    const config = inject('config');
    const router = useRouter();
    const toast = useToast();
    const responses = ref([]);
    const question = ref({});
    const leaderboard = ref({
      userPoints: { score: 0 },
      totalParticipants: 0,
      topPlayers: []
    });
    const mainStore = useMainStore();
    const authStore = useAuthStore();
    const { token } = storeToRefs(authStore);
    const { contests, contest, variant } = storeToRefs(mainStore);

    const api = axios.create({
        baseURL: config.API_URL,
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token.value}`,
        }
      });

      async function playQuiz(){
        try{
        const response = await api.post('/play', {
            node_id: contest.value.node_id,
            variant_id: variant.value.id
        });
        console.log(response.data.data);
        if(response.data.success){
          question.value = {...response.data.data};
        }
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
      }

      async function nextQuestion(selectedOption){
        try {
          loading.value = true;
          error.value = null;
          
          const response = await api.post('/play/next', {
            node_id: contest.value.node_id,
            question_id: question.value.id,
            answer_id: selectedOption
          });
          
          if(response.data.data?.flag && response.data.data?.is_nextQuestion === false){
            toast.success(response.data.data.message);
            router.push('/quiz/play/finished')
          } else {
              question.value = { ...response.data.data };
          }
          
          loading.value = false;
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
      }

      async function getUserResponses(){
        try{
          loading.value = true;
          const response = await api.get('/quiz/responses/list');
          responses.value = response.data.data;
          console.log("pinia: ",responses.value);

          loading.value = false;
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
      }

      async function getLeaderboard(nodeId){
        try{
          loading.value = true;
          const response = await api.post('/quiz/leaderboard', {node_id: nodeId});
          leaderboard.value = {...response.data.data};
          loading.value = false;
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
      }

      return {
        playQuiz,
        nextQuestion,
        getUserResponses,
        getLeaderboard,
        leaderboard,
        responses,
        question,
        loading,
        error
      }
})
