import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./authStore";
import { ref, watch, computed, onMounted, inject } from "vue";
import axios from "axios";

export const useTransactionStore = defineStore('transaction', () => {
    const loading = ref(false);
    const error = ref(null);
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
        if(fund>0){
            const response = await api.post('/funds/transaction', 
                {action:"deposit", amount: fund}
            );
            console.log("add funds response:",response.data);
        }
    }

    async function withdrawFunds(fund){
        if(fund>0){
            const response = await api.post('/funds/transaction',
                {action:"withdraw", amount: fund}
            );
            console.log("withdraw funds response:", response.data);
        }
    }

    return {
        fundAction,
        addFunds,
        withdrawFunds

    };
});