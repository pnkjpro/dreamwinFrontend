import { defineStore, storeToRefs } from 'pinia';
import { ref } from 'vue';
import { useAuthStore } from './authStore';
import { useRouter } from 'vue-router';
import { useQuizStore } from './quizStore';
import { useToast } from 'vue-toastification';
import api from '@/plugins/axios';

export const useLifelineStore = defineStore('lifeline', () => {
    const loading = ref(false);
    const error = ref(null);
    const router = useRouter();
    const toast = useToast();
    const removedOption = ref([]);
    const authStore = useAuthStore();
    const quizStore = useQuizStore();
    const { question } = storeToRefs(quizStore);      

    async function useLifeline(lifelineData){
        console.log("Lifeline Pinia Data: ", lifelineData);
        try{
            loading.value = true;
            error.value = null;

            const response = await api.post('/lifeline/use', lifelineData);
            console.log("lifeline_type pinia: ",response.data.data.lifeline_type);
            if(response.data.data.lifeline_type == 'skip_question' || response.data.data.lifeline_type == 'revive_game'){
                if(response.data.data?.flag && response.data.data?.is_nextQuestion === false){
                    toast.success(response.data.data.message);
                    router.push('/quiz/play/finished')
                } else {
                    question.value = { ...response.data.data };
                }
            }
            else {
                //50:50 lifeline, options to remove
                removedOption.value = response.data.data.options_to_remove;
                console.log("fiftyFifty: ",removedOption.value);
            }

            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error using Lifeline:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }

    async function purchaseLifeline(lifelineId, quantity){
        try{
            loading.value = true;
            const response = await api.post('/lifeline/purchase', {
                lifeline_id: lifelineId,
                quantity: quantity
            });

            authStore.fetchUser();

            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Purchasing Lifeline:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }

    return {
        useLifeline,
        error,
        loading,
        removedOption,
        purchaseLifeline,
    }
});