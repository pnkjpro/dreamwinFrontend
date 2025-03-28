import { defineStore, storeToRefs } from 'pinia';
import { ref, inject } from 'vue';
import { useAuthStore } from './authStore';
import { useMainStore } from './mainStore';
import axios from 'axios';
import { useRouter } from 'vue-router';
import { useQuizStore } from './quizStore';
import lifeline from '@/config/lifeline';

export const useLifelineStore = defineStore('lifeline', () => {
    const loading = ref(false);
    const error = ref(null);
    const lifelines = ref([]);
    const config = inject('config');
    const router = useRouter();
    const removedOption = ref([]);
    const mainStore = useMainStore();
    const authStore = useAuthStore();
    const quizStore = useQuizStore();
    const { token, user } = storeToRefs(authStore);
    const { contests, contest, variant } = storeToRefs(mainStore);
    const { question } = storeToRefs(quizStore);

    const api = axios.create({
        baseURL: config.API_URL,
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token.value}`,
        }
      });

    async function useLifeline(lifelineData){
        console.log("Lifeline Pinia Data: ", lifelineData);
        try{
            loading.value = true;
            error.value = null;

            const response = await api.post('/lifeline/use', lifelineData);
            console.log("lifeline_type pinia: ",response.data.data.lifeline_type);
            if(response.data.data.lifeline_type == 'skip_question' || response.data.data.lifeline_type == 'revive_game'){
                question.value = { ...response.data.data };
            }
            else {
                //50:50 lifeline, options to remove
                removedOption.value = response.data.data.options_to_remove;
                console.log("fiftyFifty: ",removedOption.value);
            }

        }catch(err){
            //
        }finally{
            loading.value = false;
        }
    }

    async function purchaseLifeline(lifelineId, quantity){
        try{
            console.log("pinia hit", lifelineId.value, quantity.value);
            loading.value = true;
            error.value = null;
            const response = await api.post('/lifeline/purchase', {
                lifeline_id: lifelineId.value,
                quantity: quantity.value
            });
            console.log(response.data.data);
            return

        }catch(err){
            console.log(err);
        }finally{
            loading.value = false
        }
    }

    return {
        useLifeline,
        removedOption,
        purchaseLifeline,
    }
});