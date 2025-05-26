import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore';
import AdminLayout from '@/pages/Admin/Homelayout.vue'
import NProgress from 'nprogress'
import 'nprogress/nprogress.css'
import { loadTawk, showTawk, hideTawk } from '@/utils/tawk'

// Configure NProgress
NProgress.configure({ 
  easing: 'ease',
  speed: 500,
  showSpinner: false,
  trickleSpeed: 200,
  minimum: 0.1
})

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/auth/'
    },
    // =============== Authentication Routes ================
    {
      path: '/auth/',
      redirect: '/auth/login',
      children: [
        {
          path: '',
          redirect: '/auth/login'
        },
        {
          path: 'login',
          name: 'Login',
          component: () => import('@/pages/Auth/Login.vue'),
          meta: { guestOnly: true, showChatbot: true }
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/pages/Auth/Register.vue'),
          meta: { guestOnly: true, showChatbot: true }
        },
        {
          path: 'password/forgot',
          name: 'ForgotPassword',
          component: () => import('@/pages/Auth/ForgotPassword.vue'),
          // meta: { guestOnly: true }
        },
        {
          path: 'password/reset',
          name: 'ResetPassword',
          component: () => import('@/pages/Auth/ResetPassword.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'otp/verify',
          name: 'OtpVerify',
          component: () => import('@/pages/Auth/VerifyOtp.vue'),
          meta: { guestOnly: true }
        }
      ]
    },
    // ====================== Dashboard Routes ====================
    {
      path: '/dashboard/',
      children: [
        {
          path: 'funds',
          name: 'Funds',
          component: () => import('@/pages/MyDashboard/AddnWithdraw.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'lifeline',
          name: 'MyLifeline',
          component: () => import('@/pages/MyDashboard/MyLifeline.vue'),
          meta: { requiresAuth:true }
        },
        {
          path: 'transactions',
          name: 'MyTransactions',
          component: () => import('@/pages/MyDashboard/MyTransactions.vue'),
          meta: { requiresAuth:true }
        },
        {
          path: 'my-contests',
          name: 'MyContests',
          component: () => import('@/pages/MyDashboard/MyContests.vue'),
          meta: { requiresAuth:true }
        },
        {
          path: 'answer-key',
          name: 'MyAnswerKey',
          component: () => import('@/pages/MyDashboard/MyAnswerKey.vue'),
          meta: { requiresAuth:true }
        },
        {
          path: 'lifeline-history',
          name: 'LifelineHistory',
          component: () => import('@/pages/MyDashboard/LifelineHistory.vue'),
          meta: { requiresAuth:true }
        },
        {
          path: 'refernearn',
          name: 'MyReferral',
          component: () => import('@/pages/MyDashboard/MyReferral.vue'),
          meta: { requiresAuth:true }
        }
      ]
    },
    // ====================== Quiz Routes ====================
    {
      path: '/quiz/',
      children: [
        {
          path: 'variants',
          name: 'QuizVariants',
          component: () => import('@/pages/Quiz/GameList.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'variant/details',
          name: 'VariantDetails',
          component: () => import('@/pages/Quiz/GameDetail.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'instruction',
          name: 'QuizInstruction',
          component: () => import('@/pages/Quiz/GameInstruction.vue'),
          meta: { requiresAuth:true }
        },
        {
          path: 'play',
          name: 'PlayQuiz',
          component: () => import('@/pages/Quiz/PlayPage.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'play/failed',
          name: 'FailureScreen',
          component: () => import('@/pages/Quiz/FailureScreen.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'play/finished',
          name: 'FinishedScreen',
          component: () => import('@/pages/Quiz/FinishedScreen.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'leaderboard',
          name: 'Leaderboard',
          component: () => import('@/pages/Quiz/Leaderboard.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'contests',
          name: 'Contests',
          component: () => import('@/pages/ListContests.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    // ======================= Admin Panel ===================================
    {
      path: '/admin/',
      component: AdminLayout,
      redirect: '/admin/funds/approval',
      children: [
        {
          path: 'funds/approval',
          name: 'FundsApproval',
          component: () => import('@/pages/Admin/FundApproval.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'category/create',
          name: 'CreateCategory',
          component: () => import('@/pages/Admin/CreateCategory.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'quiz/create',
          name: 'CreateQuiz',
          component: () => import('@/pages/Admin/CreateExamsheet.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'banner/update',
          name: 'BannerUpdate',
          component: () => import('@/pages/Admin/HomeBanner.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'notice/update',
          name: 'NoticeUpdate',
          component: () => import('@/pages/Admin/NoticeUpdate.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'lifeline/update',
          name: 'LifelineUpdate',
          component: () => import('@/pages/Admin/LifelineUpdate.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'howVideo/update',
          name: 'HowVideoUpdate',
          component: () => import('@/pages/Admin/HowVideos.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'leaderboard/list',
          name: 'AdminLeaderboard',
          component: () => import('@/pages/Admin/AdminLeaderboard.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'user/list',
          name: 'UserList',
          component: () => import('@/pages/Admin/UserList.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'bot/list',
          name: 'BotList',
          component: () => import('@/pages/Admin/BotManagement.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'quiz/list',
          name: 'QuizList',
          component: () => import('@/pages/Admin/QuizList.vue'),
          meta: { requiresAdminAuth: true }
        },
        {
          path: 'quiz/show/:node_id',
          name: 'QuizShow',
          component: () => import('@/pages/Admin/QuizShow.vue'),
          meta: { requiresAdminAuth: true }
        },
      ]
    },
    // ======================== Main Routes =========================
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Homepage.vue'),
      meta: { requiresAuth: true, showChatbot: true }
    },
    {
      path: '/intro',
      name: 'Intro',
      component: () => import('@/pages/IntroVideo.vue')
    },    
    {
      path: '/category/quiz/list',
      name: 'CategoryQuizzes',
      component: () => import('@/pages/CategoryQuizzes.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/faqs',
      name: 'FAQs',
      component: () => import('@/pages/HelpNFAQs.vue')
    },
    {
      path: '/aboutus',
      name: 'AboutUs',
      component: () => import('@/pages/AboutUs.vue')
    },
    {
      path: '/terms',
      name: 'Terms',
      component: () => import('@/pages/TermsNCondition.vue')
    },
    {
      path: '/how-to-play',
      name: 'HowToPlay',
      component: () => import('@/pages/HowToPlay.vue')
    }
  ],
})

// Show progress bar on route change
router.beforeEach((to, from, next) => {
  // Start the progress bar
  NProgress.start()
  next()
})

// ✅ Combined and proper afterEach with access to `to`
router.afterEach((to) => {
  // Complete NProgress
  setTimeout(() => {
    NProgress.done()
  }, 100)

  console.log('[Chatbot]', to.path, 'Chatbot Enabled:', to.meta.showChatbot)

   // Load Tawk only once
  loadTawk()

  if (to.meta.showChatbot) {
    console.log('[Chatbot] Showing Tawk')
    showTawk()
  } else {
    console.log('[Chatbot] Hiding Tawk')
    hideTawk()
  }
})

// Authentication check
router.beforeResolve(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Check if user is already fetched
  if (!authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.log('User not authenticated');
    }
  }

  // if (!from.name && to.name !== 'Home' && to.name !== 'Login' && !to.meta.requiresAdminAuth) {
  //   return next({ name: 'Home' });
  // }
  
  
  const isAuthenticated = !!authStore.user;
  const isAdmin = authStore.user?.is_admin || 0;

  if (to.meta.requiresAuth && !isAuthenticated) {
    next({ path: '/auth/login' });
  } else if (to.meta.requiresAdminAuth && isAuthenticated && !isAdmin){
    next({ name: 'Home'});
  } else if (to.meta.guestOnly && isAuthenticated) {
    next({ path: '/home' });
  } else {
    next();
  }
});

export default router