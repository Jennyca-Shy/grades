import { createRouter, createWebHistory } from 'vue-router';
import DashboardView from '@/views/DashboardView.vue';
import ScheduleView from '@/views/ScheduleView.vue';
import NotFoundView from '@/views/NotFoundView.vue';
import SubjectsView from '@/views/SubjectsView.vue';
import HomeworkView from '@/views/HomeworkView.vue';
import SubjectView from '@/views/SubjectView.vue';

const router = createRouter({
  history: createWebHistory(import.meta.env.BASE_URL),
  routes: [
    {
      path: '/',
      name: 'dashboard',
      component: DashboardView,
    },
    {
      path: '/about',
      name: 'about',
      // route level code-splitting
      // this generates a separate chunk (About.[hash].js) for this route
      // which is lazy-loaded when the route is visited.
      component: () => import('../views/AboutView.vue'),
    },
    {
      path: '/schedule',
      name: 'schedule',
      component: ScheduleView,
    },
    {
      path: '/subjects',
      name: 'subjects',
      component: SubjectsView,
    },
    {
      path: '/subjects/Mathe',
      name: 'subject',
      component: SubjectView,
    },
    {
      path: '/homework',
      name: 'homework',
      component: HomeworkView,
    },
    {
      path: '/:catchAll(.*)',
      name: 'not-found',
      component: NotFoundView,
    },
  ],
});

export default router;
