import type { NavigationGuard, NavigationGuardNext, RouteLocationNormalized } from 'vue-router';
import { useUserStore } from '@/stores';

const whiteList = ['/login', '/404'];

export const authenticateGuard: NavigationGuard = (
  to: RouteLocationNormalized,
  _from: RouteLocationNormalized,
  next: NavigationGuardNext
) => {
  const userStore = useUserStore();
  const isLogin = !!userStore.token;
  if (!isLogin) {
    if (whiteList.includes(to.path)) {
      next();
      return;
    }

    next('/login');
    return;
  }

  // check if token is expired
  const isTokenExpired = userStore.isTokenExpired();
  if (isTokenExpired) {
    userStore.clear();
    next('/login');
    return;
  }

  // already login, redirect to home page if visit login page
  if (!isTokenExpired && to.path === '/login') {
    next('/');
    return;
  }

  // continue to next route
  next();
};
