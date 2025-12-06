import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';

import ClientRoutes from './client_routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: () => import('@/views/index.vue'),
    meta: {},
    children: [
      {
        path: '/home',
        name: 'home',
        component: () => import('@/views/HomePage.vue'),
        meta: {},
      },
      ...ClientRoutes,
    ],
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((_to, _from, next) => {
  // do something
  next();
});

export default router;
