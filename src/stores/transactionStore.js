import { defineStore, storeToRefs } from "pinia";
import { useAuthStore } from "./authStore";
import { ref } from "vue";
import { useMainStore } from "./mainStore";
import api from "@/plugins/axios";
import { useToast } from "vue-toastification";

export const useTransactionStore = defineStore('transaction', () => {
    const loading = ref(false);
    const transactions = ref([]);
    const lifeline_transactions = ref([]);
    const lifeline_histories = ref([]);
    const error = ref(null);
    const toast = useToast();
    const fundAction = ref("");
    const mainStore = useMainStore();
    const authStore = useAuthStore();
    const { contest } = storeToRefs(mainStore);  
    const { user } = storeToRefs(authStore);

    async function addFunds(fund, transaction_id) {
        try {
            loading.value = true;
            if (!fund || isNaN(fund) || fund <= 0) {
                throw new Error("Invalid amount. Please enter a valid positive number.");
            }
    
            const response = await api.post('/funds/transaction', { 
                action: "deposit", 
                amount: fund,
                transaction_id: transaction_id
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

    async function payWithRazorpay(payload){
        try{
            loading.value = true;
            const response = await api.post('/razorpay/order/create', { amount: payload }); // ₹500
          console.log("response data:",response.data.data);
            const options = {
              key: response.data.data.key,
              amount: response.data.data.amount,
              currency: response.data.data.currency,
              name: 'Himpri',
              description: 'Order Payment',
              order_id: response.data.data.order_id,
              handler: function (razorpayResponse) {
                verifyRazorPayment(razorpayResponse);
              },
              prefill: {
                name: user.value.name,
                email: user.value.email,
                contact: user.value.mobile
              },
              theme: {
                color: '#3399cc'
              }
            };
          
            const rzp = new Razorpay(options);
            rzp.open();
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
      };

      async function verifyRazorPayment(razorpayResponse){
        try{
            loading.value = true;
            const response = await api.post('razorpay/payment/verify', {
                razorpay_payment_id: razorpayResponse.razorpay_payment_id,
                razorpay_order_id: razorpayResponse.razorpay_order_id,
                razorpay_signature: razorpayResponse.razorpay_signature
              });
            if(result.data.success){
                toast.success(response.data.message);
            } else {
                toast.error(response.data.message);
            }
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
            loading.value = true
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

    async function getTransactions(page = 1) {
        try {
            loading.value = true;
            const params = {page}
            const response = await api.get(`/funds/transaction/list`, {params});
            if(page === 1){
                transactions.value = response.data.data.transactions;
            } else {
                transactions.value = [...transactions.value, ...response.data.data.transactions]
            }

            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message,
                pagination: response.data.data.totalCount > transactions.value.length ? true : false
            }
        } catch (error) {
            loading.value = false;
            console.error("Error getting transactions:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }
    async function getLifelineTransactions(page=1) {
        try {
            const params = {page}
            loading.value = true;
            const response = await api.get(`/lifeline/transaction/list`, {params});
            if(page === 1){
                lifeline_transactions.value = response.data.data.lifeline_transactions;
            } else {
                lifeline_transactions.value = [...lifeline_transactions.value, ...response.data.data.lifeline_transactions]
            }

            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message,
                pagination: response.data.data.totalCount > lifeline_transactions.value.length ? true : false
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Joining Game:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }

    async function getLifelineHistories(page=1) {
        try {
            loading.value = true;
            const params = {page}
            const response = await api.get(`/lifeline/history/list`, {params});
            if(page === 1){
                lifeline_histories.value = response.data.data.lifeline_histories;
            } else {
                lifeline_histories.value = [...lifeline_histories.value, ...response.data.data.lifeline_histories];
            }

            loading.value = false;
            return {
                success: response.data.success,
                message: response.data.message,
                pagination: response.data.data.totalCount > lifeline_histories.value.length ? true : false
            }
        } catch (error) {
            loading.value = false;
            console.error("Error Joining Game:", error);
            const errorMessage = error.response?.data?.message || "An unexpected error occurred";

            return { success: false, message: errorMessage };
        }
    }

    return {
        getTransactions,
        getLifelineTransactions,
        getLifelineHistories,
        payWithRazorpay,
        withdrawFunds,
        addFunds,
        joinGame,
        fundAction,
        loading,
        error,
        transactions,
        lifeline_transactions,
        lifeline_histories
    };
});