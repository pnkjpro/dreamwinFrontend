import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useMainStore } from './mainStore';
import { useRouter } from 'vue-router';
import { useToast } from 'vue-toastification';
import api from '@/plugins/axios';

export const useQuizStore = defineStore('playQuiz', () => {
    const loading = ref(false);
    const error = ref(null);
    const router = useRouter();
    const toast = useToast();
    const responses = ref([]);
    const question = ref({});
    const leaderboard = ref({
      userPoints: { score: 0 },
      totalParticipants: 0,
      topPlayers: []
    });
    const results = ref([]);
    const mainStore = useMainStore();
    const { contest, variant } = storeToRefs(mainStore);

      async function playQuiz(){
        try{
        loading.value = true
        const response = await api.post('/play', {
            node_id: contest.value.node_id,
            variant_id: variant.value.id
        });
        console.log(response.data.data);
        if(response.data.success){
          question.value = {...response.data.data};
        }
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

      async function getUserResponses(page=1){
        try{
          loading.value = true;
          const params = {page}
          const response = await api.get(`/quiz/responses/list`, {params});
          if(page === 1){
            responses.value = response.data.data.responses;
          } else {
            responses.value = [...responses.value, ...response.data.data.responses]
          }

          loading.value = false;
          return {
              success: response.data.success,
              message: response.data.message,
              pagination: response.data.data.totalCount > responses.value.length ? true : false
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

      async function showAnswerKey(nodeId){
        try{
          loading.value = true;
          const response = await api.post('/quiz/user/answerKey', {node_id: nodeId});
          results.value = {...response.data.data};
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
        showAnswerKey,
        results,
        leaderboard,
        responses,
        question,
        loading,
        error
      }
})
