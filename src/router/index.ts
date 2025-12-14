import type { RouteRecordRaw } from 'vue-router';
import { createRouter, createWebHistory } from 'vue-router';
import { useUserStore } from '@/stores/user.store';
import ClientRoutes from './client_routes';
import IdentityRoutes from './identity_routes';

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
      ...IdentityRoutes,
      ...ClientRoutes,
    ],
  },
  {
    path: '/login',
    name: 'login',
    component: () => import('@/views/identity/LoginPage.vue'),
    meta: {},
  },
];

const router = createRouter({
  history: createWebHistory(),
  routes: routes,
});

router.beforeEach((to, _from, next) => {
  const userStore = useUserStore();
  const isLogin = !!userStore.token;

  const whiteList = ['/login', '/404'];
  if (isLogin) {
    if (to.path === '/login') {
      next('/');
    } else {
      if (userStore.isTokenExpired()) {
        // token expired, clear user info and redirect to login page
        userStore.clear();
        next('/login');
      }

      // continue to next route
      next();
    }
  } else {
    if (whiteList.includes(to.path)) {
      // no need to login, continue to next route
      next();
    } else {
      next('/login');
    }
  }
});

export default router;
