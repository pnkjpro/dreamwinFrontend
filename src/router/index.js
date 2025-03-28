import { createRouter, createWebHistory } from 'vue-router'
import { useAuthStore } from '../stores/authStore';
import { storeToRefs } from 'pinia';


const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '',
      redirect: '/auth/'
    },
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
          component: () => import('@/pages/Auth/Login.vue'),
          meta: { guestOnly: true }
        },
        {
          path: 'register',
          component: () => import('@/pages/Auth/Register.vue'),
          meta: { guestOnly: true }
        }
      ]
    },
    {
      path: '/home',
      name: 'Home',
      component: () => import('@/pages/Homepage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz/variants',
      name: 'QuizVariants',
      component: () => import('@/pages/GameList.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz/play',
      name: 'PlayQuiz',
      component: () => import('@/pages/PlayPage.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz/play/failed',
      name: 'FailureScreen',
      component: () => import('@/pages/FailureScreen.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz/leaderboard',
      name: 'Leaderboard',
      component: () => import('@/pages/Leaderboard.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz/contests',
      name: 'Contests',
      component: () => import('@/pages/ListContests.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/variant/details',
      name: 'VariantDetails',
      component: () => import('@/pages/GameDetail.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/quiz/instruction',
      name: 'QuizInstruction',
      component: () => import('@/pages/GameInstruction.vue'),
      meta: { requiresAuth:true }
    },
    {
      path: '/funds',
      name: 'Funds',
      component: () => import('@/pages/AddnWithdraw.vue'),
      meta: { requiresAuth: true }
    },
    {
      path: '/examination',
      name: 'Examination',
      component: () => import('@/pages/Examination.vue')
    },
    {
      path: '/createQuiz',
      name: 'CreateQuiz',
      component: () => import('@/pages/CreateExamsheet.vue')
    },
    {
      path: '/lifeline',
      name: 'Lifeline',
      component: () => import('@/pages/MyLifeline.vue'),
      meta: { requiresAuth:true }
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
      // If error, consider user not authenticated
      console.log('User not authenticated');
    }
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
