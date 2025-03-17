import { createRouter, createWebHistory } from 'vue-router'

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'Home',
      component: () => import('@/pages/Home.vue')
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
    }
  ],
})

export default router
