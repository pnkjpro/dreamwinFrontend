import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./authStore";
import { ref, watch, computed, onMounted, inject } from "vue";
import axios from "axios";
import { useToast } from "vue-toastification";

export const useTransactionStore = defineStore('transaction', () => {
    const loading = ref(false);
    const error = ref(null);
    const toast = useToast();
    const config = inject('config');
    const fundAction = ref("");
    
    const authStore = useAuthStore();
    const { token, user } = storeToRefs(authStore);

    const api = axios.create({
        baseURL: config.API_URL,
        withCredentials: true,
        headers: {
          'Authorization': `Bearer ${token.value}`,
        }
    });

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
    
            console.log("Add funds response:", response.data.success);
    
            loading.value = false;
            if (response.data.success) {
                return { success: true, message: response.data.message }
            } else {
                return { success: false, message: response.data.message}
            }
        } catch (error) {
            loading.value = false;
            console.error("Error adding funds:", error);
            return { success: false, message: "Something went wrong. Please try again." }
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
            console.log("withdraw funds response:", response.data);

            loading.value = false;
            if (response.data.success) {
                return { success: true, message: response.data.message }
            } else {
                return { success: false, message: response.data.message}
            }
        } catch (error) {
            loading.value = false;
            console.error("Error withdrawing funds:", error);
            return { success: false, message: "Something went wrong. Please try again." }
        }
    }

    return {
        fundAction,
        addFunds,
        withdrawFunds

    };
});