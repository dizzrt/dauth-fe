import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { authenticateGuard } from './guard';
import IdentityRoutes from './identity_routes';
import SPRoutes from './sp_routes';

const routes: RouteRecordRaw[] = [
  {
    path: '/',
    name: 'root',
    redirect: '/home',
    component: () => import('@/views/index.vue'),
    meta: {},
    children: [
      {
        path: 'home',
        name: '/home',
        component: () => import('@/views/HomePage.vue'),
        meta: {},
      },
      ...IdentityRoutes,
      ...SPRoutes,
    ],
  },
  {
    path: '/login',
    name: '/login',
    component: () => import('@/views/identity/LoginPage.vue'),
    meta: {},
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach(authenticateGuard);

export default router;
