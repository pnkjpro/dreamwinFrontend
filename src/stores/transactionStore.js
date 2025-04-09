import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./authStore";
import { ref } from "vue";
import { useMainStore } from "./mainStore";
import api from "@/plugins/axios";

export const useTransactionStore = defineStore('transaction', () => {
    const loading = ref(false);
    const transactions = ref([]);
    const error = ref(null);
    const fundAction = ref("");
    const mainStore = useMainStore();
    const { contest } = storeToRefs(mainStore);  
    const authStore = useAuthStore();

    async function addFunds(fund) {
        try {
            loading.value = true;
            if (!fund || isNaN(fund) || fund <= 0) {
                throw new Error("Invalid amount. Please enter a valid positive number.");
            }
    
            const response = await api.post('/funds/transaction', { 
                action: "deposit", 
                amount: fund 
            });
    
            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Adding Fund:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }
    

    async function withdrawFunds(fund){
        try {
            loading.value = true;
            if (!fund || isNaN(fund) || fund <= 0) {
                throw new Error("Invalid amount. Please enter a valid positive number.");
            }
            const response = await api.post('/funds/transaction',
                {action:"withdraw", amount: fund}
            );

            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Withdrawing Fund:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }

    async function joinGame(variantId){
        try{
            const response = await api.post('/play/quiz/join', {
                node_id: contest.value.node_id,
                variant_id: variantId
            });

            authStore.fetchUser();
            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Joining Game:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }

    async function getTransactions() {
        try {
            const response = await api.get('/funds/transaction/list');
            transactions.value = response.data.data;
            console.log("pinia: ",transactions.value);

            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Joining Game:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }

    return {
        fundAction,
        addFunds,
        loading,
        error,
        withdrawFunds,
        joinGame,
        getTransactions,
        transactions
    };
});