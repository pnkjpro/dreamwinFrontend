import { defineStore, storeToRefs } from 'pinia';
import { ref, inject } from 'vue';
import { useAuthStore } from './authStore';
import { useMainStore } from './mainStore';
import axios from 'axios';
import { useRouter } from 'vue-router';

export const useQuizStore = defineStore('playQuiz', () => {
    const loading = ref(false);
    const error = ref(null);
    const config = inject('config');
    const router = useRouter();
    const question = ref({});
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
        const response = await api.post('/play', {
            node_id: contest.value.node_id,
            variant_id: variant.value.id
        });
        console.log(response.data.data);
        question.value = {...response.data.data};
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
          
          // More explicit update - replace the entire object
          question.value =  {...response.data.data };
          
          console.log("Updated question:", question.value);
          return question.value;
        } catch (err) {
          error.value = err.message || 'Failed to load next question';
          router.push('/quiz/play/failed');
          console.error(error.value);
        } finally {
          loading.value = false;
        }
      }

      return {
        playQuiz,
        nextQuestion,
        question,
        loading,
        error
      }
})
