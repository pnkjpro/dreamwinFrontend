import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore';


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
          meta: { guestOnly: true }
        },
        {
          path: 'register',
          name: 'Register',
          component: () => import('@/pages/Auth/Register.vue'),
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
      redirect: '/admin/funds/approval',
      children: [
        {
          path: 'funds/approval',
          name: 'FundsApproval',
          component: () => import('@/pages/Admin/FundApproval.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'category/create',
          name: 'CreateCategory',
          component: () => import('@/pages/Admin/CreateCategory.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'quiz/create',
          name: 'CreateQuiz',
          component: () => import('@/pages/Admin/CreateExamsheet.vue'),
          meta: { requiresAuth: true }
        },
        {
          path: 'variant/create',
          name: 'CreateVariant',
          component: () => import('@/pages/Admin/CreateVariant.vue'),
          meta: { requiresAuth: true }
        }
      ]
    },
    // ======================== Main Routes =========================
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Homepage.vue'),
      meta: { requiresAuth: true }
    }
  ],
})

router.beforeEach(async (to, from, next) => {
  const authStore = useAuthStore();
  
  // Check if user is already fetched
  if (!authStore.user) {
    try {
      await authStore.fetchUser();
    } catch (error) {
      console.log('User not authenticated');
    }
  }

  if (!from.name && to.name !== 'Home' && to.name !== 'Login') {
    return next({ name: 'Home' });
  }
  
  
  const isAuthenticated = !!authStore.user;

if (to.meta.requiresAuth && !isAuthenticated) {
  next({ path: '/auth/login' });
} else if (to.meta.guestOnly && isAuthenticated) {
  next({ path: '/home' });
} else {
  next();
}
});

export default router
