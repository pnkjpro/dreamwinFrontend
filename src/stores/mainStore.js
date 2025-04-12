import { defineStore } from 'pinia';
import { ref } from 'vue';
import api from '@/plugins/axios';

export const useMainStore = defineStore('main', () => {
  const loading = ref(false);
  const error = ref(null);
  const totalCount = ref(0);
  const contests = ref([]);
  const catContests = ref([]);
  const howVideos = ref([]);
  const page = ref(1);
  const banners = ref([]);
  const recordPerPage = ref(2);
  const contest = ref(null);
  const variant = ref({});
  const prizeContents = ref([]);
  const categories = ref([]);  

  async function fetchContests() {
    const response = await api.get(`/quiz`)
    contests.value = response.data.data[0];
    totalCount.value = response.data.data[1];
    page.value = 1;
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

  async function fetchQuizzesByCategory(categoryId){
    try{
      loading.value = true;
      const response = await api.get(`/category/quiz/list?category_id=${categoryId}`)
      catContests.value = response.data.data;
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
        const response = await api.post('admin/banner/update', payload);
        loading.value = false
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
          loading.value = false;
          console.error("Error updating banner:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
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

    async function fetchMoreContests(){
      try{
        loading.value = true;
        const response = await api.get(`/quiz?page=${page.value+1}`);
        page.value = page.value+1;
        if (response.data.data && response.data.data.length > 0) {
          contests.value = [...contests.value, ...response.data.data[0]];
        }
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
          console.error("Error getting quizzes:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
      } finally {
          loading.value = false;
      }
    }

    async function fetchHowVideos(){
      try{
        loading.value = true;
        const response = await api.get('how/videos');
        howVideos.value = response.data.data;
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
          console.error("Error getting videos:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
      } finally {
          loading.value = false;
      }
    }

    async function updateHowVideo(payload){
      try{
        loading.value = true;
        const response = await api.post('admin/howVideos/update', payload);
        loading.value = false;
        return {
          success: response.data.success,
          message: response.data.message
        }
      } catch (error) {
          loading.value = false;
          console.error("Error updating videos:", error);
          const errorMessage = error.response?.data?.message || "An unexpected error occurred";
          return { success: false, message: errorMessage };
      }
    }

    return {
        fetchCurrentContest,
        fetchContests,
        fetchMoreContests,
        fetchCategories,
        getPrizeContents,
        fetchHomeBanners,
        fetchQuizzesByCategory,
        updateHowVideo,
        fetchHowVideos,
        updateBanner,
        banners,
        prizeContents,
        variant,
        contest,
        catContests,
        totalCount,
        howVideos,
        loading,
        page,
        recordPerPage,
        contests,
        categories
    };
});
