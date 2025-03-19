import { defineStore, storeToRefs } from 'pinia';
import { ref, inject } from 'vue';
import { useAuthStore } from './authStore';
import axios from 'axios';

export const useMainStore = defineStore('main', () => {
  const loading = ref(false);
  const error = ref(null);
  const contests = ref([]);
  const contest = ref({});
  const variant = ref({});
  const prizeContents = ref([]);
  const currentContest = ref([]);
  const categories = ref([]);
  const config = inject("config");
  const authStore = useAuthStore();
  const { token } = storeToRefs(authStore);

  console.log("mainStore token:", token.value);

  const api = axios.create({
    baseURL: config.API_URL,
    withCredentials: true,
    headers: {
      'Authorization': `Bearer ${token.value}`,
    }
  });

  async function fetchContests() {
    const response = await api.get('/quiz')
    contests.value = response.data.data;
    console.log(contests.value);
  }

  async function fetchCategories() {
    const response = await api.get('/category')
    categories.value = response.data.data;
    console.log(categories.value);
  }

  async function fetchCurrentContest(nodeId){
    //you were coding here
    console.log(nodeId);
    const response = await api.get('/quiz/contest', {params:{node_id: nodeId}});
    contest.value = response.data.data;
    console.log(contest.value);
  }

  function getPrizeContents(variantId){
    console.log("pinia VariantId",variantId);
    variant.value = contest.value.quiz_variants.find(v => v.id === variantId);
    if (variant.value) {
    prizeContents.value = variant.value.prize_contents;
}

  }


    return {
        fetchCurrentContest,
        fetchContests,
        fetchCategories,
        getPrizeContents,
        prizeContents,
        variant,
        contest,
        contests,
        categories
    };
});
