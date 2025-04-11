import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/plugins/axios';

export const useMainStore = defineStore('main', () => {
  const loading = ref(false);
  const error = ref(null);
  const contests = ref([]);
  const contest = ref(null);
  const variant = ref({});
  const prizeContents = ref([]);
  const categories = ref([]);  

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

    async function updateBanner(payload){
      try{
        loading.value = true;
        const response = api.post('admin/banner/update', payload);
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
          console.error("Error updating banner:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
      } finally {
          loading.value = false;
      }
    }

    async function fetchHomeBanners(){
      try{
        loading.value = true;
        const response = await api.get('/banner/list');
        banners.value = response.data.data;
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
          console.error("Error getting banners:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
      } finally {
          loading.value = false;
      }
    }

    return {
        fetchCurrentContest,
        fetchContests,
        fetchCategories,
        getPrizeContents,
        fetchHomeBanners,
        updateBanner,
        prizeContents,
        variant,
        contest,
        contests,
        categories
    };
});
