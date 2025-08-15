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
  const official_notice = ref("");
  const official_notice_status = ref(false);
  const recordPerPage = ref(2);
  const hasShownVideo = ref(false);
  const contest = ref(null);
  const variant = ref({});
  const prizeContents = ref([]);
  const categories = ref([]);  
  const referredUsers = ref([]);
  const featuredVideos = ref([]);
  const referredMetaData = ref({
    claimedRewards: 0,
    pendingRewards: 0,
    totalReferred: 0,
    referEarned: 0
  });

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
        console.error("Error getting quizzes by category:", error);
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
        banners.value = response.data.data.banners;
        official_notice.value = response.data.data.official_notice;
        official_notice_status.value = response.data.data.official_notice_status;
        console.log(official_notice_status);
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

    async function fetchReferredUsers(referPage){
      try{
        loading.value = true;
        const response = await api.get(`users/refer/list?page=${referPage.value+1}`);
        // page.value = page.value+1;
        referredMetaData.value.claimedRewards = response.data.data.claimed_rewards;
        referredMetaData.value.pendingRewards = response.data.data.pending_rewards;
        referredMetaData.value.referEarned = response.data.data.refer_earned;
        referredMetaData.value.totalReferred = response.data.data.total_referred;
        if (response.data.data && response.data.data.referred_users.length > 0) {
          referredUsers.value = [...referredUsers.value, ...response.data.data.referred_users];
        }
        // console.log("pinia referred users2:", response.data.data.referred_users);
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

    async function fetchFeaturedVideos() {
      try {
        loading.value = true;
        const response = await api.get('/featured/videos');
        loading.value = false;

        if (response.data.success) {
          featuredVideos.value = response.data.data;
          console.log("Featured videos fetched:", featuredVideos.value);
        }
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error fetching featured videos:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
      }
    }

    async function addFeaturedVideo(video) {
      try {
        console.log("Adding featured video:", video);
        loading.value = true;
        const response = await api.post('/featured/video/add', { video });
        loading.value = false;
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error adding featured video:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
      }
    }

    async function updateFeaturedVideo(videos) {
      try {
        console.log("Updating featured videos:", videos);
        loading.value = true;
        const response = await api.post('/featured/video/update', videos);
        loading.value = false;
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error updating featured videos:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
      }
    }

    async function deleteFeaturedVideo(videoId) {
      try {
        console.log("Deleting featured video with ID:", videoId);
        loading.value = true;
        const response = await api.post('/featured/video/delete', { video_id: videoId });
        loading.value = false;

        return {
          success: response.data.success,
          message: response.data.message
        };
      } catch (error) {
        loading.value = false;
        console.error("Error deleting featured video:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
      }
    }

    async function createExpertVideo(formData) {
      try {
        loading.value = true;
        const response = await api.post('/expert/video/create', formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        loading.value = false;
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error creating expert video:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        const errors = error.response?.data?.errors || null;
        return { success: false, message: errorMessage, errors };
      }
    }

    async function updateExpertVideo(videoId, formData) {
      try {
        console.log("Updating expert video:", videoId);
        loading.value = true;
        const response = await api.post(`/expert/video/update`, formData, {
          headers: {
            'Content-Type': 'multipart/form-data',
          },
        });
        loading.value = false;

        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error updating expert video:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        const errors = error.response?.data?.errors || null;
        return { success: false, message: errorMessage, errors };
      }
    }

    async function deleteExpertVideo(videoId) {
      try {
        console.log("Deleting expert video with ID:", videoId);
        loading.value = true;
        const response = await api.post('/expert/video/delete', { video_id: videoId });
        loading.value = false;

        return {
          success: response.data.success,
          message: response.data.message
        };
      } catch (error) {
        loading.value = false;
        console.error("Error deleting expert video:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
      }
    }

    async function toggleExpertVideoStatus(videoId) {
      try {
        console.log("Toggling expert video status:", videoId);
        loading.value = true;
        const response = await api.post('/expert/video/toggle-status', { video_id: videoId });
        loading.value = false;

        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error toggling expert video status:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
      }
    }

    async function fetchExpertVideos() {
      try {
        loading.value = true;
        const response = await api.get('/expert/video/list');
        loading.value = false;

        if (response.data.success) {
          console.log("Expert videos fetched:", response.data.data);
        }
        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error fetching expert videos:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage, data: [] };
      }
    }

    async function purchaseExpertVideo(videoId) {
      try {
        console.log("Purchasing expert video:", videoId);
        loading.value = true;
        const response = await api.post('/expert/video/purchase', { video_id: videoId });
        loading.value = false;

        return {
          success: response.data.success,
          message: response.data.message,
          data: response.data.data
        };
      } catch (error) {
        loading.value = false;
        console.error("Error purchasing expert video:", error);
        const errorMessage = error.response?.data?.message || "An unexpected error occurred";
        return { success: false, message: errorMessage };
      }
    }

    return {
      //actions
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
        fetchReferredUsers,
        fetchFeaturedVideos,
        updateFeaturedVideo,
        addFeaturedVideo,
        deleteFeaturedVideo,
        createExpertVideo,
        updateExpertVideo,
        deleteExpertVideo,
        toggleExpertVideoStatus,
        fetchExpertVideos,
        purchaseExpertVideo,

        //state
        banners,
        official_notice,
        official_notice_status,
        prizeContents,
        hasShownVideo,
        variant,
        contest,
        catContests,
        totalCount,
        howVideos,
        loading,
        page,
        recordPerPage,
        contests,
        categories,
        referredUsers,
        referredMetaData,
        featuredVideos
    };
});
